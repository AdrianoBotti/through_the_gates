function AjaxManager() {}

AjaxManager.getAjaxObject = 
	function(){
	
		var xmlHttp = null;
		try 
		{ 
			xmlHttp = new XMLHttpRequest(); 
		} 
			catch(e) 
			{
				try 
				{ 
					xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE (recent versions)
				} 
					catch(e)
					{
						try 
						{ 
							xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE (older versions)
						} 
							catch(e) 
							{
								xmlHttp = null; 
							}
					}
			}	

		return xmlHttp;
	}

AjaxManager.performAjaxRequest = 
	function(method, url, isAsync, dataToSend, responseFunction){
	
		var xmlHttp = AjaxManager.getAjaxObject();
		if (xmlHttp === null)
		{
			window.alert("Your browser does not support AJAX!");
			return;
		}

		xmlHttp.open(method, url, isAsync); 
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.onreadystatechange = function ()
		{
			if (xmlHttp.readyState == 4)
			{
				var data = xmlHttp.responseText;	
				responseFunction(data);
			
			}
		}
		xmlHttp.send(dataToSend);
	}

AjaxManager.login =
	function(){
	
		var url = "./php/login.php";
		var un = document.getElementById("username").value;
		var pw = document.getElementById("password").value;
		var vars = "username="+un+"&password="+pw;
		AjaxManager.performAjaxRequest("POST", url, true, vars, ajaxResponse );
	}
	
AjaxManager.registration =
	function(){
	
		var url = "./php/register.php";
		var un = document.getElementById("username").value;
		var pw = document.getElementById("password").value;
		var cpw = document.getElementById("repassword").value;
		var vars = "username="+un+"&password="+pw+"&repassword="+cpw;

		AjaxManager.performAjaxRequest("POST", url, true, vars, ajaxResponse);
	}
	
AjaxManager.logout =
	function(){
	
		var url = "./php/logout.php";

		AjaxManager.performAjaxRequest("POST", url, true, null, ajaxResponse );
	}
	
	AjaxManager.highscore =
	function(){
	
		var url = "./php/highscore.php";
		AjaxManager.performAjaxRequest("POST", url, true, null, getHighscore)
	}
	
AjaxManager.setNewHighscore =
	function()
	{
		var url = "./php/setNewHighscore.php";
		var vars = "score="+game.stats.actualScore;

		AjaxManager.performAjaxRequest("POST", url, true, vars, ajaxResponse);
	}
	
AjaxManager.highscoreTable =
	function()
	{
		var url = "./php/highscoreTable.php";

		AjaxManager.performAjaxRequest("POST", url, true, null, createHighscoreTable);
	}

	
	
	/*									*/
	/*	funzioni di risposta ad AJAX	*/	
	/*									*/
	
/* gestisce le risposte dal sever per le richieste di autenticazione, chiamando la funzione che crea l'ambiente relativo ad ogni risposta */
function ajaxResponse(data) {
		
	var parent = document.getElementById("infoText");
	parent.firstChild.nodeValue = data;
			
	if(data[0] === 'L'){
		positiveLogout();
	}
			
	if(data[0] === 'W') {
		positiveLoginAndReg();
	}
			
}


function getHighscore(data){
	
	game.stats.bestScore=data;
	var bestScoreDiv = document.getElementById("bestScoreDiv");
		
	if(bestScoreDiv === null) {
		bestScoreDiv = document.createElement('div');		
		bestScoreDiv.setAttribute('id', "bestScoreDiv");
	}	
	
	var bestScoreText = document.createTextNode(data);
	bestScoreDiv.appendChild(bestScoreText);
	document.getElementById("bestScoreLabel").appendChild(bestScoreDiv);
	
}

function positiveLoginAndReg(){
		
		//tasto logout 
		var logoutButton = document.createElement('button');
		logoutButton.setAttribute("type", "button");
		logoutButton.setAttribute("id", "logoutButton");
		logoutButton.setAttribute("class", "button");
		logoutButton.setAttribute("onclick", "AjaxManager.logout()");
		var logoutButtonText = document.createTextNode("Logout");
		logoutButton.appendChild(logoutButtonText);
		document.getElementsByClassName("metaGame")[0].appendChild(logoutButton);
		
		//elimina la form di login
		var child = document.getElementById("form");
		if(child !== null)	
			child.parentNode.removeChild(child);
		
		window.addEventListener("keydown", isEnterToStartPressed, false);

}

function positiveLogout(){
	
	if(document.getElementById("game") !== null){
		var popup = document.getElementsByClassName("metaGame")[0]
		popup.removeChild(popup.childNodes[4])
		popup.removeChild(popup.childNodes[3])
		popup.removeChild(popup.childNodes[2])
	}
	
	window.removeEventListener("keydown", isEnterToStartPressed, false);
	
	var button = document.getElementById("logoutButton");
	button.setAttribute("onclick", "window.location.reload()");
	button.setAttribute("id", "reloadButton");
	button.childNodes[0].nodeValue = "Reload";
}