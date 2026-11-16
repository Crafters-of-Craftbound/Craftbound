(() => {
	const INTRO = [
		'The land is empty.',
		'Wind skims the voids keeping biomes apart,',
		'as if grazing the hollow of a cut reed,',
		'or say, a punched tree.',
		'A familiar note is produced.',
		"It's the one Desolation plays to keep its instrument in tune.",
		'The game presently eluding you lies buried in code,',
		'in a Frog Temple, not far from here.',
		'"Heard melodies are sweet,',
		'but those unheard are sweeter" - Oscar Wilde',
		'Yes, you are certain Oscar Wilde said that.',
		'One hundred percent positive.',
		"You have a feeling it's going to be a long day."
	]

	function stopMusicFor(player, seconds) {
		if (seconds <= 0) return
		player.server.runCommandSilent(`stopsound ${player.username} music`)
		player.server.scheduleInTicks(20, () => stopMusicFor(player, seconds - 1))
	}

	function speak(player, line) {
		if (line >= INTRO.length) {
			player.server.runCommandSilent(`title ${player.username} title {"text":"CRAFTBOUND","bold":true}`)
			player.server.runCommandSilent(`execute as ${player.username} at @s run playsound chimes:block.iron.chiming ambient @s`)
			return
		}
		player.setStatusMessage(Text.white(INTRO[line]))
		if (line == 4) player.server.runCommandSilent(`execute as ${player.username} at @s run playsound chimes:block.iron.chiming ambient @s`)
		player.server.scheduleInTicks(40, () => player.setStatusMessage(Text.white(INTRO[line])))
		if (line == 6) player.server.scheduleInTicks(100, () => speak(player, line + 1))
		else player.server.scheduleInTicks(80, () => speak(player, line + 1))
	}

	BlockEvents.broken(event => {
		const player = event.player
		if (!player || player.isFake() || player.tags.contains('Intro') || !event.block.hasTag('minecraft:logs') || event.block.id == 'minecraft:acacia_wood') return
		player.addTag('Intro')
		player.server.runCommandSilent(`execute as ${player.username} at @s run playsound chimes:ambient.outdoor.wind record @s`)
		player.server.runCommandSilent(`execute as ${player.username} at @s run playsound chimes:block.iron.chiming ambient @s`)
		stopMusicFor(player, 53)
		speak(player, 0)
	})

	function show(player, text, ticks) {
		for (let t = 0; t < ticks - 20; t += 40) player.server.scheduleInTicks(t, () => player.setStatusMessage(text))
	}

	BlockEvents.broken(event => {
		const player = event.player
		if (!player || player.isFake() || player.tags.contains('Crawl') || !event.block.hasTag('c:stones')) return
		player.addTag('Crawl')
		show(player, Text.gray('> Hold ').append(Text.green('Z')).append(Text.of(' to crawl')), 200)
	})

	BlockEvents.broken(event => {
		const player = event.player
		if (!player || player.isFake() || player.tags.contains('Sit') || !event.block.hasTag('minecraft:dirt')) return
		player.addTag('Sit')
		show(player, Text.gray('> Press ').append(Text.green('Shift + Z')).append(Text.of(' to sit.')), 100)
		player.server.scheduleInTicks(100, () => show(player, Text.gray('This is a toggle'), 100))
	})

	BlockEvents.broken(event => {
		const player = event.player
		if (!player || player.isFake() || player.tags.contains('Gambit') || !event.block.hasTag('c:ores')) return
		player.addTag('Gambit')
		show(player, Text.gray("> To hide/show Prankster's Gambit press ").append(Text.green('.')), 100)
	})

	PlayerEvents.advancement(event => {
		const player = event.player
		if (String(event.advancement.id) != 'minecraft:adventure/kill_a_mob') return
		show(player, Text.gray('> Press ').append(Text.green('Shift + R')).append(Text.of(' to roll')), 100)
		player.server.scheduleInTicks(100, () => show(player, Text.gray('This gives 0.4 seconds of ').append(Text.green('invulnerability')), 100))
		player.server.scheduleInTicks(200, () => show(player, Text.gray('You can roll ').append(Text.green('midair')), 100))
	})
})()
