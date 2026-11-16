(() => {
	const $ChangedDimension = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent')
	const $SburbPlayerData = Java.loadClass('com.mraof.minestuck.skaianet.SburbPlayerData')

	function sendToLand(player, setSpawn) {
		if (String(player.level.dimension) != 'minecraft:overworld') return false
		const land = $SburbPlayerData.get(player).getLandDimension()
		if (!land) return false
		player.server.runCommandSilent(`execute in ${land.location()} run spreadplayers 0 0 0 1 under 120 false ${player.username}`)
		if (setSpawn) player.server.scheduleInTicks(5, () => player.server.runCommandSilent(`execute as ${player.username} at @s run spawnpoint @s ~ ~ ~`))
		return true
	}

	NativeEvents.onEvent($ChangedDimension, event => {
		const player = event.getEntity()
		if (String(event.getTo().location()) != 'minecraft:overworld' || !player.isAdvancementDone('minestuck:minestuck/entry')) return
		player.server.scheduleInTicks(1, () => sendToLand(player, false))
	})

	PlayerEvents.respawned(event => {
		const player = event.player
		if (!player.isAdvancementDone('minestuck:minestuck/entry')) return
		player.server.scheduleInTicks(1, () => sendToLand(player, true))
	})

	PlayerEvents.respawned(event => {
		const player = event.player
		player.server.scheduleInTicks(2, () => {
			if (Math.abs(player.x) > 16 || Math.abs(player.z) > 16 || player.y > 5) return
			player.server.runCommandSilent(`execute as ${player.username} at @s run tp @s @n[type=!player,type=!bee,type=!item_display,type=!guardian]`)
		})
	})

	ItemEvents.rightClicked(event => {
		const player = event.player
		if (event.hand != 'MAIN_HAND' || !event.item.hasTag('minestuck:cruxite_artifacts')) return
		player.server.scheduleInTicks(600, () => {
			if (!sendToLand(player, true) || String(player.level.dimension) == 'minecraft:overworld') return
			player.server.runCommandSilent(`advancement grant ${player.username} only minestuck:minestuck/entry`)
		})
	})
})()
