(() => {
	const $Echeladder = Java.loadClass('com.mraof.minestuck.player.Echeladder')
	const $LivingDeathEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingDeathEvent')
	const $EventPriority = Java.loadClass('net.neoforged.bus.api.EventPriority')
	const $CosArmorAPI = Java.loadClass('lain.mods.cos.api.CosArmorAPI')
	const $MagicData = Java.loadClass('io.redspace.ironsspellbooks.api.magic.MagicData')
	const $SpellRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')

	function stopMusicFor(player, seconds) {
		if (seconds <= 0) return
		player.server.runCommandSilent(`stopsound ${player.username} music`)
		player.server.scheduleInTicks(20, () => stopMusicFor(player, seconds - 1))
	}

	const ASPECT_SPELLS = {
		space: [
			'additional_attributes:innate_spell/irons_spellbooks/telekinesis',
			'additional_attributes:innate_spell/irons_spellbooks/teleport',
			'additional_attributes:innate_spell/irons_spellbooks/portal',
			'additional_attributes:innate_spell/gtbcs_geomancy_plus/seismic_surf',
			'additional_attributes:innate_spell/hazennstuff/shooting_star',
			'additional_attributes:innate_spell/hazennstuff/cosmic_bolt'
		],
		time: [
			'additional_attributes:innate_spell/tunes_n_tomes/chord_blast',
			'additional_attributes:innate_spell/irons_spellbooks/ice_tomb',
			'additional_attributes:innate_spell/irons_spellbooks/haste',
			'additional_attributes:innate_spell/irons_spellbooks/echoing_strikes',
			'additional_attributes:innate_spell/tunes_n_tomes/swift_melody',
			'additional_attributes:innate_spell/tunes_n_tomes/dal_segno'
		],
		breath: [
			'additional_attributes:innate_spell/aero_additions/dash',
			'additional_attributes:innate_spell/aero_additions/wind_blade',
			'additional_attributes:innate_spell/aero_additions/wind_charge',
			'additional_attributes:innate_spell/irons_spellbooks/gust',
			'additional_attributes:innate_spell/aero_additions/wind_shield',
			'additional_attributes:innate_spell/aero_additions/updraft'
		],
		light: [
			'additional_attributes:innate_spell/irons_spellbooks/sunbeam',
			'additional_attributes:innate_spell/irons_spellbooks/planar_sight',
			'additional_attributes:innate_spell/irons_spellbooks/guiding_bolt',
			'additional_attributes:innate_spell/irons_spellbooks/lightning_bolt',
			'additional_attributes:innate_spell/irons_spellbooks/firecracker',
			'additional_attributes:innate_spell/hazennstuff/arcane_cards'
		],
		hope: [
			'additional_attributes:innate_spell/irons_spellbooks/wisp',
			'additional_attributes:innate_spell/irons_spellbooks/divine_smite',
			'additional_attributes:innate_spell/tunes_n_tomes/rhapsody',
			'additional_attributes:innate_spell/gtbcs_geomancy_plus/solar_beam',
			'additional_attributes:innate_spell/irons_spellbooks/fortify',
			'additional_attributes:innate_spell/tunes_n_tomes/hymn_of_hope'
		],
		life: [
			'additional_attributes:innate_spell/irons_spellbooks/blessing_of_life',
			'additional_attributes:innate_spell/irons_spellbooks/heal',
			'additional_attributes:innate_spell/irons_spellbooks/firefly_swarm',
			'additional_attributes:innate_spell/irons_spellbooks/root',
			'additional_attributes:innate_spell/hazennstuff/counterspell_spider_lily',
			'additional_attributes:innate_spell/hazennstuff/thorn_chakram',
			'additional_attributes:innate_spell/irons_spellbooks/healing_circle'
		],
		void: [
			'additional_attributes:innate_spell/irons_spellbooks/invisibility',
			'additional_attributes:innate_spell/irons_spellbooks/touch_dig',
			'additional_attributes:innate_spell/hazennstuff/nights_edge_strike',
			'additional_attributes:innate_spell/discerning_the_eldritch/otherworldly_presence',
			'additional_attributes:innate_spell/discerning_the_eldritch/silence',
			'additional_attributes:innate_spell/farmers_spell/goodberry'
		],
		heart: [
			'additional_attributes:innate_spell/irons_spellbooks/ray_of_siphoning',
			'additional_attributes:innate_spell/irons_spellbooks/heartstop',
			'additional_attributes:innate_spell/hazennstuff/soul_flaming_strike',
			'additional_attributes:innate_spell/irons_spellbooks/blight',
			'additional_attributes:innate_spell/discerning_the_eldritch/blades_of_rancor',
			'additional_attributes:innate_spell/discerning_the_eldritch/vein_ripper'
		],
		doom: [
			'additional_attributes:innate_spell/gtbcs_geomancy_plus/eroding_boulder',
			'additional_attributes:innate_spell/irons_spellbooks/wither_skull',
			'additional_attributes:innate_spell/irons_spellbooks/burning_dash',
			'additional_attributes:innate_spell/irons_spellbooks/magma_bomb',
			'additional_attributes:innate_spell/irons_spellbooks/wall_of_fire',
			'additional_attributes:innate_spell/gtbcs_geomancy_plus/pillar_of_the_resounding_earth'
		],
		blood: [
			'additional_attributes:innate_spell/irons_spellbooks/acupuncture',
			'additional_attributes:innate_spell/irons_spellbooks/cleanse',
			'additional_attributes:innate_spell/irons_spellbooks/summon_vex',
			'additional_attributes:innate_spell/irons_spellbooks/blood_slash',
			'additional_attributes:innate_spell/irons_spellbooks/raise_dead',
			'additional_attributes:innate_spell/irons_spellbooks/sacrifice'
		],
		mind: [
			'additional_attributes:innate_spell/irons_spellbooks/electrocute',
			'additional_attributes:innate_spell/irons_spellbooks/counterspell',
			'additional_attributes:innate_spell/irons_spellbooks/arcane_shackle',
			'additional_attributes:innate_spell/irons_spellbooks/chain_lightning',
			'additional_attributes:innate_spell/irons_spellbooks/shield',
			'additional_attributes:innate_spell/hazennstuff/energy_burst'
		],
		rage: [
			'additional_attributes:innate_spell/irons_spellbooks/stomp',
			'additional_attributes:innate_spell/irons_spellbooks/dragon_breath',
			'additional_attributes:innate_spell/irons_spellbooks/throw',
			'additional_attributes:innate_spell/discerning_the_eldritch/ravenous_revenant',
			'additional_attributes:innate_spell/farmers_spell/bad_apple',
			'additional_attributes:innate_spell/gtbcs_geomancy_plus/tremor_step'
		]
	}

	const ASPECT_COLORS = { breath: 'aqua', mind: 'dark_aqua', void: 'dark_blue', space: 'dark_gray', doom: 'dark_green', heart: 'light_purple', blood: 'dark_red', hope: 'yellow', light: 'gold', life: 'green', time: 'red', rage: 'dark_purple' }

	const CLASSES = ['bard', 'heir', 'knight', 'mage', 'maid', 'page', 'prince', 'rogue', 'seer', 'sylph', 'thief', 'witch']

	function aspectOf(player) {
		return Object.keys(ASPECT_SPELLS).find(name => player.tags.contains(name))
	}

	function playSound(player, sound) {
		player.server.runCommandSilent(`execute as ${player.username} at @s run playsound ${sound} master @s`)
	}

	function setBase(player, id, value) {
		const attribute = player.getAttribute(id)
		if (attribute) attribute.setBaseValue(value)
	}

	function raiseBase(player, id, amount) {
		const attribute = player.getAttribute(id)
		if (attribute) attribute.setBaseValue(Math.round((attribute.getBaseValue() + amount) * 1000000) / 1000000)
	}

	function capitalize(word) {
		return word.charAt(0).toUpperCase() + word.slice(1)
	}

	function wearPiece(player, slot, item) {
		const cosmetic = $CosArmorAPI.getCAStacks(player.uuid)
		const old = cosmetic.getItem(slot).copy()
		cosmetic.setItem(slot, item)
		if (!old.isEmpty()) player.give(old)
	}

	function learnAspectSpells(player) {
		const aspect = aspectOf(player)
		if (!aspect) return
		const data = $MagicData.getPlayerMagicData(player).getSyncedData()
		ASPECT_SPELLS[aspect].forEach(id => {
			const spell = $SpellRegistry.getSpell(id.replace('additional_attributes:innate_spell/', '').replace('/', ':'))
			if (spell && !data.isSpellLearned(spell)) data.learnSpell(spell, true)
		})
	}

	function wearOutfitPiece(player, piece) {
		const aspect = aspectOf(player)
		const godClass = CLASSES.find(name => player.tags.contains(name))
		if (!aspect || !godClass) return
		wearPiece(player, { hood: 3, shirt: 2, pants: 1, shoes: 0 }[piece], Item.of(`kubejs:${godClass}_${piece}[minecraft:trim={pattern:"kubejs:${aspect}",material:"kubejs:${aspect}",show_in_tooltip:false},minecraft:lore=['{"text":"${capitalize(godClass)} of ${capitalize(aspect)}","color":"${ASPECT_COLORS[aspect]}","italic":false}']]`))
	}

	function ascend(player, outfit) {
		const aspect = aspectOf(player)
		setBase(player, 'neoforge:creative_flight', 1)
		if (aspect) ASPECT_SPELLS[aspect].forEach(id => raiseBase(player, id, 5))
		learnAspectSpells(player)
		raiseBase(player, 'irons_spellbooks:cooldown_reduction', 0.1)
		raiseBase(player, 'minecraft:generic.attack_damage', 1)
		player.addTag('GodTier')
		player.removeTag('Dreamer')
		if (outfit !== false) ['hood', 'shirt', 'pants', 'shoes'].forEach(piece => wearOutfitPiece(player, piece))
		player.give('kubejs:divine_note')
		player.level.spawnLightning(player.x, player.y, player.z, true)
		playSound(player, 'advancementplaques:ui.toast.goal_complete')
		if (outfit !== false) player.setStatusMessage(Text.white('You have ascended to God Tier!'))
	}

	PlayerEvents.respawned(event => {
		const player = event.player
		if (!player.persistentData.getBoolean('LandRespawn')) return
		player.persistentData.remove('LandRespawn')
		player.server.scheduleInTicks(1, () => player.server.runCommandSilent(`execute in minestuck:land_${String(player.username).toLowerCase()} run spreadplayers 0 0 0 1 under 120 false ${player.username}`))
	})

	PlayerEvents.loggedIn(event => {
		const player = event.player
		if (player.tags.contains('GodTier')) learnAspectSpells(player)
		if (player.health <= 0) player.server.scheduleInTicks(20, () => player.setHealth(1))
	})

	EntityEvents.spawned('farmers_spell:bad_apple', event => event.entity.setCustomName(Text.of('Raging Distraction')))

	BlockEvents.rightClicked('irons_spellbooks:scroll_forge', event => {
		const player = event.player
		if ($Echeladder.get(player).getRung() >= 24) return
		if (event.hand == 'MAIN_HAND') player.setStatusMessage(Text.gray('You must reach ').append(Text.of('Scribing Spellcaster').bold()).append(Text.of(' to use this table')))
		event.cancel()
	})

	function isKillCommand(source) {
		return String(source.getType()) == 'genericKill'
	}

	function realDeath(player, source) {
		const killer = source.actual
		if (isKillCommand(source) || ['outOfWorld', 'lava', 'anvil', 'cramming', 'drown'].includes(String(source.getType()))) return true
		if (player.potionEffects.isActive('ms_extras:/ktrickster_mode')) return true
		if (!killer) return false
		if (killer.getSummoner && killer.getSummoner()) {
			if (killer.getSummoner().isPlayer() && killer.getSummoner().username == player.username) return false
			return true
		}
		if (killer.isPlayer()) return killer.username != player.username
		if (Object.keys(ASPECT_SPELLS).some(aspect => killer.tags.contains(`${aspect}_denizen`))) return true
		if (['bosses_of_mass_destruction:lich', 'irons_spellbooks:dead_king', 'irons_spellbooks:fire_boss', 'discerning_the_eldritch:ascended_one', 'irons_spellbooks:citadel_keeper', 'mowziesmobs:umvuthana', 'mowziesmobs:umvuthana_raptor', 'mowziesmobs:umvuthana_crane', 'mowziesmobs:umvuthana_follower_raptor', 'mowziesmobs:umvuthana_follower_player', 'mowziesmobs:umvuthana_crane_player', 'minecraft:phantom', 'minecraft:ender_dragon', 'minecraft:wither', 'minecraft:warden'].includes(String(killer.type))) return true
		return false
	}

	NativeEvents.onEvent($EventPriority.HIGH, $LivingDeathEvent, event => {
		const player = event.getEntity()
		if (!player.isPlayer() || !player.tags.contains('GodTier')) return
		if (realDeath(player, event.getSource())) {
			player.persistentData.putBoolean('LandRespawn', true)
			player.server.scheduleInTicks(1, () => {
				if (Math.random() < 0.5) player.server.tell(Text.yellow('The death was ruled Heroic'))
				else player.server.tell(Text.darkPurple('The death was ruled Just'))
			})
			return
		}
		event.setCanceled(true)
		player.setHealth(1)
		player.server.runCommandSilent(`execute at ${player.username} run playsound minecraft:entity.lightning_bolt.thunder master @a[distance=..20] ~ ~ ~`)
		player.server.runCommandSilent(`effect give ${player.username} minecraft:weakness 30 200 true`)
		player.server.runCommandSilent(`effect give ${player.username} discerning_the_eldritch:silence_potion_effect 30 0 true`)
		player.server.runCommandSilent(`effect give ${player.username} minecraft:glowing 10 0`)
		player.server.runCommandSilent(`effect give ${player.username} minecraft:regeneration 10 10 true`)
	})

	EntityEvents.death('minecraft:player', event => {
		const player = event.entity
		const aspect = aspectOf(player)
		if (player.tags.contains('GodTier') || isKillCommand(event.source) || !aspect) return
		if (aspect == 'space' && player.block.down.id != 'kubejs:space5') return
		if (aspect != 'space' && player.block.down.id != `kubejs:${aspect}3`) return
		if ($Echeladder.get(player).getRung() < 29) {
			player.setHealth(1)
			player.setStatusMessage(Text.gray('You must reach ').append(Text.of('Divine Delegate').bold()).append(Text.of(' to ascend')))
			event.cancel()
		}
		player.setHealth(1)
		player.server.runCommandSilent(`execute at ${player.username} run playsound minecraft:item.totem.use player @a ~ ~ ~`)
		player.server.runCommandSilent(`execute at ${player.username} run particle explosiveenhancement:sparks ~ ~1 ~`)
		player.server.runCommandSilent(`stopsound ${player.username} music`)
		player.server.runCommandSilent(`stopsound ${player.username} record`)
		player.server.runCommandSilent(`execute as ${player.username} at @s run playsound minestuck:music.rise_up record @s ~ ~ ~ 1`)
		stopMusicFor(player, 47)
		player.potionEffects.add('minecraft:levitation', 664, 0, false, false)
		player.potionEffects.add('minecraft:blindness', 644, 0, false, false)
		player.potionEffects.add('minecraft:regeneration', 100, 255, false, false)
		player.server.runCommandSilent(`team add ${aspect}_ascension`)
		player.server.runCommandSilent(`team modify ${aspect}_ascension color ${ASPECT_COLORS[aspect]}`)
		player.server.runCommandSilent(`team join ${aspect}_ascension ${player.username}`)
		player.potionEffects.add('minecraft:glowing', 600, 0, false, false)
		const cameraSwitches = [76, 152, 228, 304, 380, 456, 532]
		const outfitPieces = { 304: 'shoes', 380: 'pants', 456: 'shirt' }
		player.sendData('god_tier_camera', { on: true, front: false })
		cameraSwitches.forEach((ticks, i) => player.server.scheduleInTicks(ticks, () => {
			if (player.isRemoved()) return
			player.sendData('god_tier_camera', { on: true, front: i % 2 == 0 })
			if (outfitPieces[ticks]) wearOutfitPiece(player, outfitPieces[ticks])
		}))
		player.server.scheduleInTicks(532, () => {
			if (player.isRemoved()) return
			wearOutfitPiece(player, 'hood')
			ascend(player, false)
		})
		player.server.scheduleInTicks(608, () => {
			if (!player.isRemoved()) player.sendData('god_tier_camera', { on: false, hideGui: true })
		})
		player.server.scheduleInTicks(664, () => {
			if (player.isRemoved()) return
			player.sendData('god_tier_camera', { on: false })
			player.setStatusMessage(Text.white('You have ascended to God Tier!'))
		})
		player.server.scheduleInTicks(600, () => player.server.runCommandSilent(`team leave ${player.username}`))
		event.cancel()
	})

	ItemEvents.rightClicked('kubejs:divine_note', event => {
		const player = event.player
		if (event.hand != 'MAIN_HAND' || !player.tags.contains('GodTier')) return
		event.item.shrink(1)
		player.swing()
		player.addItemCooldown('kubejs:divine_note', 20)
		const aspect = aspectOf(player)
		if (aspect) ASPECT_SPELLS[aspect].forEach(id => raiseBase(player, id, 1))
		raiseBase(player, 'irons_spellbooks:max_mana', 50)
		raiseBase(player, 'irons_spellbooks:mana_regen', 0.1)
		raiseBase(player, 'irons_spellbooks:cast_time_reduction', 0.1)
		raiseBase(player, 'irons_spellbooks:cooldown_reduction', 0.1)
		raiseBase(player, 'minecraft:generic.max_health', 2)
		raiseBase(player, 'minecraft:generic.attack_damage', 1)
		playSound(player, 'minestuck:event.echeladder.increase')
		player.tell(Text.blue('You ascended a God Tier!'))
	})

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		const Arguments = event.arguments
		event.register(Commands.literal('godtier')
			.requires(source => source.hasPermission(2))
			.then(Commands.literal('add').then(Commands.argument('player', Arguments.PLAYER.create(event)).executes(ctx => {
				const player = Arguments.PLAYER.getResult(ctx, 'player')
				if (player.tags.contains('GodTier')) {
					ctx.source.sendFailure(Text.of(`${player.username} is already God Tier`))
					return 0
				}
				ascend(player)
				if (aspectOf(player)) ctx.source.sendSuccess(Text.of('Added God Tier'), true)
				return 1
			})))
			.then(Commands.literal('remove').then(Commands.argument('player', Arguments.PLAYER.create(event)).executes(ctx => {
				const player = Arguments.PLAYER.getResult(ctx, 'player')
				if (!player.tags.contains('GodTier')) {
					ctx.source.sendFailure(Text.of(`${player.username} isn't God Tier`))
					return 0
				}
				setBase(player, 'neoforge:creative_flight', 0)
				Object.keys(ASPECT_SPELLS).forEach(aspect => {
					ASPECT_SPELLS[aspect].forEach(id => setBase(player, id, 0))
				})
				setBase(player, 'irons_spellbooks:max_mana', 100)
				setBase(player, 'irons_spellbooks:mana_regen', 1)
				setBase(player, 'irons_spellbooks:cast_time_reduction', 1)
				setBase(player, 'irons_spellbooks:cooldown_reduction', 1)
				setBase(player, 'minecraft:generic.max_health', 20)
				setBase(player, 'minecraft:generic.attack_damage', 1)
				player.removeTag('GodTier')
				ctx.source.sendSuccess(Text.of('Removed God Tier'), true)
				return 1
			}))))
	})
})()
