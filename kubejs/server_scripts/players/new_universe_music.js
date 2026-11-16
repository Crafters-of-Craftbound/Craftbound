(() => {
	const $ChangedDimension = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent')
	const MUSIC = { 'minestuck:prospit': 'minestuck:music.prospit', 'minestuck:derse': 'minestuck:music.derse','minestuck:skaia': 'minestuck:music.skaia' }

	NativeEvents.onEvent($ChangedDimension, event => {
		const player = event.getEntity()
		const dimension = String(event.getTo().location())
		if (!MUSIC[dimension]) return
		player.server.scheduleInTicks(300, () => {
			if (player.isRemoved() || String(player.level.dimension) != dimension) return
			player.server.runCommandSilent(`stopsound ${player.username} music`)
			player.server.runCommandSilent(`stopsound ${player.username} record`)
			player.server.runCommandSilent(`execute as ${player.username} at @s run playsound ${MUSIC[dimension]} music @s ~ ~ ~ 1`)
		})
	})

	PlayerEvents.advancement(event => {
		if (String(event.advancement.id) != 'verseworks:enter_a_new_world') return
		event.player.server.scheduleInTicks(100, () => {
			if (event.player.isRemoved()) return
			event.player.server.runCommandSilent(`stopsound ${event.player.username}`)
			event.player.server.runCommandSilent(`execute as ${event.player.username} at @s run playsound irons_spellbooks:music.dead_king_lullaby music @s ~ ~ ~ 1`)
		})
	})
})()
