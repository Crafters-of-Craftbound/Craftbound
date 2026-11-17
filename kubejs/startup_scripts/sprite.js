(() => {
	const $KernelspriteEntity = Java.loadClass('com.mraof.minestuck.entity.KernelspriteEntity')
	const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
	const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
	const SPRITE = $ResourceLocation.parse('kubejs:sprite')

	StartupEvents.registry('entity_type', event => {
		const $Builder = Java.loadClass('net.minecraft.world.entity.EntityType$Builder')
		const $MobCategory = Java.loadClass('net.minecraft.world.entity.MobCategory')
		event.createCustom('kubejs:sprite', () => $Builder.of((type, level) => new $KernelspriteEntity(type, level), $MobCategory.MISC).sized(0.6, 1.8).fireImmune().build('kubejs:sprite'))
	})

	EntityJSEvents.createAttributes(event => {
		if ($BuiltInRegistries.ENTITY_TYPE.containsKey(SPRITE)) event.getMap().put($BuiltInRegistries.ENTITY_TYPE.get(SPRITE), $KernelspriteEntity.kernelspriteAttributes().build())
	})

	if (Platform.isClientEnvironment()) ClientEvents.entityRendererRegistry(event => {
		const $EntityRenderer = Java.loadClass('net.minecraft.client.renderer.entity.EntityRenderer')
		const $KernelspriteRenderer = Java.loadClass('com.mraof.minestuck.client.renderer.entity.KernelspriteRenderer')
		const $ItemDisplayContext = Java.loadClass('net.minecraft.world.item.ItemDisplayContext')
		const $EquipmentSlot = Java.loadClass('net.minecraft.world.entity.EquipmentSlot')
		const $Quaternionf = Java.loadClass('org.joml.Quaternionf')
		const $Minecraft = Java.loadClass('net.minecraft.client.Minecraft')
		const $Sheets = Java.loadClass('net.minecraft.client.renderer.Sheets')
		const $RenderType = Java.loadClass('net.minecraft.client.renderer.RenderType')
		const $TextureAtlas = Java.loadClass('net.minecraft.client.renderer.texture.TextureAtlas')
		const $MultiBufferSource = Java.loadClass('net.minecraft.client.renderer.MultiBufferSource')
		const $VertexConsumerWrapper = Java.loadClass('net.neoforged.neoforge.client.model.pipeline.VertexConsumerWrapper')
		const whiteness = 12
		const texture = $ResourceLocation.parse('kubejs:textures/block/sprite_base.png')
		const looks = {}
		let failed = false

		const look = stack => {
			const id = String(stack.id)
			if (looks[id]) return looks[id]
			const path = id.split(':').pop()
			const small = ['iden_decor', 'cluttered', 'refurbished_furniture', 'whimsy_deco'].includes(id.split(':')[0]) && !/plush|doll|(^|_)(head|skull)(_|$)/.test(path) && !/plush|doll|\b(head|skull)\b/i.test(String(stack.getHoverName().getString()))
			looks[id] = { flip: stack.hasTag('minecraft:skulls') || id.startsWith('refurbished_furniture:'), head: small ? [1.5, 0.95, 0.25] : [2.01, 1.2, 0.25], custom: $Minecraft.getInstance().getItemRenderer().getModel(stack, null, null, 0).isCustomRenderer() }
			return looks[id]
		}

		event.register($BuiltInRegistries.ENTITY_TYPE.get(SPRITE), context => {
			const items = context.getItemRenderer()
			const dispatcher = context.getEntityRenderDispatcher()
			const baseState = $BuiltInRegistries.BLOCK.get($ResourceLocation.parse('kubejs:sprite_base')).defaultBlockState()
			const whiteSheet = $RenderType.entityTranslucent($TextureAtlas.LOCATION_BLOCKS)
			const whiten = (buffers, custom) => new JavaAdapter($MultiBufferSource, {
				getBuffer: type => {
					const buffer = buffers.getBuffer(type == $Sheets.translucentCullBlockSheet() || type == $Sheets.translucentItemSheet() ? whiteSheet : type)
					if (!custom) return buffer
					return new JavaAdapter($VertexConsumerWrapper, { setUv1: (u, v) => buffer.setUv1(whiteness, 10) }, buffer)
				}
			})
			const draw = (place, flip, pose, paint) => {
				pose.pushPose()
				try {
					pose.translate(0, 0.6, 0)
					pose.mulPose(new $Quaternionf().rotationY((180 - dispatcher.camera.getYRot()) * Math.PI / 180))
					pose.translate(0, place[1], place[2])
					if (flip) pose.mulPose(new $Quaternionf().rotationY(Math.PI))
					pose.scale(place[0], place[0], place[0])
					pose.mulPose(new $Quaternionf().rotationY(Math.PI))
					paint()
				} finally {
					pose.popPose()
				}
			}
			try {
				return new JavaAdapter($EntityRenderer, {
					render: function (sprite, yaw, partialTick, pose, buffers, light) {
						const head = sprite.getItemBySlot($EquipmentSlot.HEAD)
						const second = sprite.getItemBySlot($EquipmentSlot.MAINHAND)
						try {
							draw([1.25, -0.17, 0], false, pose, () => {
								const blocks = $Minecraft.getInstance().getBlockRenderer()
								pose.translate(-0.5, -0.5, -0.5)
								blocks.getModelRenderer().renderModel(pose.last(), buffers.getBuffer($Sheets.cutoutBlockSheet()), baseState, blocks.getBlockModel(baseState), 1, 1, 1, light, 655360)
							})
							if (!head.isEmpty()) draw(look(head).head, look(head).flip, pose, () => items.renderStatic(head, $ItemDisplayContext.NONE, light, whiteness | 10 << 16, pose, whiten(buffers, look(head).custom), null, 0))
							if (!second.isEmpty()) draw([1.75, 1.84, 0.09], look(second).flip, pose, () => items.renderStatic(second, $ItemDisplayContext.NONE, light, whiteness | 10 << 16, pose, whiten(buffers, look(second).custom), null, 0))
						} catch (error) {
							if (!failed) console.error(`Sprite renderer: ${error}`)
							failed = true
						}
					},
					getTextureLocation: sprite => texture
				}, context)
			} catch (error) {
				console.error(`Sprite renderer: ${error}`)
				return new $KernelspriteRenderer(context)
			}
		})
	})
})()
