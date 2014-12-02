var stage, pauseCircle, goCircle, output;

		function init() {
			stage = new createjs.Stage("game");
			
			//stage.addChild(goCircle);

			// and register our main listener
			createjs.Ticker.on("tick", tick);

			// UI code:
			
		}
		
		function tick(event) {
		
			//pause
            if (!createjs.Ticker.getPaused()) {
                
                
            }
			
			stage.update(event); // important!!
		}
		
		/*function togglePause() {
			var paused = !createjs.Ticker.getPaused();
			createjs.Ticker.setPaused(paused);
			document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
		}*/