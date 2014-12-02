Player.prototype.move					= function(){
	// going sideways
	if( this.dy === 0 && this.dx !== 0){
		if ( this.frameIndex === 3){
			this.frameIndex = 4;
		}
		else{
			this.frameIndex = 3;
		}
	}
	// going up/down
	else if( this.dx === 0 && this.dy !== 0){
		if ( this.frameIndex === 1){
			this.frameIndex = 2;
		}
		else{
			this.frameIndex = 1;
		}
	}
	// going diagonallthis.dy
	else if( this.dy !== 0 && this.dx !== 0){
		if ( this.frameIndex === 3){
			this.frameIndex = 4;
		}
		else{
			this.frameIndex = 3;
		}
	}
	// staying still
	else{
		this.frameIndex = 0;
	}
	this.x_pos += this.dx*this.speed;
	this.y_pos += this.dy*this.speed;
}



// Keydown and Keyup events
var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var LEFT_DOWN = false;
var RIGHT_DOWN = false;
var UP_DOWN = false;
var DOWN_DOWN = false;

$(document).keydown(function(e) {

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
});

$(document).keyup(function(e) {
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
});
