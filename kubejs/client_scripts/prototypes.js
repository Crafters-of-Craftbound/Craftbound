(() => {
	const traits = {
		bird: ['Bird', '#A4C2F4'],
		bouncy: ['Bouncy', '#46BDC6'],
		bullish: ['Bullish', '#EA9999'],
		fungal: ['Fungal', '#D5A6BD'],
		hog: ['Hog', '#E06666'],
		plunderer: ['Plunderer', '#660000'],
		horse: ['Horse', '#A37D5D'],
		zombie: ['Zombie', '#62832E'],
		skeletal: ['Skeletal', '#D9D9D9'],
		plant: ['Plant', '#34A853'],
		ghostly: ['Ghostly', '#D9D2E9'],
		lovecraftian: ['Lovecraftian', '#0B5394'],
		aquatic: ['Aquatic', '#5A91C3'],
		ender: ['Ender', '#9900FF'],
		armored: ['Armored', '#F9CB9C'],
		stoney: ['Stoney', '#D3C3B5'],
		propeller: ['Propeller', '#FD1C71'],
		technological: ['Technological', '#D9D9D9'],
		casualwear: ['Casualwear', '#D9EAD3'],
		crowned: ['Crowned', '#FFD966'],
		horned: ['Horned', '#45818E'],
		bug: ['Bug', '#B6D7A8'],
		feline: ['Feline', '#FFE599'],
		wizard: ['Wizard', '#8E7CC3'],
		cooking: ['Cooking', '#0B5394'],
		fluffy: ['Fluffy', '#C4EFFF'],
		agile: ['Agile', '#00FFFF'],
		jumping: ['Jumping', '#CC0000'],
		winterwear: ['Winterwear', '#0B5394'],
		grizzly: ['Grizzly', '#C27737'],
		icy: ['Icy', '#00FFFF'],
		top_hat: ['Top Hat', '#674EA7'],
		overalls: ['Overalls', '#3D85C6'],
		bling: ['Bling', '#FFFF00'],
		business: ['Business', '#434343'],
		canine: ['Canine', '#A2C4C9'],
		crab: ['Crab', '#F6B26B'],
		explosive: ['Explosive', '#CC0000'],
		first_guardian: ['First Guardian', '#00FF00'],
		frog: ['Frog', '#6AA84F'],
		fishy: ['Fishy', '#6FA8DC'],
		clown: ['Clown', '#9900FF'],
		thorned: ['Thorned', '#E06666'],
		flaming: ['Flaming', '#F6B26B'],
		formal: ['Formal', '#E06666'],
		mighty: ['Mighty', '#990000'],
		pyjamas: ['Pyjamas', '#0000FF'],
		windy: ['Windy', '#CFE2F3'],
		winged: ['Winged', '#8E7CC3'],
		nurse: ['Nurse', '#00FF00'],
		idol: ['Idol', '#00FFFF'],
		cyclops: ['Cyclops', '#F9CB9C'],
		space_suit: ['Space Suit', '#FF9900'],
		prismatic: ['Prismatic', '#FF8AF6'],
		safety: ['Safety', '#FF9900'],
		reptilian: ['Reptilian', '#6AA84F'],
		noir: ['Noir', '#434343']
	}

	ItemEvents.modifyTooltips(event => {
		event.add('#kubejs:prototypable', Text.gray('Prototypable'))
		event.modify(Object.keys(traits).map(trait => `#kubejs:${trait}`), tooltip => tooltip.dynamic('traits'))
	})

	ItemEvents.dynamicTooltips('traits', event => {
		let line = null
		Object.keys(traits).forEach(trait => {
			if (!event.item.hasTag(`kubejs:${trait}`)) return
			if (line) line.append(Text.gray(', '))
			else line = Text.empty()
			line.append(Text.of(traits[trait][0]).color(traits[trait][1]))
		})
		if (line) event.add(line)
	})
})()
