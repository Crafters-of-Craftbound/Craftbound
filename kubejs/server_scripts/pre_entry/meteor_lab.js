(() => {
	const STEPS = ['title', 'sway', 'terrain', 'canon', 'rtp', 'voice', 'confirm']
	const STEP_CHOICES = { title: ['class', 'aspect'], sway: ['sway'], terrain: ['terrain'], canon: ['canon'], rtp: ['rtp'], voice: ['voice'] }
	const KUBEJS_TERRAINS = ['reefs', 'slime', 'hymns', 'slumber', 'crystals', 'toys', 'pumpkins', 'depths', 'haunts', 'clouds', 'bugs', 'circuits', 'reactants']
	const OPTIONS = {
		class: ['bard', 'heir', 'knight', 'mage', 'maid', 'page', 'prince', 'rogue', 'seer', 'sylph', 'thief', 'witch', 'lord', 'muse'],
		aspect: ['blood', 'breath', 'doom', 'heart', 'hope', 'life', 'light', 'mind', 'rage', 'space', 'time', 'void'],
		sway: ['prospit', 'derse'],
		terrain: ['forest', 'taiga', 'frost', 'fungi', 'heat', 'rock', 'petrification', 'sand', 'red_sand', 'lush_deserts', 'sandstone', 'red_sandstone', 'shade', 'wood', 'rainbow', 'flora', 'end'].concat(KUBEJS_TERRAINS),
		canon: ['yes', 'no'],
		rtp: ['yes', 'no'],
		voice: ['on', 'off']
	}

	function label(value) {
		if (value == 'pumpkins') return 'Harvest'
		return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
	}

	function show(player, choice, value) {
		player.server.runCommandSilent(`execute as ${player.username} run fmvariable set meteor_${choice} false ${value}`)
		player.server.runCommandSilent(`execute as ${player.username} run fmvariable set meteor_${choice}_name false ${label(value)}`)
	}

	function showAll(player) {
		const choices = player.persistentData.getCompound('MeteorLabChoices')
		Object.keys(OPTIONS).forEach(choice => show(player, choice, String(choices.getString(choice)) || 'none'))
	}

	function openStep(player) {
		player.server.runCommandSilent(`openguiscreen meteor_${player.persistentData.getCompound('MeteorLabChoices').getString('step')} ${player.username}`)
	}

	PlayerEvents.loggedIn(event => {
		const player = event.player
		const start = player.persistentData.getCompound('InitialMeteorPosition')
		const choices = player.persistentData.getCompound('MeteorLabChoices')
		if (player.tags.contains('InMeteorLab')) showAll(player)
		if (player.tags.contains('Settled') || player.tags.contains('MeteorLab') || player.tags.contains('InMeteorLab')) return
		start.putString('dimension', String(player.level.dimension))
		start.putDouble('x', player.x)
		start.putDouble('y', player.y)
		start.putDouble('z', player.z)
		start.putDouble('yaw', player.yaw)
		start.putDouble('pitch', player.pitch)
		player.persistentData.put('InitialMeteorPosition', start)
		choices.putString('step', 'title')
		choices.putString('voice', 'on')
		player.persistentData.put('MeteorLabChoices', choices)
		player.addTag('InMeteorLab')
		player.server.scheduleInTicks(1, () => {
			player.teleportTo('minestuck:veil', 99.5, 191, -16.5, 90, 0)
			player.server.runCommandSilent(`attribute ${player.username} minecraft:generic.scale base set 0.5`)
			player.server.runCommandSilent(`effect give ${player.username} minecraft:resistance infinite 255 true`)
			showAll(player)
			player.server.runCommandSilent(`execute in minestuck:veil positioned 88 192 -17 unless entity @e[tag=meteor_plate_text,distance=..3] run summon text_display ~0.5 ~1.25 ~0.5 {Tags:["meteor_plate_text"],billboard:"center",text:'{"text":"Choose Your Destiny"}'}`)
			player.server.runCommandSilent(`execute in minestuck:veil positioned 88 192 -17 unless entity @e[tag=meteor_plate_glow,distance=..3] run summon block_display ~ ~ ~ {Tags:["meteor_plate_glow"],Glowing:1b,glow_color_override:16777215,block_state:{Name:"minestuck:shade_pressure_plate"},transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[-0.001f,0f,-0.001f],scale:[1.002f,1.002f,1.002f]}}`)
			player.server.scheduleInTicks(200, () => player.tell(Text.gray('To enable terrain choosing, an operator can run ').append(Text.green('/meteorlab chooseterrain true'))))
		})
	})

	BlockEvents.rightClicked('minestuck:shade_pressure_plate', event => {
		const player = event.player
		if (event.hand != 'MAIN_HAND' || !player.tags.contains('InMeteorLab') || player.isAdvancementDone('minestuck:minestuck/entry')) return
		showAll(player)
		openStep(player)
		player.swing()
		event.cancel()
	})

	function land(player, choices) {
		const name = player.username
		const start = player.persistentData.getCompound('InitialMeteorPosition')
		const terrain = String(choices.getString('terrain'))
		player.server.runCommandSilent(`sburbpredefine title ${name} ${choices.getString('class')} ${choices.getString('aspect')}`)
		if (terrain != '') player.server.runCommandSilent(`sburbpredefine terrain_land ${name} ${KUBEJS_TERRAINS.includes(terrain) ? 'kubejs' : 'minestuck'}:${terrain}`)
		if (choices.getString('aspect') == 'space') player.server.runCommandSilent(`sburbpredefine title_land ${name} minestuck:${player.server.persistentData.getBoolean('FrogsClaimed') ? 'buckets' : 'frogs'}`)
		if (choices.getString('aspect') == 'space') player.server.persistentData.putBoolean('FrogsClaimed', true)
		player.addTag('Dreamer')
		player.addTag(choices.getString('sway') == 'prospit' ? 'Prospit' : 'Derse')
		if (choices.getString('canon') == 'yes') player.addTag('CanonLives')
		if (choices.getString('voice') == 'on') player.addTag('VoiceActing')
		player.addTag('MeteorLab')
		player.removeTag('InMeteorLab')
		player.server.runCommandSilent('execute unless entity @a[tag=InMeteorLab] run kill @e[tag=meteor_plate_text]')
		player.server.runCommandSilent('execute unless entity @a[tag=InMeteorLab] run kill @e[tag=meteor_plate_glow]')
		player.persistentData.remove('MeteorLabChoices')
		player.persistentData.remove('InitialMeteorPosition')
		player.server.runCommandSilent(`closeguiscreen ${name}`)
		player.server.runCommandSilent(`effect clear ${name} minecraft:resistance`)
		player.server.runCommandSilent(`attribute ${name} minecraft:generic.scale base set 1`)
		player.teleportTo(String(start.getString('dimension')), start.getDouble('x'), start.getDouble('y'), start.getDouble('z'), start.getDouble('yaw'), start.getDouble('pitch'))
		player.server.runCommandSilent(`item replace entity ${name} hotbar.7 with farmersdelight:cabbage_rolls 10`)
		player.server.runCommandSilent(`item replace entity ${name} hotbar.8 with ftbquests:book`)
		if (choices.getString('rtp') == 'yes') player.server.runCommandSilent(`execute as ${name} run rtp`)
		player.server.runCommandSilent(`effect give ${name} cataclysm:stun 3 0 true`)
		player.server.runCommandSilent(`effect give ${name} minecraft:blindness 3 0 true`)
		player.server.scheduleInTicks(60, () => {
			player.server.runCommandSilent(`effect clear ${name} cataclysm:stun`)
			player.server.runCommandSilent(`effect clear ${name} minecraft:blindness`)
			player.server.runCommandSilent(`execute at ${name} run playsound minecraft:entity.generic.explode player @a ~ ~ ~`)
			player.server.runCommandSilent(`execute at ${name} run particle minecraft:large_smoke ~ ~1 ~ 2 1 2 0.05 400 force`)
			player.server.runCommandSilent(`execute at ${name} run particle minecraft:campfire_cosy_smoke ~ ~0.5 ~ 2 0.5 2 0.02 150 force`)
		})
	}

	function choose(player, words) {
		if (!player || !player.tags.contains('InMeteorLab')) return 0
		const choices = player.persistentData.getCompound('MeteorLabChoices')
		const step = STEPS.indexOf(String(choices.getString('step')))
		const noTerrainChoice = !player.server.persistentData.getBoolean('TerrainChoice')
		if (OPTIONS[words[0]] && OPTIONS[words[0]].includes(words[1])) {
			choices.putString(words[0], words[1])
			show(player, words[0], words[1])
		} else if (words[0] == 'next' && step < STEPS.length - 1 && STEP_CHOICES[STEPS[step]].every(choice => choices.getString(choice) != '')) {
			if (STEPS[step + 1] == 'terrain' && noTerrainChoice) {
				choices.remove('terrain')
				show(player, 'terrain', 'random')
			}
			choices.putString('step', STEPS[step + (STEPS[step + 1] == 'terrain' && noTerrainChoice ? 2 : 1)])
		} else if (words[0] == 'back' && step > 0) {
			choices.putString('step', STEPS[step - (STEPS[step - 1] == 'terrain' && noTerrainChoice ? 2 : 1)])
		} else if (words[0] == 'random' && STEP_CHOICES[STEPS[step]]) {
			STEP_CHOICES[STEPS[step]].forEach(choice => {
				const value = OPTIONS[choice][Math.floor(Math.random() * OPTIONS[choice].length)]
				choices.putString(choice, value)
				show(player, choice, value)
			})
		} else if (words[0] == 'confirm' && STEPS[step] == 'confirm') {
			land(player, choices)
			return 1
		} else {
			return 0
		}
		player.persistentData.put('MeteorLabChoices', choices)
		if (!OPTIONS[words[0]] && words[0] != 'random') openStep(player)
		return 1
	}

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		const Arguments = event.arguments
		event.register(Commands.literal('meteorlab')
			.then(Commands.literal('chooseterrain').requires(source => source.hasPermission(2))
				.then(Commands.argument('value', Arguments.BOOLEAN.create(event)).executes(ctx => {
					const terrainChoice = String(Arguments.BOOLEAN.getResult(ctx, 'value')) == 'true'
					ctx.source.server.persistentData.putBoolean('TerrainChoice', terrainChoice)
					ctx.source.server.runCommandSilent(`title @a actionbar {"text":"Terrain choosing ${terrainChoice ? 'enabled' : 'disabled'}","color":"gray"}`)
					return 1
				})))
			.then(Commands.argument('choice', Arguments.GREEDY_STRING.create(event)).executes(ctx => choose(ctx.source.player, String(Arguments.GREEDY_STRING.getResult(ctx, 'choice')).split(' ')))))
	})
})()
