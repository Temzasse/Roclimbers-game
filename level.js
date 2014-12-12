function Level(gameArea, backgroundArea, h) {
	//Scrollausnopeus.
	this.speed = 3;
	//Koko tason korkeus, jotta tiedetään milloin peli on voitettu

	this.ga = new createjs.Bitmap(gameArea);
	this.bg = new createjs.Bitmap(backgroundArea);
	//this.h=h;

	//Tallenetaan kuvan tiedot kivempiin parametreihin.
	//this.width=this.bg.image.width;
	this.height = 2000;
	
	//This kun taso luodaan mennään vuoren juurelle
	this.bg.snapToPixel = true;
	this.bg.y = HEIGHT - this.height;
	this.ga.y = HEIGHT - this.height;
	
	//Score ei voi pienentyä. Tallennetaan max score.
	maxScore=0;
}

Level.prototype.move = function () {
		//Jos pelialue on liian oikealla ja liikutaan vasemmalle
		//tai liian vasemmalla ja liikutaan oikealle, se ei liiku.
		//HEIGHT ja WIDTH määritelty animation.js:ssä ja ovat canvaksen koko.
		//if (((this.width-this.bg.x)<(WIDTH/2)&& player.dx>0) || (this.bg.x<0 && player.dx<0)) {
			//this.bg.x-=player.dx*this.speed;
			//Tähän for looppi joka kävisi kaikki itemmit läpi
			//for(i=0; i<items.length; i++)
				//items[i].move(-player.dx*this.speed);
		//}
		if ((((this.height-this.bg.y)<(HEIGHT/2)&& player.dy>0) || (this.bg.y<0 && player.dy<0)) && !(player.dead)){
			// Liikuta liikkumisaluetta ja taustaa
			this.lastY=this.bg.y;
			this.bg.y-=player.dy*this.speed;
			this.ga.y-=player.dy*this.speed;
		}
}

Level.prototype.getScore = function () {
	//Tallennetaan ennätys maxScoreen
	maxScore = Math.max(-player.sprite.y+currentLevel.bg.y+currentLevel.bg.image.height, maxScore);
	//Palautetaan ennätys
	return maxScore+"m";
}
