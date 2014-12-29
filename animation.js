$(window).load(function(){
	
	var pauseCircle, goCircle, output;
	GRAVITY=5;
	//Kaikki kuvat ladataan tässä paitsi taustatekstuuri koska siinä on jo onload juttu
	lvl1ga = new Image();
	lvl1bg = new Image();
	lvl2ga = new Image();
	lvl2bg = new Image();
	lvl1thumb = new Image();
	lvl2thumb = new Image();
	rock = new Image();
	r_warning = new Image();
	climber = new Image();
	lvl1ga.onload = countLoads;
	lvl1bg.onload = countLoads;
	lvl2ga.onload = countLoads;
	lvl2bg.onload = countLoads;
	lvl1thumb.onload = countLoads;
	lvl2thumb.onload = countLoads;
	rock.onload = countLoads;
	r_warning.onload = countLoads;
	climber.onload = countLoads;
	lvl1ga.src = "images/level_1_kallio.png";
	lvl1bg.src = "images/level_1_tausta.png";
	lvl2ga.src = "images/level_2_kallio.png";
	lvl2bg.src = "images/level_2_tausta.png";
	lvl1thumb.src =  "images/level_1_thumbnail.jpg";
	lvl2thumb.src = "images/level_2_thumbnail.jpg";
	rock.src = "images/rock.png";
	r_warning.src = "images/rock_warning.png";
	climber.src = "images/climber.png";

	//ÄÄNET
	//aina kun ääni on ladattu
	createjs.Sound.on("fileload", handleFileLoad);
	function handleFileLoad(event) {
	    countLoads();
	}
	createjs.Sound.registerSound("sounds/lvl_1.mp3", "lvl_1_music");
	createjs.Sound.registerSound("sounds/lvl_2.mp3", "lvl_2_music");
	createjs.Sound.registerSound("sounds/swoosh.mp3", "rock_drop_sound");
	createjs.Sound.registerSound("sounds/scream.mp3", "scream_sound");
	createjs.Sound.registerSound("sounds/win.mp3", "win_sound");
	
	//Lataajalle vähän juttuja.
	loads=0;
	var canvas = document.getElementById("game");
	var context = canvas.getContext("2d");
	context.font = "bold 32px Arial";
	context.fillText("Loading", WIDTH/2-100, HEIGHT/2);
	//laskee ladattuja resursseja, kun kaikki resurssit on ladattu käynnistää pelin;
	function countLoads() {
		loads+=1;
		context.fillText("Loading" + Array(loads+1).join('.'), WIDTH/2-100, HEIGHT/2);
		console.log(loads);
		if (loads==14) {
			init();
		}
	}
	

	
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
        //if (!createjs.Ticker.getPaused()) {
            //console.log("paused");
        //}
        if (gameStarted && !gamePaused && !player.dead){

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
        		/*Jos on osuma tehdään itemmin "crash" funktio. Esim kivi tappaa pelaajan.
	        	Tavarat ei törmää jos törmäily on pois päältä.
	        	Lisäksi kuolleeseen tai voittaneeseen pelaajaan ei voi törmätä*/
	        	if (collision !== false && !(player.dead) && (!player.won)){
	        		items[i].crash();
	        	}
	        	
	        }
	        // varmista että kun tausta pysähtyy niin pelaajan näennäinen nopeus ei muutu
	        if( currentLevel.bg.y === 0 ){
	        	player.Yspeed = currentLevel.speed;
	        }
			player.move(); // Very important also!!
			//Jos liikkumisen jälkeen ollaan menty alueelle, jossa törmätään taivaaseen, pelaaja liikkuu
			//takaisin edelliseen positioonsa.
			//jos pelaajaan on osunut kivi, ei tarvi välittää kentän rajoista enään
			if(!player.hit){
				var collision = ndgmr.checkPixelCollision(currentLevel.bg, player.sprite, 0.75);
			}
			//console.log(collision);
			if (!(player.dead) && !(player.won) && (collision !== false)) {
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
		//Tän avulla voidaan disablea liikkuminen, kun voittaa pelin, mutta silti hyödynnetään pelaajan perus liikkumisspritejä.
		if (!currentLevel.moveDisabled) {
			if (e.keyCode == KEYCODE_ESC) {
				if ( !(gamePaused) ){
					gamePaused = true;
					showPausedMenu();
				}
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


});
