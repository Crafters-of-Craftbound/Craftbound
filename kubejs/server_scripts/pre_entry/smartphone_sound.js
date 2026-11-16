(() => {
	ItemEvents.rightClicked('ftbquests:book', event => {
		const player = event.player
		let sound = 'phone_beep'
		if (event.hand != 'MAIN_HAND') return
		if (!player.tags.contains('Startup')) {
			sound = 'phone_startup'
			player.addTag('Startup')
		}
		event.server.runCommandSilent(`execute as ${player.username} at @s run playsound minecraft:custom.${sound} master @s`)
	})
})()
