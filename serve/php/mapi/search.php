<?php
$params = $_SERVER["QUERY_STRING"];

$opt=array('http'=>array('header'=>"Referer: https://y.qq.com/portal/playlist.html")); 
$context=stream_context_create($opt); 

$url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?'.$params;
echo file_get_contents($url,false, $context);
?>