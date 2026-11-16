(() => {
	const $CameraType = Java.loadClass('net.minecraft.client.CameraType')

	NetworkEvents.dataReceived('god_tier_camera', event => {
		const on = event.data.getBoolean('on')
		let camera = $CameraType.FIRST_PERSON
		if (on) camera = event.data.getBoolean('front') ? $CameraType.THIRD_PERSON_FRONT : $CameraType.THIRD_PERSON_BACK
		Client.options.setCameraType(camera)
		Client.options.hideGui = on || event.data.getBoolean('hideGui')
	})
})()
