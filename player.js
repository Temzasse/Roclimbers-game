function Player(lives, x, y) {
	this.dx=0;
	this.dy=0;
	//Rajat missä pelkästään tausta alkaa liikkua
	this.xleft=10;
	this.xright=WIDTH-30;
	this.ytop=10;
	this.ybottom=HEIGHT-30;
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
		 	climb_vertical: [1,2], 
		 	climb_left: { frames: [2,3,4] }, 
		 	climb_right: { frames: [1,3,4]}, 
		 	stationary: 0 
		 }
	 };
	var spriteSheet = new createjs.SpriteSheet(data);
	this.sprite = new createjs.Sprite(spriteSheet, "climb_vertical");
	this.sprite.snapToPixel=true;
	this.sprite.play();
	//Mennään annettuun paikkaan
	this.sprite.x=x;
	this.sprite.y=y;
}

Player.prototype.move					= function(){
	// going sideways
	if( this.dy === 0 && this.dx !== 0){
		this.sprite.paused=false;
		if (this.dx<0) {
			if (this.sprite.currentAnimation != "climb_left")
				this.sprite.gotoAndPlay("climb_left");
		}		
		else {
			if (this.sprite.currentAnimation != "climb_right")
				this.sprite.gotoAndPlay("climb_right");
		}
	}
	// going up/down
	else if( this.dx === 0 && this.dy !== 0){
		this.sprite.paused=false;
		if (this.sprite.currentAnimation != "climb_vertical")
			this.sprite.gotoAndPlay("climb_vertical");
	}
	// going diagonallthis.dy
	else if( this.dy !== 0 && this.dx !== 0){
		this.sprite.paused=false;
		if (this.sprite.currentAnimation != "climb_vertical")
			this.sprite.gotoAndPlay("climb_vertical");
	}
	// staying still
	else{
		this.sprite.gotoAndPlay("stationary");
		this.sprite.paused=false;
	}
	//Jos ollaan lähellä vasenta laitaa ja mennään vasemmalle, tai lähellä oikeaa ja mennään oikealle, pelaaja ei liiku
	if ((this.sprite.x > this.xleft && this.dx<0) || (this.sprite.x < this.xright && this.dx>0))
		this.sprite.x += this.dx*this.speed;
	//Sama ylös/alas liikkeelle
	if ((this.sprite.y > this.ytop && this.dy<0) || (this.dy>0 && this.sprite.y < this.ybottom))	
		this.sprite.y += this.dy*this.speed;
}
