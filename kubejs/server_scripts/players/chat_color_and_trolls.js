(() => {
	const $PlayerData = Java.loadClass('com.mraof.minestuck.player.PlayerData')
	const $MSAttachments = Java.loadClass('com.mraof.minestuck.util.MSAttachments')
	const $PlayerColorPackets = Java.loadClass('com.mraof.minestuck.network.PlayerColorPackets')
	const $Double = Java.loadClass('java.lang.Double')
	const $Integer = Java.loadClass('java.lang.Integer')
	const $EntityInteractSpecific = Java.loadClass('net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$EntityInteractSpecific')
	const $HashMap = Java.loadClass('java.util.HashMap')
	const $DiscordMinecraftUtils = Java.loadClass('com.denisnumb.discord_chat_mod.MinecraftUtils')
	const $DiscordChannelCategory = Java.loadClass('com.denisnumb.discord_chat_mod.discord.model.ChannelCategory')
	const $DiscordMessageType = Java.loadClass('com.denisnumb.discord_chat_mod.discord.chat_style.MessageType')
	const $DiscordParameters = Java.loadClass('com.denisnumb.discord_chat_mod.chat_style.Parameters')
	const $DiscordChatStyleProvider = Java.loadClass('com.denisnumb.discord_chat_mod.discord.chat_style.DiscordChatStyleProvider')
	const $DiscordChannelRegistry = Java.loadClass('com.denisnumb.discord_chat_mod.discord.DiscordChannelRegistry')
	const $DiscordMessageUtils = Java.loadClass('com.denisnumb.discord_chat_mod.discord.utils.DiscordMessageUtils')

	function sendPlayerChatToDiscord(player, rawMessage) {
		$DiscordMessageUtils.handleDiscord(() => {
			const processed = $DiscordMinecraftUtils.processChatMessage(rawMessage, $DiscordChannelCategory.PLAYER_CHAT)
			const parameters = new $HashMap($DiscordChatStyleProvider.buildPlayerParameters(player))
			parameters.put($DiscordParameters.MESSAGE, processed.forDiscord())
			const message = $DiscordChatStyleProvider.getDiscordMessageComponents($DiscordMessageType.CHAT, parameters)
			const webhookMessage = $DiscordChatStyleProvider.getDiscordMessageComponents($DiscordMessageType.CHAT_WEBHOOK, parameters)
			if (message.isPresent() && webhookMessage.isPresent()) {
				$DiscordMessageUtils.sendMessageFromPlayer(
					$DiscordChannelCategory.PLAYER_CHAT,
					$DiscordChannelRegistry.getAllContexts(),
					player,
					webhookMessage.get(),
					message.get()
				)
			}
		})
	}

	PlayerEvents.chat(event => {
		const player = event.player
		const color = $PlayerData.get(player).get().getData($MSAttachments.PLAYER_COLOR)
		const grimdark = player.tags.contains('Grimdark')
		let chatColor = Color.rgba((color >> 16) & 255, (color >> 8) & 255, color & 255, 255)
		if (grimdark) chatColor = '#322559'
		sendPlayerChatToDiscord(player, event.getComponent().getString())
		event.server.tell(player.getDisplayName().color(chatColor).obfuscated(grimdark)
			.append(Text.of(': ').color(Color.WHITE).obfuscated(false))
			.append(event.getComponent().color(chatColor).obfuscated(grimdark)))
		event.cancel()
	})

	ServerEvents.commandRegistry(event => {
		const Commands = event.commands
		const Arguments = event.arguments
		event.register(Commands.literal('sburb_color')
			.then(Commands.argument('r', Arguments.INTEGER.create(event))
				.then(Commands.argument('g', Arguments.INTEGER.create(event))
					.then(Commands.argument('b', Arguments.INTEGER.create(event))
						.executes(ctx => {
							const player = ctx.source.player
							const color = $Integer.valueOf($Double.valueOf(Math.round((Arguments.INTEGER.getResult(ctx, 'r') << 16) + (Arguments.INTEGER.getResult(ctx, 'g') << 8) + Arguments.INTEGER.getResult(ctx, 'b'))).intValue())
							$PlayerData.get(player).get().setData($MSAttachments.PLAYER_COLOR.get(), color)
							player.connection.send(new $PlayerColorPackets.Data(color))
							return 1
						})))))
	})

	const TROLLS = {
		'GA': { handle: 'grimoireAcademics', color: '#a10000', name: 'Grymla Atalas', title: 'Witch of Time',
			lore: "I was asked to write an entry for myself. This has been harder than all the others put together, and this is the ninth draft. I am the Witch of Time. I am very good at books and very bad at people. I like riddles and puzzles too, I suppose. On my arm is a tattoo of a dragon eating its own tail, and written into it, in my people’s language, is the task I was born to: preserve all of the world’s knowledge. I know this is impossible. I have chosen not to let that stop me. As a rustblood I have less time than most, and I have spent most of it on a future I will never see. These tomes are what I have to show for it. I was late once before. I promised myself I would never be again." },
		'UU': { handle: 'unctuousUndertaking', color: '#A7601A', name: 'Shleez Yubolt', title: 'Maid of Doom',
			lore: "I always found the Maid of Doom hard to read. Back on our planet she drove for Gruber, taking any fare she could get to make rent. It became her entire life, to the point where she rates her own mood out of five stars. I was told she smells like cigarettes before I ever met her, and my nose has since confirmed it. She is very hard to get to know. I suspect she is lonely, though she may be fine with that. Shleez built her life out of limits: a fare, a route, a rating, and a door that closes once you’ve paid. Nothing gets in that she hasn’t allowed. Doom players are supposed to understand how things end. I think she understood how ours would end before any of us did, and didn’t believe we’d listen if she said so. She was probably right about that too." },
		'f(x)': { handle: 'ferocious(xeriscape)', color: '#bf9000', name: 'Shonne Revelt', title: 'Rogue of Hope',
			lore: "The Rogue of Hope sings for Rust Velvet, a five-member idol group made up entirely of lowbloods, under the stage name Seungwannie. Before that she competed on a survival show and was voted off, which apparently happens to almost everyone. Her voice is extraordinary, and that one I can vouch for personally. Shonne stands under the stage lights, pours all of her Hope into an audience that barely knows her name, and goes home with nothing left. She did the same for us during the session. None of us thought to give any back." },
		'FR': { handle: 'flippantRockstarring', color: '#b4eb54', name: 'Niquel Frette', title: 'Sylph of Breath',
			lore: "The Sylph of Breath makes coffee for a living. He would like it recorded that this is temporary, so: it is temporary. He is going to be a rockstar. Every hour he isn’t behind the counter goes into practice, and he will play for anyone who stands still long enough. I have stood still for him several times. He is better than he thinks, and louder than he needs to be. He has spent his whole life refusing to be what anyone expected of a limeblood. A long time ago, someone told him there was something about him worth noticing, and he has carried that around ever since, which is very sweet. Breath players are supposed to carry everyone else along with them. Niquel was always too busy working out where he was going to notice the rest of us waiting for the wind." },
		'ST': { handle: 'sultryTwostep', color: '#82ab70', name: 'Maramm Serrix', title: 'Bard of Space',
			lore: "I am going to try to be objective about the Bard of Space. I will fail. Maramm is awkward to a degree I find genuinely impressive, and coming from me, that means something. She talks so fast that half of each sentence arrives after she has moved on to the next one. She collects trinkets, oddments, gizmos and whatsits, and she can tell you where every one of them came from. She holds on to everything she can touch, as though she could keep the whole of Space together by herself. She cannot understand why I care so much about tomorrow, and I cannot understand why she cares so much about now. One of us should have been listening to the other. I still haven’t decided which." },
		'PY': { handle: 'plasticineYpsiliform', color: '#009f4f', name: 'Abrill Tricot', title: 'Knight of Life',
			lore: "The Knight of Life wants to be the best, by her own standards, which are harsher than anything the rest of us could come up with. By those standards she has to be the finest troll in the world at every moment, and she carries herself as though she is. I don’t think she has ever actually felt it. Nothing she does is openly cruel, but there always seems to be a little something behind it. People tell me she is very beautiful, and perhaps people simply expect beautiful trolls to be up to something. Abrill wears success the way a Knight wears plate, polished and impressive and fastened tight over whatever she’d rather nobody saw. Her matespritship with Prytan is part of the armour. He makes her look like she’s winning." },
		'TK': { handle: 'tortfeasorsKatabasis', color: '#069a97', name: 'Prytan Harvud', title: 'Prince of Light',
			lore: "The Prince of Light will tell you, without being asked, that he is the coolest troll in whatever room he happens to be standing in. He is a proud brother of the house Delta Xi Delta. His abs were put there by electricity rather than effort, and he believes no one has noticed. Prytan has been praised for his confidence since the day he crawled out of the brooding caverns, and nobody has ever told him no. He hasn’t so much failed upward as been launched, and the session only sent him higher. He buried a lot of truths on the way up. I have wondered more than once whether one of them was the one we needed." },
		'DH': { handle: 'dredgedHermit', color: '#416199', name: 'Ganlua Pestis', title: 'Mage of Void',
			lore: "As far as anyone can tell, the Mage of Void hadn’t opened her curtains in several sweeps before the session started. Her respiteblock is lit by one computer screen, and she likes it that way. I wish she had come out of her shell (and her hive, really) sooner. There were things she knew that none of us thought to ask her about. She is fully caught up on a certain enormously long animated serial about a stretchy young pirate and his crew. Do not ask her how many arcs are left. She will tell you." },
		'GS': { handle: 'growingSocialite', color: '#0a20d4', name: 'Protca Terpet', title: 'Page of Blood',
			lore: "The Page of Blood is very famous. I didn’t know this when we first met, and he seemed genuinely hurt. Protca runs one of the most-watched video channels on the planet, and a fair share of the trolls I pass in the street know his face better than their own lusus. Most of his videos involve handing cash to strangers on the condition that they hand even more to the next stranger. I asked him once where the money came from. He did not understand the question. He has millions of followers and very few real friends, and I don’t think he has noticed which of those numbers is the problem. He holds more influence than nearly anyone I have met, and he has never worked out what it’s for. Pages grow into their power eventually. We needed ours to do it a little faster." },
		'BJ': { handle: 'backsideJotter', color: '#5D00C7', name: 'Cliste Alleic', title: 'Heir of Mind',
			lore: "If you have ever felt watched while doing something entirely ordinary, you were probably right, and it was probably the Heir of Mind. Cliste can take the smallest scrap of information and follow it all the way to your hive, your quadrants and your daily routine. I find Cliste fascinating. There is no motive behind any of it, no grudge and no blackmail. They are simply collecting, and I recognise that impulse more than I would like to admit. By the end, they knew more about each of us than we knew about each other. I have never worked out what they saw coming." },
		'RG': { handle: 'ruthlessGanef', color: '#a64d9a', name: 'Marlyn Istiof', title: 'Thief of Rage',
			lore: "The Thief of Rage has the misfortune of having nothing to do. His caste provides everything he needs, so he drifts between his hive and the neighbourhood, comfortable and bored out of his mind. His one outlet is an underground boxing ring. Whether he uses his strife specibus within the rules is a question nobody in the crowd wants answered. His fights usually last a few seconds, and they love him for it. Thieves take their aspect from others, and I believe Marlyn takes the crowd’s. He pockets every shout for blood and lives on it, because his own life is far too soft to produce any rage of its own. That worked in the ring. It did not work nearly as well in the session." },
		'DD': { handle: 'devouringDevotion', color: '#9C0857', name: 'Ricora Platgy', title: 'Seer of Heart',
			lore: "The Seer of Heart would like everyone to know that she does not like them. This is false. I tested it, extensively. She feels things so strongly that she has no idea where to put them, so she puts them nowhere and is cold to everyone instead. Very rarely, for very few trolls, the ice breaks, and underneath is one of the kindest people I have ever known. Her caste planned out her whole life before she pupated and handed her everything she ever wanted. You would expect that to spoil her. It made her bitter, because she never felt she had earned any of it or lived up to a single expectation. What she wants most is something that is hers because she made it. Seers are meant to see their aspect clearly enough to guide others by it, and for her, the seeing was always the hard part. I hope the game gave her some of that. I’m not sure there was time." }
	}

	const ASPECT_COLORS = { breath: 'aqua', mind: 'dark_aqua', void: 'dark_blue', space: 'dark_gray', doom: 'dark_green', heart: 'light_purple', blood: 'dark_red', hope: 'yellow', light: 'gold', life: 'green', time: 'red', rage: 'dark_purple' }

	const TROLLINGS = {
		'minecraft:story/enchant_item': { troll: 'GA', message: [
			"Hell☠.",
			"I hate t☠ be a b☠ther, but if I was y☠u, I'd find s☠mewhere safer f☠r that enchanting table y☠u made.",
			"Unguarded kn☠wledge is wasted kn☠wledge, y☠u kn☠w. That is all.",
			"Until next we speak,",
			"- Grymla"
		] },
		'minecraft:story/enter_the_end': { troll: 'GA', message: [
                "☠h.",
                "S☠ y☠u've finally arrived.",
                "I w☠ndered when y☠u w☠uld make it here.",
                "There is s☠mething rather unsettling ab☠ut watching s☠me☠ne appr☠ach an ending they d☠ n☠t yet understand.",
                "D☠ try n☠t t☠ be late."
] },
		'irons_spellbooks:irons_spellbooks/spell_book_equip': { troll: 'GA', message: [
			"Hell☠.",
			"I c☠ntinue t☠ find myself enthralled by y☠ur escapades, in spite ☠f h☠w little they have t☠ d☠ with me.",
			"In this regard, I c☠ngratulate y☠u. Y☠u make f☠r g☠☠d daytime televisi☠n.",
			"T☠ c☠nfess, when I said I hate t☠ be a b☠ther, I lied. I enj☠y b☠thering y☠u. ☠ur temp☠ral differential fascinates and bewilders me. That is all.",
			"Until next we speak,",
			"- Grymla"
		] },
		'artifacts:amateur_archaeologist': { troll: 'GA', message: [
			"Hell☠ there.",
			"Ap☠l☠gies f☠r interrupting, but w☠uld y☠u mind if I t☠☠k a cl☠ser l☠☠k at that?",
			"Relics ☠f a byg☠ne era are imp☠rtant. Th☠se wh☠ d☠n't learn fr☠m hist☠ry are d☠☠med t☠ repeat it. Surely y☠u kn☠w better than t☠ n☠t learn fr☠m hist☠ry?",
			"Study up, and y☠u'll live a l☠ng and pr☠sper☠us life.",
			"At least, that's what I was always t☠ld."
		] },
		'minecraft:end/dragon_egg': { troll: 'GA', message: [
			"Ahh... This really takes me back.",
			"My pe☠ple had a singular, shared lusus. A large drag☠n, n☠t unlike that ☠ne.",
			"She died quite a while ag☠, with n☠ heir. I live in her skelet☠n these days.",
			"Take care ☠f that egg. If we had taken better care ☠f M☠ther's, we might've had an easier time.",
			"Drag☠ns aren't t☠ be trifled with."
		] },
		'denizen:time': { troll: 'GA', message: [
			"S☠ y☠u ch☠se t☠ fight it.",
			"Cat-Sith kept every versi☠n ☠f y☠u that died. Every ☠ne. I ☠nce th☠ught that was the m☠st beautiful thing I had ever heard ☠f.",
			"Y☠u have just ended the ☠nly archive that w☠uld have remembered them.",
			"I am n☠t angry. I d☠ n☠t think I have the time t☠ be.",
			"I have rec☠rded it. S☠me☠ne sh☠uld.",
			"That is all. Until next we speak, if we d☠,",
			"- Grymla"
		] },
		'minecraft:adventure/trade': { troll: 'UU', message: [
			"can i get ↺hhhhh n↺mber 9 large w 2 sides. thanks ★★★★★",
			"wait this isnt the takeo↺t place? wtf ★★",
			"can yo↺ block me please i dont want this to happen again",
			"i really mean that"
		] },
		'minecraft:story/enter_the_nether': { troll: 'UU', message: [
            "oh my god",
            "yo↺ are not serio↺sly going there",
            "i am not sending a resc↺e vehicle",
            "0 stars wo↺ld not recommend this destination",
            "act↺ally i wo↺ld give it one star b↺t ↺ know how ratings work"
] },
		'minestuck:minestuck/french_fry': { troll: 'UU', message: [
			"so are ↺ gonna get some for me or",
			"it wo↺ld be make me s↺per happy ★★★★★ yknow",
			"nah im kidding grymla explained the whole time difference thing",
			"i think i ↺nderstand",
			"b↺t im so h↺ngryyyyyy",
			"hol on let me ask her again"
		] },
		'kaleidoscope_cookery:stockpot': { troll: 'UU', message: [
			"yo↺ cook",
			"i didnt",
			"i went to niq↺els cafe between fares",
			"same order every day black coffee no s↺gar",
			"didnt talk didnt wait for change",
			"he never asked me how my day was",
			"best cafe on the planet ★★★★★",
			{ troll: 'FR', text: "she was the easiest customer i ever had. she ordered, she paid, she left" },
			{ troll: 'FR', text: "no oat milque, no sirop, no 'is this decaffe?' ✨" },
			{ troll: 'FR', text: "if everyone was lique shleez i would have had time to practise" },
			"dont make it weird ★★"
		] },
		'minecraft:husbandry/safely_harvest_honey': { troll: 'UU', message: [
			"so yo↺ smoke them o↺t first and then they leave yo↺ alone",
			"makes sense",
			"thats basically how i handled passengers",
			"light ↺p before they get in and nobody tries to make conversation ★★★★★",
			"ricora said i smell like an ashtray",
			"she still sat in the front seat tho"
		] },
		'minecraft:nether/ride_strider': { troll: 'UU', message: [
			"no",
			"get off that",
			"it doesnt know where its going and yo↺ dont know where its going",
			"i drove for 4 sweeps and never once sat in the back",
			"i dont do not being in control",
			"one star for the strider ★",
			"one star for yo↺ ★"
		] },
		'denizen:doom': { troll: 'UU', message: [
			"donn told me the same thing he told yo↺",
			"theres always more bombs on the horizon",
			"i agreed with him for a really long time",
			"then i spent a whole sweep t↺rning off factories one by one on a planet that was going to choke anyway",
			"didnt save it",
			"felt good tho",
			"anyway thats the end of the ro↺te",
			"yo↺ can get o↺t here ★★★★"
		] },

		'kaleidoscope_cookery:stove': { troll: 'f(x)', message: [
			"you know, my friend niquel used to always invite me to these parties~♪",
			"where he would sing by a campfire, playing his guitar to anyone who would listen.~♪",
			"whenever i sit by one these days, i cant help but cast my mind back to when things were much simpler~♪"
		] },
		'minestuck:minestuck/return_node': { troll: 'f(x)', message: [
			"you found a return node~!♪ good work~!♪",
			"once i learned these things could take you home, i kept finding and jumping in different ones~♪",
			"while crossing my fingers that one would eventually take me back to my dorm~!!!♪",
			"haha, i was pretty stupid"
		] },
		'minecraft:husbandry/axolotl_in_a_bucket': { troll: 'f(x)', message: [
			"i always loved axolotls when i was young~!♪ where im from, theres a tv show all about them~!♪",
			"adventurlotl time, or something like that~?♪",
			"i used to dream every night about waking up with the external gills they have...~♪",
			"i used to even draw pictures of myself with them~!♪",
			"that was until i did my audition for my group~!♪ a highblood was the judge, and she DID have those external gills on her face~!!!♪",
			"she really freaked me out. the dreams stopped after that~♪"
		] },
		'minecraft:adventure/trim_with_any_armor_pattern': { troll: 'f(x)', message: [
			"oooo thats cute looking~!♪",
			"clothing is only one part of fashion though...~!♪",
			"work on your accessories, your hair, your socks and shoes, your signature scent, your eye colour, horn piercings, horn FLAVOUR...~♪",
			"youll have a whole niche carved out for yourself by then~!!!♪",
			"im totally kidding, horn piercings arent that important~♪"
		] },
		'kaleidoscope_cookery:make_soup': { troll: 'f(x)', message: [
			"something i used to love doing when i was living in dorms was making a massive pot of pasta, throwing whatever we had lying around in with it, and eating it all in a single evening~!♪",
			"my bandmates and i used to bond a lot over those dinners, wed talk so much we wouldnt even notice that the food tasted awful~!♪",
			"i hope you get to have similar experiences too, [player]~!♪"
		] },
		'denizen:hope': { troll: 'f(x)', message: [
			"you really did it huh~♪",
			"besenclae just wanted to hear the music again. i kind of understood that~♪",
			"after i fell off that stage i spent the whole sweep thinking id never sing again~♪",
			"so... i dont really know if im sad or proud right now. maybe both~♪",
			"if this is the last time we talk, thank you for listening to me~!♪",
			"seungwannie, signing off~!!♪ saranghae~♪"
		] },

		'minecraft:story/lava_bucket': { troll: 'FR', message: [
			"svp be careful with that buquet of hot lava mon petit pain",
			"would be in un bit of un piquel if you burn yourself. }:("
		] },
		'irons_spellbooks:irons_spellbooks/ink_root': { troll: 'FR', message: [
			"ah~ this was my chose préférée when we played",
			"squetching out my musique, using those uh",
			"how do you say",
			"fraymotif",
			"well then, salut!"
		] },
		'minecraft:adventure/play_jukebox_in_meadows': { troll: 'FR', message: [
			"ah, finally quelqu'un with taste ✨",
			"the grass, the flowers, un little bit of musique... c'est parfait",
			"next time put on one of mine, oui? i have demos. so many demos.",
			{ troll: 'f(x)', text: "he really does~♪ he sent me forty of them~♪" },
			"FORTY-TWO ✨"
		] },
		'minecraft:nether/brew_potion': { troll: 'FR', message: [
			"you brew? moi aussi. every day, eight hours, for people who do not say merci",
			"oat latte, extra hot, no foam, decaffe, 2 shots of sirop de vanille",
			"and if i get one thing wrong, alors }:(",
			"i was supposed to be un roquestar and it would've all been in the past ✨"
		] },
		'minecraft:nether/distract_piglin': { troll: 'FR', message: [
			"you gave un piglin gold for standing there?",
			"in two sweeps at the café i did not get that much in tips }:(",
			"maybe i should start grunting at people. it seems to worque"
		] },
		'denizen:breath': { troll: 'FR', message: [
			"so. you did not let aos sí choose for you.",
			"aos sí only wanted to talque about freedom. you answered with un sword :}",
			"someone once told me i was something special. i thinque maybe they were right, and maybe you are too ✨",
			"this is the end of the set, i thinque. no encore.",
			"merci for listening. bonne nuit, mon ami ✨"
		] },

		'lootr:1cart': { troll: 'ST', message: [
			"look! look!",
			"they found θoMething!!! (|:B",
			"iM a little diθθapointed... i could uθe that better than theM...",
			{ troll: 'GA', text: "Y☠ur speech t☠ text is ☠n." },
			"IT Iθ?",
			"",
			"iM θorry!!! i didnt Mean it!!! proMiθe!!!"
		] },
		'minestuck:minestuck/double_digits': { troll: 'ST', message: [
			"hi!!!",
			"good job on ur echeladder!!!",
			"thatθ about aθ far aθ i ever got θo...",
			"ur already doing better than Me!!!"
		] },
		'minecraft:husbandry/tadpole_in_a_bucket': { troll: 'ST', message: [
			"awww thatθ a cute little thing!",
			"you know, My land waθ full of frogθ when i entered, a few too Many frankly (|:B",
			"every θtep i took id be cruθhing like?? 5 tadpoleθ!!!",
			"i felt θo bad for weekθ!!! i gueθθ having θo Many Made the breeding proceθθ eaθier... but θeriouθly, put a cork in it guyθ!!!"
		] },
		'minecraft:husbandry/bred_all_animals': { troll: 'ST', message: [
			"awww, you Muθt have an entire Menagerie by now!",
			{ troll: 'GA', text: "A... What?" },
			"what? what did i θay wrong?"
		] },
		'denizen:space': { troll: 'ST', message: [
			"oh",
			"oh no",
			"θhe waθ really nice to Me!!! θhe gave Me a frog once!!!",
			{ troll: 'GA', text: "Maramm. That was a different sessi☠n." },
			"i know!!! i know. i juθt... i liked her",
			"okay. ok. gryMla θayθ if i dont have anything nice to θay i θhould θay it faθt and leave θo",
			"take care of the frog!",
			"bye!!! i Mean it!!! i Mean bye!!! (|:B"
		] },

		'kaleidoscope_cookery:tomato_seed': { troll: 'PY', message: [
			"Overworld crops are so... disgusting. I can't believe You eat them.",
			{ troll: 'DH', text: "um.. you liked those peaches i alchemized..." },
			"Leave me alone, DH. I'm trYing to talk to the plaYer here.",
			{ troll: 'DH', text: "oh uh... sorry my guy" }
		] },
		'minestuck:minestuck/alchemy': { troll: 'PY', message: [
			    "OkaY, so we're doing this. TrY to keep up.",
                "Looking at You... Oh mY god. Where do I even start?",
                "MaYbe we can alchemize You a personalitY. A new face feels a little too ambitious."
		] },
		'minestuck:minestuck/buy_out_shop': { troll: 'PY', message: [
			"You bought the whole shop? OkaY, I'm actuallY impressed. That never happens.",
			{ troll: 'TK', text: "¶ Babe; that's so fetch." },
			"PrYtan. Stop trYing to make fetch happen. It's not going to happen.",
			{ troll: 'TK', text: "¶ It sounδs cool." },
			"No it doesn't."
		] },
		'minecraft:husbandry/balanced_diet': { troll: 'PY', message: [
			"You ate literallY everYthing. Like, everYthing everYthing.",
			"MY whole planet was made of artisanal cheese and I still had more self-control than You.",
			{ troll: 'DD', text: "yer planet. was rottin." },
			"It was aging, Ricora. There's a difference~"
		] },
		'minecraft:story/shiny_gear': { troll: 'PY', message: [
			"Diamond armour? OkaY, I'll allow it.",
			"It's honestlY the best You've ever looked.",
			"MostlY because I can't see Your face~"
		] },
		'denizen:life': { troll: 'PY', message: [
			"Oh. You won.",
			"Congrats. That's what everYone wanted, right? To win?",
			"I won everYthing. Best grades, best parties, best boYfriend. Ask anYone.",
			"Never felt like anYthing. Not once.",
			"So if it actuallY feels like something for You...",
			"Keep it. Don't let anYone tell You it was nothing~",
			"BYe, loser. That's a compliment."
		] },

		'minecraft:adventure/shoot_arrow': { troll: 'TK', message: [
			"¶ My bros anδ I were δiscussing you earlier. We coulδn't figure out what exactly is your δeal.",
			"¶ I mean; really you're really going to have to get much stronger if you want me to bother conversing with you.",
			"¶ I have no interest in δisgusting creatures such as yourself.",
            "¶ I holδ myself anδ my bros to a stanδarδ you WISH you coulδ meet."
		] },
		'minestuck:minestuck/kill_ogre': { troll: 'TK', message: [
			"¶ Your strength is δecent; but your technique...",
			"¶ With that style of fighting; how δo you expect to δefeat the §kxxxxxxx§r",
			"¶ Yo P why δiδ it censor the worδ §kxxxxxxx§r",
			{ troll: 'GS', text: "DUDE. WE CANT TALK TO THEM ABOUT THAT YET. GRYMLA SAID." },
			"¶ Ohhh bruh for real?"
		] },
		'minecraft:story/cure_zombie_villager': { troll: 'TK', message: [
			"¶ Δamn; you got him off. Full acquittal.",
			"¶ He was obviously guilty of being a zombie; but that's never stoppeδ a gooδ attorney.",
			"¶ I'll waive my fee this time. Δon't tell my δaδ."
		] },
		'minestuck:minestuck/all_modi': { troll: 'TK', message: [
			"¶ Every moδus? Respect. Mine was beer pong; you sank the cup or you δiδn't get your stuff.",
			{ troll: 'GS', text: "MINE WOULDN'T GIVE MY CHARGER BACK TILL THE VIDEO HIT 10K. LIKE AND SUB." },
			{ troll: 'PY', text: "Mine onlY gave things back when theY were trending. So, constantlY~" },
			{ troll: 'RG', text: "mine was a fishing game. you couldnT use iT wiThouT waTer. luckily i was in waTer a loT." },
			{ troll: 'DH', text: "mine was a pile.. you had to dump everything out to find anything.. my floor still looks like that tbh" },
			{ troll: 'ST', text: "Magic hat waθ the beθt one and i aM not taking queθtionθ (|:B" },
			{ troll: 'GA', text: "It was the w☠rst ☠ne. It was mine first. I traded it away f☠r a reas☠n." },
			{ troll: 'DD', text: "ah never. had one. modi were. pure lame." },
			{ troll: 'UU', text: "i rented mine o↺t most of the time" },
			"¶ To who?",
			{ troll: 'BJ', text: "whom :)" },
			{ troll: 'UU', text: "none of yo↺r b↺siness ★★★★★" }
		] },
		'minecraft:nether/return_to_sender': { troll: 'TK', message: [
			"¶ Now that's how it's δone; you threw their own eviδence right back at them.",
			"¶ Classic counterargument.",
			"¶ I useδ to δo that in court all the time. Mostly with things that weren't technically eviδence."
		] },
		'denizen:light': { troll: 'TK', message: [
			"¶ Let me get this straight.",
			"¶ A literal goδ offereδ you a δeal; anδ you turneδ it δown to fight him?",
			"¶ I've brokereδ a lot of δeals. Never once δiδ I think 'what if I just punch the guy'.",
			"¶ ...Okay; that's actually kinδ of baller.",
			"¶ My δaδ always saiδ the best case is the one you never have to take to court. I always thought he was full of it.",
			"¶ Maybe not.",
			"¶ This court is aδjourneδ. Δon't make me come finδ you."
		] },

		'minecraft:adventure/avoid_vibration': { troll: 'DH', message: [
			"wow... you are narrowly avoiding an awful confrontation rn...",
			"oh... hope i'm not making it harder for you... with the text noises...",
			"i'll go now",
			"my bad"
		] },
		'minecraft:adventure/totem_of_undying': { troll: 'DH', message: [
                "oh.",
                "you almost died there huh",
                "i guess its nice to have something around that can stop that from happening",
                "not that i think about that sort of thing often",
                "anyway. glad youre still here"
] },
		'mekanismgenerators:heat_generator': { troll: 'DH', message: [
			"you know. most of the time",
			"i sit in my hive with no lights on except my computer",
			"its comforting. in a way. gets cold though",
			"something like this wouldve been nice"
		] },
		'minestuck:minestuck/bugs': { troll: 'DH', message: [
			"a bug... for eating?",
			"my lusus used to do that.. she sat up in the corner and ate whatever got in",
			"i thought it was gross.. kind of jealous now tbh. she never had to order food",
			{ troll: 'UU', text: "i co↺ld bring yo↺ food yk ★★★★" },
			"oh.. no thats ok.. you'd have to see me"
		] },
		'minestuck:minestuck/legendary_weapon': { troll: 'DH', message: [
			"oh.. you got a legendary weapon",
			"thats very main character of you",
			"in the show i watch the main guy just punches everything.. i tried that once",
			"i couldnt really throw a punch though.. so",
			"anyway congrats"
		] },
		'minecraft:husbandry/plant_seed': { troll: 'DH', message: [
			"you planted something.. outside.. in the sun",
			"i had a cactus once.. it died.. in the dark",
			"sorry cactus"	
		] },
		'denizen:void': { troll: 'DH', message: [
			"hey.. you beat llyr",
			"you know... my consorts were hedgehogs. theres this thing called the hedgehog dilemma",
			"you want to get close to people but the closer you get the more you both get hurt.. so you just.. dont",
			"llyr picked dont. i picked dont for a really long time",
			"you seem to have friends so, i guess you picked do. thats kind of cool lol",
			"ok im gonna go before i make this weird.. bye"
		] },

		'minestuck:minestuck/commune': { troll: 'GS', message: [
			"BRO IS POPULAR",
			"WE *NEED* TO COLLAB",
			"DO YOU HAVE TRITCH.TV TOO",
			"I HAVE A FREE PRIME I'LL SUB"
		] },
		'minecraft:story/mine_diamond': { troll: 'GS', message: [
			"LETSGOOOOOOOOOOOOO"
		] },
		'minestuck:minestuck/big_one_mil': { troll: 'GS', message: [
			"ONE MILLION?????",
			"OK NEW VIDEO. YOU CAN TAKE THE MILLION, OR DOUBLE IT AND GIVE IT TO THE NEXT PERSON",
			"TAKE IT OR DOUBLE IT. CHAT DECIDES. 10 SECONDS",
			{ troll: 'BJ', text: "last time you did this the next person was also you :)" },
			"IT WAS A BIT CLISTE"
		] },
		'minestuck:minestuck/melon_overload': { troll: 'GS', message: [
			"YOOOOO MELON CHALLENGE",
			"HOW MANY CAN YOU EAT BEFORE YOU HURL. I'M FILMING",
			"CHAT IS SAYING 40",
			{ troll: 'DH', text: "um.. its just me in chat.. and i said four" },
			"ONE VIEWER IS STILL A VIEWER. RESPECT GANLUA"
		] },
		'minecraft:end/kill_dragon': { troll: 'GS', message: [
			"BRO KILLED THE DRAGON",
			"TELL ME YOU WERE RECORDING. PLEASE TELL ME YOU WERE RECORDING",
			"THAT'S A 10 MILLION VIEW THUMBNAIL. MY FACE NEXT TO THE DRAGON. MOUTH OPEN.",
			{ troll: 'RG', text: "i wouldve Taken iT in one round. ThaT Thing barely had a guard." },
			"BRO YOU CAN'T BOX A DRAGON",
			{ troll: 'RG', text: "waTch me. —B)" }
		] },
		'denizen:blood': { troll: 'GS', message: [
			"YO.",
			"YOU REALLY TOOK DOWN RHIANNON",
			"OK I HAD A WHOLE SPEECH PLANNED BUT I FORGOT IT",
			"SHE WAS ALL ABOUT KEEPING PEOPLE TOGETHER RIGHT. I HAD LIKE TEN MILLION SUBS AND NOBODY TO CALL WHEN THE WORLD ENDED",
			"YOU HAD PEOPLE. DONT LOSE THEM",
			"OK THAT WAS DEEP. CLIP THAT",
			{ troll: 'BJ', text: "clipped :)" },
			"...DELETE THAT",
			"PEACE OUT"
		] },

		'minecraft:adventure/sleep_in_bed': { troll: 'BJ', message: [
			"heheh. i seeee you :)",
			"your bedsheets are kinda lame tho :)"
		] },
		'minestuck:minestuck/shady_buyer': { troll: 'BJ', message: [
			"haha... getting to see u on my viewport is so funny :)",
			"what you even doing rn :)",
			"buying stuff... interesting :)"
		] },
		'exposure:adventure/exposure': { troll: 'BJ', message: [
			"oh you got a camera :)",
			"i had one too :)",
			"i threw it in my sprite :)",
			"then my sprite started taking pictures of me :) i hated it :)"
		] },
		'exposure:adventure/spotlight': { troll: 'BJ', message: [
			"a selfie :)",
			"i dont take those :)",
			"i have about eleven thousand photos and im in none of them :)",
			"well one :) protca got me in the background of one of his videos once :)",
			"four million views :) nobody noticed :)",
			{ troll: 'GS', text: "WAIT WHAT VIDEO" },
			"you wont find me :)"
		] },
		'minecraft:story/obtain_armor': { troll: 'BJ', message: [
			"nice armour :)",
			"i had a janitor outfit :)",
			"nobody ever looked twice at the janitor :)",
			"you should have gone with that :)"
		] },
		'denizen:mind': { troll: 'BJ', message: [
			"nice :)",
			"you took 4 minutes longer than i guessed :)",
			"you also walked into the same attack three times :) i counted :)",
			"ecne asked you to decide something and you decided to hit it :) bold :)",
			"i have a whole notebook on you :)",
			"im burning it actually B| feels weird if we are friends now",
			"goodbye B|"
		] },

		'minecraft:husbandry/tactical_fishing': { troll: 'RG', message: [
			"dude ThaT is my broTher in FISH. why would you DO THAT."
		] },
		'minecraft:adventure/hero_of_the_village': { troll: 'RG', message: [
                "HAHA. NICE.",
                "you showed Those guys whos boss",
                "noT bad aT all",
               "Though i reckon i couldve done iT fasTer. being a fish. and a wresTler.",
                "jusT sayin. —B)"
] },
		'minestuck:minestuck/dungeon': { troll: 'RG', message: [
			"a dungeon huh. finally someThing worTh doing",
			"Those imps hiT preTTy sofT. youll be fine —B)",
			"jusT donT Tell anyone if you geT knocked ouT. lol."
		] },
		'minestuck:minestuck/hammerguy': { troll: 'RG', message: [
			"hammer guy. respecT.",
			"i was a mace guy myself. basically The same Thing buT wiTh spikes.",
			"if iT hiTs hard enough, nobody asks quesTions. —B)"
		] },
		'minecraft:husbandry/tame_an_animal': { troll: 'RG', message: [
			"you goT a peT? nice.",
			"i had an earwig. his name is noT relevanT To This conversaTion.",
			{ troll: 'GS', text: "HIS NAME WAS SNUGGLES" },
			"proTca. i will puT you in The ring."
		] },
		'artifacts:chest_slayer': { troll: 'RG', message: [
			"a chesT ThaT fighTs back. finally.",
			"my land was liTerally called The land of riches. you couldnT walk Ten sTeps wiThouT Tripping over gold.",
			"noT one piece of iT ever Threw a punch.",
			"Thing is, if iT didnT puT up a fighT iT doesnT really feel like yours.",
			"anyway. glad you goT ThaT off your chesT. —B)"
		] },
		'denizen:rage': { troll: 'RG', message: [
			"now ThaT is how you end a fighT.",
			"no cheap shoTs. no specibus under The Table. jusT you and him.",
			"i won a loT of fighTs. mosT of Them i shouldnT have.",
			"ThaT one you earned.",
			{ troll: 'GS', text: "BRO IS CRYING" },
			"i am noT.",
			"ring The bell. ThaTs me done. —B)"
		] },

		'minecraft:husbandry/fishy_business': { troll: 'DD', message: [
			"i cannae. deal wi this.",
			"yer fishin up. me brothers. and sisters. oot here.",
			"that wee yin. was so. cute too."
		] },
		'minestuck:minestuck/halfway_point': { troll: 'DD', message: [
			"i never. really understood. the appeal. of the echeladder.",
			"whole thing. really p's. me off.",
			"i dinnae. need some. disembodied voice. wi a finger. up its butt. telling me. how well. im daein.",
			"i can. dae that myself. cheers."
		] },
		'minecraft:end/dragon_breath': { troll: 'DD', message: [
			"pure reekin that.",
			"can smell it. fe' here.",
			"absolutely rank.",
			"get a load. ae this yin.",
			"carrying roond. bottle full. eh rubbish",
			"minging."
		] },
		'denizen:heart': { troll: 'DD', message: [
			"ye went. fer the hands. didnae ye.",
			"litavis. offered ye. a choice. an ye. said naw.",
			"ah respect. that. ah really. dae.",
			"ah spent. ma whole. life bein. handed things. it's guid. tae see. someone just. tak whit. they want.",
			"anyway. this is. me away. dinnae get. soppy aboot. it.",
			"ah'll miss. ye. a wee. bit."
		] }
	}

	function colored(text, color) {
		return Text.literal(text).color(color)
	}

	function white(text) {
		return Text.literal(text).white()
	}

	function playSound(player, sound) {
		player.server.runCommandSilent(`execute as ${player.username} at @s run playsound ${sound} master @s`)
	}

	function playerName(player) {
		const color = $PlayerData.get(player).get().getData($MSAttachments.PLAYER_COLOR)
		return Text.literal(player.getDisplayName().getString()).color(Color.rgba((color >> 16) & 255, (color >> 8) & 255, color & 255, 255))
	}

	function statusLine(initials, verb, name) {
		const troll = TROLLS[initials]
		return Text.empty()
			.append(white('-- '))
			.append(colored(troll.handle, troll.color))
			.append(white(' ['))
			.append(colored(initials, troll.color))
			.append(white(`] ${verb} trolling [`))
			.append(name)
			.append(white('] --'))
	}

	function messageLine(initials, line) {
		let speaker = initials
		let text = line
		if (line.troll) {
			speaker = line.troll
			text = line.text
		}
		return Text.empty()
			.append(colored(speaker, TROLLS[speaker].color))
			.append(white(': '))
			.append(colored(text, TROLLS[speaker].color))
	}

	Object.keys(TROLLS).forEach((initials, i) => {
		ItemEvents.rightClicked(`kubejs:lore_tome_${i + 1}`, event => {
			const troll = TROLLS[initials]
			if (event.hand != 'MAIN_HAND') return
			event.player.tell(Text.empty()
				.append(colored(troll.name, troll.color))
				.append(white(' - '))
				.append(colored(troll.title, ASPECT_COLORS[troll.title.split(' ')[2].toLowerCase()])))
			event.player.tell(Text.literal(troll.lore).gray())
			event.player.swing()
		})
	})

	const STATUE_LINES = {
		'GA': '☠h h☠w it was all s☠ much simpler. D☠n\'t y☠u agree, {player}?',
		'UU': 'd↺de i do not control the traffic if yo↺ give me a low rating i will r↺n yo↺ over',
		'f(x)': 'well. i cant say i was expecting lots of people to turn up to the fansign, but this is... erm...~♪',
		'FR': '*strums his guitar, singing mostly in tune*',
		'ST': 'thiθ iθ where gryMla and i Met... θeemθ θo long ago now',
		'PY': 'This partY has to be a success. It must.',
		'TK': '¶ Your honour; this whole trial has been lame as hell. Can\'t you just δo me a soliδ?',
		'DH': '*she is staring into her monitor. you haven\'t really seen her blink*',
		'GS': 'WHATS UP GRUBTUBE WE ARE HERE AT TRITCHCON LETSGOOO POGS IN THE CHAT',
		'BJ': 'heheheh :) i love the mall :)',
		'RG': 'anoTher challenger defeaTed —B)',
		'DD': 'these blumming. charity shops. even they are. too spenny.'
	}
	NativeEvents.onEvent($EntityInteractSpecific, event => {
		const statue = event.getTarget()
		const player = event.getEntity()
		if (event.getLevel().isClientSide() || event.getHand() != 'MAIN_HAND' || statue.type != 'strawstatues:straw_statue') return
		const initials = Object.keys(TROLLS).find(key => statue.tags.contains(TROLLS[key].name.split(' ')[0]))
		if (!initials) return
		player.swing()
		player.tell(colored(STATUE_LINES[initials].replace('{player}', player.username), TROLLS[initials].color))
		event.setCanceled(true)
	})

	EntityEvents.drops(event => {
		const player = event.source.player
		const type = String(event.entity.type)
		let chance = 0
		if (type == 'minestuck:imp') chance = 0.005
		if (type == 'minestuck:ogre') chance = 0.015
		if (type == 'minestuck:basilisk') chance = 0.05
		if (type == 'minestuck:lich') chance = 0.1
		if (chance == 0 || !player || !player.tags.contains('time') || Math.random() >= chance) return
		event.addDrop(`kubejs:lore_tome_${Math.floor(Math.random() * 12) + 1}`)
	})

	const busyUntil = {}

	PlayerEvents.advancement(event => {
		const trolling = TROLLINGS[String(event.advancement.id)]
		if (trolling) startTrolling(event.player, trolling)
	})

	const DENIZEN_ASPECTS = { 'cataclysm:maledictus': 'breath', 'cataclysm:netherite_monstrosity': 'time', 'cataclysm:ender_guardian': 'space', 'cataclysm:the_leviathan': 'void', 'cataclysm:ancient_remnant': 'hope', 'cataclysm:the_harbinger': 'doom', 'cataclysm:ignis': 'blood', 'mowziesmobs:umvuthi': 'light', 'mowziesmobs:frostmaw': 'rage', 'bosses_of_mass_destruction:void_blossom': 'life', 'bosses_of_mass_destruction:obsidilith': 'mind', 'bosses_of_mass_destruction:gauntlet': 'heart' }

	EntityEvents.death(event => {
		const denizen = event.entity
		const player = event.source.player
		const aspect = DENIZEN_ASPECTS[String(denizen.type)]
		let otherHand = false
		if (!aspect || !player || denizen.tags.contains('SignedOff')) return
		denizen.addTag('SignedOff')
		if (aspect == 'heart') {
			denizen.level.getEntitiesWithin(AABB.of(denizen.x - 64, denizen.y - 64, denizen.z - 64, denizen.x + 64, denizen.y + 64, denizen.z + 64)).forEach(entity => {
				if (entity.type == 'bosses_of_mass_destruction:gauntlet' && entity.isAlive()) otherHand = true
			})
		}
		if (otherHand) return
		player.server.scheduleInTicks(40, () => startTrolling(player, TROLLINGS[`denizen:${aspect}`]))
	})

	function startTrolling(player, trolling) {
		const server = player.server
		const now = server.tickCount
		let start = now + 60
		const name = playerName(player)
		const lines = [statusLine(trolling.troll, 'began', name)]
		trolling.message.forEach(text => lines.push(messageLine(trolling.troll, typeof text == 'string' ? text.replace('[player]', player.getDisplayName().getString()) : text)))
		lines.push(statusLine(trolling.troll, 'ceased', name))
		if (busyUntil[player.username] > start) start = busyUntil[player.username]
		busyUntil[player.username] = start + 100 * lines.length
		lines.forEach((line, i) => {
			let delay = start - now + 20 + 100 * (i - 1)
			if (i == 0) delay = start - now
			server.scheduleInTicks(delay, () => {
				player.tell(line)
				if (i == 0) playSound(player, 'minecraft:custom.pesteropen')
				if (i == lines.length - 1) playSound(player, 'minecraft:custom.pesterclose')
			})
		})
	}
})()
