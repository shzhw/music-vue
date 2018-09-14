<?php
$params = $_SERVER["QUERY_STRING"];

$opt=array('http'=>array('header'=>"Referer: https://y.qq.com/portal/playlist.html")); 
$context=stream_context_create($opt); 

$url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?'.$params;
echo file_get_contents($url,false, $context);
?>