ServerEvents.tags('item', event => {
	const archetypes = global.prototypeArchetypes
	Object.keys(archetypes).forEach(archetype => event.add(`kubejs:prototype_${archetype}`, archetypes[archetype].items))
	event.add('kubejs:prototypable', Object.keys(archetypes).map(archetype => `#kubejs:prototype_${archetype}`))
})
