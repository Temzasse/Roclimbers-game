function Level(background, h) {
	this.speed=3;
	this.height=h;
	this.bg = new createjs.Bitmap(background);
}

Level.prototype.move = function () {
		this.bg.y-=player.dy*this.speed;
		this.bg.x-=player.dx*this.speed;
}
	