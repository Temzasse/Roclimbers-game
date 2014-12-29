function Item(x, layer) {
	//Tässä esimerkki kivelle. Voisi yleistää, tehdä yleisluokan ja sitten spesifioida eri itemmit.
	//otetaan x talteen. Kun itemmille annetaan x voi scriptata tilanteita, tai heittää randomilla.
	this.x=x;
	this.warning = new createjs.Bitmap(r_warning);
	this.object = new createjs.Bitmap(rock);
	
	//Heitetään objektit maailmaan
	layer.addChild(this.warning);
	layer.addChild(this.object);
	//onko tavara jo tippumassa vai vielä varoitusvaiheessa?
	this.falling=false;
	
	//nopeus
	this.vel=0;
	
	//Laitetaan kivi piiloon...
	this.object.visible=false;
	//Otetaan luomisaika talteen
	this.startTime=Date.now();
	
	//heitetään varotus ja tavara oikeeseen kohtaan
	this.warning.x=this.x;
	this.warning.y=-20;
	this.object.x=this.x;
	//Kivi ei putoa varoituksesta vaan jostain taivaalta. tää voisi olla random tai samalla tavalla kuin x
	this.object.y=-100;
	//eventlistener
}

Item.prototype.destroy = function() {
 //Tähän osuma-animaatio
}


//tää on turha funktio.. ehkä...
Item.prototype.warn = function () {
	this.warning.x=this.x;
}

//Tällä liikutellaan tavaroita taustan mukana
Item.prototype.move = function(x,y) {
	this.warning.x+=x;
	this.object.x+=x;
	//Muutetaan ytä vaan jos kivi on jo liikkeellä
	if (this.vel!=0) {
		this.object.y+=y;
	}	
}

Item.prototype.crash = function () {
	player.die();
}

//päivitysfunktio. Tänne vois lisätä myös törmäysvarmistuksen
Item.prototype.update = function () {
	//Onko varoitus ollut jo 3 sekuntia ja kiveä ei ole vielä tiputettu
	if (Date.now()-this.startTime > 3000 && this.falling==false) {
		this.object.visible=true;
		this.warning.visible=false;
		this.falling=true;
		createjs.Sound.play("rock_drop_sound");
	}
	//Muuten kivi liikkuu. Tän perään lisättäis törmäystarkistus
	else if (this.falling==true) {
		//nopeus on nopeus+painovoima-ilmanvastus
		this.vel+=GRAVITY-this.vel*0.01;
		this.object.y+=this.vel;
	}	
}
	
	