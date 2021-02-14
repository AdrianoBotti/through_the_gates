<?php
	
	function setSession($username, $userId){
		$_SESSION['userId'] = $userId;
		$_SESSION['username'] = $username;
	}

	function isLogged(){		
		if(isset($_SESSION['userId'])){
		echo '<script type="text/javascript">'										// necessario per aggiungere l'event listener in caso di ritorno di true 
			, ' window.addEventListener("keydown", isEnterToStartPressed, false);'	// dalla IsLogged() e aggiornamento della pagina, non venendo chiamata più 
			, '</script>';															// la positiveLogin();
			return $_SESSION['userId'];
			;
		}
		else
			return false;
	}

?>