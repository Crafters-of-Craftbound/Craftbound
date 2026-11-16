(() => {
	BlockEvents.rightClicked('kubejs:space1', event => {
		const player = event.player
		const dimension = String(event.level.dimension)
		if (event.hand != 'MAIN_HAND' || !['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'].includes(dimension)) return
		player.tell(Text.gray('Confirm RTP?\n').append(Text.green('Yes').underlined().clickRunCommand('/rtp')))
		player.swing()
		event.cancel()
	})
})()
