var MOD_LIFE_TIME = 100; 	// per quanti millisecondi il modificatore di gioco rimane sullo schermo 
var TYPE = ['0','1'];	// 0: il modificatore riduce altezza e velocità dei cancelli; 1; il modificatore aumenta altezza e velocità dei cancelli

function Modifier() {

	this.size = 30;
	this.x;
	this.y;
	this.type = null;

}
		

/*       E' necessario utilizzare più volte la funzione random, non potendo			 */ 
/* 		  mettere le scelte sotto un unica generazione casuale, altrimenti			 */
/* 	altrimenti determinate condizioni si verificherebbero inevitabilmente in coppia	 */
Modifier.prototype.createModifier = 
	function(){
		
		MODIFIER_PRESENT = 1;

 // assegna casualmente una natura al modificatore di gioco  
		if(Math.random()<0.5)
			this.type = TYPE[0];
		else 
			this.type = TYPE[1];
	
// posiziona nello spazio di gioco, con coordinate casuali, il modificatore, evitando che si sovrapponga al giocatore e ai cancelli
		//coordinate y
		if(Math.random()<0.5) {
			this.y = (Math.random()*(game.gate.y - this.size - 20));						
		}											
		else {			
			this.y = (game.gate.y + game.gate.height) + (Math.random()*(game.playground.height-(game.gate.y+game.gate.height) - this.size)/2);	
		}

		//coordinate x
		if(Math.random()<0.5){
			this.x = (Math.random()*(game.playground.width/2 - (this.size+game.player.width)));		
		}																														
		else{
			this.x = game.playground.width/2 + this.size + (Math.random()*(game.playground.width/2 - (this.size + game.player.width)));
		}	
		
	}

Modifier.prototype.deleteModifier = 
	function(){

		var parent = game.playground.field;
		parent.removeChild(document.getElementById('modifier'));
		MODIFIER_PRESENT=0;
		MOD_LIFE_TIME=100;

	}

/*	Muove il modificatore di gioco con gli stessi parametri con cui si muovono i cancelli, */
/*	e richiama la funzione deleteModifier quando scompare nella parte bassa dello schermo */
Modifier.prototype.move = 
	function(){

		this.y = uniformlyAcceleratedMotion(VEL, FIELD_TIME_VAR, ACC, this.y);
		if(this.y>game.playground.height){
		this.deleteModifier();
		}
			
	}
	
	
/* Rileva la pressione del tasto Invio per l'attivazione del modifcatore di gioco */
Modifier.prototype.enterForModifier =
	function() {
	
	if(this.modifier.type==1){
		this.timer.LEVEL_HEIGHT +=2;
		this.timer.LEVEL_SPEED +=1; 
		++this.stats.level;
		this.drawer.drawInfo(this.stats);
	}
		else{
			this.timer.LEVEL_HEIGHT -=2;
			this.timer.LEVEL_SPEED -=1; 
			--this.stats.level;
			this.drawer.drawInfo(this.stats);
		}
	this.modifier.deleteModifier();

}