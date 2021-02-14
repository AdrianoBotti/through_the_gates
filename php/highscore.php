<?php
	require_once "./utility/dbManager.php";
	session_start();
	
	$queryText = "select highscore from users where username='" . $_SESSION['username'] . "'";
	
	$highscore = $bookingDB->performQuery($queryText)->fetch_assoc()['highscore'];
	$bookingDB->closeConnection();
	
	echo $highscore;
?>