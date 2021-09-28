<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8; X-Wap-Proxy-Cookie=none" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>在线留言 - 留言板</title>
    <link type="text/css" href="app/style/chat.css?v=1.2" rel="stylesheet" />
</head>
<body>
<div class="top"><span class="name">在线留言</span></div>
<?php
require_once 'app/app.php';
if(empty(@$_COOKIE[KEYS.'_name'])){
	echo '<div class="write login">                
                <input type="text" value="'.rand_nick().'" id="nick" maxlength="5" placeholder="输入昵称..." />                
                <a href="javascript:;" id="login" class="write-link send">进入</a>
</div>';	      
} 
echo '<div class="talk mk-chat-box">     
</div>
<div class="talk write">                
                <input type="text" id="msg" maxlength="140" placeholder="聊点什么吧..." />                
                <a href="javascript:;" id="send" class="write-link send" onclick="send()">发送</a>
</div>'; 
?>
<div class="foot"><a href=".">&copy;返回首页</a>~留言板！ <a href="">刷新页面</a></div>
<script src="app/style/jquery.min.js"></script>
<script src="app/style/chat.min.js"></script>
</body>
</html>
