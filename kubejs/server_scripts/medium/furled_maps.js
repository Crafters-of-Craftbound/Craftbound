(() => {
	ItemEvents.entityInteracted(event => {
		if (!['irons_spellbooks:cryomancer', 'irons_spellbooks:priest', 'irons_spellbooks:pyromancer'].includes(String(event.target.type))) return
		event.target.getOffers().removeIf(offer => String(offer.getResult().id).startsWith('irons_spellbooks:furled_map'))
	})
})()
