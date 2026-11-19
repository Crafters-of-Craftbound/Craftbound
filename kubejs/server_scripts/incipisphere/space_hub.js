const spaceHubTick = (() => {
	const $SkaianetData = Java.loadClass('com.mraof.minestuck.skaianet.SkaianetData')
	const $LandTypePair = Java.loadClass('com.mraof.minestuck.world.lands.LandTypePair')
	const $LandTypes = Java.loadClass('com.mraof.minestuck.world.lands.LandTypes')

	const LAND_BLOCKS = {
		forest: 'minecraft:oak_leaves',
		taiga: 'minecraft:podzol',
		flora: 'minecraft:dark_oak_log',
		rock: 'minecraft:stone',
		sand: 'minecraft:sand',
		lush_deserts: 'biomeswevegone:palo_verde_log',
		sandstone: 'minecraft:sandstone',
		red_sandstone: 'minecraft:red_sandstone',
		frost: 'minecraft:snow_block',
		fungi: 'minecraft:mycelium',
		shade: 'minestuck:shade_stone',
		heat: 'minestuck:igneous_stone',
		wood: 'minestuck:treated_planks',
		rainbow: 'minestuck:rainbow_wood',
		end: 'minecraft:end_stone',
		reefs: 'minecraft:bubble_coral_block',
		slime: 'kubejs:thick_slime_block',
		hymns: 'abyssal_decor:paper_stack',
		slumber: 'cluttered:dark_starry_wallpaper',
		crystals: 'minecraft:amethyst_block',
		toys: 'iden_decor:puzzle_wool',
		pumpkins: 'minecraft:pumpkin',
		depths: 'create:asurine',
		dark: 'minecraft:sculk',
		bugs: 'minecraft:honeycomb_block',
		haunts: 'minecraft:soul_sand',
		circuitry: 'minecraft:green_concrete',
		reactants: 'kubejs:krypton_moss',
		red_sand: 'minecraft:red_sand',
		clouds: 'kubejs:cloud'
	}
	const LAND_ANGLES = [0, 180, 90, 270, 30, 210, 120, 300, 60, 240, 150, 330, 15, 195, 105, 285, 45, 225, 135, 315, 75, 255, 165, 345]
	const travelling = {}
	const lastPositions = {}
	let bodyPaths = []
	let lastStepTime = 0

	function bodyFor(server, target) {
		if (target == 'minestuck:skaia') return { target: target, item: 'kubejs:planet_skaia', scale: 3, radius: 0, angle: 0, y: 81.5, hit: 1.5, spin: false }
		if (target == 'minestuck:prospit') return { target: target, item: 'kubejs:planet_prospit', scale: 1, radius: 5, angle: 0, y: 81.5, hit: 0.5, spin: 6 }
		if (target == 'minestuck:derse') return { target: target, item: 'kubejs:planet_derse', scale: 1, radius: 26.63, angle: 4.11, y: 81.5, hit: 0.5, spin: 6 }
		if (target == 'minestuck:veil') return { target: target, item: 'minecraft:iron_block', scale: 2, radius: 26.63, angle: 0.97, y: 81.5, hit: 1, spin: false }
		if (target == 'ring') return { target: target, item: 'kubejs:veil_meteors', scale: 16.34, radius: 0, angle: 0, y: 81.5, hit: 0, spin: false }
		const slot = server.persistentData.getCompound('SpaceHubSlots').getInt(target)
		const terrain = String($LandTypes.TERRAIN_REGISTRY.getKey($LandTypePair.getTypes(server.getLevel(target)).get().getTerrain()).getPath())
		return { target: target, item: LAND_BLOCKS[terrain] || 'minecraft:stone', scale: 2, radius: 17, angle: LAND_ANGLES[slot % 24] * Math.PI / 180, y: 81.5 + 2 * Math.floor(slot / 24), hit: 1, spin: 12 }
	}

	function bodyPosition(radius, angle, y, hub) {
		return { x: 0.5 - radius * Math.sin(angle + hub), y: y, z: 0.5 - radius * Math.cos(angle + hub) }
	}

	function spinTransformation(turn, scale) {
		return { left_rotation: [0, Math.sin(turn / 2), 0, Math.cos(turn / 2)], right_rotation: [0, 0, 0, 1], translation: [0, 0, 0], scale: [scale, scale, scale] }
	}

	function pickSlot(slots) {
		const taken = {}
		slots.getAllKeys().forEach(land => {
			taken[slots.getInt(land)] = true
		})
		let slot = 0
		while (taken[slot]) slot++
		return slot
	}

	function summonBody(server, target) {
		const summoned = server.persistentData.getCompound('SpaceBodies')
		if (summoned.contains(target)) return
		const body = bodyFor(server, target)
		const step = server.persistentData.getInt('SpaceHubStep')
		const hub = step * Math.PI / 120
		const pos = bodyPosition(body.radius, body.angle, body.y, hub)
		let turn = 0
		if (body.spin) turn = (Math.floor(step / body.spin) + 1) * Math.PI / 2
		if (target == 'ring') turn = hub
		const display = server.getLevel('kubejs:space').createEntity('minecraft:item_display')
		display.setPos(pos.x, pos.y, pos.z)
		display.mergeNbt({ item: { id: body.item, count: 1 }, teleport_duration: 50, brightness: { sky: 15, block: 15 }, Tags: ['SpaceHubBody'], transformation: spinTransformation(turn, body.scale) })
		display.persistentData.putString('Target', target)
		display.spawn()
		summoned.putBoolean(target, true)
		server.persistentData.put('SpaceBodies', summoned)
	}

	function stepSpaceHub(server, loop) {
		if (server.persistentData.getString('SpaceHubLoop') != loop) return
		let watched = false
		server.players.forEach(player => {
			if (player.tags.contains('SpaceHub')) watched = true
		})
		if (!watched) return
		const step = (server.persistentData.getInt('SpaceHubStep') + 1) % 240
		const hub = step * Math.PI / 120
		const level = server.getLevel('kubejs:space')
		server.persistentData.putInt('SpaceHubStep', step)
		bodyPaths = []
		level.getEntitiesWithin(AABB.of(-40, 60, -40, 41, 140, 41)).forEach(entity => {
			if (!entity.tags.contains('SpaceHubBody')) return
			const body = bodyFor(server, String(entity.persistentData.getString('Target')))
			const to = bodyPosition(body.radius, body.angle, body.y, hub)
			if (body.target == 'ring') entity.mergeNbt({ start_interpolation: 0, interpolation_duration: 50, transformation: spinTransformation(hub, body.scale) })
			if (body.spin && step % body.spin == 0) entity.mergeNbt({ item: { id: body.item, count: 1 }, start_interpolation: 0, interpolation_duration: body.spin * 50, transformation: spinTransformation((step / body.spin + 1) * Math.PI / 2, body.scale) })
			if (body.hit > 0) bodyPaths.push({ target: body.target, hit: body.hit, from: { x: entity.x, y: entity.y, z: entity.z }, to: to })
			entity.teleportTo(to.x, to.y, to.z)
		})
		lastStepTime = level.time
		server.scheduleInTicks(50, () => stepSpaceHub(server, loop))
	}

	function startSpaceHub(server) {
		const loop = String(Math.random())
		server.persistentData.putString('SpaceHubLoop', loop)
		stepSpaceHub(server, loop)
	}

	function arrivalSpot(server, dimension) {
		if (dimension == 'minestuck:skaia') return { x: 0.5, y: 79, z: 3.5, yaw: 0 }
		const body = bodyFor(server, dimension)
		const hub = server.persistentData.getInt('SpaceHubStep') * Math.PI / 120
		const spot = bodyPosition({ 'minestuck:prospit': 8, 'minestuck:derse': 19.5, 'minestuck:veil': 19.5 }[dimension] || 14, body.angle, 79, hub)
		spot.yaw = (dimension == 'minestuck:prospit' ? 180 : 0) - (body.angle + hub) * 180 / Math.PI
		return spot
	}

	function enterSpaceHub(player) {
		const server = player.server
		const dimension = String(player.level.dimension)
		const returns = player.persistentData.getCompound('SpaceHubReturns')
		const saved = returns.getCompound(dimension)
		saved.putDouble('x', player.x)
		saved.putDouble('z', player.z)
		saved.putDouble('yaw', player.yaw)
		returns.put(dimension, saved)
		player.persistentData.put('SpaceHubReturns', returns)
		const slots = server.persistentData.getCompound('SpaceHubSlots')
		$SkaianetData.get(server).allPlayerData().forEach(data => {
			const land = data.getLandDimensionIfEntered()
			if (land && !slots.contains(String(land.location()))) slots.putInt(String(land.location()), pickSlot(slots))
		})
		server.persistentData.put('SpaceHubSlots', slots)
		const spot = arrivalSpot(server, dimension)
		travelling[player.username] = true
		server.scheduleInTicks(1, () => {
			delete travelling[player.username]
			player.teleportTo('kubejs:space', spot.x, spot.y, spot.z, spot.yaw, 0)
			player.addTag('SpaceHub')
			player.potionEffects.add('minecraft:resistance', -1, 254, false, false)
		})
		server.scheduleInTicks(40, () => {
			if (!player.tags.contains('SpaceHub')) return
			['minestuck:skaia', 'minestuck:prospit', 'minestuck:derse', 'minestuck:veil', 'ring'].forEach(target => summonBody(server, target))
			slots.getAllKeys().forEach(land => summonBody(server, String(land)))
		})
	}

	function leaveSpaceHub(player, target) {
		const saved = player.persistentData.getCompound('SpaceHubReturns').getCompound(target)
		const spot = saved.contains('x') ? [saved.getDouble('x'), saved.getDouble('z')] : ({ 'minestuck:prospit': [0, -100], 'minestuck:derse': [0, 100], 'minestuck:veil': [170, -60], 'minestuck:skaia': [0, 0] }[target] || [100, 100])
		player.removeTag('SpaceHub')
		player.removeEffect('minecraft:resistance')
		delete lastPositions[player.username]
		player.server.scheduleInTicks(1, () => player.teleportTo(target, spot[0], 290, spot[1], saved.getDouble('yaw'), 90))
	}

	function touchedBody(player) {
		const last = lastPositions[player.username]
		lastPositions[player.username] = { x: player.x, y: player.y, z: player.z }
		if (!last || (player.x - last.x) * (player.x - last.x) + (player.y - last.y) * (player.y - last.y) + (player.z - last.z) * (player.z - last.z) < 0.0001) return null
		const progress = Math.min(1, (player.level.time - lastStepTime) / 50)
		let target = null
		bodyPaths.forEach(path => {
			const x = path.from.x + (path.to.x - path.from.x) * progress
			const y = path.from.y + (path.to.y - path.from.y) * progress
			const z = path.from.z + (path.to.z - path.from.z) * progress
			const dx = Math.max(Math.min(last.x, player.x) - 0.3, Math.min(Math.max(last.x, player.x) + 0.3, x)) - x
			const dy = Math.max(Math.min(last.y, player.y), Math.min(Math.max(last.y, player.y) + 1.8, y)) - y
			const dz = Math.max(Math.min(last.z, player.z) - 0.3, Math.min(Math.max(last.z, player.z) + 0.3, z)) - z
			if (dx * dx + dy * dy + dz * dz < (path.hit + 0.25) * (path.hit + 0.25)) target = path.target
		})
		return target
	}

	return player => {
		if (!player.tags.contains('SpaceHub')) {
			if (player.y > 300 && !travelling[player.username] && (['minestuck:skaia', 'minestuck:prospit', 'minestuck:derse', 'minestuck:veil'].includes(String(player.level.dimension)) || $LandTypePair.getTypes(player.level).isPresent())) enterSpaceHub(player)
			return
		}
		if (String(player.level.dimension) != 'kubejs:space') {
			player.removeTag('SpaceHub')
			player.removeEffect('minecraft:resistance')
			delete lastPositions[player.username]
			return
		}
		if (!player.abilities.flying) {
			player.abilities.flying = true
			player.onUpdateAbilities()
		}
		if (player.y < 79 || player.y > 83) player.teleportTo(player.x, 81, player.z)
		const distance = Math.hypot(player.x - 0.5, player.z - 0.5)
		if (distance > 35) player.teleportTo(0.5 + (player.x - 0.5) * 33 / distance, player.y, 0.5 + (player.z - 0.5) * 33 / distance)
		if (player.level.time - lastStepTime > 100) startSpaceHub(player.server)
		const target = touchedBody(player)
		if (target) leaveSpaceHub(player, target)
	}
})()
