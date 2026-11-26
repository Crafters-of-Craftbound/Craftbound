(() => {
	const archetypes = global.prototypeArchetypes

	function prototypedArchetypes(server) {
		const prototypes = server.persistentData.getCompound('underlingPrototypes')
		return Object.keys(archetypes).filter(archetype => prototypes.contains(`kubejs:prototype_${archetype}`))
	}

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		event.register(Commands.literal('prototypes').requires(source => source.hasPermission(2))
			.then(Commands.literal('list').executes(ctx => {
				const names = prototypedArchetypes(ctx.source.server)
				const line = Text.of('Prototypes: ')
				if (names.length == 0) line.append(Text.gray('none'))
				names.forEach((archetype, i) => {
					if (i > 0) line.append(Text.of(', '))
					line.append(Text.of(archetypes[archetype].name).color(archetypes[archetype].colour))
				})
				ctx.source.sendSuccess(line, false)
				return names.length
			}))
			.then(Commands.literal('remove').then(Commands.argument('archetype', Arguments.WORD.create(event))
				.suggests((ctx, builder) => {
					prototypedArchetypes(ctx.source.server).forEach(archetype => builder.suggest(archetype))
					return builder.buildFuture()
				})
				.executes(ctx => {
					const archetype = String(Arguments.WORD.getResult(ctx, 'archetype'))
					const pData = ctx.source.server.persistentData
					const prototypes = pData.getCompound('underlingPrototypes')
					if (!prototypes.contains(`kubejs:prototype_${archetype}`)) return 0
					prototypes.remove(`kubejs:prototype_${archetype}`)
					pData.put('underlingPrototypes', prototypes)
					ctx.source.sendSuccess(Text.of(`Removed ${archetypes[archetype].name}`), true)
					return 1
				})))
			.then(Commands.literal('clear').executes(ctx => {
				ctx.source.server.persistentData.remove('underlingPrototypes')
				ctx.source.sendSuccess(Text.of('Cleared all prototypes'), true)
				return 1
			})))
	})
})()
