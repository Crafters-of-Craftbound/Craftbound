(() => {
	const $CompileRenderLayers = Java.loadClass('software.bernie.geckolib.event.GeoRenderEvent$Entity$CompileRenderLayers')
	const $GeoRenderLayer = Java.loadClass('software.bernie.geckolib.renderer.layer.GeoRenderLayer')
	const $UnderlingRenderer = Java.loadClass('com.mraof.minestuck.client.renderer.entity.UnderlingRenderer')
	const $EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')
	const $RenderType = Java.loadClass('net.minecraft.client.renderer.RenderType')
	const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
	const $NativeImage = Java.loadClass('com.mojang.blaze3d.platform.NativeImage')
	const $DynamicTexture = Java.loadClass('net.minecraft.client.renderer.texture.DynamicTexture')
	const $ARGB32 = Java.loadClass('net.minecraft.util.FastColor$ARGB32')
	const $Random = Java.loadClass('java.util.Random')
	const impLooks = {}
	Object.keys(global.prototypeArchetypes).filter(archetype => global.prototypeArchetypes[archetype].look.bones).forEach(archetype => impLooks[`kubejs:prototype_${archetype}`] = global.prototypeArchetypes[archetype].look)
	const boneSlots = {}
	Object.keys(impLooks).forEach(tag => impLooks[tag].bones.forEach(name => boneSlots[name] = name.replace(tag.replace('kubejs:prototype_', '').split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''), '')))
	const slotDefaults = ['HeadDefault', 'EyesDefault', 'MouthDefault', 'BodyDefault', 'LeftShoulderDefault', 'RightShoulderDefault', 'LeftElbowDefault', 'RightElbowDefault', 'LeftHandDefault', 'RightHandDefault', 'LeftFootDefault', 'RightFootDefault']
	const gristMasks = {}
	let shownLooks = []
	let shownBones = []
	let hiddenDefaults = []
	let failed = false

	function readImage(location) {
		const resource = Client.getResourceManager().getResource(location)
		if (resource.isEmpty()) return null
		const stream = resource.get().open()
		const image = $NativeImage['read(java.io.InputStream)'](stream)
		stream.close()
		return image
	}

	function gristMask(underling, mask) {
		const maskLocation = $ResourceLocation.parse(`minestuck:textures/entity/underlings/imp/${mask}_mask.png`)
		const gristId = underling.getGristType().getTextureId()
		const location = $ResourceLocation.fromNamespaceAndPath('kubejs', `imp_prototypes/${mask}_${gristId.namespace}_${gristId.path}`)
		if (gristMasks[location]) return gristMasks[location]
		const gristImage = readImage(gristId.withPath(`textures/entity/underlings/${gristId.path}.png`))
		if (!gristImage) {
			gristMasks[location] = maskLocation
			return maskLocation
		}
		const maskImage = readImage(maskLocation)
		const layered = new $NativeImage(maskImage.getWidth(), maskImage.getHeight(), true)
		let x = 0
		let y = 0
		for (x = 0; x < maskImage.getWidth(); x++) {
			for (y = 0; y < maskImage.getHeight(); y++) {
				layered.setPixelRGBA(x, y, (maskImage.getPixelRGBA(x, y) >>> 24) == 0 ? 0 : gristImage.getPixelRGBA(x % gristImage.getWidth(), y % gristImage.getHeight()))
			}
		}
		maskImage.close()
		gristImage.close()
		Client.getTextureManager()['register(net.minecraft.resources.ResourceLocation,net.minecraft.client.renderer.texture.AbstractTexture)'](location, new $DynamicTexture(layered))
		gristMasks[location] = location
		return location
	}

	NativeEvents.onEvent($CompileRenderLayers, event => {
		const renderer = event.getRenderer()
		if (!(renderer instanceof $UnderlingRenderer)) return
		event.addLayer(new JavaAdapter($GeoRenderLayer, {
			preRender: (poseStack, underling, bakedModel) => {
				shownLooks = []
				if (String(underling.type) != 'minestuck:imp') return
				const prototypes = String(underling.getItemBySlot($EquipmentSlot.BODY).customData)
				const slotChoices = {}
				try {
					Object.keys(impLooks).filter(archetype => prototypes.includes(archetype)).forEach(archetype => impLooks[archetype].bones.forEach(name => slotChoices[boneSlots[name]] = (slotChoices[boneSlots[name]] || []).concat(name)))
					shownBones = Object.keys(slotChoices).map(slot => slotChoices[slot][new $Random((String(underling.uuid) + slot).split('').reduce((hash, letter) => (hash * 31 + letter.charCodeAt(0)) | 0, 0)).nextInt(slotChoices[slot].length)])
					shownLooks = Object.keys(impLooks).map(archetype => impLooks[archetype]).filter(look => look.bones.some(name => shownBones.includes(name)))
					hiddenDefaults = shownLooks.flatMap(look => look.defaults)
					Object.keys(boneSlots).forEach(name => bakedModel.getBone(name).ifPresent(bone => bone.setHidden(!shownBones.includes(name))))
					slotDefaults.forEach(name => bakedModel.getBone(name).ifPresent(bone => bone.setHidden(hiddenDefaults.includes(name))))
				} catch (error) {
					if (!failed) console.error(`Underling prototypes: ${error}`)
					failed = true
				}
			},
			render: (poseStack, underling, bakedModel, renderType, bufferSource, buffer, partialTick, packedLight, packedOverlay) => {
				if (underling.isInvisible()) return
				const gristColor = underling.getGristType().getUnderlingColor()
				const detailsGrey = (((gristColor & 255) + ((gristColor >> 8) & 255) + ((gristColor >> 16) & 255)) / 3) > 170 ? 0.3 : 1
				const bodyType = $RenderType.entityCutoutNoCull(renderer.getTextureLocation(underling))
				const detailsType = $RenderType.entityCutoutNoCullZOffset($ResourceLocation.parse(`minestuck:textures/entity/underlings/${String(underling.type).split(':')[1]}_details.png`))
				try {
					renderer.reRender(bakedModel, poseStack, bufferSource, underling, bodyType, bufferSource.getBuffer(bodyType), partialTick, packedLight, packedOverlay, -1)
					renderer.reRender(bakedModel, poseStack, bufferSource, underling, detailsType, bufferSource.getBuffer(detailsType), partialTick, packedLight, packedOverlay, $ARGB32.colorFromFloat(1, detailsGrey, detailsGrey, detailsGrey))
					shownLooks.forEach(look => {
						let maskType = null
						if (look.mask) {
							maskType = $RenderType.entityCutoutNoCullZOffset(gristMask(underling, look.mask))
							renderer.reRender(bakedModel, poseStack, bufferSource, underling, maskType, bufferSource.getBuffer(maskType), partialTick, packedLight, packedOverlay, -1)
						}
						const paintedType = $RenderType.entityCutoutNoCullZOffset($ResourceLocation.parse(`minestuck:textures/entity/underlings/imp/${look.painted}.png`))
						renderer.reRender(bakedModel, poseStack, bufferSource, underling, paintedType, bufferSource.getBuffer(paintedType), partialTick, packedLight, packedOverlay, -1)
					})
					slotDefaults.forEach(name => bakedModel.getBone(name).ifPresent(bone => bone.setHidden(hiddenDefaults.includes(name))))
				} catch (error) {
					if (!failed) console.error(`Underling prototypes: ${error}`)
					failed = true
				}
			}
		}, renderer))
	})
})()
