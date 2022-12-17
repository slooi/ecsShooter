import { Component, System, Entity } from ".";

type ComponentConstructor<T extends Component = Component> = new (...args: any) => T;
type SystemConstructor = new (...args: any) => System;

type entityToComponentObjType = Map<Entity, Map<ComponentConstructor, Component>>;
type CCToEntitiesType = Map<ComponentConstructor<Component>, Set<Entity>>;
let TEMPORARY_ADD_SYSTEMS = 0;

export class ECSManager {
	entityCounter: number;
	systems: Set<System>;
	ccToEntities: CCToEntitiesType; // Allows you to get set of entities that possess a certain component
	entityToComponentObj: entityToComponentObjType;

	constructor() {
		this.ccToEntities = new Map();
		this.entityToComponentObj = new Map();
		this.entityCounter = 0;
		this.systems = new Set();
		console.log("ECSManager!");
	}

	/* 

	SYSTEM
	upate(){
		ecsManager.view(xComponent.constructor,yComponent)
	}


	// might not work unquie variable readonly.
*/

	addEntity(...components: Component[]) {
		const entity = this.entityCounter++;

		// Update
		for (const component of components) {
			// 1 ccToEntities
			setupCCToEntities(this.ccToEntities, entity, component);

			// 2 entityToComponentObj
			setupEntityToComponentObj(this.entityToComponentObj, entity, component);
		}

		// PRINT
		let str = "";
		for (const component of components) {
			str += component.constructor.name + ", ";
		}
		console.log(`Entity: ${entity}, Components: ${str}`);
	}

	removeEntity() {}

	addSystems(...systems: System[]) {
		/* 
			LIMITATIONS: Can only add systems ONCE

			PURPOSE: 
			Runs the upadate function in each registered system
		*/
		if (TEMPORARY_ADD_SYSTEMS === 1) throw new Error("ERROR: can only add System(s) once");
		TEMPORARY_ADD_SYSTEMS = 1;

		for (const system of systems) {
			this.systems.add(system);
		}
	}

	// removeSystems() {}

	// VIEW
	view<T extends ComponentConstructor<Component>[]>(...componentConstructorArray: T): ApplyComponentConstructor<T> {
		/* !@#!@#!@#!@# I want the length of Component[] to be the same as input */
		/* 
			PARAM: one or more ComponentConstructors
			RETURNS: [entity, [component0,component1,component2]][] 

			EG:
			param: XComponent, YComponent
			return: [[Entity,[XComponent,YComponent]],]
		*/

		// THROW ERROR IF MULTIPLE OF THE SAME COMPONENTCONSTRUCTOR (as there is no situation where you'd want that, it'd be a typo)
		if (componentConstructorArray.length !== new Set(componentConstructorArray).size)
			throw new Error(
				`ERROR: You can not specify two of the same componentConstructors! Info: ${componentConstructorArray.map(
					(cc) => cc.name
				)}`
			);

		// CHECK not empty
		if (componentConstructorArray.length === 0)
			throw new Error("ERROR: view requires at least one ComponentConstructor. None have been provided");

		let str = "";
		for (const componentConstructor of componentConstructorArray) {
			str += componentConstructor.name + " ";
		}
		console.log("INPUTS componentConstructor(s): " + str);

		// Get the corresponding entitySet for each ComponentConstructor.
		const nonEmptyEntitySetArray: Set<Entity>[] = [];
		for (const componentConstructor of componentConstructorArray) {
			const entitySet = this.ccToEntities.get(componentConstructor);
			if (!entitySet || entitySet.size === 0) {
				// Check that there are currently entities with that component
				// Check that it's not empty
				// If this block of code runs, it means that there are no entities of one of the componentConstructors. So return empty array
				return [] as ApplyComponentConstructor<T>;
			}
			nonEmptyEntitySetArray.push(entitySet); //!@#!@#!@#!@# used !
		}

		// Check if nonEmptyEntitySetArray lenght is same as componentConstructorArray
		// If they're not of equal length, then
		// if (nonEmptyEntitySetArray.length !== componentConstructorArray.length) return [];

		// Find the entitySet with the least number of entities
		let smallestIndex = 0;
		const smallestEntitySet = nonEmptyEntitySetArray.reduce((accumulatedSet, currentSet, currentIndex) => {
			if (accumulatedSet.size > currentSet.size) {
				smallestIndex = currentIndex;
				return currentSet;
			} else {
				return accumulatedSet;
			}
		});

		// Filter entities in the smallest entityset out if they don't appear in ALL componentsConstructor's entitysets
		// Essentially only keep entity if they appear in all the componentConstructors' entitysets (entity has all those components)
		nonEmptyEntitySetArray.splice(smallestIndex, 1); // remove smallestIndex (setup)
		const entitiesWithAllComponents: Entity[] = [];
		for (const entity of smallestEntitySet) {
			nonEmptyEntitySetArray.every((set) => set.has(entity)) ? entitiesWithAllComponents.push(entity) : undefined;
		}

		// Get the relevant components from the filtered entities
		const entityComponentObjArray = [];
		for (const entity of entitiesWithAllComponents) {
			const componentObj = new Map(
				componentConstructorArray.map((cc) => [cc, this.entityToComponentObj.get(entity)!.get(cc)!])
			);
			entityComponentObjArray.push([entity, componentObj]);
		}

		//!@#!#!#!#!#!@#!@!@#!#!@#!@#!@!@#!@#!@#!@#!@#!@#!@#!@#!@#!@# NOT DONE YET

		// Format in tuple array
		// return nonEmptyEntitySetArray;

		return entityComponentObjArray as unknown as ApplyComponentConstructor<T>;
	}

	// UPDATE
	updateSystems() {
		for (let system of this.systems) {
			system.update();
		}
	}

	// Extra
	addComponent() {
		/* 
			PURPOSE: Adds components to an existing entity
		*/
	}

	// Extra
	removeComponent() {
		/* 
			PURPOSE: Removes components from an existing entity
		*/
	}
}

type SafeComponentMap<T extends readonly ComponentConstructor<Component>[]> = {
	get<CC extends T[number]>(componentConstructor: CC): InstanceType<CC>;
	set<CC extends T[number], CC2 extends InstanceType<CC>>(componentConstructor: CC, instance: CC2): SafeComponentMap<T>;
};

type ApplyComponentConstructor<Arr extends readonly ComponentConstructor<Component>[]> = Array<
	readonly [number, SafeComponentMap<Arr>]
>;

// ###########################
// 		HELP FUNCTIONS
// ###########################
// ###########################
// 		HELP FUNCTIONS
// ###########################

function setupCCToEntities(ccToEntities: CCToEntitiesType, entity: Entity, component: Component) {
	/* 
		Setup entity/component in CCToEntities
	*/

	// Check if component constructor already added
	const entitySet = ccToEntities.get(component.constructor as ComponentConstructor);
	if (entitySet) {
		// If component constructor already added yet added
		entitySet.add(entity);
	} else {
		// If component constructor not yet added, then create new entitySet to assign to component constructor
		const entitySet = new Set([entity]);

		ccToEntities.set(component.constructor as ComponentConstructor, entitySet);
	}
}

function setupEntityToComponentObj(entityToComponentObj: entityToComponentObjType, entity: Entity, component: Component) {
	/* 
		Setup entity/components in entityToComponentObj 
	*/

	const componentObjTemp = entityToComponentObj.get(entity);
	if (componentObjTemp) {
		// Entity already added

		// CHECK if type of component has already been assigned
		if (componentObjTemp.get(component.constructor as ComponentConstructor)) {
			throw new Error("ERROR: Component of this type already exists!");
		}

		componentObjTemp.set(component.constructor as ComponentConstructor, component);
	} else {
		// Entity not yet aded

		// Create component-object, then create entity-component-object
		const componentObj = new Map([[component.constructor as ComponentConstructor, component]]);
		entityToComponentObj.set(entity, componentObj);
	}
}

/* 
# Add entities
 - ccToEntities
 - entityToComponentObj

# Update systems
 - systems

# Update component on obj
 - 
 - 


*/
