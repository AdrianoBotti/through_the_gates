var ACC = 15;				// parametro costante di accelerazione nel moto 
var VEL = 0;  				// parametro di velocità iniziale
var MODIFIER_PRESENT = 0;	// 0: sul campo non è presente nessun modificatore; 1: sul campo è presente il modificatore

function Playground(){

	this.left = document.getElementById("playground").offsetLeft;
	this.right = document.getElementById("playground").offsetRight;
	this.width = document.getElementById("playground").offsetWidth;
	this.height = document.getElementById("playground").offsetHeight;
	this.field = document.getElementById("playground");

}
