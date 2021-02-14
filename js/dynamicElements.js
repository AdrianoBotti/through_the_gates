function registerForm()
{
	fadeIn();
	
	//elimina la form di login
	var child = document.getElementById("form");
	if(child !== null)	
		child.parentNode.removeChild(child);
		
	//crea la form di registrazione
	document.getElementById("infoText").firstChild.nodeValue = "Register Now!"

	var registerForm = document.createElement('form');
	registerForm.setAttribute("method", "post");
	registerForm.setAttribute("id", "form");
	document.getElementsByClassName("metaGame")[0].appendChild(registerForm);

	var usernameLabel = document.createElement('label');
	var usernameLabelText = document.createTextNode("Username  ");
	usernameLabel.appendChild(usernameLabelText);
	registerForm.appendChild(usernameLabel);

	var usernameInput = document.createElement('input');
	usernameInput.setAttribute("type", "text");
	usernameInput.setAttribute("id", "username");
	usernameInput.setAttribute("class", "formInput");
	usernameInput.setAttribute("name", "username");
	usernameLabel.appendChild(usernameInput);

	var passwordLabel = document.createElement('label');
	var passwordLabelText = document.createTextNode("Password  ");
	passwordLabel.appendChild(passwordLabelText);
	registerForm.appendChild(passwordLabel);

	var passwordInput = document.createElement('input');
	passwordInput.setAttribute("type", "password");
	passwordInput.setAttribute("id", "password");
	passwordInput.setAttribute("class", "formInput");
	passwordInput.setAttribute("name", "password");
	passwordLabel.appendChild(passwordInput);

	var confirmPasswordLabel = document.createElement('label');
	var confirmPasswordLabelText = document.createTextNode("Confirm password  ");
	confirmPasswordLabel.appendChild(confirmPasswordLabelText);
	registerForm.appendChild(confirmPasswordLabel);

	var confirmPasswordInput = document.createElement('input');
	confirmPasswordInput.setAttribute("type", "password");
	confirmPasswordInput.setAttribute("id", "repassword");
	confirmPasswordInput.setAttribute("class", "formInput");
	confirmPasswordInput.setAttribute("name", "confirm_password");
	confirmPasswordLabel.appendChild(confirmPasswordInput);

	var registerButton = document.createElement('button');
	registerButton.setAttribute("type", "button");
	registerButton.setAttribute("class", "button");
	registerButton.setAttribute("onclick", "AjaxManager.registration()");
	var registerButtonText = document.createTextNode("Register");
	registerButton.appendChild(registerButtonText);
	registerForm.appendChild(registerButton);
	}
	
/*	Crea le label per le barre laterali e il campo di gioco, e chiama la funzione di creazione della tabella dei migliori punteggi*/
 	
function gameEnviroment(){
	
	if(document.getElementById("game") !== null){
		document.body.removeChild(document.getElementById("game"));
	}
	
	//Game 
	
	var gameDiv = document.createElement('div');
	gameDiv.setAttribute("id", "game");
	
	document.body.appendChild(gameDiv);
	
	// Left side
	
	var leftside = document.createElement('aside');
	leftside.setAttribute("id", "leftside");
	

	var scoreLabel = document.createElement('label');
	var scoreLabelText = document.createTextNode("Score");
	scoreLabel.setAttribute("id", "scoreLabel")
	scoreLabel.setAttribute("class", "info")
	scoreLabel.appendChild(scoreLabelText);
	leftside.appendChild(scoreLabel);
	
	var bestScoreLabel = document.createElement('label');
	var bestScoreLabelText = document.createTextNode("Best Score");
	bestScoreLabel.setAttribute("id","bestScoreLabel")
	bestScoreLabel.setAttribute("class", "info")
	bestScoreLabel.appendChild(bestScoreLabelText);
	leftside.appendChild(bestScoreLabel);
	
	var difficultyLabel = document.createElement('label');
	var difficultyLabelText = document.createTextNode("Difficulty Level");
	difficultyLabel.setAttribute("id","difficultyLabel")
	difficultyLabel.setAttribute("class", "info")
	difficultyLabel.appendChild(difficultyLabelText);
	leftside.appendChild(difficultyLabel);
	
	gameDiv.appendChild(leftside)
	
	//Playground
	
	var playgroundDiv = document.createElement('div');
	playgroundDiv.setAttribute("id", "playground");
	
	gameDiv.appendChild(playgroundDiv);
	
	// Right side
	
	var rightside = document.createElement('aside');
	rightside.setAttribute("id", "rightside");
	
	var bestRankLabel = document.createElement('label');
	var bestRankLabelText = document.createTextNode("Best Rankings");
	bestRankLabel.setAttribute("id", "bestRank")
	bestRankLabel.setAttribute("class", "info")
	bestRankLabel.appendChild(bestRankLabelText);
	rightside.appendChild(bestRankLabel);
	
	gameDiv.appendChild(rightside);
	
	//tabella punteggi
	AjaxManager.highscoreTable();
	
}

/*	crea la tabella dei punteggi migliori	*/
function createHighscoreTable(data){

	var highscoreArray = JSON.parse(data);

	var highscoreTable = document.createElement('table');
	highscoreTable.setAttribute("id", "table");

	var highscoreTableHead = document.createElement('thead');
	highscoreTable.appendChild(highscoreTableHead);

	var highscoreTableHeadRow = document.createElement('tr');
	highscoreTableHead.appendChild(highscoreTableHeadRow);

	var highscoreTableHeadUserRow = document.createElement('th');
	var highscoreTableHeadUserRowText = document.createTextNode("User");
	highscoreTableHeadUserRow.appendChild(highscoreTableHeadUserRowText);
	highscoreTableHeadRow.appendChild(highscoreTableHeadUserRow);

	var highscoreTableHeadScoreRow = document.createElement('th');
	var highscoreTableHeadScoreRowText = document.createTextNode("Score");
	highscoreTableHeadScoreRow.appendChild(highscoreTableHeadScoreRowText);
	highscoreTableHeadRow.appendChild(highscoreTableHeadScoreRow);
	
	var highscoreTableBody = document.createElement('tbody');
	highscoreTable.appendChild(highscoreTableBody);

	var highscoreTableBodyRow = null;
	var highscoreTableBodyRowUsernameData = null;
	var highscoreTableBodyRowUsernameDataText = null;
	var highscoreTableBodyRowScoreData = null;
	var highscoreTableBodyRowScoreDataText= null;
	
	//http://stackoverflow.com/questions/4546159/how-to-find-length-of-json-using-json-parse
	//per vedere quante entrate creare nella tabella punteggi, senza superare le 5
	var x = 0;
	for(var k in highscoreArray) if(highscoreArray.hasOwnProperty(k)) x++;
	var length = Math.min(5, x)
	
	for(var i = 0; i <length; ++i)
	{
		highscoreTableBodyRow = document.createElement('tr');
		highscoreTableBody.appendChild(highscoreTableBodyRow);

		highscoreTableBodyRowUsernameData = document.createElement('td');
		highscoreTableBodyRowUsernameDataText = document.createTextNode(highscoreArray[i]["username"]);
		highscoreTableBodyRowUsernameData.appendChild(highscoreTableBodyRowUsernameDataText);

		highscoreTableBodyRowScoreData = document.createElement('td');
		highscoreTableBodyRowScoreDataText = document.createTextNode(highscoreArray[i]["highscore"]);
		highscoreTableBodyRowScoreData.appendChild(highscoreTableBodyRowScoreDataText);

		highscoreTableBodyRow.appendChild(highscoreTableBodyRowUsernameData);
		highscoreTableBodyRow.appendChild(highscoreTableBodyRowScoreData);
	}
		
	document.getElementById("bestRank").appendChild(highscoreTable);
}

function gameOverEnviroment(){
	
	var gameOverDiv = document.createElement('div');
	gameOverDiv.setAttribute("class", "metaGame");
	gameOverDiv.style.backgroundColor = "rgba(180,180,180,0.3)";
	
	document.body.appendChild(gameOverDiv);
	
	//label e div per le informazioni nel div di gameover
	
	var title = document.createElement('h1');
	var titleText = document.createTextNode("Game Over!");
	title.setAttribute("id", "gameOverTitle")
	title.appendChild(titleText);
	gameOverDiv.appendChild(title);
	
	var infoText = document.createElement('h3');
	var infoTextText = document.createTextNode("");
	infoText.setAttribute("id", "infoText")
	infoText.appendChild(infoTextText);
	gameOverDiv.appendChild(infoText);
	
	var scoreLabel = document.createElement('label');
	var scoreLabelText = document.createTextNode("Score");
	scoreLabel.setAttribute("id", "scoreOverLabel")
	scoreLabel.appendChild(scoreLabelText);
	gameOverDiv.appendChild(scoreLabel);
	
	var gameOverScoreDiv = document.createElement('div');
	var gameOverScoreText = document.createTextNode(game.stats.actualScore);
	gameOverScoreDiv.appendChild(gameOverScoreText);
	document.getElementById("scoreOverLabel").appendChild(gameOverScoreDiv);
	
	var bestScoreLabel = document.createElement('label');
	var bestScoreLabelText = document.createTextNode("Best Score");
	bestScoreLabel.setAttribute("id","bestScoreOverLabel")
	bestScoreLabel.appendChild(bestScoreLabelText);
	gameOverDiv.appendChild(bestScoreLabel);
	
	var gameOverBestScoreDiv = document.createElement('div');
	var gameOverBestScoreText = document.createTextNode(game.stats.bestScore);
	gameOverBestScoreDiv.appendChild(gameOverBestScoreText);
	document.getElementById("bestScoreOverLabel").appendChild(gameOverBestScoreDiv);
	
	var playAgain = document.createElement('h3');
	var playAgainText = document.createTextNode("Press ENTER to play again");
	playAgain.setAttribute("id", "playAgain")
	playAgain.appendChild(playAgainText);
	gameOverDiv.appendChild(playAgain);
	
	//bottone logout
	
	var logoutButton = document.createElement('button');
	logoutButton.setAttribute("type", "button");
	logoutButton.setAttribute("id", "logoutButton");
	logoutButton.setAttribute("class", "button");
	logoutButton.setAttribute("onclick", "AjaxManager.logout()");
	var logoutButtonText = document.createTextNode("Logout");
	logoutButton.appendChild(logoutButtonText);
	gameOverDiv.appendChild(logoutButton);
	
	fadeIn();

	
}