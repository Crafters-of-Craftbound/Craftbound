(() => {
	const $GristTypes = Java.loadClass('com.mraof.minestuck.api.alchemy.GristTypes')
	const GRIST = {
		'irons_spellbooks:apothecarist': { build: 200, iodine: 100, chalk: 50 },
		'irons_spellbooks:archevoker': { build: 200, amethyst: 100, tar: 50 },
		'irons_spellbooks:cryomancer': { build: 200, cobalt: 100, quartz: 50 },
		'irons_spellbooks:pyromancer': { build: 200, sulfur: 100, tar: 50 },
		'irons_spellbooks:magehunter_vindicator': { build: 200, marble: 100, rust: 50 },
		'irons_spellbooks:priest': { build: 200, amber: 100, gold: 50 },
		'irons_spellbooks:cursed_armor_stand': { build: 100, quartz: 50, rust: 25 },
		'irons_spellbooks:citadel_keeper': { build: 400, quartz: 200, rust: 100 },
		'irons_spellbooks:dead_king': { build: 5000, diamond: 2500, chalk: 1250 },
		'irons_spellbooks:fire_boss': { build: 12000, ruby: 8000, sulfur: 4000 },
		'discerning_the_eldritch:apothic_acolyte': { build: 200, amethyst: 100, mercury: 50 },
		'discerning_the_eldritch:apothic_summoner': { build: 200, amethyst: 100, mercury: 50 },
		'discerning_the_eldritch:blood_cultist_mage': { build: 200, garnet: 100, iodine: 50 },
		'discerning_the_eldritch:blood_cultist_witch': { build: 200, garnet: 100, iodine: 50 },
		'discerning_the_eldritch:electromancer': { build: 200, mercury: 100, rust: 50 },
		'discerning_the_eldritch:apostle': { build: 200, tar: 100, shale: 50 },
		'discerning_the_eldritch:apothic_crusader': { build: 400, amethyst: 200, gold: 100 },
		'discerning_the_eldritch:blood_cultist_captain': { build: 400, garnet: 200, rust: 100 },
		'discerning_the_eldritch:ascended_one_cultist': { build: 400, shale: 200, uranium: 100 },
		'discerning_the_eldritch:blood_matriarch': { build: 2000, garnet: 1000, ruby: 500 },
		'discerning_the_eldritch:ascended_one': { build: 12000, diamond: 8000, uranium: 4000 }
	}

	EntityEvents.death(event => {
		const player = event.source.player
		const grist = GRIST[String(event.entity.type)]
		if (!player || !grist) return
		Object.keys(grist).forEach(type => player.data.minestuck.addGrist($GristTypes.REGISTRY.get(`minestuck:${type}`), grist[type]))
	})
})()
