<?php
	$jsonString = file_get_contents('json/userprofile-data.json');
	$data = json_decode($jsonString, true);

	$countPosts = count($data['profileComments']);
	$data['profileComments'][$countPosts+1]['userAvatarURL'] = $data['ownerAvatarURL'];
	$data['profileComments'][$countPosts+1]['fullName'] = $data['fullName'];
	$data['profileComments'][$countPosts+1]['postDate'] = date("m/d/Y");
	$data['profileComments'][$countPosts+1]['content'] = $_POST['content'];

	$newJsonString = json_encode($data);
	file_put_contents('json/userprofile-data.json', $newJsonString);

	if(isset($_SERVER['HTTP_REFERER'])){
		header("Location: " . $_SERVER['HTTP_REFERER']);
	} else {
		echo "An Error has occured.";
	}
?>