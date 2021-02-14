<?php
	require_once "./utility/dbManager.php";	

	$queryText = "select username, highscore from users order by highscore desc limit 5";
	
	$rows = array();
	
	$result = $db->performQuery($queryText);
	
	while($row = $result->fetch_assoc()) $rows[] = $row;

	$db->closeConnection();
	echo json_encode($rows);
?>