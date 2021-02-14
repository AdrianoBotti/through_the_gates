var SWITCH=0; 		// passa il movimento vericale dal giocatore ai cancelli e viceversa
var NEW_GATE = 1; 	// 1: sono comparsi due nuovi cancelli e non sono stati superati, 0: i cancelli sono stati superati, ma sono ancora sul campo
var FIRST_JUMP = 0; // 0: primo salto non avvenuto; 1: primo salto avvenuto
var IMP_GIVEN = 0;	// 0: non è stato premuto il tasto di salto, e il giocatore si sta muovendo verso il basso; 1: è stato premuto il tasto di salto
var JUMP_KEY_UP = 1 // 0: il tasto di salto non è rilasciato dopo l'ultima pressione, 1: il tasto di salto è stato rilasciato dopo la pressione
var game

function initGame(){
	//ambiente e variabili di gioco
	gameEnviroment();
	game = new Game();
	game.drawer.drawInfo(game.stats);
	AjaxManager.highscore();
	NEW_GATE=1; // reinizzializzazione necessaria per le partite successive alla prima
	window.removeEventListener("keydown", isEnterToStartPressed, false)

	game.timer.initClock(game.repeat.bind(game));
	
}

/*	rileva tutti i possibili eventi del gioco e richiama la funzione atta a gestirli	*/
Game.prototype.flowCtrl = 
	function(){

//	collisione con il gate
		if(this.player.width/2>(this.gate.maxWidth-this.gate.width) && this.player.y<(this.gate.y+this.gate.height) && (this.player.y + this.player.height)>this.gate.y) 
			this.gameOver();

//	il giocatore ha toccato il fondo del campo di gioco	
		if((this.player.y + this.player.height) > this.playground.height)
			this.gameOver();
	

//	superamento del gate e eventuale aumento di difficoltà del gioco
		if((this.player.y + this.player.height)< this.gate.y) {
			if(NEW_GATE==1)	{		
			NEW_GATE=0;
			this.stats.updateScore();
			this.drawer.drawInfo(this.stats);
			this.modifyDifficulty(); 
			}
		}

	}

/*	Modifica la difficoltà del gioco, aumentando la velocità e la grandezza dei cancelli ogni 5 punti e	*/
/*	viene creato anche un modificatore ogni 5 punti														*/
Game.prototype.modifyDifficulty =
	function() {

		if(this.stats.precScore == this.stats.actualScore-5){
			this.timer.LEVEL_HEIGHT += 2; 
			this.timer.LEVEL_SPEED += 1; 
			++this.stats.level;
			this.drawer.drawInfo(this.stats);
			
			if(MODIFIER_PRESENT === 0){			
				this.modifier.createModifier();
				this.drawer.drawModifier(this.modifier);
			}
		
			this.stats.precScore = this.stats.actualScore;
		}
	}




Game.prototype.repeat =
	function(){

	/*	Operazioni da ripetere se il modificatore è in campo, verificando il tempo di vita rimasto e eliminandolo eventualmente, e se deve	*/ 
	/*	muoversi sullo schermo																												*/	
		if(MODIFIER_PRESENT===1){
			if(MOD_LIFE_TIME>0){
				--MOD_LIFE_TIME;
				if(SWITCH === 1) 
					this.modifier.move();
				this.drawer.drawModifier(this.modifier);				
			} 
			else { 
				this.modifier.deleteModifier();
			}
		}

	/*	Operazioni da ripetere sempre per cancelli e giocatore, considerando il valore della variabile SWITCH	*/
		this.gate.openOrClose();
		this.drawer.drawGate(this.gate);
		if(SWITCH===0){
			if(FIRST_JUMP === 1)
			this.player.move();
			this.drawer.drawPlayer(this.player);
		}
		else{ 
			this.gate.move();
			this.drawer.drawGate(this.gate);
		}
	/*	Verifica dell'occorrenza di eventi di gioco, come collisioni, raggiungimento del fondo del campo o modifiche di difficoltà	*/	
		this.flowCtrl();
	}
	
Game.prototype.gameOver = 
	function(){
		//ambiente e variabili di game over e possibile aggiornamento del best score
		this.timer.pause();
		gameOverEnviroment();
		GAME_OVER = 1;
		
		if(this.stats.actualScore >= this.stats.bestScore){
			this.stats.updateBestScore();
			AjaxManager.setNewHighscore();
		}
		
		//preparazione per la prossima partita
		FIRST_JUMP = 0;
		window.addEventListener("keydown", isEnterToStartPressed, false);
		window.removeEventListener("keydown", this.keyDownEvent, false );
	}

/*	Gestore degli eventi di pressione dei tasti. */

/* 	Se è stato premuto il tasto di selezione del modificatore di gioco, mentre questi è in campo, la difficoltà del gioco viene mutata in base 	*/
/* 	alla natura del modificatore stesso, se è stato premuto a gioco concluso, fa ricominciare la partita										*/

/*	Se è stato premuto il tasto di salto, vengono settate le variabili per il moto impulsivo e la variabile di primo salto						*/
Game.prototype.isEventKeyPressed = 
	function(event) {
		
		if((event.keyCode === 13 || event.key === 13) && MODIFIER_PRESENT === 1)
			this.modifier.enterForModifier();
		
		if((event.keyCode === 32 || event.key === 32) && JUMP_KEY_UP === 1){
			JUMP_KEY_UP = 0;
			this.player.jump();
		}

	}
	
Game.prototype.keyUpEvent = 
	function(event){
		if(event.keyCode === 32 || event.key === 32)
			JUMP_KEY_UP = 1;
	
	}

function Game(){
	
	this.playground = new Playground();
	this.player = new Player(this.playground);
	this.gate = new Gate(this.playground);	
	this.modifier = new Modifier();
	
	this.drawer= new Drawer(this.playground);
	this.timer = new Timer();
	this.stats = new Statistics();
	
	//http://stackoverflow.com/questions/9720927/javascript-removing-event-listeners-as-class-prototype-functions
	//necessario per poter rimuovere il listener
	this.keyDownEvent = this.isEventKeyPressed.bind(this);
	
	window.addEventListener('keydown', this.keyDownEvent, false );
	window.addEventListener('keyup', this.keyUpEvent, false);

}

