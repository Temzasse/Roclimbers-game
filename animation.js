var stage, pauseCircle, goCircle, output;

		function init() {
			stage = new createjs.Stage("game");
			
			//Luodaan stageen "maailma", joka sisältää kaikki siinä olevat objektit
			world = new createjs.Container();
			//Järjestellään objektit layereihin.
			//"World layer 1" Tippuvat kamat. (jää nyt tyhjäksi)
			wl1 = new createjs.Container();
			//"World layer 2". Pelaajaobjektit (eli oikeesti vaan yks jäbä)
			wl2 = new createjs.Container();
			//Lisätään containerit maailmaa ja maailma stageen
			world.addChild(wl1);
			world.addChild(wl2);
			stage.addChild(world);
			
			//Testataan ladata pelaajasprite ja heittää se ruudulle.. lopullinen versio voisi olla eligantimpi ja enemmän kamaa player.jsssä
			//Lisää EaselJS spritesheeteistä http://createjs.com/Docs/EaselJS/classes/SpriteSheet.html
			 var data = {
			 	//Framerate animaatiolle, myös yksittäisille actioneille (kuten climb) voi vielä asettaa oman nopeuden
			 	 framerate:10,
				 images: ["climber.png"],
				 frames: {width:35, height:50},
				 animations: {climb:[0,4]}
			 };
			 var spriteSheet = new createjs.SpriteSheet(data);
			 var player = new createjs.Sprite(spriteSheet, "climb");
			player.x=10;
			player.y=10;
			wl2.addChild(player);
			//stage.addChild(goCircle);

			// and register our main listener
			createjs.Ticker.on("tick", tick);

			// UI code:
			
		}
		
		function tick(event) {
		
			//pause
            if (!createjs.Ticker.getPaused()) {
                
                
            }
			
			stage.update(event); // important!!
		}
		
		/*function togglePause() {
			var paused = !createjs.Ticker.getPaused();
			createjs.Ticker.setPaused(paused);
			document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
		}*/