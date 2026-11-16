(() => {
	ItemEvents.rightClicked('mca:rose_gold_dust', event => {
		const player = event.player
		if (event.hand != 'MAIN_HAND' || !player.isShiftKeyDown()) return
		player.runCommandSilent('mca editor')
		player.swing()
		event.cancel()
	})
})()
