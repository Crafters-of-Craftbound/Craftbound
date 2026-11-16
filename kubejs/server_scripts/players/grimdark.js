(() => {
	function cure(player) {
		player.removeTag('Grimdark')
		player.removeEffect('minecraft:trial_omen')
	}

	ItemEvents.rightClicked('discerning_the_eldritch:black_book_spellbook', event => {
		if (event.hand != 'MAIN_HAND' || event.player.tags.contains('BeenGrimdark')) return
		event.server.runCommandSilent(`grimdark on ${event.player.username}`)
	})

	ItemEvents.foodEaten('create:builders_tea', event => {
		if (event.entity.tags.contains('Grimdark')) cure(event.entity)
	})

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		const Arguments = event.arguments
		event.register(Commands.literal('grimdark')
			.requires(source => source.hasPermission(2))
			.then(Commands.literal('on').then(Commands.argument('player', Arguments.PLAYER.create(event)).executes(ctx => {
				const player = Arguments.PLAYER.getResult(ctx, 'player')
				if (player.tags.contains('Grimdark')) {
					ctx.source.sendFailure(Text.of(`${player.username} is already Grimdark`))
					return 0
				}
				if (!player.tags.contains('BeenGrimdark')) player.server.runCommandSilent(`give ${player.username} irons_spellbooks:ancient_knowledge_fragment[custom_name='[{"text":"Grimdark Knowledge","italic":false}]']`)
				player.addTag('BeenGrimdark')
				player.addTag('Grimdark')
				player.potionEffects.add('minecraft:blindness', 300, 0, false, true)
				player.potionEffects.add('minecraft:darkness', 300, 0, false, true)
				player.potionEffects.add('minecraft:trial_omen', -1, 0, false, true)
				player.server.runCommandSilent(`stopsound ${player.username} music`)
				player.server.runCommandSilent(`stopsound ${player.username} record`)
				player.server.runCommandSilent(`execute as ${player.username} at @s run playsound irons_spellbooks:music.whispers_of_ice music @s ~ ~ ~ 1`)
				player.server.runCommandSilent(`execute at ${player.username} run summon irons_spellbooks:sculk_tentacle ~ ~ ~`)
				ctx.source.sendSuccess(Text.of(`${player.username} is now Grimdark`), true)
				return 1
			})))
			.then(Commands.literal('off').then(Commands.argument('player', Arguments.PLAYER.create(event)).executes(ctx => {
				const player = Arguments.PLAYER.getResult(ctx, 'player')
				if (!player.tags.contains('Grimdark')) {
					ctx.source.sendFailure(Text.of(`${player.username} isn't Grimdark`))
					return 0
				}
				cure(player)
				ctx.source.sendSuccess(Text.of(`${player.username} is no longer Grimdark`), true)
				return 1
			}))))
	})
})()
