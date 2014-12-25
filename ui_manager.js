var stage, world, main_menu, paused_menu, currentLevel, selected_level

WIDTH = 600;
HEIGHT = $(window).height();

var items = [];
var gameStarted = false;
var gamePaused = false;

// Muuta canvaksen piirto- ja todellinen korkeus
var can = document.getElementById("game");
can.style.height = HEIGHT + "px";
can.height = HEIGHT;


function showGame(){
	stage.removeChild(main_menu);
	stage.removeChild(paused_menu);
	stage.addChild(world);
	gamePaused = false;
}

function showPausedMenu(){
	stage.removeChild(world);
	stage.removeChild(main_menu);
	stage.addChild(paused_menu);
}


function createGame(){

	// tyhjennetään itemsit
	items = [];
	selected_level = null;

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
	//stage.addChild(world);
	//stage.addChild(menu);
	
	//Luodaan pelaaja: 1 elämä, positio (10,10)
	player = new Player(1, 170, 550);
	wl2.addChild(player.sprite);
	
	//Tehään läpällä heti kivi. Nyt kivi lisää intensä world layer kakkoseen konstruktorissa. Toinen mahdollisuus olisi luoda initissä "item"-container johon itemmit aina lisäisivät itsensä. Se auttais konsistentimmassa piirtämisjärjestyksessä.
	stone = new Item(100, wl2);
	items.push(stone);
	//Luodaan eka taso. Normisti mentäs varmaan jonku valikon kautta.
	level_1 = new Level("images/level_1_kallio.png", "images/level_1_tausta.png", 1900);
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

	gameStarted = true;
	// Piilota Menu ja aloita peli
	showGame();
}

function createMenus(){

	// Main Menu---------------------------------------------------
	main_menu = new createjs.Container();

	// tausta
	var menu_bg = new createjs.Shape();
	menu_bg.graphics.beginFill("#000").drawRect(0, 0, WIDTH, HEIGHT);

	// Pelin nimi
	var title = new createjs.Text("Roclimbers 2", "bold 42px Arial", "#fff")
	title.name = "title";
	title.textAlign = "center";
	title.textBaseline = "middle";
	title.x = WIDTH/2;
	title.y = 50;
	var sub_title = new createjs.Text("Adventure Of The Zen Mountain", "bold 18px Arial", "#fff")
	sub_title.name = "sub_title";
	sub_title.textAlign = "center";
	sub_title.textBaseline = "middle";
	sub_title.x = WIDTH/2;
	sub_title.y = 90;

	// Napit
	// start_game = st
	var st_bg = new createjs.Shape();
	st_bg.graphics.beginFill("#fff").drawRoundRect( 0, 0, 150, 60, 15);

	var st_label = new createjs.Text("Start Game", "bold 24px Arial", "#000");
	st_label.name = "start-game-label";
	st_label.textAlign = "center";
	st_label.textBaseline = "middle";
	st_label.x = 150/2;
	st_label.y = 60/2;

	var st_button = new createjs.Container();
	st_button.name = "button";
	st_button.x = ((WIDTH/2)-75);
	st_button.y = HEIGHT*(2/8)+(128*2)+75;
	st_button.addChild(st_bg, st_label);

	// Level valinnat
	var choose_level_text = new createjs.Text("Choose Level", "bold 24px Arial", "#fff");
	choose_level_text.name = "choose-level-label";
	choose_level_text.textAlign = "center";
	choose_level_text.textBaseline = "middle";
	choose_level_text.x = WIDTH/2;
	choose_level_text.y = HEIGHT*(2/8);

	var lvl_1 = new createjs.Bitmap("images/level_1_thumbnail.jpg");
	var lvl_2 = new createjs.Bitmap("images/level_2_thumbnail.jpg");

	// Levelin valinta border
	var lvl_1_stroke = new createjs.Shape();
	var lvl_2_stroke = new createjs.Shape();
	lvl_1_stroke.graphics.beginStroke("red").setStrokeStyle(8).beginFill("#000").drawRect(200, HEIGHT*(2/8)+25, 200, 128);
	lvl_2_stroke.graphics.beginStroke("red").setStrokeStyle(8).beginFill("#000").drawRect(200, HEIGHT*(2/8)+128+50, 200, 128);
	lvl_1_stroke.alpha = 0;
	lvl_2_stroke.alpha = 0;

	// Kuvan koko on 200x255
	lvl_1.x = 200;
	lvl_1.y = HEIGHT*(2/8)+25;
	lvl_2.x = 200;
	lvl_2.y = HEIGHT*(2/8)+128+50;

	// lisätään Main Menu elementit
	main_menu.addChild(menu_bg, title, sub_title, choose_level_text, lvl_1_stroke, lvl_2_stroke, lvl_1, lvl_2, st_button);
	stage.addChild(main_menu);

	// Lisätään tapahtumakuuntelijat nappeihin ja thumbnaileihin
	st_button.on("click", createGame);

	lvl_1.on("click", function(){
		selected_level = 1;
		lvl_1_stroke.alpha = 1;
		lvl_2_stroke.alpha = 0;
	});

	lvl_2.on("click", function(){
		selected_level = 2;
		lvl_2_stroke.alpha = 1;
		lvl_1_stroke.alpha = 0;
	});
	// Main Menu END---------------------------------------------------



	// Paused Menu---------------------------------------------------
	paused_menu = new createjs.Container();

	// game paused text
	var paused_text = new createjs.Text("Game paused!", "bold 24px Arial", "#fff");
	paused_text.name = "paused-text-label";
	paused_text.textAlign = "center";
	paused_text.textBaseline = "middle";
	paused_text.x = WIDTH/2;
	paused_text.y = HEIGHT*(1/6)+100;

	// resume button
	var resume_bg = new createjs.Shape();
	resume_bg.graphics.beginFill("#fff").drawRoundRect( 0, 0, 150, 60, 15);

	var resume_label = new createjs.Text("Resume", "bold 24px Arial", "#000");
	resume_label.name = "resume-game-label";
	resume_label.textAlign = "center";
	resume_label.textBaseline = "middle";
	resume_label.x = 150/2;
	resume_label.y = 60/2;

	var resume_button = new createjs.Container();
	resume_button.name = "button";
	resume_button.x = ((WIDTH/2)-75);
	resume_button.y = HEIGHT*(3/6);
	resume_button.addChild(resume_bg, resume_label);

	// replay button
	var replay_bg = new createjs.Shape();
	replay_bg.graphics.beginFill("#fff").drawRoundRect( 0, 0, 150, 60, 15);

	var replay_label = new createjs.Text("Replay", "bold 20px Arial", "#000");
	replay_label.name = "replay-label";
	replay_label.textAlign = "center";
	replay_label.textBaseline = "middle";
	replay_label.x = 150/2;
	replay_label.y = 60/2;

	var replay_button = new createjs.Container();
	replay_button.name = "button";
	replay_button.x = ((WIDTH/2)-75);
	replay_button.y = HEIGHT*(4/6);
	replay_button.addChild(replay_bg, replay_label);

	// lisätään Paused Menu elementit
	paused_menu.addChild(menu_bg.clone(true), title.clone(true), sub_title.clone(true), paused_text, resume_button, replay_button);
	// Lisätään tapahtumakuuntelijat nappeihin
	resume_button.on("click", showGame);
	replay_button.on("click", createGame);
	// Paused Menu END---------------------------------------------------

	// Paused Menu END---------------------------------------------------



}





