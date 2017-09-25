<?php
	$jsonString = file_get_contents('json/userprofile-data.json');
	$data = json_decode($jsonString, true);

	$data['popularityData']['likes'] += 1;

	$newJsonString = json_encode($data);
	file_put_contents('json/userprofile-data.json', $newJsonString);
?>