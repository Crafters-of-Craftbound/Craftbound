(() => {
	const $IdentifierHandler = Java.loadClass('com.mraof.minestuck.player.IdentifierHandler')
	const $ColorHandler = Java.loadClass('com.mraof.minestuck.util.ColorHandler')
	const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
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
		return name.replace(/§./g, '').replace(' Plushie', '').replace(' Plush', '').replace("'s Head", '').replace(' Wall Head', '').replace(' Head', '').replace(' Wall Skull', '').replace(' Skull', '').replace(' Doll', '')
	}

	function near(entity, range) {
		return entity.level.getEntitiesWithin(AABB.of(entity.x - range, entity.y - range, entity.z - range, entity.x + range, entity.y + range, entity.z + range))
	}

	function ownSprite(player) {
		return near(player, 200).find(entity => entity.type == 'kubejs:sprite' && String(entity.persistentData.getString('SpriteOwner')) == String(player.username))
	}

	function atSprite(server, sprite, commands) {
		sprite.addTag('Prototyping')
		commands.forEach(command => server.runCommandSilent(`execute in ${sprite.level.dimension} as @n[tag=Prototyping] at @s run ${command}`))
		sprite.removeTag('Prototyping')
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
		sprite.persistentData.putString('SpriteOwner', owner.getUsername())
		sprite.getDialogueComponent().setDialogue('kubejs:sprite/start', true)
		sprite.spawn()
		return sprite
	}

	function prototypable(stack) {
		const id = String(stack.id)
		if (!(stack.item instanceof $BlockItem)) return false
		if (stack.hasTag('minecraft:signs') || stack.hasTag('minecraft:hanging_signs')) return false
		if (/(^|[_/])(armchair|chair|stool|sofa|seat|ottoman|bench|bed|crib|table|endtable|nightstand|desk|workbench|counter|cabinet|cabinetry|drawer|dresser|wardrobe|bookcase|bookshelf|book_stand|shelf|shelves|rack|crate|sink|basin|bath|shower)(_|$)/.test(id.split(':').pop()) && !/_(lamp|candle|plant|window|mirror|decor)(_|$)/.test(id.split(':').pop())) return false
		return ['iden_decor', 'cluttered', 'refurbished_furniture', 'whimsy_deco', 'everycomp'].includes(id.split(':')[0]) || /plush|(^|_)(head|skull)(_|$)/.test(id.split(':').pop()) || /plush|\b(head|skull)\b/i.test(String(Text.translatable(stack.getDescriptionId()).getString()))
	}

	function prototype(kernel, drop) {
		const stack = drop.item
		let owner = kernel.getOwner()
		let spot = drop.level.getNearestPlayer(drop, -1)
		if (!owner && spot) owner = $IdentifierHandler.encode(spot)
		if (!owner) return
		if (owner.getPlayer(drop.server) && String(owner.getPlayer(drop.server).level.dimension) == String(drop.level.dimension)) spot = owner.getPlayer(drop.server)
		if (!spot) spot = kernel
		const sprite = newSprite(kernel.level, owner, spot.x, spot.y, spot.z, `ArmorItems:[{},{},{},${stack.copyWithCount(1).save(drop.level.registryAccess())}]`, `${readableName(stack.getHoverName(), stack.getDescriptionId())}sprite`)
		sprite.setWanderRadius(kernel.getWanderRadius() == 20)
		sprite.setColor(kernel.getColor())
		kernel.discard()
		if (stack.count > 1) drop.setItem(stack.copyWithCount(stack.count - 1))
		else drop.discard()
		flash(sprite.server, sprite)
	}

	EntityEvents.spawned('minecraft:item', event => {
		const drop = event.entity
		let checks = 0
		if (!drop.item || !prototypable(drop.item) || !near(drop, 16).find(entity => entity.type == 'minestuck:kernelsprite')) return
		drop.server.scheduleRepeatingInTicks(2, check => {
			checks++
			if (drop.isRemoved() || checks > 100) {
				check.clear()
				return
			}
			const kernel = near(drop, 2).find(entity => entity.type == 'minestuck:kernelsprite' && entity.boundingBox.inflate(0.25).intersects(drop.boundingBox))
			if (!kernel) return
			check.clear()
			prototype(kernel, drop)
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
		let oldName = ''
		if (sprite.getCustomName()) oldName = String(sprite.getCustomName().getString()).replace(/§./g, '')
		sprite.setMainHandItem(item.copyWithCount(1))
		sprite.setCustomName(`${readableName(item.getHoverName(), item.getDescriptionId())}${oldName}`)
		flash(player.server, sprite)
		item.shrink(1)
		player.swing()
		event.cancel()
	})

	function setSpawnHere(server, name) {
		server.runCommandSilent(`execute as ${name} at @s run spawnpoint @s ~ ~ ~`)
	}

	PlayerEvents.advancement('minestuck:minestuck/entry', event => {
		const player = event.player
		const name = String(player.username)
		player.server.scheduleInTicks(100, () => setSpawnHere(player.server, name))
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

	function oldSprite(player) {
		const list = near(player, 200)
		const head = list.find(entity => entity.tags.contains('SpriteBlock'))
		if (!head) return null
		const bee = list.find(entity => entity.tags.contains('BlockSprite'))
		const second = list.find(entity => entity.type == 'minecraft:item_display' && entity.tags.contains('SpritePart') && !entity.tags.contains('SpriteBase') && !entity.tags.contains('SpriteBlock'))
		let items = `ArmorItems:[{},{},{},${head.nbt.getCompound('item')}]`
		if (second) items += `,HandItems:[${second.nbt.getCompound('item')},{}]`
		let name = 'Kernelsprite'
		if (bee && bee.getCustomName()) name = bee.getCustomName().getString()
		const sprite = newSprite(player.level, $IdentifierHandler.encode(player), player.x, player.y, player.z, items, name)
		list.forEach(entity => {
			if (entity.tags.contains('SpritePart')) entity.discard()
		})
		return sprite
	}

	function callSprite(player) {
		if (!player) return 0
		let sprite = ownSprite(player)
		if (!sprite) sprite = oldSprite(player)
		if (!sprite) return 1
		sprite.teleportTo(player.x, player.y, player.z)
		sprite.setBoundOrigin(player.blockPosition())
		return 1
	}

	ItemEvents.rightClicked('kubejs:sprite_medallion', event => {
		if (event.hand != 'MAIN_HAND') return
		event.player.swing()
		event.player.server.runCommandSilent(`execute as ${event.player.username} at @s run playsound minestuck:block.transportalizer.teleport player @s`)
		callSprite(event.player)
	})

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		event.register(Commands.literal('sprite').requires(source => source.hasPermission(0)).executes(ctx => callSprite(ctx.source.player)))
	})
})()
