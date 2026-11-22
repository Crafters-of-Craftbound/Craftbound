(() => {
	PlayerEvents.loggedOut(event => {
		const player = event.player
		const dimension = String(player.level.dimension)
		const saved = player.persistentData.getCompound('UniverseLogout')
		if (!dimension.startsWith('verseworks:')) {
			player.persistentData.remove('UniverseLogout')
			return
		}
		saved.putString('dimension', dimension)
		saved.putDouble('x', player.x)
		saved.putDouble('y', player.y)
		saved.putDouble('z', player.z)
		saved.putFloat('yaw', player.yaw)
		saved.putFloat('pitch', player.pitch)
		player.persistentData.put('UniverseLogout', saved)
	})

	PlayerEvents.loggedIn(event => {
		const server = event.server
		const name = String(event.player.username)
		const saved = event.player.persistentData.getCompound('UniverseLogout')
		const dimension = String(saved.getString('dimension'))
		let checks = 0
		if (dimension == '') return
		event.player.persistentData.remove('UniverseLogout')
		if (String(event.player.level.dimension) != 'minecraft:overworld') return
		server.scheduleRepeatingInTicks(20, check => {
			const player = server.playerList.getPlayerByName(name)
			checks++
			if (!player || checks > 150) {
				check.clear()
				return
			}
			if (checks == 1) server.runCommandSilent(`verseworks enter ${dimension} ${name}`)
			if (String(player.level.dimension) != dimension) return
			check.clear()
			player.teleportTo(dimension, saved.getDouble('x'), saved.getDouble('y'), saved.getDouble('z'), saved.getFloat('yaw'), saved.getFloat('pitch'))
		})
	})
})()
