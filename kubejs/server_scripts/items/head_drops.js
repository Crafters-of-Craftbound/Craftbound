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
		'minecraft:wither': 'plushie_buddies:plushie_wither'
	}

	EntityEvents.drops(event => {
		const entity = event.entity
		const killer = event.source.immediate
		if (entity.tags.contains('SpriteGuardian') || !(killer && killer.isPlayer() && killer.mainHandItem.id == 'kubejs:head_cleaver')) return
		if (DROPS[String(entity.type)]) event.addDrop(DROPS[String(entity.type)])
		const head = $HeadTypes.getMatchingHead(entity)
		if (!head || entity.isBaby()) return
		event.addDrop(head.getHeadItem())
	})
})()
