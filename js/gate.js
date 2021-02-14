var GATES_HEIGHT_MULTIPLIER = 5; // costanti: settano il range in cui l'altezza e la velocità dei cancelli possono variare 
var GATES_SPEED_MULTIPLIER = 2;   // sommate all'altezza base e velocità base relative al livello di difficoltà raggiunto

function Gate(playground){
	
	this.y = 0   
	this.maxWidth = playground.width/2;
	this.width = this.maxWidth/2 + Math.random() * this.maxWidth/2; 
	this.height = 10;
	this.horizontalV = 4;
	
}

Gate.prototype.move = 
	function(){

		this.y = uniformlyAcceleratedMotion(VEL, FIELD_TIME_VAR, ACC, this.y);

	/*	Se il cancello è scomparso nella parte bassa dello schermo, si generano nuove velocità e altezza, si fa ripartire 			*/  	
	/*	il cancello dalla parte  superiore dello schermo e si segnala che questi non è stato ancora superato, e gli si assegna una 	*/
	/*	apertura casuale																											*/
		if(this.y>game.playground.height){																			
				this.height = game.timer.LEVEL_HEIGHT + Math.ceil((Math.random()+0.1)*GATES_HEIGHT_MULTIPLIER);		
				this.horizontalV = game.timer.LEVEL_SPEED + Math.ceil((Math.random()+0.1)*GATES_SPEED_MULTIPLIER);	
				this.y =-this.height;
				this.width = this.maxWidth/2 + Math.random() * this.maxWidth/2;
				NEW_GATE = 1;																						
		}																										 		
	
	/*	Finito il moto verticale dei cancelli, vengono risettate le variabili per il moto di discesa del giocatore */	
		if(game.timer.VERTICAL_MOTION_TIME<=0){
			SWITCH=0; IMP_GIVEN=0; game.timer.VERTICAL_MOTION_TIME=0.2;
		}
		
	}
	
Gate.prototype.openOrClose = 
	function(){ 

		if(this.width>=this.maxWidth/2){

			this.width = uniformMotion(this.horizontalV, FIELD_TIME_VAR, this.width)

		/*	Raggiunta l'ampiezza massima, si inverte la velocità e si setta di nuovo il tempo	*/
			if(this.width>this.maxWidth){
					game.timer.HORIZONTAL_MOTION_TIME=0.1;
					this.width=this.maxWidth;
					this.horizontalV = (this.horizontalV)*-1;
			}
		}

	/*	Raggiunta l'ampiezza minima, si inverte la velocità e si setta il tempo	*/
		if(this.width<this.maxWidth/2){
			this.horizontalV = (this.horizontalV)*-1;
			this.width= this.maxWidth/2;
			game.timer.HORIZONTAL_MOTION_TIME=0.3;
		}

	}
