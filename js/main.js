(function(){
	function Util(){
       
	}
	Util.prototype = {
		main:function(){
           this.fixedScroll(); 
           this.showSwitch();
           this.carousel1();
           this.carousel2();
           this.carousel3();
		},
		getElement:function(node){
           node = typeof node == 'string'?document.getElementById('node') :node;
           return node;
		},
		getElementByClassName:function(str,root,tag){
           if(root){
           	root = typeof root =='string'?document.getElementById(root):root;
           }else{
            root = document.body;
           }
           tag = tag||'*';
           var els = root.getElementsByTagName(tag),arr = [];
           for(var i = 0,n = els.length; i< n ;i++){
              for(var j=0, k=els[i].className.split(" "),l=k.length;j < l;j++){
                if(k[j] == str){
                	arr.push(els[i]);
                	break;
                };
              };
           }

           return arr;
		},
		getStyle:function(obj,attr){
           if(obj.currentStyle){
           	   return obj.currentStyle[attr];
           }else{
           	   return getComputedStyle(obj,false)[attr];
           }
		},
		setStyle:function(obj,attr,value){
           if(arguments.length == 2){
           	   return this.getStyle(obj,attr);
           }else{
           	    if(arguments.length == 3){
           	        obj.style[attr] = value;
           	    }
           }
		},
    hasClass:function(obj, cls){  
           return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
    },  
    addClass:function(obj, cls) {  
          if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
    },  
		fixedScroll:function(){
			var _this = this;			
			var toTopBar = _this.getElementByClassName('toTopBar','moveTop','div')[0];
			var header = _this.getElementByClassName('header',null,'div')[0];
			var headerHeight = header.offsetHeight;
			var fixHeaderCont = _this.getElementByClassName('fixHeaderCont','fixHeader','div')[0];
      var cont2Pic = _this.getElementByClassName('cont2Pic',null,'div')[0];
      var contServerText  = _this.getElementByClassName('contServerText',null,'div')[0];
      var contLiveText  = _this.getElementByClassName('contLiveText',null,'div')[0];
      var contLivePic = _this.getElementByClassName('contLivePic',null,'div')[0]; 
      var cont1 = _this.getElementByClassName('cont1',null,'div')[0];
      var cont2 = _this.getElementByClassName('cont2',null,'div')[0];
      var cont3 = _this.getElementByClassName('cont3',null,'div')[0];
      var cont1Height = cont1.offsetHeight;
      var cont2Height = cont2.offsetHeight;
      var cont3Height = cont3.offsetHeight;
			window.onscroll=function(){
			   var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop > 1000){
            	 	_this.setStyle(toTopBar,'display','block');
               toTopBar.onclick = function(){
               	document.documentElement.scrollTop = document.body.scrollTop = 0;
               }
            }else{
            	  _this.setStyle(toTopBar,'display','none');
            };
            if(scrollTop > headerHeight){
              _this.startMove(fixHeaderCont,{'height':50});
            }else{
            	_this.startMove(fixHeaderCont,{'height':0});
            };
            if(scrollTop > cont1Height+cont2Height-cont2Height/2){
                _this.startMove(contServerText,{'right':50});
                _this.startMove(cont2Pic,{'left':30});
            };
            if(scrollTop > cont1Height+cont2Height+cont3Height-cont2Height/2){
                 _this.startMove(contLivePic,{'right':50});
                _this.startMove(contLiveText,{'left':50});
            };
			};
		},
   showSwitch:function(){
     	var _this = this;
     	var tele = _this.getElementByClassName('tele','moveTop','div')[0];
     	var guanzu = _this.getElementByClassName('guanzu','moveTop','div')[0];
     	var ddArr = document.getElementsByTagName('dd');
     	var weixin = ddArr[11];
     	var weixinPic = ddArr[12];
     	var weibo = ddArr[13];
     	var weiboPic = ddArr[14];
      tele.onmouseover = function(){
        	var fixnum = _this.getElementByClassName('fixnum','tele','div')[0];
        	_this.setStyle(fixnum,'display','block');
       };
      guanzu.onmouseover = function(){
        	var fixEwm = _this.getElementByClassName('fixEwm','guanzu','div')[0];
        	_this.setStyle(fixEwm,'display','block');            	
      };
      weixin.onmouseover = function(){
        	_this.setStyle(weixinPic,'display','block');
        	_this.setStyle(weiboPic,'display','none');
      };
      weibo.onmouseover = function(){
        	_this.setStyle(weiboPic,'display','block');
        	_this.setStyle(weixinPic,'display','none');
      }
       
   	  tele.onmouseout = function(){
        	var fixnum = _this.getElementByClassName('fixnum','tele','div')[0];
        	_this.setStyle(fixnum,'display','none');
      };
      guanzu.onmouseout = function(){
        	var fixEwm = _this.getElementByClassName('fixEwm','guanzu','div')[0];
        	_this.setStyle(fixEwm,'display','none');            	
      };
    },
   carousel1:function(){
     	var _this = this;
      var btn = _this.getElementByClassName('btn',null,'a');
     	var leftButton =btn[0];
     	var rightButton = btn[1];
     	var header = _this.getElementByClassName('header',null,'div')[0];
     	var navContentText  = _this.getElementByClassName('nav-content-text',null,'div');
      var aLi = _this.getElementByClassName('navDots',null,'ol')[0].getElementsByTagName('li');
      var timer;
      var index = 0;
      function move(){
          aLi[index].className = '';
          _this.setStyle(navContentText[index],'display','none');
           index ++;
           if(index >2){
               index = 0;
            }
            aLi[index].className = 'active'; 
            _this.setStyle(navContentText[index],'display','block');
            var imgIndex=index+1;
            _this.setStyle(header,'background','url(./images/banner'+imgIndex+'.png)');
            _this.setStyle(header,'background-size','contain');         
      };
      timer = setInterval(move,3000);
      leftButton.onmouseover = rightButton.onmouseover = function(){     
          clearInterval(timer);
          var curIndex = index;
          leftButton.onclick = function(){
              _this.setStyle(navContentText[curIndex],'display','none');
              aLi[curIndex].className = '';
              curIndex --;
              if(curIndex < 0 ){
                curIndex = 2;
              }
              var curImgIndex = curIndex +1;
              _this.setStyle(header,'background','url(./images/banner'+curImgIndex+'.png)');
              _this.setStyle(header,'background-size','contain');
              _this.setStyle(navContentText[curIndex],'display','block');
              aLi[curIndex].className = 'active';
          }
              rightButton.onclick = function(){
              _this.setStyle(navContentText[curIndex],'display','none');
              aLi[curIndex].className = '';
              curIndex ++;
              if(curIndex > 2){
                curIndex = 0;
              }
              var curImgIndex = curIndex +1;
              _this.setStyle(header,'background','url(./images/banner'+curImgIndex+'.png)');
              _this.setStyle(header,'background-size','contain');
              _this.setStyle(navContentText[curIndex],'display','block');
              aLi[curIndex].className = 'active';
          }
            index = curIndex;                
      }
      leftButton.onmouseout = rightButton.onmouseout = function(){
             timer = setInterval(move,3000);
      };
    },
   carousel2:function(){
       var _this = this;
       var contLinkTextBox = _this.getElementByClassName('contLinkTextBox',null,'div')[0];
       var contSilider = contLinkTextBox.getElementsByTagName('ul')[0];
       var contPicList = contLinkTextBox.getElementsByTagName('ul')[1];
       var aLsilider = contSilider.getElementsByTagName('li');
       var aLpic = contPicList.getElementsByTagName('li');
       var l = aLsilider.length;
       var index = 0;
       var timer;
       function move(){
           _this.setStyle(aLsilider[index],'display','none');
           aLpic[index].className = '';
           index ++;
           if(index > (l-1)){
              index = 0;
           }
           console.log(index);
           _this.setStyle(aLsilider[index],'display','block');
           aLpic[index].className = 'active';
       };
       timer = setInterval(move,3000);
       contSilider.onmouseenter = function(){
           clearInterval(timer);
       };
       contSilider.onmouseleave = function(){
            clearInterval(timer);
           timer = setInterval(move,3000);
       };
       for(var i = 0;i < l; i++){
          aLpic[i]._index = i;
          aLpic[i].onmouseenter = function(){
            clearInterval(timer);
            for(var j=0; j < l;j++){
              aLpic[j].className = '';
              _this.setStyle(aLsilider[j],'display','none');
            };
            aLpic[this._index].className = 'active';
            _this.setStyle(aLsilider[this._index],'display','block');
            index = this._index;
          }
          aLpic[i].onmouseout = function(){
            timer = setInterval(move,3000);
          }
       }

    },
   carousel3:function(){
      var _this = this;
      var aLiHd = _this.getElementByClassName('hd',null,'ul')[0].getElementsByTagName('li');
      var aLiBd = _this.getElementByClassName('bd',null,'div')[0].getElementsByTagName('li');
      var timer;
      var index = 0;
      function move(){
          aLiHd[index].className = '';
          _this.setStyle(aLiBd[index],'display','none');
          index ++;
          if(index >3){
            index = 0;
          };
          aLiHd[index].className = 'active';
          _this.setStyle(aLiBd[index],'display','block');
      };
      timer = setInterval(move,3000);
      for(var i =0; i <aLiHd.length;i++){
          aLiHd[i]._index  = i;
          var curCol;
          var curBk;
          aLiHd[i].onmouseover = function(){
          clearInterval(timer);
          for(var j = 0 ;j <aLiHd.length;j++){
              aLiHd[index].className = '';
              _this.setStyle(aLiBd[j],'display','none');
          };  
              index = this._index;
              aLiHd[index].className = 'active';
              _this.setStyle(aLiBd[index],'display','block');
          };
             aLiHd[i].onmouseout = function(){             
             timer = setInterval(move,3000);
          };
          for(var k = 0,l = aLiBd.length;k < l;k++){
              var aA = aLiBd[k].getElementsByTagName('a');
              for(var m = 0; m < aA.length; m ++){
                  aA[m].onmouseover = function(){
                    clearInterval(timer);
                  }
                  aA[m].onmouseout = function(){
                    timer = setInterval(move,3000);
                  };
              };
          };
        }
    },
   startMove:function (obj,json,fn){
      clearInterval(obj.timer);
      var _this = this;
      obj.timer = setInterval(function()
      { 
           for(var attr in json)
           {
                  var flag = true;
                  //当前值获取
                  if(attr == 'opacity')
                   {
                      icur = Math.round(parseFloat(_this.getStyle(obj,attr))*100);
                   }
                   else
                   {
                      icur = parseInt(_this.getStyle(obj,attr));
                   }
                   //设置速度
                      speed = (json[attr]-icur)/5;
                      speed = speed>0? Math.ceil(speed):Math.floor(speed);
                   if (icur !=json[attr]) 
                   {
                      flag = false;
                      if(attr =='opacity')
                      {
                         icur +=speed;
                         obj.style.filter = "alpha(opacity:"+icur+")";
                         obj.style.opacity = icur/100;
                      }
                      else
                      {
                      icur += speed;
                      obj.style[attr] = icur+'px';
                      }
                   }
                   if(flag)
                   {
                       clearInterval(obj.timer);
                       if(fn)
                       {
                        fn();
                       }
                   }
           }             
      },20);      
   },

}    
	var util= new Util();
	util.main();
})()