(() => {
	const $UseKey = Java.loadClass('net.neoforged.neoforge.client.event.InputEvent$InteractionKeyMappingTriggered')
	const $Priority = Java.loadClass('net.neoforged.bus.api.EventPriority')

	NativeEvents.onEvent($Priority.HIGHEST, $UseKey, event => {
		const player = Client.player
		if (!event.isUseItem() || !player || !player.isCreative()) return
		const eye = player.getEyePosition()
		const end = eye.add(player.getLookAngle().scale(player.blockInteractionRange()))
		const found = player.level.getEntities(player, player.boundingBox.expandTowards(end.subtract(eye)).inflate(1), entity => String(entity.type).startsWith('create:') && (entity.boundingBox.contains(eye) || entity.boundingBox.clip(eye, end).isPresent()))
		if (found.isEmpty()) return
		event.setSwingHand(false)
		event.setCanceled(true)
	})
})()
