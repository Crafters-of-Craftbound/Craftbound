(() => {
	ServerEvents.recipes(event => {
		event.shapeless('minestuck:old_computer', ['minestuck:energy_core', 'minestuck:computer_parts', 'minestuck:raw_cruxite', 'minecraft:redstone', 'minecraft:copper_ingot', 'minecraft:smooth_sandstone'])
		event.shapeless('minestuck:laptop', ['minestuck:energy_core', 'minestuck:computer_parts', 'minestuck:raw_cruxite', 'minecraft:redstone', 'minecraft:glass_pane', 'minecraft:iron_ingot'])
		event.shapeless('minestuck:crockertop', ['minestuck:energy_core', 'minestuck:computer_parts', 'minestuck:raw_cruxite', 'minecraft:redstone', 'minecraft:sugar', 'minecraft:red_dye'])
		event.shapeless('minestuck:hubtop', ['minestuck:energy_core', 'minestuck:computer_parts', 'minestuck:raw_cruxite', 'minecraft:redstone', 'minecraft:ender_pearl', 'minecraft:comparator'])
		event.shapeless('minestuck:lunchtop', ['minestuck:energy_core', 'minestuck:computer_parts', 'minestuck:raw_cruxite', 'minecraft:redstone', 'minecraft:bread', 'minecraft:apple'])
		event.shaped('kubejs:paradox_autoclave', ['ABA', 'CDC', 'AEA'], {
			A: 'minecraft:iron_block',
			B: 'minestuck:transportalizer',
			C: 'minecraft:glass_pane',
			D: 'kubejs:paradox_slime_bucket',
			E: 'verseworks:hyper_dust'
		})

		event.shaped('kubejs:dna_sequencer', ['A', 'B', 'C'], {
			A: 'minestuck:uranium_pressure_plate',
			B: 'mekanism:basic_bin',
			C: 'minecraft:iron_block'
		})

		event.shaped('ftbquests:book', ['A', 'B'], {
			A: '#c:ingots/uranium',
			B: 'minecraft:iron_ingot'
		})

		event.shaped('kubejs:lunar_transportablizer', [' A ', 'ABD', ' D '], {
			A: 'kubejs:prospit_token',
			B: 'minestuck:transportalizer',
			D: 'kubejs:derse_brick'
		})

		event.shaped('kubejs:lunar_transportablizer', [' A ', 'ABD', ' D '], {
			A: 'kubejs:prospit_brick',
			B: 'minestuck:transportalizer',
			D: 'kubejs:derse_token'
		})

		event.shaped('kubejs:prospit_key', ['AAA', 'AAA', 'AAA'], {
			A: 'kubejs:prospit_key_fragment'
		})

		event.remove({ id: 'minestuck:combinations/elytra_from_feather' })
		event.remove({ id: 'javd:portal_block' })
		event.remove({ id: 'minestuck:combinations/elytra_from_leather_chestplate' })
		event.remove({ id: 'verseworks:dimensional_analyzer' })
		event.remove({ id: 'verseworks:guidebook' })
		event.remove({ id: 'mekanism:atomic_disassembler' })
		event.remove({ id: 'minestuck_extended:combinations/holy_moonlight_sword' })
		event.remove({ id: 'minestuck_extended:grist_costs/holy_moonlight_sword' })
		event.remove({ id: 'minestuckcompat:grist_costs/quark/forgotten_hat' })
		event.remove({ output: /^everycomp:q\/.+_chest$/ })
		event.remove({ type: 'architects_palette:warping' })
		event.shaped('minecraft:elytra', ['AAA', 'AAA', 'AAA'], {
			A: 'kubejs:elytric_fragment'
		})

		event.shapeless('kubejs:seed_vault', ['kubejs:wondrous_seed_stash', 'kubejs:sublime_seed_stash', 'kubejs:prodigious_seed_stash'])
		event.shapeless('kubejs:prodigious_seed_stash', ['minecraft:wheat_seeds', 'minecraft:pumpkin_seeds', 'minecraft:melon_seeds', 'minecraft:beetroot_seeds', 'kaleidoscope_cookery:rice', 'farmersdelight:cabbage_seeds', 'kaleidoscope_cookery:tomato_seed', 'minecraft:carrot', 'minecraft:potato'])
		event.shapeless('kubejs:wondrous_seed_stash', ['minecraft:poppy', 'minecraft:dandelion', 'minecraft:blue_orchid', 'minecraft:allium', 'minecraft:pink_tulip', 'minecraft:lily_of_the_valley', 'minecraft:cornflower', 'minecraft:oxeye_daisy', 'minecraft:azure_bluet'])
		event.shapeless('kubejs:sublime_seed_stash', ['minecraft:sunflower', 'minecraft:lilac', 'minecraft:rose_bush', 'minecraft:peony', 'biomeswevegone:delphinium', 'biomeswevegone:tall_prairie_grass', 'biomeswevegone:foxglove', 'biomeswevegone:tall_beach_grass', 'biomeswevegone:cattail_sprout'])

		event.shapeless('kubejs:talent_scout', ['2x minecraft:paper', 'minecraft:ink_sac', 'minecraft:feather'])

		event.shaped('kubejs:stage_platform', ['A', 'B'], {
			A: 'minecraft:gray_carpet',
			B: 'minecraft:gray_concrete'
		})

		event.shaped('kubejs:microphone', ['A', 'B', 'C'], {
			A: 'create:andesite_alloy',
			B: 'minecraft:iron_ingot',
			C: 'minecraft:stick'
		})

		event.shaped('kubejs:head_cleaver', [' AA', ' AA', '  B'], {
			A: 'minecraft:iron_ingot',
			B: 'minecraft:stick'
		})

		event.shaped('kubejs:blankusb', ['AB'], {
			A: '#c:ingots/steel',
			B: 'mekanism:basic_tier_installer'
		})
		event.shaped('kubejs:techusb', [' A ', 'BUC', ' D '], {
			U: 'kubejs:blankusb',
			A: 'toms_storage:adv_wireless_terminal',
			B: 'create:precision_mechanism',
			C: 'create:sturdy_sheet',
			D: 'mekanism:ultimate_tier_installer'
		})
		event.shaped('kubejs:alchemizeusb', [' A ', 'BUB', ' D '], {
			U: 'kubejs:blankusb',
			A: 'kubejs:second_coming_of_durian_with_a_gun',
			B: 'minestuck:captcha_card',
			D: 'minestuck:raw_cruxite'
		})
		event.shaped('kubejs:explorationusb', [' A ', 'BUC', ' D '], {
			U: 'kubejs:blankusb',
			A: 'kubejs:floral_receipt',
			B: 'kubejs:made_choice',
			C: 'kubejs:ectobiology_certificate',
			D: 'kubejs:obsidian_rings'
		})
		event.shaped('kubejs:magicusb', [' A ', 'BUC', ' D '], {
			U: 'kubejs:blankusb',
			A: 'discerning_the_eldritch:ascended_key',
			B: 'hazennstuff:divine_mold',
			C: 'irons_spellbooks:legendary_ink',
			D: 'irons_spellbooks:arcane_ingot'
		})

		event.remove({ id: 'minecraft:lectern' })
		event.remove({ id: 'quark:building/crafting/bookshelves/lectern_with_variant_bookshelves' })
		event.shaped('minecraft:lectern', ['AAA', ' B ', ' A '], {
			A: 'minecraft:iron_ingot',
			B: '#c:bookshelves'
		})

		event.shapeless('minestuckdungeons:poor_zillium_chunks', ['5x minestuckdungeons:crude_zillium_dust'])
		event.shapeless('minestuckdungeons:polluted_zillium_shard', ['2x minestuckdungeons:poor_zillium_chunks'])
		event.shapeless('minestuckdungeons:pure_zillium_gem', ['2x minestuckdungeons:polluted_zillium_shard'])

		event.remove({ mod: 'plushie_buddies' })

		event.shapeless('mowziesmobs:bluff_rod', ['minecraft:cobblestone', 'minecraft:breeze_rod'])

		event.shaped('kubejs:defusal_kit', ['NSG', 'III'], {
			N: '#c:nuggets/copper',
			S: 'minecraft:shears',
			G: 'mekanism:geiger_counter',
			I: '#c:ingots/steel'
		})

		event.shaped('kubejs:inventory_upgrade', ['IPI', 'PCP', 'IPI'], {
			I: 'minecraft:iron_ingot',
			P: '#minestuck:planks/aspect',
			C: 'minecraft:crafting_table'
		})

		event.remove({ output: 'refurbished_furniture:dark_electricity_generator' })
		event.remove({ output: 'refurbished_furniture:light_electricity_generator' })
		event.shaped('refurbished_furniture:light_electricity_generator', ['UUU', 'UEU', 'UUU'], {
			U: '#c:ingots/uranium',
			E: 'minestuck:energy_core'
		})

		event.replaceInput({ id: 'mekanism:personal_chest' }, '#c:chests/wooden', '#minestuck:planks/aspect')
		event.replaceInput({ id: 'mekanism:personal_barrel' }, '#c:barrels/wooden', '#minestuck:planks/aspect')
		event.replaceInput({ id: 'a_man_with_plushies:plush_box_recipe' }, '#minecraft:planks', 'minecraft:diamond')
		event.replaceInput({ id: 'a_man_with_plushies:plush_box_recipe_2' }, '#minecraft:planks', 'minecraft:diamond')

		event.remove({ output: 'whimsy_deco:traffic_cone' })
		event.remove({ output: 'whimsy_deco:phone' })
		event.remove({ output: 'whimsy_deco:black_phone' })
		event.remove({ output: 'whimsy_deco:blue_phone' })
		event.remove({ output: 'whimsy_deco:red_phone' })
		event.remove({ output: 'cluttered:cardboard_box_open' })
		event.remove({ output: 'cluttered:moon_pendant' })
		event.remove({ output: 'cluttered:steampunk_globe' })

		event.remove({ output: 'mca:potion_of_femininity' })
		event.remove({ output: 'mca:potion_of_masculinity' })
		event.remove({ output: 'mca:comb' })
		event.remove({ output: 'mca:needle_and_thread' })
		event.remove({ output: ['abyssal_decor:clam_and_cheese_sandwich', 'abyssal_decor:cinnamon_roll', 'abyssal_decor:candy_bog_apple', 'abyssal_decor:fever_blossom_tea', 'abyssal_decor:cooked_muckroot', 'abyssal_decor:toasted_seeds', 'abyssal_decor:cinnamon_tea', 'abyssal_decor:bog_roll', 'abyssal_decor:muckroot_soup', 'abyssal_decor:le_fishe_au_chocolat', 'abyssal_decor:cinnamon_apple', 'abyssal_decor:bog_apple', 'abyssal_decor:spidercorn_tortilla', 'abyssal_decor:popped_spidercorn', 'abyssal_decor:cave_taco', 'abyssal_decor:cave_taco_with_stones', 'abyssal_decor:shucked_clam', 'abyssal_decor:bog_apple_pie', 'abyssal_decor:laser_assisted_electrical_rifle', 'abyssal_decor:bottomless_bag_of_snow', 'abyssal_decor:bottomless_bag_of_netherrack', 'abyssal_decor:bottomless_bag_of_cobblestone', 'abyssal_decor:bottomless_bag_of_dirt', 'abyssal_decor:dusty_cd', 'abyssal_decor:chorus_pearl_item', 'abyssal_decor:strange_metal_rod', 'abyssal_decor:fallen_barrier_block'] })
		event.remove({ output: ['alchemancy:nimbus_belt', 'alchemancy:phasing_ring', 'alchemancy:pocket_black_hole', 'alchemancy:black_hole_sword', 'alchemancy:black_hole_pickaxe', 'alchemancy:black_hole_axe', 'alchemancy:black_hole_shovel', 'alchemancy:black_hole_hoe', 'alchemancy:crystal_storm_belt', 'alchemancy:shifting_lightning_belt', 'alchemancy:voidless_ring', 'alchemancy:hardlight_steps', 'alchemancy:dreamsteel_ingot', 'alchemancy:dreamsteel_nugget', 'alchemancy:dreamsteel_block', 'alchemancy:dreamsteel_sword', 'alchemancy:dreamsteel_pickaxe', 'alchemancy:dreamsteel_axe', 'alchemancy:dreamsteel_shovel', 'alchemancy:dreamsteel_hoe', 'alchemancy:dreamsteel_helmet', 'alchemancy:dreamsteel_chestplate', 'alchemancy:dreamsteel_leggings', 'alchemancy:dreamsteel_boots', 'alchemancy:dreamsteel_bow', 'alchemancy:lead_nugget', 'alchemancy:lead_sword', 'alchemancy:lead_pickaxe', 'alchemancy:lead_axe', 'alchemancy:lead_shovel', 'alchemancy:lead_hoe', 'alchemancy:lead_helmet', 'alchemancy:lead_chestplate', 'alchemancy:lead_leggings', 'alchemancy:lead_boots'] })

		event.remove({ id: 'ms_extras:combinations/steel_ingot' })

		event.remove({ id: 'mekanism:processing/uranium/raw_storage_blocks/from_raw' })
		event.remove({ id: 'mekanism:processing/uranium/raw/from_raw_block' })
		event.remove({ id: 'mekanism:processing/uranium/ingot/from_ore_smelting' })
		event.remove({ id: 'mekanism:processing/uranium/ingot/from_ore_blasting' })
		event.remove({ id: 'minestuckcompat:combinations/mekanism/raw_uranium' })
		event.remove({ id: 'minestuckcompat:combinations/mekanism/uranium_ore' })
		event.remove({ id: 'minestuckcompat:combinations/mekanism/deepslate_uranium_ore' })
		event.remove({ id: 'minestuckcompat:combinations/mekanism/block_raw_uranium' })
		event.shapeless('minestuck:raw_uranium', ['mekanism:raw_uranium'])
		event.shapeless('minestuck:uranium_block', ['mekanism:block_raw_uranium'])
		event.shapeless('minestuck:stone_uranium_ore', ['mekanism:uranium_ore'])
		event.shapeless('minestuck:deepslate_uranium_ore', ['mekanism:deepslate_uranium_ore'])

		event.remove({ id: 'irons_spellbooks:scroll_forge' })
		event.shaped('irons_spellbooks:scroll_forge', ['C  ', 'AAA', 'S S'], {
			C: 'irons_spellbooks:common_ink',
			A: 'irons_spellbooks:arcane_ingot',
			S: '#c:ingots/steel'
		})

		event.remove({ id: 'hazennstuff:crafting/materials/crude_metal' })
		event.remove({ id: 'hazentouvelib:crafting/materials/crude_metal' })
		event.shapeless('9x hazennstuff:crude_metal', ['minecraft:heavy_core'])
		event.shapeless('hazentouvelib:crude_metal', ['hazennstuff:crude_metal'])
		event.shapeless('minecraft:slime_block', ['kubejs:thick_slime_block'])
		event.shapeless('minecraft:honey_block', ['kubejs:honeyfied_slime_block'])

		event.remove({ id: 'irons_spellbooks:dead_king_phylactery' })
		event.remove({ id: 'bosses_of_mass_destruction:mob_ward' })

		event.remove({ id: 'cataclysm:the_incinerator' })
		event.remove({ id: 'cataclysm:bulwark_of_the_flame' })
		event.remove({ id: 'cataclysm:blazing_grips' })
		event.remove({ id: 'cataclysm:smithing/ignitium_helmet' })
		event.remove({ id: 'cataclysm:smithing/ignitium_chestplate' })
		event.remove({ id: 'cataclysm:smithing/ignitium_leggings' })
		event.remove({ id: 'cataclysm:smithing/ignitium_boots' })
		event.remove({ id: 'cataclysm:weapon_infusion/ignitium_elytra_chestplate' })
		event.remove({ id: 'cataclysm:weapon_infusion/the_immolator' })
		event.remove({ id: 'cataclysm:cursed_bow' })
		event.remove({ id: 'cataclysm:soul_render' })
		event.remove({ id: 'cataclysm:the_annihilator' })
		event.remove({ id: 'cataclysm:smithing/cursium_helmet' })
		event.remove({ id: 'cataclysm:smithing/cursium_chestplate' })
		event.remove({ id: 'cataclysm:smithing/cursium_leggings' })
		event.remove({ id: 'cataclysm:smithing/cursium_boots' })
		event.remove({ id: 'cataclysm:weapon_infusion/wrath_of_the_desert' })
		event.remove({ id: 'cataclysm:laser_gatling' })
		event.remove({ id: 'cataclysm:meat_shredder' })
		event.remove({ id: 'cataclysm:wither_assault_shoulder_weapon' })
		event.remove({ id: 'cataclysm:weapon_infusion/void_assault_shoulder_weapon' })
		event.remove({ id: 'cataclysm:mechanical_fusion_anvil' })
		event.remove({ id: 'cataclysm:ancient_spear' })
		event.remove({ id: 'cataclysm:bone_reptile_helmet' })
		event.remove({ id: 'cataclysm:bone_reptile_chestplate' })
		event.remove({ id: 'cataclysm:smithing/monstrous_helm' })
		event.remove({ id: 'cataclysm:weapon_infusion/brontes' })
		event.remove({ id: 'cataclysm:weapon_infusion/void_forge' })
		event.remove({ id: 'cataclysm:weapon_infusion/gauntlet_of_bulwark' })
		event.remove({ id: 'cataclysm:weapon_infusion/gauntlet_of_maelstrom' })
		event.remove({ id: 'bosses_of_mass_destruction:earthdive_spear' })
		event.remove({ id: 'bosses_of_mass_destruction:blast_amplifier' })
		event.remove({ id: 'bosses_of_mass_destruction:levitation_block' })
		event.remove({ id: 'bosses_of_mass_destruction:charged_ender_pearl' })

		event.remove({ id: 'create:mixing/brass_ingot' })
		event.remove({ id: 'create:crafting/materials/brass_block_from_compacting' })
		event.remove({ id: 'create:crafting/materials/brass_ingot_from_decompacting' })
		event.remove({ id: 'create:crafting/materials/brass_ingot_from_compacting' })
		event.remove({ id: 'create:crafting/materials/brass_nugget_from_decompacting' })
		event.recipes.create.mixing('mekanism:ingot_steel', ['minecraft:coal', 'minecraft:iron_ingot']).heated()

		const ALCHEMY_GEAR = ['aero_additions:air_staff', 'aero_additions:wind_sword', 'aero_additions:windmaker_boots', 'aero_additions:windmaker_headpiece', 'aero_additions:windmaker_leggings', 'aero_additions:windmaker_robes', 'discerning_the_eldritch:casters_mantle', 'discerning_the_eldritch:cataclysm', 'discerning_the_eldritch:cataclysm_awakened', 'discerning_the_eldritch:crimson_stag_antlers', 'discerning_the_eldritch:crimson_stag_boots', 'discerning_the_eldritch:crimson_stag_leggings', 'discerning_the_eldritch:crimson_stag_robes', 'discerning_the_eldritch:deep_greatsword', 'discerning_the_eldritch:devourer', 'discerning_the_eldritch:devourer_awakened', 'discerning_the_eldritch:echo_vibration_ring', 'discerning_the_eldritch:eldritch_warlock_greaves', 'discerning_the_eldritch:eldritch_warlock_helmet', 'discerning_the_eldritch:eldritch_warlock_hood', 'discerning_the_eldritch:eldritch_warlock_leggings', 'discerning_the_eldritch:eldritch_warlock_mask', 'discerning_the_eldritch:eldritch_warlock_robes', 'discerning_the_eldritch:forlorn_rapier', 'discerning_the_eldritch:forsaken_flamberge', 'discerning_the_eldritch:frostbourne_sheath', 'discerning_the_eldritch:god_spear', 'discerning_the_eldritch:ice_spear', 'discerning_the_eldritch:kings_effigy', 'discerning_the_eldritch:mourning_star', 'discerning_the_eldritch:mourning_star_awakened', 'discerning_the_eldritch:razor_sheath', 'discerning_the_eldritch:ritual_dagger', 'discerning_the_eldritch:snowgrave', 'discerning_the_eldritch:soul_fire_scythe', 'discerning_the_eldritch:staff_of_eldritch', 'discerning_the_eldritch:ymir', 'farmers_spell:affinity_ring_glutton', 'farmers_spell:foodgeist_ring', 'farmers_spell:gluttony_chef_apron', 'farmers_spell:gluttony_chef_boots', 'farmers_spell:gluttony_chef_hat', 'farmers_spell:gluttony_chef_leggings', 'hazennstuff:abberant_predator_boots', 'hazennstuff:abberant_predator_chestplate', 'hazennstuff:abberant_predator_helmet', 'hazennstuff:abberant_predator_leggings', 'hazennstuff:alchemist_supreme_boots', 'hazennstuff:alchemist_supreme_chestplate', 'hazennstuff:alchemist_supreme_helmet', 'hazennstuff:alchemist_supreme_leggings', 'hazennstuff:ancient_warriors_axe', 'hazennstuff:arbitrium_robes_boots', 'hazennstuff:arbitrium_robes_chestplate', 'hazennstuff:arbitrium_robes_helmet', 'hazennstuff:arbitrium_robes_leggings', 'hazennstuff:ascended_arbitrium_robes_boots', 'hazennstuff:ascended_arbitrium_robes_chestplate', 'hazennstuff:ascended_arbitrium_robes_helmet', 'hazennstuff:ascended_arbitrium_robes_leggings', 'hazennstuff:astraconic_weaver_boots', 'hazennstuff:astraconic_weaver_chestplate', 'hazennstuff:astraconic_weaver_helmet', 'hazennstuff:astraconic_weaver_leggings', 'hazennstuff:astralite_cleaver', 'hazennstuff:atlas_boots', 'hazennstuff:atlas_chestplate', 'hazennstuff:atlas_helmet', 'hazennstuff:atlas_leggings', 'hazennstuff:beongae', 'hazennstuff:blade_of_grass', 'hazennstuff:blazeborne_boots', 'hazennstuff:blazeborne_chestplate', 'hazennstuff:blazeborne_helmet', 'hazennstuff:blazeborne_leggings', 'hazennstuff:blossom_of_the_enchantress', 'hazennstuff:bountiful_harvest', 'hazennstuff:bounty_hunter_boots', 'hazennstuff:bounty_hunter_chestplate', 'hazennstuff:bounty_hunter_helmet', 'hazennstuff:bounty_hunter_leggings', 'hazennstuff:ceaseless_void', 'hazennstuff:charged_scourge_boots', 'hazennstuff:charged_scourge_chestplate', 'hazennstuff:charged_scourge_helmet', 'hazennstuff:charged_scourge_leggings', 'hazennstuff:chlorophyte_boots', 'hazennstuff:chlorophyte_chestplate', 'hazennstuff:chlorophyte_helmet', 'hazennstuff:chlorophyte_leggings', 'hazennstuff:coralite_cane', 'hazennstuff:cosmic_scholar_boots', 'hazennstuff:cosmic_scholar_chestplate', 'hazennstuff:cosmic_scholar_helmet', 'hazennstuff:cosmic_scholar_leggings', 'hazennstuff:creaking_boots', 'hazennstuff:creaking_chestplate', 'hazennstuff:creaking_helmet', 'hazennstuff:creaking_leggings', 'hazennstuff:cryogenic_ruler_boots', 'hazennstuff:cryogenic_ruler_chestplate', 'hazennstuff:cryogenic_ruler_helmet', 'hazennstuff:cryogenic_ruler_leggings', 'hazennstuff:crystal_arachnid_boots', 'hazennstuff:crystal_arachnid_chestplate', 'hazennstuff:crystal_arachnid_helmet', 'hazennstuff:crystal_arachnid_leggings', 'hazennstuff:dark_ritual_templar_boots', 'hazennstuff:dark_ritual_templar_chestplate', 'hazennstuff:dark_ritual_templar_helmet', 'hazennstuff:dark_ritual_templar_leggings', 'hazennstuff:dawnmaker', 'hazennstuff:divine_greatsword', 'hazennstuff:divine_scepter', 'hazennstuff:draconic_splitter', 'hazennstuff:dreadsteel_knight_boots', 'hazennstuff:dreadsteel_knight_chestplate', 'hazennstuff:dreadsteel_knight_helmet', 'hazennstuff:dreadsteel_knight_leggings', 'hazennstuff:elder_guardian_boots', 'hazennstuff:elder_guardian_chestplate', 'hazennstuff:elder_guardian_helmet', 'hazennstuff:elder_guardian_leggings', 'hazennstuff:ender_dragon_boots', 'hazennstuff:ender_dragon_chestplate', 'hazennstuff:ender_dragon_helmet', 'hazennstuff:ender_dragon_leggings', 'hazennstuff:enderconic_scepter', 'hazennstuff:excalibur', 'hazennstuff:excalibur_divine_gold', 'hazennstuff:fireblossom_battlemage_boots', 'hazennstuff:fireblossom_battlemage_chestplate', 'hazennstuff:fireblossom_battlemage_helmet', 'hazennstuff:fireblossom_battlemage_leggings', 'hazennstuff:fireblossom_knight_boots', 'hazennstuff:fireblossom_knight_chestplate', 'hazennstuff:fireblossom_knight_helmet', 'hazennstuff:fireblossom_knight_leggings', 'hazennstuff:fireblossom_rapier', 'hazennstuff:firebrand', 'hazennstuff:flesh_mass_boots', 'hazennstuff:flesh_mass_chestplate', 'hazennstuff:flesh_mass_helmet', 'hazennstuff:flesh_mass_leggings', 'hazennstuff:frieren_boots', 'hazennstuff:frieren_chestplate', 'hazennstuff:frieren_helmet', 'hazennstuff:frieren_leggings', 'hazennstuff:frieren_staff', 'hazennstuff:frostbite_hunter_boots', 'hazennstuff:frostbite_hunter_chestplate', 'hazennstuff:frostbite_hunter_helmet', 'hazennstuff:frostbite_hunter_leggings', 'hazennstuff:frostbite_knight_boots', 'hazennstuff:frostbite_knight_chestplate', 'hazennstuff:frostbite_knight_helmet', 'hazennstuff:frostbite_knight_leggings', 'hazennstuff:frostburn_dagger', 'hazennstuff:gabriel_ultrakill_boots', 'hazennstuff:gabriel_ultrakill_chestplate', 'hazennstuff:gabriel_ultrakill_helmet', 'hazennstuff:gabriel_ultrakill_leggings', 'hazennstuff:galvanized_sheath', 'hazennstuff:garments_of_the_first_flamebearer_boots', 'hazennstuff:garments_of_the_first_flamebearer_chestplate', 'hazennstuff:garments_of_the_first_flamebearer_helmet', 'hazennstuff:garments_of_the_first_flamebearer_leggings', 'hazennstuff:giorno_giovanna_boots', 'hazennstuff:giorno_giovanna_chestplate', 'hazennstuff:giorno_giovanna_helmet', 'hazennstuff:giorno_giovanna_leggings', 'hazennstuff:glassweaver_boots', 'hazennstuff:glassweaver_chestplate', 'hazennstuff:glassweaver_helmet', 'hazennstuff:glassweaver_leggings', 'hazennstuff:glassweaver_scepter', 'hazennstuff:grimoire_staff', 'hazennstuff:hammer_of_justice', 'hazennstuff:hammush', 'hazennstuff:hazel_boots', 'hazennstuff:hazel_chestplate', 'hazennstuff:hazel_helmet', 'hazennstuff:hazel_leggings', 'hazennstuff:hazens_excalibur', 'hazennstuff:herta_puppet_boots', 'hazennstuff:herta_puppet_chestplate', 'hazennstuff:herta_puppet_helmet', 'hazennstuff:herta_puppet_leggings', 'hazennstuff:how_did_you_find_the_hazel_chestplate', 'hazennstuff:how_did_you_find_the_mothic_witch_chestplate', 'hazennstuff:ice_pike', 'hazennstuff:infestation_boots', 'hazennstuff:infestation_chestplate', 'hazennstuff:infestation_helmet', 'hazennstuff:infestation_leggings', 'hazennstuff:insania_aeternus', 'hazennstuff:iron431_boots', 'hazennstuff:iron431_chestplate', 'hazennstuff:iron431_helmet', 'hazennstuff:iron431_leggings', 'hazennstuff:legionnaire_boots', 'hazennstuff:legionnaire_chestplate', 'hazennstuff:legionnaire_commander_boots', 'hazennstuff:legionnaire_commander_chestplate', 'hazennstuff:legionnaire_commander_helmet', 'hazennstuff:legionnaire_commander_leggings', 'hazennstuff:legionnaire_helmet', 'hazennstuff:legionnaire_leggings', 'hazennstuff:legionnaire_ruler_boots', 'hazennstuff:legionnaire_ruler_chestplate', 'hazennstuff:legionnaire_ruler_helmet', 'hazennstuff:legionnaire_ruler_leggings', 'hazennstuff:lemon_god_boots', 'hazennstuff:lemon_god_chestplate', 'hazennstuff:lemon_god_helmet', 'hazennstuff:lemon_god_leggings', 'hazennstuff:lights_bane', 'hazennstuff:mage_bane', 'hazennstuff:magehunter_boots', 'hazennstuff:magehunter_chestplate', 'hazennstuff:magehunter_helmet', 'hazennstuff:magehunter_leggings', 'hazennstuff:malice', 'hazennstuff:masked_fool_boots', 'hazennstuff:masked_fool_chestplate', 'hazennstuff:masked_fool_helmet', 'hazennstuff:masked_fool_leggings', 'hazennstuff:maverick_boots', 'hazennstuff:maverick_chestplate', 'hazennstuff:maverick_helmet', 'hazennstuff:maverick_leggings', 'hazennstuff:meowmere', 'hazennstuff:miner_boots', 'hazennstuff:miner_chestplate', 'hazennstuff:miner_helmet', 'hazennstuff:miner_leggings', 'hazennstuff:mithril_battlemage_boots', 'hazennstuff:mithril_battlemage_chestplate', 'hazennstuff:mithril_battlemage_helmet', 'hazennstuff:mithril_battlemage_leggings', 'hazennstuff:mothic_witch_boots', 'hazennstuff:mothic_witch_chestplate', 'hazennstuff:mothic_witch_helmet', 'hazennstuff:mothic_witch_leggings', 'hazennstuff:muramasa', 'hazennstuff:mycelium_guardian_boots', 'hazennstuff:mycelium_guardian_chestplate', 'hazennstuff:mycelium_guardian_helmet', 'hazennstuff:mycelium_guardian_leggings', 'hazennstuff:nautilus_knight_boots', 'hazennstuff:nautilus_knight_chestplate', 'hazennstuff:nautilus_knight_helmet', 'hazennstuff:nautilus_knight_leggings', 'hazennstuff:nexus', 'hazennstuff:nights_edge', 'hazennstuff:obsidian_claymore', 'hazennstuff:permafrost_prince_boots', 'hazennstuff:permafrost_prince_chestplate', 'hazennstuff:permafrost_prince_helmet', 'hazennstuff:permafrost_prince_leggings', 'hazennstuff:pickaxe_axe', 'hazennstuff:pickaxe_axe_divine_gold', 'hazennstuff:pyrium_battlemage_boots', 'hazennstuff:pyrium_battlemage_chestplate', 'hazennstuff:pyrium_battlemage_helmet', 'hazennstuff:pyrium_battlemage_leggings', 'hazennstuff:pyrium_boots', 'hazennstuff:pyrium_chestplate', 'hazennstuff:pyrium_helmet', 'hazennstuff:pyrium_leggings', 'hazennstuff:radiant_crystal_boots', 'hazennstuff:radiant_crystal_chestplate', 'hazennstuff:radiant_crystal_helmet', 'hazennstuff:radiant_crystal_leggings', 'hazennstuff:ravens_bane', 'hazennstuff:ring_of_efficiency', 'hazennstuff:sacred_robes_boots', 'hazennstuff:sacred_robes_chestplate', 'hazennstuff:sacred_robes_helmet', 'hazennstuff:sacred_robes_leggings', 'hazennstuff:scroll_sheath', 'hazennstuff:seraph_boots', 'hazennstuff:seraph_chestplate', 'hazennstuff:seraph_helmet', 'hazennstuff:seraph_leggings', 'hazennstuff:shadow_jester_boots', 'hazennstuff:shadow_jester_chestplate', 'hazennstuff:shadow_jester_helmet', 'hazennstuff:shadow_jester_leggings', 'hazennstuff:shadow_scale_boots', 'hazennstuff:shadow_scale_chestplate', 'hazennstuff:shadow_scale_helmet', 'hazennstuff:shadow_scale_leggings', 'hazennstuff:skyscorcher', 'hazennstuff:slc_cat_boots', 'hazennstuff:slc_cat_chestplate', 'hazennstuff:slc_cat_helmet', 'hazennstuff:slc_cat_leggings', 'hazennstuff:soul_legionnaire_ruler_boots', 'hazennstuff:soul_legionnaire_ruler_chestplate', 'hazennstuff:soul_legionnaire_ruler_helmet', 'hazennstuff:soul_legionnaire_ruler_leggings', 'hazennstuff:soul_reaper', 'hazennstuff:soulcalling_scepter', 'hazennstuff:spectral_pickaxe', 'hazennstuff:spectral_spelunker_boots', 'hazennstuff:spectral_spelunker_chestplate', 'hazennstuff:spectral_spelunker_helmet', 'hazennstuff:spectral_spelunker_leggings', 'hazennstuff:spectrum', 'hazennstuff:starfury', 'hazennstuff:supreme_witch_boots', 'hazennstuff:supreme_witch_chestplate', 'hazennstuff:supreme_witch_helmet', 'hazennstuff:supreme_witch_leggings', 'hazennstuff:terraprisma', 'hazennstuff:the_devourer', 'hazennstuff:the_wither_boots', 'hazennstuff:the_wither_chestplate', 'hazennstuff:the_wither_helmet', 'hazennstuff:the_wither_leggings', 'hazennstuff:thorn_chakram', 'hazennstuff:thunder_prowler_boots', 'hazennstuff:thunder_prowler_chestplate', 'hazennstuff:thunder_prowler_helmet', 'hazennstuff:thunder_prowler_leggings', 'hazennstuff:tidal_wave', 'hazennstuff:true_nights_edge', 'hazennstuff:vampire_knives', 'hazennstuff:volcano', 'hazennstuff:war_flaming_lance', 'hazennstuff:white_lily_staff', 'hazennstuff:wisewood_cane', 'irons_spellbooks:affinity_ring', 'irons_spellbooks:amethyst_rapier', 'irons_spellbooks:amethyst_resonance_charm', 'irons_spellbooks:archevoker_boots', 'irons_spellbooks:archevoker_chestplate', 'irons_spellbooks:archevoker_helmet', 'irons_spellbooks:archevoker_leggings', 'irons_spellbooks:artificer_cane', 'irons_spellbooks:autoloader_crossbow', 'irons_spellbooks:boreal_blade', 'irons_spellbooks:cast_time_ring', 'irons_spellbooks:claymore', 'irons_spellbooks:concentration_amulet', 'irons_spellbooks:conjurers_talisman', 'irons_spellbooks:cooldown_ring', 'irons_spellbooks:cryomancer_boots', 'irons_spellbooks:cryomancer_chestplate', 'irons_spellbooks:cryomancer_helmet', 'irons_spellbooks:cryomancer_leggings', 'irons_spellbooks:cultist_boots', 'irons_spellbooks:cultist_chestplate', 'irons_spellbooks:cultist_helmet', 'irons_spellbooks:cultist_leggings', 'irons_spellbooks:electromancer_boots', 'irons_spellbooks:electromancer_chestplate', 'irons_spellbooks:electromancer_helmet', 'irons_spellbooks:electromancer_leggings', 'irons_spellbooks:emerald_stoneplate_ring', 'irons_spellbooks:enchanted_ward_amulet', 'irons_spellbooks:expulsion_ring', 'irons_spellbooks:fireward_ring', 'irons_spellbooks:frostward_ring', 'irons_spellbooks:graybeard_staff', 'irons_spellbooks:greater_conjurers_talisman', 'irons_spellbooks:hither_thither_wand', 'irons_spellbooks:ice_staff', 'irons_spellbooks:infernal_sorcerer_chestplate', 'irons_spellbooks:invisibility_ring', 'irons_spellbooks:keeper_flamberge', 'irons_spellbooks:legionnaire_flamberge', 'irons_spellbooks:lightning_rod', 'irons_spellbooks:lurker_ring', 'irons_spellbooks:magehunter', 'irons_spellbooks:mana_ring', 'irons_spellbooks:misery', 'irons_spellbooks:netherite_mage_boots', 'irons_spellbooks:netherite_mage_chestplate', 'irons_spellbooks:netherite_mage_helmet', 'irons_spellbooks:netherite_mage_leggings', 'irons_spellbooks:paladin_chestplate', 'irons_spellbooks:plagued_boots', 'irons_spellbooks:plagued_chestplate', 'irons_spellbooks:plagued_helmet', 'irons_spellbooks:plagued_leggings', 'irons_spellbooks:poisonward_ring', 'irons_spellbooks:priest_boots', 'irons_spellbooks:priest_chestplate', 'irons_spellbooks:priest_helmet', 'irons_spellbooks:priest_leggings', 'irons_spellbooks:pyrium_staff', 'irons_spellbooks:pyromancer_boots', 'irons_spellbooks:pyromancer_chestplate', 'irons_spellbooks:pyromancer_helmet', 'irons_spellbooks:pyromancer_leggings', 'irons_spellbooks:shadowwalker_boots', 'irons_spellbooks:shadowwalker_chestplate', 'irons_spellbooks:shadowwalker_helmet', 'irons_spellbooks:shadowwalker_leggings', 'irons_spellbooks:silver_ring', 'irons_spellbooks:speed_boots', 'irons_spellbooks:spellbreaker', 'irons_spellbooks:staff_of_the_nines', 'irons_spellbooks:teleportation_amulet', 'irons_spellbooks:twilight_gale', 'irons_spellbooks:visibility_ring', 'irons_spellbooks:wandering_magician_boots', 'irons_spellbooks:wandering_magician_chestplate', 'irons_spellbooks:wandering_magician_helmet', 'irons_spellbooks:wandering_magician_leggings', 'irons_spellbooks:wizard_boots', 'irons_spellbooks:wizard_chestplate', 'irons_spellbooks:wizard_hat', 'irons_spellbooks:wizard_helmet', 'irons_spellbooks:wizard_leggings', 'tunes_n_tomes:bard_boots', 'tunes_n_tomes:bard_chestplate', 'tunes_n_tomes:bard_harp', 'tunes_n_tomes:bard_helmet', 'tunes_n_tomes:bard_leggings']
		ALCHEMY_GEAR.forEach(item => ['minecraft:crafting_shaped', 'minecraft:crafting_shapeless', 'minecraft:smithing_transform'].forEach(type => event.remove({ output: item, type: type })))

		event.remove({ id: 'farmersdelight:iron_knife' })
		event.remove({ id: 'farmersdelight:golden_knife' })
		event.remove({ id: 'farmersdelight:diamond_knife' })
		event.remove({ id: 'farmersdelight:netherite_knife_smithing' })
		event.remove({ id: 'farmersdelight:cooking_pot' })
		event.remove({ id: 'farmersdelight:skillet' })
		event.remove({ id: 'farmersdelight:stove' })
		event.remove({ id: 'kaleidoscope_cookery:chopping_board' })
		event.remove({ type: 'kaleidoscope_cookery:chopping_board' })
		event.remove({ id: 'farmersdelight:cutting/tag_dough' })
		event.remove({ output: 'farmersdelight:dumplings' })
		event.remove({ output: 'farmersdelight:fried_rice' })
		event.replaceInput({}, 'farmersdelight:iron_knife', 'kaleidoscope_cookery:iron_kitchen_knife')
		event.replaceInput({}, 'farmersdelight:cooking_pot', 'kaleidoscope_cookery:stockpot')

		const CUTS = [
			['#c:dough', 'knife', 'kaleidoscope_cookery:raw_noodles'],
			['minecraft:mutton', 'knife', 'kaleidoscope_cookery:raw_lamb_chops'],
			['minecraft:cooked_mutton', 'knife', 'kaleidoscope_cookery:cooked_lamb_chops'],
			['minecraft:cooked_beef', 'knife', 'kaleidoscope_cookery:cooked_cow_offal'],
			['minecraft:cooked_porkchop', 'knife', 'kaleidoscope_cookery:cooked_pork_belly'],
			['minecraft:rabbit', 'knife', 'kaleidoscope_cookery:raw_cut_small_meats', true],
			['minecraft:cooked_rabbit', 'knife', 'kaleidoscope_cookery:cooked_cut_small_meats', true],
			['minecraft:tropical_fish', 'knife', 'kaleidoscope_cookery:sashimi'],
			['minecraft:cooked_cod', 'knife', 'minecraft:bone'],
			['minecraft:beef', 'axe', 'kaleidoscope_cookery:raw_cow_offal'],
			['minecraft:porkchop', 'axe', 'kaleidoscope_cookery:raw_pork_belly'],
			['minecraft:chicken', 'axe', 'kaleidoscope_cookery:raw_cut_small_meats', true],
			['minecraft:cooked_chicken', 'axe', 'kaleidoscope_cookery:cooked_cut_small_meats', true],
			['minecraft:cod', 'axe', 'kaleidoscope_cookery:sashimi'],
			['minecraft:salmon', 'axe', 'kaleidoscope_cookery:sashimi'],
			['minecraft:cooked_salmon', 'axe', 'minecraft:bone']
		]
		CUTS.forEach(cut => event.custom({
			type: 'farmersdelight:cutting',
			ingredients: [cut[0].charAt(0) == '#' ? { tag: cut[0].substring(1) } : { item: cut[0] }],
			result: cut[3] ? [{ item: { id: cut[2], count: 3 } }, { item: { id: 'minecraft:bone', count: 1 } }] : [{ item: { id: cut[2], count: 3 } }],
			tool: cut[1] == 'axe' ? [{ type: 'farmersdelight:item_ability', action: 'axe_strip' }, { tag: 'minecraft:axes' }] : [{ type: 'farmersdelight:item_ability', action: 'knife_dig' }, { tag: 'c:tools/knife' }]
		}))
	})
	ServerEvents.tags('item', event => {
		event.remove('minecraft:swords', 'discerning_the_eldritch:echo_greatsword')
		event.remove('c:ingots/lead', 'alchemancy:lead_ingot')
		event.add('kaleidoscope_cookery:united', ['farmersdelight:iron_knife', 'farmersdelight:golden_knife', 'farmersdelight:diamond_knife', 'farmersdelight:netherite_knife', 'farmersdelight:cooking_pot', 'farmersdelight:skillet', 'farmersdelight:stove', 'farmersdelight:raw_pasta', 'farmersdelight:dumplings', 'farmersdelight:fried_rice', 'kaleidoscope_cookery:chopping_board'])
		event.add('c:foods/pasta', 'kaleidoscope_cookery:raw_noodles')
		event.add('c:pasta', 'kaleidoscope_cookery:raw_noodles')
	})
})()
