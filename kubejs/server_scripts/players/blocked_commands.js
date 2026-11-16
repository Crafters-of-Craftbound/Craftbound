(() => {
	ServerEvents.command(event => {
		if (['tpa', 'tpaccept', 'tpahere', 'tpdeny', 'tpcancel', 'sethome', 'delhome', 'home', 'homes', 'back'].includes(String(event.commandName))) event.cancel()
	})
})()
