function Player(lives, x, y) {
	//Liikkuminen
	this.dx=0;
	this.dy=0;
	//lastX/Y avulla törmäily seiniin toimii paremmin, kun törmäyksen jälkeen palataan sallitulle alueelle.
	this.lastX=0;
	this.lastY=0;
	//Rajat missä pelkästään tausta alkaa liikkua
	this.xleft=10;
	this.xright=WIDTH-30;
	this.ytop=0;
	this.ybottom=HEIGHT-30;
	this.Xspeed=3;
	this.Yspeed=1;
	//Onko pelaaja kuollut?
	this.dead=false;
	//Kuolleena tarvitaan nopeusparametria.
	this.vel=0;
	this.won=false;
	
	//Testataan ladata pelaajasprite ja heittää se ruudulle.. lopullinen versio voisi olla eligantimpi ja enemmän kamaa player.jsssä
	//Lisää EaselJS spritesheeteistä http://createjs.com/Docs/EaselJS/classes/SpriteSheet.html
	 var data = {
		//Framerate animaatiolle, myös yksittäisille actioneille (kuten climb) voi vielä asettaa oman nopeuden
		 framerate:10,
		 images: [climber],
		 frames: {width:35, height:50, count:10},
		 //Tässä erilaisia animaatioita. Jostain syystä ne ei toimi :(
		 animations: {
		 	climb_vertical: [1,2], 
		 	climb_left: { frames: [2,3,4] }, 
		 	climb_right: { frames: [1,3,4]}, 
		 	stationary: 0, 
		 	stand: 9,
		 	win_climb: { 
		 		frames: [5,5,6,6,7,8,7,8], 
		 		next: "stand",
		 		speed: 0.5
		 	}
		 }
	 };
	var spriteSheet = new createjs.SpriteSheet(data);
	this.sprite = new createjs.Sprite(spriteSheet, "climb_vertical");
	this.sprite.snapToPixel=true;
	this.sprite.play();
	//Pyörimisen keskikohta ja alkukulma
	this.sprite.regX=35/2;
	this.sprite.regY=50/25;
	this.sprite.rotation=0;	
	//Mennään annettuun paikkaan
	this.sprite.x=x;
	this.sprite.y=y;
}

Player.prototype.die	= function() {
	this.dead = true;
	this.vel=-10;
}

Player.prototype.move	= function(){
	//Tää kaikki pätee vaan jos pelaaja on elossa.
	if (!(this.dead)) {
		this.lastX=this.sprite.x;
		this.lastY=this.sprite.y;
		// going sideways
		if (!this.won) {
			if( this.dy === 0 && this.dx !== 0){
				this.sprite.paused=false;
				if (this.dx<0) {
					if (this.sprite.currentAnimation != "climb_left"){
						this.sprite.gotoAndPlay("climb_left");
					}
				}		
				else {
					if (this.sprite.currentAnimation != "climb_right"){
						this.sprite.gotoAndPlay("climb_right");
					}
				}
			}
			// going up/down
			else if( this.dx === 0 && this.dy !== 0){
				this.sprite.paused=false;
				if (this.sprite.currentAnimation != "climb_vertical"){
					this.sprite.gotoAndPlay("climb_vertical");
				}
			}
			// going diagonallthis.dy
			else if( this.dy !== 0 && this.dx !== 0){
				this.sprite.paused=false;
				if (this.sprite.currentAnimation != "climb_vertical"){
					this.sprite.gotoAndPlay("climb_vertical");
				}
			}
			// staying still
			else{
				this.sprite.gotoAndPlay("stationary");
				this.sprite.paused=false;
			}
		}
		else {
			if ((this.sprite.currentAnimation != "win_climb") && (this.sprite.currentAnimation != "stand")) {
				this.sprite.gotoAndPlay("win_climb");
			}
		}
		//Jos ollaan lähellä vasenta laitaa ja mennään vasemmalle, tai lähellä oikeaa ja mennään oikealle, pelaaja ei liiku
		if ((this.sprite.x > this.xleft && this.dx<0) || (this.sprite.x < this.xright && this.dx>0)){
			this.sprite.x += this.dx*this.Xspeed;
		}
		//Sama ylös/alas liikkeelle
		if ((this.sprite.y > this.ytop && this.dy<0) || (this.dy>0 && this.sprite.y < this.ybottom)){	
			//Eli alas mennään nopeudella kolme ja ylös nopeudella 1. Muuttaa pelidynamiikan jännittäväksi
			if (this.dy<0) {
				this.sprite.y += this.dy*this.Yspeed;
			}
			else {
				//Pelaaja ei voi liikkua alaspäin, jolloin peli vaikeutuu loppua kohden.
				this.sprite.y += this.dy*0;
			}
		}
	}
	//Jos pelaaja kuolee se tippuu
	else {
		this.sprite.gotoAndPlay("stationary");
		this.sprite.y+=player.vel;
		this.vel+=GRAVITY;
		var rotationspeed=10;
		this.sprite.rotation+=rotationspeed;
		//if (this.sprite.y<HEIGHT+50)
		//	this.sprite.y+=this.vel;
	}
}

Player.prototype.win = function() {
	this.won = true;
}
