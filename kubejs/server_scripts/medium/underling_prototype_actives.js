ServerEvents.tags('item', event => {

	event.add('kubejs:prototypeFiery', ["plushie_buddies:plushie_blaze", "plushie_buddies:plushie_ghast", "a_man_with_plushies:ghast_plush"])
	event.add('kubejs:prototypable', ["plushie_buddies:plushie_blaze", "plushie_buddies:plushie_ghast", "a_man_with_plushies:ghast_plush"])
	event.add('kubejs:prototypeHasty', ["plushie_buddies:plushie_blaze", "plushie_buddies:plushie_ghast", "a_man_with_plushies:ghast_plush", "plushie_buddies:plushie_horse", "a_man_with_plushies:coil_head_plush", "a_man_with_plushies:gd_cube_plush", "a_man_with_plushies:peppino_plush", "farmers_spell:ember_block"])
})
  
const prototypeTags = {
	"kubejs:prototypeFiery": {
        "irons_spellbooks:firebolt": 60,
        "irons_spellbooks:fireball": 60,
        "irons_spellbooks:flaming_strike": 60,
    },
	"kubejs:prototypeIcy": {
        "irons_spellbooks:snowball": 60,
    },
//	"kubejs:prototypeHasty": false,
	"kubejs:prototypeHasty": {
        "aero_additions:dash": 60,
    }
}
  
let WizardAttackGoal = Java.loadClass("io.redspace.ironsspellbooks.entity.mobs.goals.WizardAttackGoal")
EntityJSEvents.addGoalSelectors('minestuck:ogre', event => {    
    const castingPriority = Math.floor(Math.random() * 4.5) + 3; 
    event.arbitraryGoal(castingPriority, (e) => {
        const pData = e.server.persistentData;
		const underlingPowers = Object.keys(prototypeTags).filter(element => pData.underlingPrototypes.toString().includes(element));
        const prototypeSpells = underlingPowers.flatMap(tag =>
            Object.entries(prototypeTags[tag])
        );

        const spells = prototypeSpells.map(
            ([spellId, interval]) => Spell.of(spellId)
        );

        return new WizardAttackGoal(e, 1, 60)
            .setSpells(
                spells,                   
                [Spell.of('irons_spellbooks:stomp')],    
                [Spell.of('irons_spellbooks:summon_ender_chest')],    
                []                                      
            );

    })
})
EntityJSEvents.addGoalSelectors('minestuck:imp', event => {    
    const castingPriority = Math.floor(Math.random() * 4) + 3; 
    event.arbitraryGoal(castingPriority, (e) => {
        const pData = e.server.persistentData;
		const underlingPowers = Object.keys(prototypeTags).filter(element => pData.underlingPrototypes.toString().includes(element));
        const prototypeSpells = underlingPowers.flatMap(tag =>
            Object.entries(prototypeTags[tag])
        );

        const spells = prototypeSpells.map(
            ([spellId, interval]) => Spell.of(spellId)
        );

        return new WizardAttackGoal(e, 1, 60)
            .setSpells(
                spells,                     
                [Spell.of('irons_spellbooks:recall')],    
                [Spell.of('irons_spellbooks:summon_ender_chest')],    
                []                                      
            );

    })
})
EntityJSEvents.addGoalSelectors('minestuck:basilisk', event => {    
    const castingPriority = Math.floor(Math.random() * 3) + 3; 
    event.arbitraryGoal(castingPriority, (e) => {
        const pData = e.server.persistentData;
		const underlingPowers = Object.keys(prototypeTags).filter(element => pData.underlingPrototypes.toString().includes(element));
        const prototypeSpells = underlingPowers.flatMap(tag =>
            Object.entries(prototypeTags[tag])
        );

        const spells = prototypeSpells.map(
            ([spellId, interval]) => Spell.of(spellId)
        );

        return new WizardAttackGoal(e, 1, 60)
            .setSpells(
                spells,                    
                [Spell.of('irons_spellbooks:recall')],    
                [Spell.of('irons_spellbooks:summon_ender_chest')],    
                []                                      
            );

    })
})
EntityJSEvents.addGoalSelectors('minestuck:lich', event => {    
    const castingPriority = Math.floor(Math.random() * 2) + 3; 
    event.arbitraryGoal(castingPriority, (e) => {
        const pData = e.server.persistentData;
		const underlingPowers = Object.keys(prototypeTags).filter(element => pData.underlingPrototypes.toString().includes(element));
        const prototypeSpells = underlingPowers.flatMap(tag =>
            Object.entries(prototypeTags[tag])
        );

        const spells = prototypeSpells.map(
            ([spellId, interval]) => Spell.of(spellId)
        );

        return new WizardAttackGoal(e, 1, 60)
            .setSpells(
                spells,                     
                [Spell.of('irons_spellbooks:recall')],    
                [Spell.of('irons_spellbooks:summon_ender_chest')],    
                []                                      
            );

    })
})
