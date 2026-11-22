(() => {
	const archetypeColors = { Fiery: '#F6B26B', Icy: '#00FFFF', Hasty: '#FFE599' }

	ItemEvents.modifyTooltips(event => {
		event.add('#kubejs:prototypable', Text.gray('Prototypable'))
		event.modify('#kubejs:prototypable', tooltip => tooltip.dynamic('archetypes'))
	})

	ItemEvents.dynamicTooltips('archetypes', event => {
		let line = null
		event.item.getTagKeys().forEach(tagKey => {
			const tag = tagKey.location()
			if (tag.namespace != 'kubejs' || !tag.path.startsWith('prototype') || tag.path == 'prototypable') return
			let archetype = ''
			String(tag.path).replace('prototype', '').split('_').forEach(word => {
				if (word != '') archetype += word.charAt(0).toUpperCase() + word.slice(1)
			})
			if (line) line.append(Text.gray(', '))
			else line = Text.empty()
			line.append(Text.of(archetype).color(archetypeColors[archetype] || '#AAAAAA'))
		})
		if (line) event.add(line)
	})
})()
