<?php
$params = $_SERVER["QUERY_STRING"];

$opt=array('http'=>array('header'=>"Referer: https://y.qq.com/portal/playlist.html")); 
$context=stream_context_create($opt); 

$url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?'.$params;
echo file_get_contents($url,false, $context);
?>