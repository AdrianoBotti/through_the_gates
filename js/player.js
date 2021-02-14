
function Player(playground){
	
	this.x = 0;
	this.height = 40;
	this.width = 40;
	this.y = playground.height - this.height  ;

}

 
Player.prototype.move = 
	function(){

	/*	Se l'utente non ha premuto il tasto di salto, e quello precedente è finito, il giocatore si muove verso il basso  */  
		if(IMP_GIVEN==0){
			if(this.y<game.playground.height - this.height){ 
		
				this.y = uniformlyAcceleratedMotion(0, -PLAYER_TIME_VAR, -ACC, this.y)
			}
		}	

	/*	Se il tasto di salto è stato premuto e il giocatore si trova ancora nei 3/4 inferiori del campo da gioco, il giocatore si muove verso l'alto,	*/
	/*	e risetta le variabili di impulso e tempo alla fine del moto																					*/
		if( IMP_GIVEN==1){
			if(this.y>=game.playground.height/4 + this.height){
				
				this.y = uniformlyAcceleratedMotion(-VEL, PLAYER_TIME_VAR, -ACC, this.y)
				
				if(game.timer.VERTICAL_MOTION_TIME<=0) {IMP_GIVEN=0; game.timer.VERTICAL_MOTION_TIME=0.2;}
			}
			/*	Se il giocatore ha raggiunto i 3/4 del campo da gioco, il movimento viene fermato e viene attivato quello dei cancelli e dei modificatori	*/ 				/*	modificatori 																													*/
			else{
				this.y=this.y;
				SWITCH=1;
			}
		}

	}
/* setta i parametri per il movimento impulsivo */
Player.prototype.jump = 
	function() {
			FIRST_JUMP = 1;
			IMP_GIVEN = 1;
			VEL=-17;
			game.timer.VERTICAL_MOTION_TIME=1;
}