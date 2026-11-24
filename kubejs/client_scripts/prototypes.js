(() => {
	ItemEvents.modifyTooltips(event => {
		event.add('#kubejs:prototypable', Text.gray('Prototypable'))
		event.modify('#kubejs:prototypable', tooltip => tooltip.dynamic('archetypes'))
	})

	ItemEvents.dynamicTooltips('archetypes', event => {
		let line = null
		event.item.getTagKeys().forEach(tagKey => {
			const tag = tagKey.location()
			const archetype = global.prototypeArchetypes[String(tag.path).replace('prototype_', '')]
			if (tag.namespace != 'kubejs' || !archetype) return
			if (line) line.append(Text.gray(', '))
			else line = Text.empty()
			line.append(Text.of(archetype.name).color(archetype.colour))
		})
		if (line) event.add(line)
	})
})()
