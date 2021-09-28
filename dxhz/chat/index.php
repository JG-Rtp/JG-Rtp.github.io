<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8; X-Wap-Proxy-Cookie=none" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>在线留言聊天 -智卓星网</title>
    <link type="text/css" href="app/style/chat.css" rel="stylesheet" />
</head>
<body>
<div class="top"><span class="name">聊天留言</span>-<a href="javascript:;" onclick="skin()">点击换肤</a></div>
<div class="mk-chat-box">     
</div>
<div class="write">                <?php
require_once 'app/app.php';
if(empty(@$_COOKIE[KEYS.'_name'])){
	echo '<div class="write login">                
                <input type="text" value="'.rand_nick().'" id="nick" maxlength="5" placeholder="请输入昵称..." />                
                <a href="javascript:;" id="login" class="write-link send">进入</a>
</div>';	      
} 
echo '<div class="talk mk-chat-box">     
</div>
<div class="talk write">                
                <input type="text" id="msg" maxlength="140" placeholder="请输入内容信息..." />                
                <a href="javascript:;" id="send" class="write-link send" onclick="send()">发送</a>
</div>'; 
?>

<div class="foot">&copy;<a target="_blank" href="../">返回首页</a>~聊天留言！<a href="javascript:location.reload()">刷新</a>-<a id="update" href="javascript:;">提示</a><script language="javascript" type="text/javascript" src="http://js.users.51.la/18759442.js"></script></div>
<script src="app/style/jquery.min.js"></script>
<script src="app/style/chat.min.js"></script>
<script>
//浏览器适用       
 contextClass = window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
 try {
       var context = new contextClass();
       var source = null;
       var audioBuffer = null;
       function stopSound() {
            if (source) {
                source.stop(musics); //立即停止
             }
      		}
      function playSound() {
      	        context.resume();
                source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = false;
                source.connect(context.destination);
                source.start(0); //立即播放    
            }
      function initSound(arrayBuffer) {
                context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
                    audioBuffer = buffer;
                    //$("#play").trigger("click");
                   // playSound();
                }, function (e) { //解码出错时的回调函数
                    console.log('404', e);
                });
            }
      function loadAudioFile(url) {
                var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function (e) { //下载完成
                    initSound(this.response);
                };
                xhr.send();
                //$.get(url,function(res){initSound(res)})
            }
            //这里用来存储背景音乐的路径
             loadAudioFile('apple.mp3');
 } catch (e) {
      console.log('无法找到音乐！');
 }
 
   //$('#chatAudio')[0].play();
//setTimeout("$('#notify')[0].play()", 500 )

	$('#update').on('click',function(){
		$.get('up.txt?v=',function(res){alert(res)})
	});
</script>
</html>
