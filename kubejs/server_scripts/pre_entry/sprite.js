(() => {
	const $IdentifierHandler = Java.loadClass('com.mraof.minestuck.player.IdentifierHandler')
	const $ColorHandler = Java.loadClass('com.mraof.minestuck.util.ColorHandler')
	const $LivingChangeTargetEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingChangeTargetEvent')

	function readableName(component, key) {
		let name = String(component.getString())
		if (name == key) {
			name = ''
			String(key).split('.').pop().split('_').forEach(word => {
				if (name != '') name += ' '
				name += word.charAt(0).toUpperCase() + word.slice(1)
			})
		}
		return name.replace(/§./g, '').replace(' Plushie', '').replace(' Plush', '').replace(' Hat', '').replace("'s Head", '').replace(' Wall Head', '').replace(' Head', '').replace(' Wall Skull', '').replace(' Skull', '').replace(' Doll', '').replace('Bucket of ', '').replace(' Bucket', '')
	}

	function near(entity, range) {
		return entity.level.getEntitiesWithin(AABB.of(entity.x - range, entity.y - range, entity.z - range, entity.x + range, entity.y + range, entity.z + range))
	}

	function atSprite(server, sprite, commands) {
		sprite.addTag('Prototyping')
		commands.forEach(command => server.runCommandSilent(`execute in ${sprite.level.dimension} as @n[tag=Prototyping] at @s run ${command}`))
		sprite.removeTag('Prototyping')
	}

	function glow(sprite, player) {
		const aspectColors = { breath: 'aqua', mind: 'dark_aqua', void: 'dark_blue', space: 'dark_gray', doom: 'dark_green', heart: 'light_purple', blood: 'dark_red', hope: 'yellow', light: 'gold', life: 'green', time: 'red', rage: 'dark_purple' }
		const aspect = player ? Object.keys(aspectColors).find(name => player.tags.contains(name)) : null
		const color = aspect ? aspectColors[aspect] : 'gray'
		sprite.setGlowing(true)
		atSprite(sprite.server, sprite, [`team add ${color}`, `team modify ${color} color ${color}`, `team join ${color} @s`])
	}

	function flash(server, sprite) {
		atSprite(server, sprite, ['particle cataclysm:lightning_explode', 'playsound cataclysm:super_lightning_strike master @a[distance=..20] ~ ~ ~'])
	}

	function newSprite(level, owner, x, y, z, items, name) {
		const sprite = level.createEntity('kubejs:sprite')
		sprite.setPos(x, y, z)
		sprite.setOwner(owner)
		sprite.setColor($ColorHandler.getColorForPlayer(owner, level))
		sprite.mergeNbt(`{ArmorDropChances:[0f,0f,0f,0f],HandDropChances:[0f,0f],${items}}`)
		sprite.setCustomName(String(name).replace(/§./g, ''))
		sprite.setBoundOrigin(sprite.blockPosition())
		sprite.getDialogueComponent().setDialogue('kubejs:sprite/start', true)
		sprite.spawn()
		glow(sprite, owner.getPlayer(level.server))
		return sprite
	}

	function prototype(kernel, drop, stack) {
		let head = stack.copyWithCount(1)
		const mobToDisplay = {
			'minecraft:cod_bucket': 'heads:cod_head',
			'minecraft:salmon_bucket': 'heads:salmon_head',
			'minecraft:pufferfish_bucket': 'plushie_buddies:plushie_pufferfish',
			'minecraft:tadpole_bucket': 'plushie_buddies:plushie_frog',
			'minecraft:tropical_fish_bucket': 'kubejs:tropical_fish_head',
			'minecraft:sulfur_cube_bucket': 'kubejs:sulfur_cube_head',
			'quark:crab_bucket': 'kubejs:crab_head',
			'crittersandcompanions:koi_fish_bucket': 'kubejs:koi_fish_head',
			'crittersandcompanions:sea_bunny_bucket': 'kubejs:sea_bunny_head',
			'crittersandcompanions:dumbo_octopus_bucket': 'kubejs:dumbo_octopus_head',
			'biomeswevegone:man_o_war_bucket': 'kubejs:man_o_war_head'
		}[String(stack.id)]
		const pData = drop.level.server.persistentData
		const underlingPrototypes = pData.getCompound('underlingPrototypes')
		stack.getTagKeys().forEach(tagKey => {
			if (tagKey.location().namespace == 'kubejs' && global.prototypeArchetypes[String(tagKey.location().path).replace('prototype_', '')]) underlingPrototypes.putBoolean(String(tagKey.location()), true)
		})
		pData.put('underlingPrototypes', underlingPrototypes)
		if (mobToDisplay && Item.exists(mobToDisplay)) head = Item.of(mobToDisplay)
		if (stack.id == 'minecraft:axolotl_bucket') head = Item.of(`heads:axolotl_${['lucy', 'wild', 'gold', 'cyan', 'blue'][head.save(drop.level.registryAccess()).getCompound('components').getCompound('minecraft:bucket_entity_data').getInt('Variant')]}_head`)
		let owner = kernel.getOwner()
		let spot = drop.level.getNearestPlayer(drop, -1)
		if (!owner && spot) owner = $IdentifierHandler.encode(spot)
		if (!owner) return
		if (owner.getPlayer(drop.server) && String(owner.getPlayer(drop.server).level.dimension) == String(drop.level.dimension)) spot = owner.getPlayer(drop.server)
		if (!spot) spot = kernel
		const sprite = newSprite(kernel.level, owner, spot.x, spot.y, spot.z, `ArmorItems:[{},{},{},${head.save(drop.level.registryAccess())}]`, `${readableName(head.getHoverName(), head.getDescriptionId())}sprite`)
		sprite.setWanderRadius(kernel.getWanderRadius() == 20)
		sprite.setColor(kernel.getColor())
		kernel.discard()
		if (stack.count > 1) drop.setItem(stack.copyWithCount(stack.count - 1))
		else drop.discard()
		flash(sprite.server, sprite)
		if (owner.getPlayer(sprite.server)) owner.getPlayer(sprite.server).give('kubejs:sprite_medallion')
	}

	EntityEvents.spawned('minecraft:item', event => {
		const drop = event.entity
		let checks = 0
		if (!drop.item || !drop.item.hasTag('kubejs:prototypable') || !near(drop, 16).find(entity => entity.type == 'minestuck:kernelsprite')) return
		drop.server.scheduleRepeatingInTicks(2, check => {
			checks++
			if (drop.isRemoved() || checks > 100) {
				check.clear()
				return
			}
			const kernel = near(drop, 2).find(entity => entity.type == 'minestuck:kernelsprite' && entity.boundingBox.inflate(0.25).intersects(drop.boundingBox))
			if (!kernel) return
			check.clear()
			prototype(kernel, drop, drop.item)
		})
	})

	function holdPrototype(sprite, item) {
		let oldName = ''
		if (sprite.getCustomName()) oldName = String(sprite.getCustomName().getString()).replace(/§./g, '')
		sprite.setMainHandItem(item.copyWithCount(1))
		sprite.setCustomName(`${readableName(item.getHoverName(), item.getDescriptionId())}${oldName}`)
		flash(sprite.server, sprite)
	}

	function canTakeCorpse(entity) {
		return entity.type == 'minestuck:kernelsprite' || (entity.type == 'kubejs:sprite' && entity.mainHandItem.empty)
	}

	EntityEvents.spawned('corpse:corpse', event => {
		const corpse = event.entity
		let checks = 0
		if (!corpse.isEmpty() || !near(corpse, 16).find(entity => canTakeCorpse(entity))) return
		corpse.server.scheduleRepeatingInTicks(2, check => {
			checks++
			if (corpse.isRemoved() || checks > 300) {
				check.clear()
				return
			}
			const sprite = near(corpse, 2).find(entity => canTakeCorpse(entity) && entity.boundingBox.inflate(0.25).intersects(corpse.boundingBox))
			if (!sprite) return
			check.clear()
			const head = Item.of(`minecraft:player_head[profile={name:"${corpse.getCorpseName()}"}]`)
			if (sprite.type == 'minestuck:kernelsprite') prototype(sprite, corpse, head)
			else holdPrototype(sprite, head)
			corpse.discard()
		})
	})

	ItemEvents.entityInteracted(event => {
		const player = event.player
		const sprite = event.target
		const item = player.mainHandItem
		if (event.hand != 'MAIN_HAND' || sprite.type != 'kubejs:sprite' || item.empty || !sprite.mainHandItem.empty) return
		if (String(item.id).startsWith('kubejs:') || item.id == 'minestuck:captcha_card' || item.hasTag('minestuck:cruxite_artifacts')) return
		if (['minestuck:blank_disk', 'minestuck:client_disk', 'minestuck:server_disk', 'minestuck:sburb_code', 'minestuck:completed_sburb_code', 'minestuck:computer_parts', 'minestuck:computer', 'minestuck:old_computer', 'minestuck:laptop', 'minestuck:crockertop', 'minestuck:hubtop', 'minestuck:lunchtop', 'minestuck_extended:skaia_pc'].includes(String(item.id))) return
		if (['whimsy_deco:vintage_globe', 'whimsy_deco:antique_vintage_globe', 'whimsy_deco:singing_frog', 'whimsy_deco:fan', 'minecraft:name_tag', 'minecraft:saddle'].includes(String(item.id))) return
		holdPrototype(sprite, item)
		item.shrink(1)
		player.swing()
		event.cancel()
	})

	ItemEvents.entityInteracted(event => {
		const sprite = event.target
		if (!['kubejs:sprite', 'minestuck:kernelsprite'].includes(String(sprite.type)) || event.player.isShiftKeyDown()) return
		if (!sprite.getDialogueComponent().hasAnyOngoingDialogue()) sprite.getDialogueComponent().tryStartDialogue(event.player)
		event.cancel()
	})

	EntityEvents.spawned('kubejs:sprite', event => {
		event.entity.setStayPutGoal(false)
		event.entity.setRandomMoveGoal(true)
	})
	EntityEvents.spawned('minestuck:kernelsprite', event => {
		event.entity.setStayPutGoal(false)
		event.entity.setRandomMoveGoal(true)
	})

	function blockArtifact(event, item) {
		if (!['minestuck:cruxite_apple', 'minestuck:cruxite_potion', 'minestuck:cruxite_disc', 'minestuck:cruxite_disk', 'minestuck:cruxite_shears'].includes(String(item.id))) return
		if (!near(event.player, 100).find(entity => entity.type == 'minestuck:kernelsprite')) return
		event.player.setStatusMessage(Text.green('Prototype your Kernelsprite!'))
		event.cancel()
	}

	ItemEvents.rightClicked(event => blockArtifact(event, event.item))
	BlockEvents.rightClicked(event => blockArtifact(event, event.item))
	ItemEvents.entityInteracted(event => blockArtifact(event, event.item))
	BlockEvents.broken(event => blockArtifact(event, event.player.mainHandItem))

	function giveArtifactBonus(player, tag, item) {
		if (player.tags.contains(tag)) return
		player.addTag(tag)
		player.give(Item.of(item))
	}

	PlayerEvents.inventoryChanged('minestuck:cruxite_disc', event => giveArtifactBonus(event.player, 'CruxiteJukebox', `minecraft:jukebox[custom_name='{"text":"Cruxite Jukebox","color":"aqua","italic":false}']`))
	PlayerEvents.inventoryChanged('minestuck:cruxite_shears', event => giveArtifactBonus(event.player, 'CruxiteLeaves', `biomeswevegone:blue_enchanted_leaves[custom_name='{"text":"Cruxite Leaves","color":"aqua","italic":false}']`))

	function setSpawnHere(server, name) {
		server.runCommandSilent(`execute as ${name} at @s run spawnpoint @s ~ ~ ~`)
	}

	PlayerEvents.advancement('minestuck:minestuck/entry', event => {
		const player = event.player
		const name = String(player.username)
		player.server.scheduleInTicks(100, () => {
			setSpawnHere(player.server, name)
			near(player, 64).forEach(sprite => {
				if (sprite.type == 'kubejs:sprite' && sprite.getOwner() && sprite.getOwner().appliesTo(player)) glow(sprite, player)
			})
		})
		player.server.scheduleInTicks(1, () => setSpawnHere(player.server, name))
	})

	EntityEvents.beforeHurt(event => {
		const attacker = event.source.actual
		if (!attacker || attacker.type != 'minecraft:guardian' || !['irons_spellbooks:fire_boss', 'discerning_the_eldritch:ascended_one'].includes(String(event.entity.type))) return
		event.cancel()
	})

	NativeEvents.onEvent($LivingChangeTargetEvent, event => {
		const target = event.getNewAboutToBeSetTarget()
		if (target && target.isPlayer() && event.getEntity().tags.contains('SpriteGuardian')) event.setCanceled(true)
	})

	ItemEvents.rightClicked('kubejs:sprite_medallion', event => {
		if (event.hand != 'MAIN_HAND') return
		event.player.swing()
		event.player.server.runCommandSilent(`execute as ${event.player.username} at @s run playsound minestuck:block.transportalizer.teleport player @s`)
		event.player.server.runCommandSilent(`execute as ${event.player.username} run sprite`)
	})

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		event.register(Commands.literal('sprite').requires(source => source.hasPermission(0)).executes(ctx => {
			const player = ctx.source.getPlayerOrException()
			player.server.runCommandSilent(`execute as ${player.username} at @s as @n[type=kubejs:sprite] run tp @s ~ ~ ~`)
			player.server.runCommandSilent(`execute as ${player.username} at @s as @n[type=kubejs:sprite] run data merge entity @s {BoundX:${player.blockX},BoundY:${player.blockY},BoundZ:${player.blockZ}}`)
			return 1
		}))
	})
})()
