var FIELD_TIME_VAR = 0.02		// indica di quanto la variabile tempo varia ad ogni iterazione delle funzioni di utilità per moti verticali di gate e modificatori
var PLAYER_TIME_VAR = 0.04; 	// indica di quanto la variabile tempo varia ad ogni iterazione delle funzioni di utilità per il moto del giocatore

function uniformlyAcceleratedMotion(vel, time, acc, y){
		
		game.timer.VERTICAL_MOTION_TIME -= time;
		y = y - (vel)*game.timer.VERTICAL_MOTION_TIME - ((acc)*game.timer.VERTICAL_MOTION_TIME*game.timer.VERTICAL_MOTION_TIME)/2;
		return y;

}

function uniformMotion(vel, time, x){

	game.timer.HORIZONTAL_MOTION_TIME += time;
	x = x - vel * (game.timer.HORIZONTAL_MOTION_TIME);
	return x;		

}

/* Rileva la pressione del tasto Invio nel caso in cui si voglia iniziare una nuova partita */
function isEnterToStartPressed (event) {

	if( event.keyCode === 13 || event.key === 13 ){
		
		
		var gameChild = document.getElementsByClassName("metaGame");
		gameChild[0].parentNode.removeChild(gameChild[0]);
		
		var footerChild = document.getElementById("footer");
		if(footerChild !== null)
		footerChild.parentNode.removeChild(footerChild);
		
		window.removeEventListener("keydown", isEnterToStartPressed, false);
		
		initGame();
	}
}
	
function fadeIn(){
	
	var op = 0;
	var timer = setInterval(function()
		{
			if(typeof document.getElementsByClassName("metaGame")[0] !== 'undefined'){
				op += 0.01;

				if(op >= 1){
					op = 1;
					clearInterval(timer);
					document.getElementsByClassName("metaGame")[0].style.opacity = 0;
				}
				document.getElementsByClassName("metaGame")[0].style.opacity = op;
			}
			else{
				clearInterval(timer);
			}
		}, 10);
}