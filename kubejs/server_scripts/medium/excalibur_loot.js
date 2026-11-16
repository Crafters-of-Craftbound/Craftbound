(() => {
	LootJS.modifiers(event => {
		event.addTableModifier('irons_spellbooks:chests/citadel/citadel_vault').addLoot('hazennstuff:excalibur_fragment')
		event.addEntityModifier('irons_spellbooks:citadel_keeper').randomChance(0.02).addLoot('hazennstuff:excalibur_fragment')
	})
})()
