(() => {
	BlockEvents.broken(event => {
		const player = event.player
		if (!player || !event.block.hasTag('minecraft:beds') || !player.isAdvancementDone('minestuck:minestuck/entry')) return
		player.setStatusMessage(Text.red('WARNING').append(Text.white(': Set your spawnpoint')))
	})
})()
