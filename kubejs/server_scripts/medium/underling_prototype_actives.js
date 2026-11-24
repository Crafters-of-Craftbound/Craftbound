(() => {
	const $WizardAttackGoal = Java.loadClass('io.redspace.ironsspellbooks.entity.mobs.goals.WizardAttackGoal')
	const archetypes = global.prototypeArchetypes
	const underlings = {
		'minestuck:ogre': { priorities: 4.5, defense: 'irons_spellbooks:stomp' },
		'minestuck:imp': { priorities: 4, defense: 'irons_spellbooks:recall' },
		'minestuck:basilisk': { priorities: 3, defense: 'irons_spellbooks:recall' },
		'minestuck:lich': { priorities: 2, defense: 'irons_spellbooks:recall' }
	}

	function prototypeSpells(prototypes, kind) {
		return Object.keys(archetypes).filter(archetype => prototypes.includes(`kubejs:prototype_${archetype}`)).flatMap(archetype => archetypes[archetype].spells[kind] || []).map(spell => Spell.of(spell))
	}

	Object.keys(underlings).forEach(type => {
		EntityJSEvents.addGoalSelectors(type, event => {
			event.arbitraryGoal(Math.floor(Math.random() * underlings[type].priorities) + 3, underling => {
				const prototypes = underling.level.isClientSide() ? '' : String(underling.server.persistentData.underlingPrototypes)
				return new $WizardAttackGoal(underling, 1, 60).setSpells(
					prototypeSpells(prototypes, 'attack'),
					[Spell.of(underlings[type].defense)].concat(prototypeSpells(prototypes, 'defense')),
					[Spell.of('irons_spellbooks:summon_ender_chest')].concat(prototypeSpells(prototypes, 'movement')),
					prototypeSpells(prototypes, 'support')
				)
			})
		})
	})
})()
