
function createMenus(){
	//Luodaan Main Menu
	main_menu = new createjs.Container();
	// tausta
	var menu_bg = new createjs.Shape();
	menu_bg.graphics.beginFill("#000").drawRect(0, 0, WIDTH, HEIGHT);
	console.log(HEIGHT);

	// Pelin nimi
	var title = new createjs.Text("Roclimbers 2", "bold 42px Arial", "#fff")
	title.name = "title";
	title.textAlign = "center";
	title.textBaseline = "middle";
	title.x = WIDTH/2;
	title.y = HEIGHT*(1/6);
	var sub_title = new createjs.Text("Adventure Of The Zen Mountain", "bold 18px Arial", "#fff")
	sub_title.name = "sub_title";
	sub_title.textAlign = "center";
	sub_title.textBaseline = "middle";
	sub_title.x = WIDTH/2;
	sub_title.y = HEIGHT*(1/6)+50;

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
	st_button.y = HEIGHT*(3/6);
	st_button.addChild(st_bg, st_label);

	//  replay button
	var rp_bg = new createjs.Shape();
	rp_bg.graphics.beginFill("#fff").drawRoundRect( 0, 0, 150, 60, 15);

	var rp_label = new createjs.Text("rpart Game", "bold 24px Arial", "#000");
	rp_label.name = "replay-label";
	rp_label.textAlign = "center";
	rp_label.textBaseline = "middle";
	rp_label.x = 150/2;
	rp_label.y = 60/2;

	var rp_button = new createjs.Container();
	rp_button.name = "button";
	rp_button.x = ((WIDTH/2)-75);
	rp_button.y = HEIGHT*(4/6);
	rp_button.addChild(rp_bg, rp_label);

	// lisätään Main Menu elementit
	main_menu.addChild(menu_bg, title, sub_title, st_button);
}

function showMainMenu(){
	stage.removeChild(world);
	stage.removeChild(paused_menu);
	stage.addChild(main_menu);
}


function showGame(){
	stage.removeChild(main_menu);
	stage.removeChild(paused_menu);
	stage.addChild(world);
}


function showPausedMenu(){
	stage.removeChild(world);
	stage.removeChild(main_menu);
	stage.addChild(paused_menu);
}



