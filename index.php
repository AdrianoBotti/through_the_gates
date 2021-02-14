<?php
    session_start();
	include "./php/utility/session.php";
?>

<!DOCTYPE html>
<html title="Through the Gates" lang="it">
	<head>
		<title>Through the Gates</title>
		<meta charset="UTF-8">
		<meta name="author" content="Adriano Botti">
		
		<link rel="stylesheet" href="css/game.css" type="text/css">
		<link rel="stylesheet" href="css/metaGame.css" type="text/css">

		<script src="js/game.js" ></script>
		<script src="js/playground.js" ></script>
		<script src="js/player.js" ></script>
		<script src="js/gate.js" ></script>
		<script src="js/drawer.js" ></script>
		<script src="js/timer.js" ></script>
		<script src="js/statistics.js" ></script>
		<script src="js/modifier.js" ></script>
		<script src="js/utility.js" ></script>
		<script src="js/AjaxManager.js" ></script>
		<script src="js/dynamicElements.js" ></script>
		
	</head>
	
	<body onload="fadeIn()">
	  <div class="metaGame">
		<h1 id="title">Through the Gates</h1>

			<?php
				if(!isLogged()) echo	'<h3 id= "infoText"> Log In! </h3>
											<form id="form" method="post">
												<label>Username  <input class ="formInput" id="username" name="username" type="text"></label>
												
												<label>Password  <input class ="formInput" id="password" name="password" type="password" ></label>

												<button class="button" type="button" id="loginButton" onclick="AjaxManager.login();">Login</button>
												
												<a id="register_link" href="#" onclick="registerForm();">Create an account!</a>
											</form>
										';
										
					else echo	'<h3 id = "infoText" > Welcome ' . $_SESSION['username'] . ', press ENTER to play!</h3>
									<button  class="button" type="button" id="logoutButton" onclick="AjaxManager.logout();">Logout</button>';
			?>
     </div>
	
	<footer id="footer">
		<p>
			<a href="./html/howtoplay.html">How to play</a>
				 
			<a href="./html/ToS.html">Terms of Service</a>
				 
			<a href="./html/privacy.html">Privacy</a>
		</p>
	</footer>

</body>
</html>
