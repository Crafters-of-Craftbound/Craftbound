(() => {
	const $RenderGuiPre = Java.loadClass('net.neoforged.neoforge.client.event.RenderGuiEvent$Pre')
	const $CustomGuiBaseScreen = Java.loadClass('de.keksuccino.fancymenu.customization.customgui.CustomGuiBaseScreen')

	NativeEvents.onEvent($RenderGuiPre, event => {
		const meteorScreen = Client.screen
		if (meteorScreen instanceof $CustomGuiBaseScreen && String(meteorScreen.getIdentifier()).startsWith('meteor_')) event.setCanceled(true)
	})
})()
