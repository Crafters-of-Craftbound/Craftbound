(() => {
	const $HeadTypes = Java.loadClass('com.mrbysco.heads.registry.HeadTypes')
	const DROPS = {
		'minecraft:zombie': 'minecraft:zombie_head',
		'minecraft:skeleton': 'minecraft:skeleton_skull',
		'minecraft:creeper': 'minecraft:creeper_head',
		'minecraft:wither_skeleton': 'minecraft:wither_skeleton_skull',
		'minecraft:ender_dragon': 'minecraft:dragon_head',
		'minecraft:allay': 'plushie_buddies:plushie_allay',
		'minecraft:armadillo': 'plushie_buddies:plushie_armadillo',
		'minecraft:breeze': 'plushie_buddies:plushie_breeze',
		'minecraft:camel': 'plushie_buddies:plushie_camel',
		'minecraft:elder_guardian': 'plushie_buddies:plushie_elder_guardian',
		'minecraft:frog': 'plushie_buddies:plushie_frog',
		'minecraft:guardian': 'plushie_buddies:plushie_guardian',
		'minecraft:llama': 'plushie_buddies:plushie_llama',
		'minecraft:trader_llama': 'plushie_buddies:plushie_llama',
		'minecraft:panda': 'plushie_buddies:plushie_panda',
		'minecraft:parrot': 'plushie_buddies:plushie_parrot',
		'minecraft:phantom': 'plushie_buddies:plushie_phantom',
		'minecraft:polar_bear': 'plushie_buddies:plushie_polar_bear',
		'minecraft:pufferfish': 'plushie_buddies:plushie_pufferfish',
		'minecraft:rabbit': 'plushie_buddies:plushie_rabbit',
		'minecraft:shulker': 'plushie_buddies:plushie_shulker',
		'minecraft:sniffer': 'plushie_buddies:plushie_sniffer',
		'minecraft:strider': 'plushie_buddies:plushie_strider',
		'minecraft:vex': 'plushie_buddies:plushie_vex',
		'minecraft:warden': 'plushie_buddies:plushie_warden',
		'minecraft:wither': 'plushie_buddies:plushie_wither',
		'minecraft:sulfur_cube': 'kubejs:sulfur_cube_head',
		'minecraft:tropical_fish': 'kubejs:tropical_fish_head',
		'quark:crab': 'kubejs:crab_head',
		'quark:foxhound': 'kubejs:foxhound_head',
		'quark:shiba': 'kubejs:shiba_head',
		'crittersandcompanions:dumbo_octopus': 'kubejs:dumbo_octopus_head',
		'crittersandcompanions:ferret': 'kubejs:ferret_head',,
		'crittersandcompanions:koi_fish': 'kubejs:koi_fish_head',
		'crittersandcompanions:otter': 'kubejs:otter_head',
		'crittersandcompanions:red_panda': 'kubejs:red_panda_head',
		'crittersandcompanions:sea_bunny': 'kubejs:sea_bunny_head',
		'crittersandcompanions:shima_enaga': 'kubejs:shima_enaga_head'
	}

	EntityEvents.drops(event => {
		const entity = event.entity
		const killer = event.source.immediate
		const headDroppingKill = (killer && killer.isPlayer() && killer.mainHandItem.id == 'kubejs:head_cleaver') || ['anvil', 'explosion', 'explosion.player', 'badRespawnPoint', 'fireworks', 'fireball', 'unattributedFireball'].includes(String(event.source.getType())) || (killer && ['irons_spellbooks:fireball', 'irons_spellbooks:small_fireball'].includes(String(killer.type)))
		if (entity.tags.contains('SpriteGuardian') || !headDroppingKill || (killer && killer.type == 'minecraft:creeper' && killer.isPowered())) return
		if (DROPS[String(entity.type)] && Item.exists(DROPS[String(entity.type)])) event.addDrop(DROPS[String(entity.type)])
		const head = $HeadTypes.getMatchingHead(entity)
		if (!head || entity.isBaby()) return
		event.addDrop(head.getHeadItem())
	})
})()
