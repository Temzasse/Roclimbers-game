$(window).load(function(){
	
	var stage, pauseCircle, goCircle, output;
	var items=[];
	WIDTH=600;
	HEIGHT= $( window ).height();
	$("canvas").height(HEIGHT);
	GRAVITY=5;

		function init() {
			stage = new createjs.Stage("game");
			
			//Luodaan stageen "maailma", joka sisältää kaikki siinä olevat objektit
			world = new createjs.Container();
			//Järjestellään objektit layereihin.
			//"World layer 0". Taustakuva
			wl0 = new createjs.Container();
			//"World layer 1". Kallio seinämä
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
			level_1 = new Level("images/level_1_kallio.png", "images/level_1_tausta.png", 100);
			//Tehdään vielä toinen level
			//level_2 = new Level("level_1_kallio.png", 100);
			currentLevel = level_1;
			wl1.addChild(level_1.bg);
			wl1.addChild(level_1.ga);
			//stage.addChild(goCircle);
			
			//Score!
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
            //Lisätään kivi?
            if (Math.random()>0.99) {
            	stone = new Item(Math.random()*WIDTH, wl2);
            	items.push(stone);
            }
            currentLevel.move();
            //Lista itemmejä jotka kaikki updatetaan.
            for(i=0; i<items.length; i++) {
            	items[i].update();
            	var collision = ndgmr.checkPixelCollision(items[i].object, player.sprite, 0.75);
            	if (collision !== false && !(player.dead))
            		player.die();
            }
			player.move(); // Very important also!!
			//Jos liikkumisen jälkeen ollaan menty alueelle, jossa törmätään taivaaseen, pelaaja liikkuu
			//takaisin edelliseen positioonsa.
			var collision = ndgmr.checkPixelCollision(currentLevel.bg, player.sprite, 0.75);
			console.log(collision);
			if (!(player.dead) && (collision !== false)) {
				player.sprite.x = player.lastX;
				player.sprite.y = player.lastY;
				currentLevel.bg.y=currentLevel.lastY;
				currentLevel.ga.y=currentLevel.lastY;
			}
			stage.update(event); // important!!
			//Korkeus/pisteet. Aika vaikee lasku. Pitäis vielä lisätä alotus offset (150)
			score.text=currentLevel.getScore();
		}

			
			
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


	// aloita peli
	init();
});
