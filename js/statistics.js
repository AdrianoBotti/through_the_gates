
function Statistics(){
	
	this.actualScore = 0;
	this.precScore = this.actualScore;	// mantiene l'ultimo punteggio nel quale c'è stato un incremento di livello di difficoltà
	this.bestScore;
	this.precBestScore;					// mantiene il miglior punteggio ottenuto fino a quel momento nelle partite precendenti
	this.level=1;
	
}

/* Aggiorna il punteggio ed eventualmente richiama la funzione per aggiornare il miglior punteggio */
Statistics.prototype.updateScore =
	function(){

		++this.actualScore;
		if(this.actualScore>this.bestScore)
			this.updateBestScore();
	}

Statistics.prototype.updateBestScore = 
	function() {
	
		this.bestScore=this.actualScore;	
	
	}
