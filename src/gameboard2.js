
    var level = 1;
	var timeout = 3000;   
    var start = new Date().getTime();
    var interval = setInterval("timer("+timeout+","+start+","+level+")", 100);
    clearInterval(interval);
    setTableHeight();
    
    function playGame(level, btnloop, btncount){
        lvlobj=document.getElementById('failed');
        lvlobj.style.display='none';
        infoobj=document.getElementById('info');
        infoobj.style.display='none';
        start = new Date().getTime(); 
        writeform(level, btnloop, btncount);
        clearInterval(interval);
        interval = setInterval("timer("+timeout+","+start+","+level+")", 100);
        
    }
    
    function timer(time, start, level){
        var now = time-(new Date().getTime()-start);
        if( now <= 1) {
            clearInterval(interval);
            failed(level);
        }
        else document.getElementById('timer').innerHTML = (Math.floor(now/1000))+" second(s)";
    }
    
    function pickRandom(btn){
        var num = Math.pow(btn,2)-1;
        return Math.floor((Math.random()*num)+1);
    }
    
    function setLevelText(level){
        lvlobj=document.getElementById('DisplayLevel');
        lvlobj.style.display='block';
        var txt = "LEVEL " + (level-1);
        $('.LevelText').text(txt);
    }

    function failed(level){
        lvlobj=document.getElementById('selform');
        lvlobj.style.display='block';
        lvlobj=document.getElementById('failed');
        lvlobj.style.display='block';
        gameobj = document.getElementById('gameform');
        gameobj.style.display='none';
        clearInterval(interval);
        document.getElementById('timer').innerHTML = "";
        gametableobj = document.getElementById('gameform');
        var tblheight = 0;
        gametableobj.style.height=tblheight+"px";
        cookieSetter(level);
    }
    
    function cookieSetter(level){
    	var x = readCookie('ppkcookie')
    	if (x) {
    		if( x < level ){
    			createCookie('ppkcookie',level,7);
    			$('.LevelText').text('NEW HIGH SCORE! LEVEL ' + level);
    		}
    		else{
    			$('.LevelText').text('SORRY! LEVEL ' + level + ' : (HIGH SCORE) ' + x);
    		}
    	}
    	else{
    		createCookie('ppkcookie',level,7);
    		$('.LevelText').text('NEW HIGH SCORE! LEVEL ' + level);
    	}
    }
    
    function checkDerNum(check){
        $('.checkDer').text(check);
    }
    
    function setLevelTimer(level){
        if(level >= 16 && level < 24){
            timeout = 4000;
        }
    	if(level >= 24 && level < 36){
            timeout = 5000;
        }
        if(level >= 36){
            timeout = 6000;
        }
    }

    function setColor(btnloop){
        if(btnloop == 1){
            $(".button").css("background-color","red");            
        }
        if(btnloop == 2){
            $(".button").css("background-color","orange");
        }
        if(btnloop == 3){
            $(".button").css("background-color","green");
        }
        if(btnloop == 4){
            $(".button").css("background-color","blue");
        }
    }
    
    function buildGameBoard(level, btnloop, btncount){
        var txt = '';
        var cnt = 0;
        btnobj = document.getElementById('buttonform');
        var nextlevel = level + 1;
        var nextcount = btncount;
        if(btnloop == 5){
        	btnloop = 1;
        	nextcount = btncount + 1;
        }
        var nextloop = btnloop + 1;
        var X = document.width;
        var Y = document.height;
        var btnwidth = (X/nextcount)-((X/nextcount)*.1);
        var btnheight = (Y/nextcount)-((Y/nextcount)*.2);
        var num = Math.pow(nextcount,2);
        var der = pickRandom(nextcount);
        for(var i = 0; i < num; i++){
            if(i == der){
                txt=txt+'<button class="button" style="width:'+btnwidth+'px; height:'+btnheight+'px" onclick="playGame('+nextlevel+', '+nextloop+', '+nextcount+')" />red</button>';
            }
            else{
                txt=txt+'<button class="button" style="width:'+btnwidth+'px; height:'+btnheight+'px" onclick="failed('+level+')" />der</button>';
            }
            if(cnt == (nextcount-1)){
                txt=txt+'<BR>';
                cnt = 0;
            }
            else{
                cnt++;
            }
        }
        btnobj.innerHTML=txt;
        setColor(btnloop);
    }
    
    function writeform(level, btnloop, btncount){
        var nextlevel = level + 1;
        gameobj = document.getElementById('gameform');
        buildGameBoard(level, btnloop, btncount);
        gameobj.style.display='block';
        setLevelText(nextlevel);
        setLevelTimer(level);
        lvlobj=document.getElementById('selform');
        lvlobj.style.display='none';
        
    }

    function setTableHeight(){
    	 gametableobj = document.getElementById('gameform');
    	 var tblheight = document.height;
    	 gametableobj.style.height=tblheight+"px";
    }
 