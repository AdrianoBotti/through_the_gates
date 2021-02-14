function Timer()
{
	this.LEVEL_HEIGHT = 10;	 //parametri di altezza e velocità base,
	this.LEVEL_SPEED = 4;	 //che incrementano con l'aumentare del punteggio		

	this.VERTICAL_MOTION_TIME = 0; 	 //timer condiviso per il moto del giocatore, del modificatore e del moto verticale dei cancelli
	this.HORIZONTAL_MOTION_TIME= 0; //timer esclusivo per il moto orizzontale di cancelli 
	
	this.clock = null;
	this.interval = 10; //parametro della setInterval
}	

Timer.prototype.initClock = 
	function(repeatFunction){

		this.clock = setInterval(repeatFunction, this.interval);
		this.clock;

	}


Timer.prototype.pause =
	function(){

		clearInterval(this.clock);

	}


