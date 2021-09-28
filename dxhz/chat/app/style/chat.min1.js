var k = 0,
	c = '',
	n = 0,
	name = '',
	key = '',
	t = 0;	
function skin(){
	$('body').toggleClass('black');
	if($('body').hasClass('black')){
		window.localStorage.setItem("skin", "black");
	}else{
		window.localStorage.setItem("skin", "default");
	}
} 

function sockll() {
	$('.mk-chat-box').scrollTop($('.mk-chat-box')[0].scrollHeight);	
}
var send_btn = true;
function send() {
	if($('#send').hasClass('disabled')){
	   return false;
	}	
	var msg = $('#msg').val();
	if (msg.length < 1) return false;
		if (k==0)
		{
			t=1;
		}
    $('#send').addClass('disabled');
	$.post('app/ajax.php?c=send', {
		'msg': msg
	}, function(res) {
		$('#msg').val('');
		if(res.type=='sys'){
           $('.mk-chat-box').append('<div class="tips"><span class="tips-danger">'+res.msg+'</span></div>');
		   sockll();
		}else{
		   addmsg(res.name, res.msg, 'right');		
		}
        setTimeout(function(){$('#send').removeClass('disabled'); }, 3000);
		window.clearInterval(c);
		n = 0;	
		c = setInterval(function() {
			get_msg();
		}, 1000)
		
	}, 'json')
}

function addmsg(name, msg, cls) {
	var imgsrc = LetterAvatar(name, 32);
	$('.mk-chat-box').append('<div class="' + cls + ' msg"><img class="head" src="' + imgsrc + '" /><span class="name">' + name + '</span><span class="content">' + msg + '</span></div>');
	sockll();
}
var play = false;
function get_msg() {
	n++;
	if(n > 90){
		window.clearInterval(c);
	    c = setInterval(function() {
			get_msg();
		}, 10000)
	}
	if (n > 150) {
		window.clearInterval(c);
		$('#tips').remove();
		$('.mk-chat-box').append('<div class="tips" id="tips"><span class="tips-danger">长时间未收到消息，<a id="fresh" href="javascript:;">点击继续收取</a></span></div>');
		sockll();
	}
	$.getJSON('app/ajax.php?c=msg&k=' + k, function(res) {		
		var str = '';
		var list = res.list;
		var count = res.count;
		for (var i = 0, len = list.length; i < len; i++) {			
			//var obj = jQuery.parseJSON(list[i]);
			var obj = list[i];
			if (obj.type == 'sys') {				
				if(obj.msg == 'rebot'){
					k = 0;
					$('.mk-chat-box').html('<div class="tips"><span class="tips-success">聊天系统刷新</span></div>');
					continue;
				}else{
				    str += '<div class="tips"><span>' + obj.times + '</span></div>';
				    str += '<div class="tips"><span class="tips-warning">系统消息：<strong>' + obj.name + '</strong> ' + obj.msg + '</span></div>';
				}
			}else {			
				if (obj.key == key && (k > 0 || t==1)) {
					console.log(t);
					k = count;
					continue;
				}
				var cls = 'left';			
				if (obj.key == key) {
					cls = 'right';
				}
				
				var imgsrc = LetterAvatar(obj.name, 32);
				str += '<div class="' + cls + ' msg"><img class="head" src="' + imgsrc + '" /><span class="name">' + obj.name + '</span><span class="content">' + obj.msg + '</span></div>'
			}
		}
		if(cls == 'left' && k>0) play = true;
		//play = true;
		//console.log(play)
		if (str != '') {
			k = count;
			//playSound();
			if(play) {//$('#notify')[0].play();
			playSound();
			//setTimeout("$('#notify')[0].play()", 500 )
			play=false;
			}
			$('.mk-chat-box').append(str);
			sockll();
		}
	})

}
$(function() {
	var skin = window.localStorage.getItem("skin")||'';
	if(skin!=''){$('body').addClass(skin);}else{
		var hour = new Date().getHours();
		console.log(hour)
		if(hour>=19 || hour<6) $('body').addClass('black');
	}
	$.get('app/ajax.php?c=login', function(res) {
		name = res.name;
		key = res.key;
		get_msg();		
		sockll();
	c = setInterval(function() {
		get_msg();
	}, 1000);
	}, 'json');
	$('#msg').on('keypress', function(event) {
		if (event.keyCode == 13) {
			send();
			return false;
		}
	})

	$('.mk-chat-box').on('click', '#fresh', function() {
		window.clearInterval(c);
		n = 0;
		$('#tips').remove();
		$('.mk-chat-box').append('<div class="tips"><span>操作成功</span></div>');
		sockll();
		c = setInterval(function() {
			get_msg();
		}, 1000);
	});
})			


function LetterAvatar(name,size,color){name=name||'';size=size||60;var colours=["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#00bcd4","#95a5a6","#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d"],nameSplit=String(name).split(' '),initials,charIndex,colourIndex,canvas,context,dataURI;if(nameSplit.length==1){initials=nameSplit[0]?nameSplit[0].charAt(0):'?'}else{initials=nameSplit[0].charAt(0)+nameSplit[1].charAt(0)}if(window.devicePixelRatio){size=(size*window.devicePixelRatio)}charIndex=(initials=='?'?72:initials.charCodeAt(0))-64;colourIndex=charIndex%20;canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;context=canvas.getContext("2d");context.fillStyle=color?color:colours[colourIndex-1];context.fillRect(0,0,canvas.width,canvas.height);context.font=Math.round(canvas.width/2)+"px 'Microsoft Yahei'";context.textAlign="center";context.fillStyle="#FFF";context.fillText(initials,size/2,size/1.5);dataURI=canvas.toDataURL();canvas=null;return dataURI}