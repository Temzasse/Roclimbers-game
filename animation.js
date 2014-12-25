$(window).load(function(){
	
	var pauseCircle, goCircle, output;
	GRAVITY=5;

	function init() {
		stage = new createjs.Stage("game");
		
		// Luodaan menut ja näytetään Main Menu
		createMenus();
		//showMainMenu();

		// and register our main listener
		createjs.Ticker.on("tick", tick);
		
	}


		
	
	function tick(event) {
	
		//pause
        if (!createjs.Ticker.getPaused()) {
            //console.log("paused");
        }
        if (gameStarted && !gamePaused){

	        //Lisätään kivi?
	        if ( Math.random() > difficulty && !(currentLevel.won) ) {
	        	stone = new Item(Math.random()*WIDTH, wl2);
	        	items.push(stone);
	        }
	        currentLevel.move();
	        //Lista itemmejä jotka kaikki updatetaan.
	        for(i=0; i<items.length; i++) {
	        	items[i].update();
	        	var collision = ndgmr.checkPixelCollision(items[i].object, player.sprite, 0.75);
	        	//Jos on osuma tehdään itemmin "crash" funktio. Esim kivi tappaa pelaajan.
	        	if (collision !== false && !(player.dead))
	        		items[i].crash();
	        }
	        // varmista että kun tausta pysähtyy niin pelaajan näennäinen nopeus ei muutu
	        if( currentLevel.bg.y === 0 ){
	        	player.Yspeed = currentLevel.speed;
	        }
			player.move(); // Very important also!!
			//Jos liikkumisen jälkeen ollaan menty alueelle, jossa törmätään taivaaseen, pelaaja liikkuu
			//takaisin edelliseen positioonsa.
			var collision = ndgmr.checkPixelCollision(currentLevel.bg, player.sprite, 0.75);
			//console.log(collision);
			if (!(player.dead) && (collision !== false)) {
				player.sprite.x = player.lastX;
				player.sprite.y = player.lastY;
				currentLevel.bg.y=currentLevel.lastY;
				currentLevel.ga.y=currentLevel.lastY;
			}
			//Korkeus/pisteet. Aika vaikee lasku. Pitäis vielä lisätä alotus offset (150)
			score.text=currentLevel.getScore();
		}

		stage.update(event); // important!!
		
	}


	



			
			
	KEYCODE_LEFT = 37;
	KEYCODE_RIGHT= 39;
	KEYCODE_UP=38;
	KEYCODE_DOWN=40;
	KEYCODE_ESC = 27;
	LEFT_DOWN=false;
	RIGHT_DOWN=false;
	DOWN_DOWN=false;
	UP_DOWN=false;
		
	$(document).keydown(function(e) {
		if (e.keyCode == KEYCODE_ESC) {
			gamePaused = true;
			showPausedMenu();
		}
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
		//Tän avulla voidaan disablea liikkuminen, kun voittaa pelin, mutta silti hyödynnetään pelaajan perus liikkumisspritejä.
		if (!currentLevel.moveDisabled) {
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
		}
	});


	// aloita peli
	init();
});
