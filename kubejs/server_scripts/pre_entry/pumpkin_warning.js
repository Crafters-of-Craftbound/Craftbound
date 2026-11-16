(() => {
	BlockEvents.placed(event => {
		const player = event.player
		if (!player || !['minecraft:carved_pumpkin', 'minecraft:jack_o_lantern'].includes(String(event.block.id)) || player.isAdvancementDone('minestuck:minestuck/entry')) return
		player.setStatusMessage(Text.gold('Carved Pumpkins and Jack o\'Lanterns in your Entry area can stop Entry from working'))
	})
})()
