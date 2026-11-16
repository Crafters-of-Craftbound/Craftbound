(() => {
	BlockEvents.rightClicked('minestuck:shade_pressure_plate', event => {
		if (event.hand != 'MAIN_HAND' || String(event.level.dimension) == 'minestuck:veil') return
		event.player.swing()
		event.player.setStatusMessage(Text.gray('The button seems to be broken'))
	})
})()
