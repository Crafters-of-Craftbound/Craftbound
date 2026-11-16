(() => {
	const SHOWN_KUBEJS = [
		'paradox_slime_bucket', 'fresh_prince_plushie', 'thresh_prince_plushie', 'durian_plushbomb',
		'cathedral_cannon', 'matriyarn', 'blankusb', 'techusb', 'magicusb', 'explorationusb',
		'alchemizeusb', 'paradox_autoclave', 'dna_sequencer', 'wondrous_seed_stash', 'sublime_seed_stash',
		'prodigious_seed_stash', 'seed_vault', 'wielded_shield', 'captchalberd', 'stage_platform',
		'untrue_soul', 'gunblade', 'snackshot', 'paladins_arsenal', 'edible_modus',
		'lunar_transportablizer', 'transportablizer2', 'meteoric_transportablizer', 'eye_of_malice',
		'eye_of_the_ancients', 'eye_of_ascension', 'eye_of_the_protector', 'eye_of_zillium', 'pickpockets_glove',
		'defusal_kit', 'mediation_stick', 'elytric_fragment', 'talent_scout', 'microphone', 'head_cleaver'
	]

	RecipeViewerEvents.removeEntries('item', event => {
		event.remove(/^quark:.*(jasper|limestone|shale|myalite|permafrost|ancient_tome|chorus_weeds|chorus_twist|parrot|ravager|dragon_scale|backpack).*$/)
		event.remove('@modern_structure')
		event.remove(/^everycomp:q\/.+_chest$/)
		event.remove(new RegExp('^kubejs:(?!(?:' + SHOWN_KUBEJS.join('|') + ')$).*$'))
	})

	RecipeViewerEvents.removeEntriesCompletely('item', event => {
		event.remove('@cataclysm')
		event.remove('@mowziesmobs')
		event.remove('@bosses_of_mass_destruction')
	})

	RecipeViewerEvents.removeCategories(event => {
		event.remove(['cataclysm:weapon_infusion', 'cataclysm:altar_of_amethyst'])
	})
})()
