function Player(lives, x, y) {
	this.dx=0;
	this.dy=0;
	this.speed=3;
	
	//Testataan ladata pelaajasprite ja heittää se ruudulle.. lopullinen versio voisi olla eligantimpi ja enemmän kamaa player.jsssä
	//Lisää EaselJS spritesheeteistä http://createjs.com/Docs/EaselJS/classes/SpriteSheet.html
	 var data = {
		//Framerate animaatiolle, myös yksittäisille actioneille (kuten climb) voi vielä asettaa oman nopeuden
		 framerate:10,
		 images: ["climber.png"],
		 frames: {width:35, height:50},
		 //Tässä erilaisia animaatioita. Jostain syystä ne ei toimi :(
		 animations: {
		 	climb_vertical: [2,3], 
		 	climb_left: { frames: [3,4] }, 
		 	climb_right: { frames: [2,5]}, 
		 	stationary: 0 
		 }
	 };
	var spriteSheet = new createjs.SpriteSheet(data);
	this.sprite = new createjs.Sprite(spriteSheet, "climb_vertical");
	this.sprite.snapToPixel=true;
	this.sprite.play();
	this.sprite.x=100;
}

Player.prototype.move					= function(){
	// going sideways
	if( this.dy === 0 && this.dx !== 0){
		this.sprite.paused=false;
		if (this.dx<0)
			this.sprite.gotoAndPlay("climb_left");
		else
			this.sprite.gotoAndPlay("climb_right");
	}
	// going up/down
	else if( this.dx === 0 && this.dy !== 0){
		this.sprite.paused=false;
		this.sprite.gotoAndPlay("climb_vertical");
	}
	// going diagonallthis.dy
	else if( this.dy !== 0 && this.dx !== 0){
		this.sprite.paused=false;
		this.sprite.gotoAndPlay("climb_vertical");
	}
	// staying still
	else{
		this.sprite.gotoAndPlay("stationary");
		this.sprite.paused=false;
	}
	this.sprite.x += this.dx*this.speed;
	this.sprite.y += this.dy*this.speed;
}
