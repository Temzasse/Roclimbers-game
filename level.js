function Level(gameArea, backgroundArea, h, music) {
	//Scrollausnopeus.
	this.upspeed = 5;
	//Alaspäin mennään hitaammin, jotta pelaaja tajuaa, että on tarkoitus kiivetä ylöspäin
	this.downspeed=2;
	//Koko tason korkeus, jotta tiedetään milloin peli on voitettu

	this.ga = new createjs.Bitmap(gameArea);
	this.bg = new createjs.Bitmap(backgroundArea);
	//Tähän tallennetaan kentän voittokorkeus: esim 2000px kartassa 1900px
	this.h=h;

	this.music = music;
	//Tallenetaan kuvan tiedot kivempiin parametreihin.
	//this.width=this.bg.image.width;
	this.height = 2000;
	
	//This kun taso luodaan mennään vuoren juurelle
	this.bg.snapToPixel = true;
	this.bg.y = HEIGHT - this.height;
	this.ga.y = HEIGHT - this.height;
	
	//Score ei voi pienentyä. Tallennetaan max score.
	maxScore=0;
	
	//Voittamisanimaatioon liittyvä parametri (estä manuaalinen liikkuminen)
	this.movementDisabled=false;
	this.won=false;
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
		if ((((-this.bg.y)<(this.height-HEIGHT)&& player.dy>0) || (this.bg.y<0 && player.dy<0)) && !(player.dead)){
			// Liikuta liikkumisaluetta ja taustaa
			//Jos pelaaja on niin ylhäällä/alhaalla ettei itse liiku niin tausta liikkuu tuplanopeudella (jolloin kokonaisliiku pysyy samana riippumatta pelaajan paikasta)
			this.lastY=this.bg.y;
			if (player.dy>0) {
				this.speed=this.downspeed;
			}
			else {
				this.speed=this.upspeed;
			}
			this.bg.y-=player.dy*this.speed;
			this.ga.y-=player.dy*this.speed;
			//Liikutellaan tavaroita, jotta ylös/alas liikkuminen jopa auttaisi niiden väistelyssä.
			for(i=0; i<items.length; i++) {
				items[i].move(0, -player.dy*this.speed);
			}
		}
		//Kun saavutetaan vuoren huippu pelaajan nopeutta nostetaan.
		else if ((this.height-this.bg.y)>=(HEIGHT/2)&& player.dy<0) {
			player.Yspeed=3;
		}
}

Level.prototype.getScore = function () {
	//Tallennetaan ennätys maxScoreen
	maxScore = Math.max(-player.sprite.y+currentLevel.bg.y+currentLevel.bg.image.height, maxScore);
	
	if (maxScore > this.h) {
		this.win()
	}
	//Palautetaan ennätys
	return maxScore+"m";
}

//SCriptattu voittokävely
//100 pixelii ylöspäin, minkä jälkeen näytetään voittoanimaatio (?? joku lipun istutus) ja sitten uusi idleanimaatio.
Level.prototype.win = function () {
	//Kun peli voitetaan (ekan kerran) tapahtuu asioita.
	if (!(this.won)) {
		//Nää kaks muuttujaa on käytännössä samoja mutta selkeyttää koodin lukemista kun ne on eri nimil.
		this.moveDisabled=true;
		this.won=true;
		//Pelaaja liikkuu nyt automaattisesti ylöspäin
		player.dy=-1;
		player.dx=0;
		//Omat flagit 50px ja 25px korkeudessa tapahtuville koodeille.
		this.flag25=false;
		//player.sprite.gotoAndPlay("win_climb");
	}
	//Eli nyt mennään ylöspäin joku tietty matka. Tätä pitää kutsua jatkuvasti, jotta pelaaja liikkuu.
	if (player.sprite.y > 50) {
		//Pelaaja voitettaa (ei voi enää osua kivet ja uusi animaatio)
		player.win();
		//Pelaaja voi mennä lähemmäs ylälaitaa
		player.dy=-1;
		player.dx=0;
		player.ytop=0;
	}
	//Kun se on ohi voittoanimaatio näytetään. Kutsun player.win, koska voi olla kätevintä tehdä kokonaan uusi sprite sheet jne. Playerissä voi sitten kikkailla niillä.
	else if (player.sprite.y > 25 && !(this.flag25)) {
		//Pelaaja pysähtyy
		player.dy=0;
		//Näytetään menu
		showWinMenu();
		this.flag25=true;
	}
}
