(() => {
	Platform.mods.kubejs.name = 'SBURB'

	StartupEvents.registry('block', event => {
        event.create('krypton_moss').displayName('Krypton Moss').soundType('grass').lightLevel(0.7)
		event.create('xenon_moss').displayName('Xenon Moss').soundType('grass').lightLevel(0.7)
		event.create('argon_moss').displayName('Argon Moss').soundType('grass').lightLevel(0.7)
		event.create('infusizer_top', 'cardinal').displayName('Infusilizer').soundType('metal').box(0, 0, 0, 16, 3, 16).fullBlock(false).tagBlock('minecraft:mineable/pickaxe').requiresTool(true).hardness(5.0).resistance(6.0).renderType('cutout').noDrops()
		event.create('infusizer_rod', 'cardinal').displayName('Infusilizer').soundType('metal').box(12, 0, 12, 16, 16, 16).fullBlock(false).tagBlock('minecraft:mineable/pickaxe').requiresTool(true).hardness(5.0).resistance(6.0).renderType('cutout').noDrops()
		event.create('neon_moss').displayName('Neon Moss').soundType('grass').lightLevel(0.7)
		const CORALS = { tube: '#226FAF', brain: '#CE569A', bubble: '#923EB5', fire: '#A2211C', horn: '#DBA931' }
		Object.keys(CORALS).forEach(colour => {
			let name = colour[0].toUpperCase() + colour.slice(1)
			event.create(`${colour}_coral_block`).displayName(`Surface ${name} Coral Block`).soundType('coral_block').hardness(1.5).resistance(6).requiresTool(true).tagBlock('minecraft:mineable/pickaxe').mapColor(CORALS[colour])
			event.create(`${colour}_coral`).displayName(`Surface ${name} Coral`).soundType('wet_grass').hardness(0).noCollision().notSolid().defaultCutout().box(2, 0, 2, 14, 15, 14).item(item => item.parentModel('minecraft:item/generated').texture('layer0', `kubejs:item/${colour}_coral`)).mapColor(CORALS[colour])
		})
		event.create('thick_slime_block').displayName('Thick Slime Block').soundType('slime_block').hardness(0).slipperiness(0.8).bounciness(1).fallenOn(fall => { if (fall.entity.isSuppressingBounce()) fall.applyFallDamage() }).mapColor('#6AB858')
		event.create('honeyfied_slime_block').displayName('Honeyfied Slime Block').soundType('honey_block').hardness(0).slipperiness(0.8).bounciness(1).fallenOn(fall => { if (fall.entity.isSuppressingBounce()) fall.applyFallDamage() }).mapColor('#EA971B')
		const $BasicKubeBlock = Java.loadClass('dev.latvian.mods.kubejs.block.custom.BasicKubeBlock')
		const $Builder = Java.loadClass('dev.latvian.mods.kubejs.block.custom.BasicKubeBlock$Builder')
		const $Block = Java.loadClass('net.minecraft.world.level.block.Block')
		const $Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')

		const registerCloud = (id, displayName, colour) => event.createCustom('kubejs:' + id, () => {
			return new JavaAdapter($BasicKubeBlock, {
				getCollisionShape: (blockState, blockGetter, blockPos, collisionContext) => $Block.box(0, 0, 0, 16, 13, 16),
				getShape: (blockState, blockGetter, blockPos, collisionContext) => $Shapes.block(),
				getBlockSupportShape: (blockState, blockGetter, blockPos) => $Shapes.block(),
				getVisualShape: (blockState, blockGetter, blockPos, collisionContext) => $Shapes.block()
			}, new $Builder('kubejs:' + id)
				.displayName(displayName)
				.fullBlock(false)
				.soundType('wool')
				.bounciness(0.5)
				.fallenOn(e => { if (e.entity != null) e.entity.fallDistance = 0 })
				.tagBlock('minecraft:mineable/hoe')
				.hardness(0.3)
				.box(0, 0, 0, 16, 13, 16)
				.mapColor(colour)
			)
		})

		registerCloud('cloud', 'Cloud', '#E3F6FC')
		registerCloud('overcast_cloud', 'Overcast Cloud', '#C3D4E5')
		registerCloud('dark_cloud', 'Dark Cloud', '#6C7E83')
		registerCloud('thundercloud', 'Thundercloud', '#385964')




		event.create('fresh_prince_plushie', 'cardinal').displayName('§2Fresh Prince Plush').soundType('wool').fullBlock(false).box(4, 0, 2, 12, 15, 12)
		event.create('thresh_prince_plushie', 'cardinal').displayName('§7Thresh Prince Plush').soundType('wool').fullBlock(false).box(4, 0, 2, 12, 15, 12)
		event.create('durian_plushbomb').displayName('§aDurian Plushbomb').soundType('wool').box(3.5, 1.5, 3, 12.5, 10.5, 12).fullBlock(false)
		event.create('cathedral_cannon', 'cardinal').displayName('§6Cathedral Cannon').soundType('stone').box(0, 0, 4, 16, 16, 12).fullBlock(false)
		event.create('second_coming_of_durian_with_a_gun', 'cardinal').displayName('§6The Second Coming of Durian with a Gun').soundType('wool').box(0.5, 2.6, 1, 17.7, 17, 13.9).fullBlock(false)
		event.create('matriyarn').displayName('§7Matriyarn').soundType('wool').resistance(1.0).requiresTool(false).lightLevel(0.0).box(3.5, 1.5, 3, 12.5, 10.5, 12)
		event.create('sprite_base').displayName('Sprite').soundType('wool').requiresTool(false).fullBlock(false).opaque(false).notSolid().transparent(true).box(4, 0, 4, 12, 16, 12)
		event.create('sburb').displayName('Sburb Block').soundType('stone').hardness(1.0).resistance(1.0).requiresTool(false).lightLevel(1.0)
		event.create('dna_sequencer').displayName('§aDNA Sequencer').soundType('stone').resistance(1.0).requiresTool(false).lightLevel(0.0)
		event.create('techusb_block', 'cardinal').displayName('§bT3CHN-0.ska').soundType('stone').resistance(1.0).requiresTool(false).lightLevel(0)
			.unbreakable().fullBlock(false).opaque(false).notSolid().transparent(true).box(4, 7, 0, 12, 11, 10, true)
		event.create('magicusb_block', 'cardinal').displayName('§dM4G-1C.ska').soundType('stone').resistance(1.0).requiresTool(false).lightLevel(0)
			.unbreakable().fullBlock(false).opaque(false).notSolid().transparent(true).box(4, 7, 0, 12, 11, 10, true)
		event.create('explorationusb_block', 'cardinal').displayName('§53XPL-0R3.ska').soundType('stone').resistance(1.0).requiresTool(false).lightLevel(0)
			.unbreakable().fullBlock(false).opaque(false).notSolid().transparent(true).box(4, 7, 0, 12, 11, 10, true)
		event.create('alchemizeusb_block', 'cardinal').displayName('§44LCH3M-1Z3.ska').soundType('stone').resistance(1.0).requiresTool(false).lightLevel(0)
			.unbreakable().fullBlock(false).opaque(false).notSolid().transparent(true).box(4, 7, 0, 12, 11, 10, true)
		event.create('paradox_autoclave').displayName('§aParadox Autoclave').soundType('stone').resistance(1.0).requiresTool(false).lightLevel(0.0).renderType('cutout')

		event.create('pajama_box').displayName('Pajama Box').soundType('stone').unbreakable()
		event.create('prospit_vault').displayName('Prospitian Vault').soundType('stone').unbreakable()

		event.create('breath0').displayName('Breath Lair Entrance').soundType('stone').unbreakable()
		event.create('breath_pedestal').displayName('Breath Pedestal').soundType('stone').unbreakable()
		event.create('breath1').displayName('Breath Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#0086EB')
		event.create('breath2').displayName('Breath Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#10E0FF')
		event.create('breath3').displayName('Breath Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('light0').displayName('Light Lair Entrance').soundType('stone').unbreakable()
		event.create('light_pedestal').displayName('Light Pedestal').soundType('stone').unbreakable()
		event.create('light1').displayName('Light Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#f98100')
		event.create('light2').displayName('Light Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#fff547')
		event.create('light3').displayName('Light Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('space0').displayName('Space Lair Entrance').soundType('stone').unbreakable()
		event.create('space_pedestal').displayName('Space Pedestal').soundType('stone').unbreakable()
		event.create('space1').displayName('Sburban Black').soundType('stone').unbreakable().requiresTool(false).mapColor('#000000')
		event.create('space2').displayName('Sburban White').soundType('stone').unbreakable().requiresTool(false).lightLevel(1.0).mapColor('#ffffff')
		event.create('space3').displayName('Space Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#000000')
		event.create('space4').displayName('Space Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#ffffff')
		event.create('space5').displayName('Space Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('time0').displayName('Time Lair Entrance').soundType('stone').unbreakable()
		event.create('time_pedestal').displayName('Time Pedestal').soundType('stone').unbreakable()
		event.create('time1').displayName('Time Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#b70d0e')
		event.create('time2').displayName('Time Bricks').soundType('stone').unbreakable().requiresTool(false).lightLevel(1.0).mapColor('#ff2106')
		event.create('time3').displayName('Time Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('void0').displayName('Void Lair Entrance').soundType('stone').unbreakable()
		event.create('void_pedestal').displayName('Void Pedestal').soundType('stone').unbreakable()
		event.create('void1').displayName('Void Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#033476')
		event.create('void2').displayName('Void Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#00164F')
		event.create('void3').displayName('Void Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('hope0').displayName('Hope Lair Entrance').soundType('stone').unbreakable()
		event.create('hope_pedestal').displayName('Hope Pedestal').soundType('stone').unbreakable()
		event.create('hope1').displayName('Hope Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#FFE094')
		event.create('hope2').displayName('Hope Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#fdfdfd')
		event.create('hope3').displayName('Hope Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('heart0').displayName('Heart Lair Entrance').soundType('stone').unbreakable()
		event.create('heart_pedestal').displayName('Heart Pedestal').soundType('stone').unbreakable()
		event.create('heart1').displayName('Heart Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#6e0e2e')
		event.create('heart2').displayName('Heart Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#bd1864')
		event.create('heart3').displayName('Heart Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('life0').displayName('Life Lair Entrance').soundType('stone').unbreakable()
		event.create('life_pedestal').displayName('Life Pedestal').soundType('stone').unbreakable()
		event.create('life1').displayName('Life Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#CCC3B4')
		event.create('life2').displayName('Life Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#77c350')
		event.create('life3').displayName('Life Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('doom0').displayName('Doom Lair Entrance').soundType('stone').unbreakable()
		event.create('doom_pedestal').displayName('Doom Pedestal').soundType('stone').unbreakable()
		event.create('doom1').displayName('Doom Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#20401f')
		event.create('doom2').displayName('Doom Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#000000')
		event.create('doom3').displayName('Doom Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('mind0').displayName('Mind Lair Entrance').soundType('stone').unbreakable()
		event.create('mind_pedestal').displayName('Mind Pedestal').soundType('stone').unbreakable()
		event.create('mind1').displayName('Mind Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#50b250')
		event.create('mind2').displayName('Mind Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#46fbc4')
		event.create('mind3').displayName('Mind Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('rage0').displayName('Rage Lair Entrance').soundType('stone').unbreakable()
		event.create('rage_pedestal').displayName('Rage Pedestal').soundType('stone').unbreakable()
		event.create('rage1').displayName('Rage Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#391e71')
		event.create('rage2').displayName('Rage Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#9c4dad')
		event.create('rage3').displayName('Rage Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('blood0').displayName('Blood Lair Entrance').soundType('stone').unbreakable()
		event.create('blood_pedestal').displayName('Blood Pedestal').soundType('stone').unbreakable()
		event.create('blood1').displayName('Blood Stone').soundType('stone').unbreakable().requiresTool(false).mapColor('#3d1909')
		event.create('blood2').displayName('Blood Bricks').soundType('stone').unbreakable().requiresTool(false).mapColor('#BA1915')
		event.create('blood3').displayName('Blood Quest Bedrock').soundType('stone').unbreakable().requiresTool(false)

		event.create('hoard_expulsor').displayName('Grist Rig').soundType('stone').requiresTool(true).tagBlock('minecraft:mineable/pickaxe').notSolid()
		event.create('void_labyrinth_end').displayName('Void Labyrinth End').soundType('stone').unbreakable()
		event.create('seed_vault').displayName('Seed Vault').soundType('stone')
		event.create('unexploded_bomb').displayName('Unexploded Bomb').soundType('wool').unbreakable()
		event.create('defused_bomb').displayName('Defused Bomb').soundType('wool')
		event.create('soul_wall').displayName('Soul Wall').soundType('wool').unbreakable()
		event.create('untrue_soul').displayName('Untrue Soul').soundType('wool').hardness(0.8).tagBlock('minecraft:wool')
		event.create('slot_machine').displayName('Slot Machine').soundType('stone').unbreakable()
		event.create('broken_slot_machine').displayName('Broken Slot Machine').soundType('stone').unbreakable()
		event.create('stage_platform').displayName('Stage Platform').soundType('stone')
		event.create('puzzle_gate').displayName('Puzzle Gate').soundType('stone').unbreakable()
	})
	StartupEvents.registry('item', event => {
		const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
		const $ItemProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')
		;['cloud', 'overcast_cloud', 'dark_cloud', 'thundercloud'].forEach(id => {
			event.createCustom('kubejs:' + id, () => new $BlockItem(Block.getBlock('kubejs:' + id), new $ItemProperties()))
		})
	})
	StartupEvents.registry('fluid', event => {
		event.create('paradox_slime').displayName('Paradox Slime').stillTexture('kubejs:block/paradox_slime_still').flowingTexture('kubejs:block/paradox_slime_flow')
		event.create('battery_acid').displayName('Battery Acid').stillTexture('kubejs:block/battery_acid_still').flowingTexture('kubejs:block/battery_acid_flow')
	})

	const SBURB_MACHINES = ['minestuck:cruxtruder_center', 'minestuck:cruxtruder_corner', 'minestuck:cruxtruder_side', 'minestuck:cruxtruder_top_center', 'minestuck:cruxtruder_top_corner', 'minestuck:cruxtruder_top_side', 'minestuck:cruxtruder_tube', 'minestuck:cruxtruder_lid', 'minestuck:totem_lathe_bottom_left', 'minestuck:totem_lathe_bottom_right', 'minestuck:totem_lathe_card_slot', 'minestuck:totem_lathe_middle', 'minestuck:totem_lathe_top', 'minestuck:totem_lathe_top_corner', 'minestuck:totem_lathe_wheel', 'minestuck:totem_lathe_dowel_rod', 'minestuck:alchemiter_center', 'minestuck:alchemiter_corner', 'minestuck:alchemiter_left_side', 'minestuck:alchemiter_right_side', 'minestuck:alchemiter_totem_corner', 'minestuck:alchemiter_totem_pad', 'minestuck:punch_designix_keyboard', 'minestuck:punch_designix_left_leg', 'minestuck:punch_designix_right_leg', 'minestuck:punch_designix_slot', 'minestuck:mini_cruxtruder', 'minestuck:mini_totem_lathe', 'minestuck:mini_alchemiter', 'minestuck:mini_punch_designix', 'minestuck:holopad', 'minestuck:intellibeam_laserstation', 'minestuck:lotus_time_capsule_base']

	BlockEvents.modification(event => {
		event.modify(SBURB_MACHINES, block => {
			block.explosionResistance = 3600000
		})
		event.modify(['minestuck:computer', 'minestuck:old_computer', 'minestuck:laptop', 'minestuck:crockertop', 'minestuck:hubtop', 'minestuck:lunchtop', 'minestuck_extended:skaia_pc'], block => {
			block.requiresTool = false
		})
	})
})()





