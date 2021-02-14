var PLAYER_ID = "player";
var MODIFIER_ID = "modifier";
var GATES_ID = ["A", "B"];
var GATE_CLASS = "gate";
var SCORE_ID = "score";
var LEVEL_ID = "level";

function Drawer(playground){
	
	this.playground = playground;

}

Drawer.prototype.drawGate = 
	function(gate){console

	var gateNodeA = document.getElementById(GATE_CLASS + GATES_ID[0]);
	var gateNodeB = document.getElementById(GATE_CLASS + GATES_ID[1]);
		if (gateNodeA === null || gateNodeB === null){
			gateNodeA = document.createElement('div');
			gateNodeB = document.createElement('div');
			
			gateNodeA.setAttribute('id', GATE_CLASS + GATES_ID[0]);
			gateNodeA.setAttribute('class',GATE_CLASS);
			gateNodeB.setAttribute('id', GATE_CLASS + GATES_ID[1] );
			gateNodeB.setAttribute('class', GATE_CLASS);
			
			this.playground.field.appendChild(gateNodeA);
			this.playground.field.appendChild(gateNodeB);
			
			gateNodeA.style.cssFloat ="right";
			gateNodeB.style.cssFloat ="left";
			
		}
		gateNodeA.style.top =(gate.y) + 'px';
		gateNodeB.style.top =(gate.y) + 'px';

		gateNodeA.style.height =(gate.height) + 'px';
		gateNodeB.style.height =(gate.height) + 'px';
		
		gateNodeA.style.width =(gate.width) + 'px';
		gateNodeB.style.width =(gate.width) + 'px';

	}

Drawer.prototype.drawPlayer = 
	function(player){

		var playerNode = document.getElementById(PLAYER_ID);
		if (playerNode === null){
			playerNode = document.createElement('div');
			playerNode.setAttribute('id', PLAYER_ID);
			this.playground.field.appendChild(playerNode);
		}
		playerNode.style.top = player.y + 'px';
	
	}

Drawer.prototype.drawModifier = 
	function(modifier) {

		var modNode = document.getElementById(MODIFIER_ID);
		if (modNode === null){
			modNode = document.createElement('div');
			modNode.setAttribute('id', MODIFIER_ID);
			this.playground.field.appendChild(modNode);
		}
		modNode.style.top = modifier.y + 'px';
		modNode.style.left = modifier.x + 'px';
		modNode.style.width = modifier.size + 'px';
		modNode.style.height = modifier.size + 'px';
		
		if(modifier.type == 1) modNode.style.backgroundColor = "red" ;
		else modNode.style.backgroundColor = "green";
		
	}

Drawer.prototype.drawInfo =
	function(stats){
	
	//score
		var scoreDiv = document.getElementById(SCORE_ID);
		
		if(scoreDiv === null) {
			scoreDiv = document.createElement('div');		
			scoreDiv.setAttribute('id', SCORE_ID);
		}
		else{
			scoreDiv.removeChild(scoreDiv.childNodes[0]);		
		}
		var scoreText = document.createTextNode(stats.actualScore);
		scoreDiv.appendChild(scoreText);
		document.getElementById("scoreLabel").appendChild(scoreDiv);
		
	//difficulty level	
		var levelDiv = document.getElementById(LEVEL_ID);
		
		if(levelDiv === null) {
			levelDiv = document.createElement('div');		
			levelDiv.setAttribute('id', LEVEL_ID);
		}
		else{
			levelDiv.removeChild(levelDiv.childNodes[0]);		
		}
		var levelText = document.createTextNode(stats.level);
		levelDiv.appendChild(levelText);
		document.getElementById("difficultyLabel").appendChild(levelDiv);
	}
