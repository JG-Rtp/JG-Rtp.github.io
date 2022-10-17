//运行时间
function siteTime() {
  window.setTimeout("siteTime()", 1000);
     var seconds = 1000;
     var minutes = seconds * 60;
     var hours = minutes * 60;
     var days = hours * 24;
     var years = days * 365;
     var today = new Date();
     var todayYear = today.getFullYear();
     var todayMonth = today.getMonth() + 1;
     var todayDate = today.getDate();
     var todayHour = today.getHours();
     var todayMinute = today.getMinutes();
     var todaySecond = today.getSeconds();


     var t1 = Date.UTC(2021, 8, 6, 00, 00, 00); 
     var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
     var diff = t2 - t1;
     var diffYears = Math.floor(diff / years);
      var diffDays = Math.floor((diff / days) - diffYears * 365);
     var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
     var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
     var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
         function siteRun(d){var nowD=new Date();return parseInt((nowD.getTime()-Date.parse(d))/24/60/60/1000)} document.getElementById("iday").innerHTML=siteRun("2021/08/06");
      document.getElementById("sitetime").innerHTML = "已勉强运行 " +   iday + " 天 " + diffHours + " 小时 " + diffMinutes + " 分钟 " + diffSeconds + " 秒";
         }  
         siteTime();
