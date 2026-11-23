(() => {
	const $PlayerChangedDimensionEvent = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent')
	const pin = player => {
		const level = player.level
		const dimension = String(level.dimension)
		if (!dimension.startsWith('verseworks:')) return
		if (!level.getForcedChunks().isEmpty()) return
		player.server.runCommandSilent(`execute in ${dimension} run forceload add ${Math.floor(player.x)} ${Math.floor(player.z)}`)
	}

	NativeEvents.onEvent($PlayerChangedDimensionEvent, event => pin(event.getEntity()))
	PlayerEvents.loggedIn(event => pin(event.player))
})()