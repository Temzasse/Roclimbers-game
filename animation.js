var stage, pauseCircle, goCircle, output;
var items=[];
WIDTH=400;
HEIGHT= $( window ).height();
$("canvas").height(HEIGHT);
GRAVITY=5;

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
			
			//Luodaan pelaaja: 1 elämä, positio (10,10)
			player = new Player(1, 170, 550);
			wl2.addChild(player.sprite);
			
			//Tehään läpällä heti kivi. Nyt kivi lisää intensä world layer kakkoseen konstruktorissa. Toinen mahdollisuus olisi luoda initissä "item"-container johon itemmit aina lisäisivät itsensä. Se auttais konsistentimmassa piirtämisjärjestyksessä.
			stone= new Item(100, wl2);
			items.push(stone);
			//Luodaan eka taso. Normisti mentäs varmaan jonku valikon kautta.
			stage1 = new Level("testitausta.png", 100);
			currentStage = stage1;
			wl1.addChild(stage1.bg);
			//stage.addChild(goCircle);
			
			//SCore!
			score = new createjs.Text("yolo", "36px Arial", "#ffffff");
			score.x = 10;
			score.y=10; 
			wl2.addChild(score);
			// and register our main listener
			createjs.Ticker.on("tick", tick);

			// UI code:
			
		}
		
		function tick(event) {
		
			//pause
            if (!createjs.Ticker.getPaused()) {
                
                
            }
            currentStage.move();
            //Lista itemmejä jotka kaikki updatetaan.
            for(i=0; i<items.length; i++) {
            	items[i].update();
            	var collision = ndgmr.checkPixelCollision(items[i].object, player.sprite, 0.75);
            	console.log(collision);
            	if (collision !== false && !(player.dead))
            		player.die();
            }
			player.move(); // Very important also!!
			stage.update(event); // important!!
			//Korkeus/pisteet. Aika vaikee lasku. Pitäis vielä lisätä alotus offset (150)
			score.text=-player.sprite.y+currentStage.bg.y+currentStage.bg.image.height + "m";
			
			
			//Randomisti lisätään kivi 1% todnäk
			if (Math.random()>0.99)
				items.push(new Item(Math.random()*WIDTH, wl2))
			
		}
		
		/*function togglePause() {
			var paused = !createjs.Ticker.getPaused();
			createjs.Ticker.setPaused(paused);
			document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
		}*/
		
		
	KEYCODE_LEFT = 37;
	KEYCODE_RIGHT= 39;
	KEYCODE_UP=38;
	KEYCODE_DOWN=40;
	LEFT_DOWN=false;
	RIGHT_DOWN=false;
	DOWN_DOWN=false;
	UP_DOWN=false;
		
	$(document).keydown(function(e) {

		if (e.keyCode == KEYCODE_LEFT) {
			e.preventDefault();
			//console.log("left");
			LEFT_DOWN = true;
			player.dx = -1;
		}
		if (e.keyCode == KEYCODE_RIGHT) {
			e.preventDefault();
			//console.log("right");
			RIGHT_DOWN = true;
			player.dx = 1;
		}
		if (e.keyCode == KEYCODE_UP) {
			e.preventDefault();
			//console.log("up");
			UP_DOWN = true;
			player.dy = -1;
		}
		if (e.keyCode == KEYCODE_DOWN) {
			e.preventDefault();
			//console.log("down");
			DOWN_DOWN = true;
			player.dy = 1;
		}
	});

	$(document).keyup(function(e) {
		if (e.keyCode == KEYCODE_LEFT) {
			e.preventDefault();
			//check if player has pressed also right
			if( RIGHT_DOWN ){
				player.dx = 1;
			}
			else{
				player.dx = 0;	
			}
			LEFT_DOWN = false;
		}
		if (e.keyCode == KEYCODE_RIGHT) {
			e.preventDefault();
			//check if player has pressed also left
			if( LEFT_DOWN ){
				player.dx = -1;
			}
			else{
				player.dx = 0;	
			}
			RIGHT_DOWN = false;
		}
		if (e.keyCode == KEYCODE_UP) {
			e.preventDefault();
			//check if player has pressed also down
			if( DOWN_DOWN ){
				player.dy = 1;
			}
			else{
				player.dy = 0;	
			}
			UP_DOWN = false;
		}
		if (e.keyCode == KEYCODE_DOWN) {
			e.preventDefault();
			//check if player has pressed also up
			if( UP_DOWN ){
				player.dy = -1;
			}
			else{
				player.dy = 0;	
			}
			DOWN_DOWN = false;
		}
	});