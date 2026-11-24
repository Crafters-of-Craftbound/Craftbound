(() => {
	const $LivingChangeTargetEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingChangeTargetEvent')
	const $LivingIncomingDamageEvent = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent')
	const $UnderlingEntity = Java.loadClass('com.mraof.minestuck.entity.underling.UnderlingEntity')

	NativeEvents.onEvent($LivingChangeTargetEvent, event => {
		if (event.getNewAboutToBeSetTarget() instanceof $UnderlingEntity && event.getEntity() instanceof $UnderlingEntity) event.setCanceled(true)
	})

	NativeEvents.onEvent($LivingIncomingDamageEvent, event => {
		if (event.getSource().getActual() instanceof $UnderlingEntity && event.getEntity() instanceof $UnderlingEntity) event.setCanceled(true)
	})
})()
