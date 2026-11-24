(() => {
	function addPrototypes(event) {
		const underling = event.entity
		const pData = event.level.server.persistentData
		if (underling.tags.contains('Prototyped') || !pData.underlingPrototypes) return
		underling.addTag('Prototyped')
		const carrier = Item.of('kubejs:underling_prototypes')
		carrier.setCustomData({ underlingPrototypes: pData.underlingPrototypes })
		underling.setItemSlot('body', carrier)
		underling.setDropChance('body', 0)
	}

	EntityEvents.spawned('minestuck:imp', event => addPrototypes(event))
})()
