<?php
	require_once "./utility/dbManager.php";
	session_start();

	$newHighscore = $_POST['score'];

	$queryText = "update users set `highscore`='" . $newHighscore . "' where `username`='" . $_SESSION['username'] . "'";

	$db->performQuery($queryText);
	$db->closeConnection();
	
	echo 'Congratulations! New Highscore!'
?>