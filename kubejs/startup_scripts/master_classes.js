(() => {
	const $FieldUtils = Java.loadClass('org.apache.commons.lang3.reflect.FieldUtils')
	const $EnumClass = Java.loadClass('com.mraof.minestuck.player.EnumClass')

	$FieldUtils.writeField($EnumClass.LORD, 'usedInGeneration', true, true)
	$FieldUtils.writeField($EnumClass.MUSE, 'usedInGeneration', true, true)
})()
