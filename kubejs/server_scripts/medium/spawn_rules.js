(() => {
	const $SpawnPlacementCheck = Java.loadClass('net.neoforged.neoforge.event.entity.living.MobSpawnEvent$SpawnPlacementCheck')
	const $PlacementResult = Java.loadClass('net.neoforged.neoforge.event.entity.living.MobSpawnEvent$SpawnPlacementCheck$Result')
	const $PositionCheck = Java.loadClass('net.neoforged.neoforge.event.entity.living.MobSpawnEvent$PositionCheck')
	const $PositionResult = Java.loadClass('net.neoforged.neoforge.event.entity.living.MobSpawnEvent$PositionCheck$Result')
	const $EntityType = Java.loadClass('net.minecraft.world.entity.EntityType')
	const $SpawnPlacements = Java.loadClass('net.minecraft.world.entity.SpawnPlacements')
	const $SpawnPlacementTypes = Java.loadClass('net.minecraft.world.entity.SpawnPlacementTypes')
	const $Mob = Java.loadClass('net.minecraft.world.entity.Mob')

	function landSpawn(id, level, spawnType) {
		return String(spawnType) == 'NATURAL' && !String(id).startsWith('minestuck:') && /^minestuck:(debug_)?land/.test(String(level.getLevel().dimension))
	}

	NativeEvents.onEvent($SpawnPlacementCheck, event => {
		const type = event.getEntityType()
		const placement = $SpawnPlacements.getPlacementType(type)
		if (!landSpawn($EntityType.getKey(type), event.getLevel(), event.getSpawnType()) || (placement != $SpawnPlacementTypes.ON_GROUND && placement != $SpawnPlacementTypes.NO_RESTRICTIONS)) return
		if ($Mob.checkMobSpawnRules(type, event.getLevel(), event.getSpawnType(), event.getPos(), event.getRandom())) event.setResult($PlacementResult.SUCCEED)
		else event.setResult($PlacementResult.FAIL)
	})

	NativeEvents.onEvent($PositionCheck, event => {
		const mob = event.getEntity()
		if (!landSpawn(mob.type, event.getLevel(), event.getSpawnType())) return
		const range = { 'cataclysm:coral_golem': 20, 'cataclysm:coralssus': 20, 'legendary_monsters:fractured': 20, 'quark:wraith': 14 }[String(mob.type)]
		if (range && mob.level.getEntitiesWithin(AABB.of(mob.x - range, mob.y - 128, mob.z - range, mob.x + range, mob.y + 128, mob.z + range)).find(entity => entity.type == String(mob.type))) event.setResult($PositionResult.FAIL)
		else if (mob.checkSpawnObstruction(event.getLevel())) event.setResult($PositionResult.SUCCEED)
		else event.setResult($PositionResult.FAIL)
	})
})()
