<?
header('Content-Type: image/png');
$txt=file_get_contents('imgurl.txt');
$array=explode("\n",$txt);
$url=trim($array[array_rand($array)]);
exit(header("Location:".$url));
//exit(file_get_contents($url));
 ?>