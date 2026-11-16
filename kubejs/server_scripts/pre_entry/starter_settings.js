(() => {
	const $MsExtrasModVariables = Java.loadClass('net.persuasiveviksy.msextras.network.MsExtrasModVariables')

	PlayerEvents.loggedIn(event => {
		const player = event.player
		if (player.persistentData.getBoolean('GambitHidden')) return
		player.persistentData.putBoolean('GambitHidden', true)
		const variables = player.getData($MsExtrasModVariables.PLAYER_VARIABLES)
		variables.PrankstersGambitDisplay = false
		variables.markSyncDirty()
	})

	PlayerEvents.loggedIn(event => {
		const server = event.server
		if (server.persistentData.getBoolean('StarterItemsCleared')) return
		server.persistentData.putBoolean('StarterItemsCleared', true)
		server.runCommandSilent('gamerule keepInventory true')
		server.scheduleInTicks(20, () => server.runCommandSilent('kill @e[type=minecraft:item]'))
	})
})()
