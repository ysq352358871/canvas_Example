/*
 *	1、对象多态 :接受不同的参数，干不同的时。对象的三大特性：封装、继承、多态。
 *  2、模块化的开发思想:我们把很多功能的代码集合起来，放在文件夹里,文件夹是模块化的显示形式。
 *	3、
 *
 *
 *
 *
 * */
function shape(canvas,obj,copy){
    if(canvas===undefined||obj===undefined){
        console.error("参数有误");
        return false
    }
    this.canvas=canvas;
    this.obj=obj;
    this.copy=copy;
    this.style="line";
    this.type="stroke";
    this.fillStyle="red";
    this.strokeStyle="red";
    this.lineWidth=1;
    this.history=[];
    this.bianNum=5;
    this.angleNums=5
}
shape.prototype={
    init:function () {
       this.obj.fillStyle=this.fillStyle;
       this.obj.strokeStyle=this.strokeStyle;
       this.obj.lineWidth=this.lineWidth;
    },
    draw:function () {
        this.init();
        var that=this;
        that.copy.onmousedown=function (e) {
             var starX=e.offsetX;
             var starY=e.offsetY;
            that.copy.onmousemove=function (e) {
                var endX=e.offsetX;
                var endY=e.offsetY;
                that.obj.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0){
                    that.obj.putImageData(that.history[that.history.length-1],0,0);
                }
                that[that.style](starX,starY,endX,endY);
                
            }
            that.copy.onmouseup=function () {
                that.history.push(that.obj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null
            }
        }
    },
    line:function (x1,y1,x2,y2) {
        this.obj.beginPath();
        this.obj.moveTo(x1,y1);
        this.obj.lineTo(x2,y2);
        this.obj[this.type]();
    },
    rect:function (x1,y1,x2,y2) {
        this.obj.beginPath();
        this.obj.rect(x1,y1,x2-x1,y2-y1);
        this.obj[this.type]();
       
    },
    arc:function (x1,y1,x2,y2) {
        this.obj.beginPath();
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))/2;
        this.obj.arc(x1,y1,r,0,360*Math.PI/180);
        this.obj[this.type]();
    },
    rects:function (x1,y1,x2,y2) {
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))/2;
        this.obj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            var y=Math.sin(angle*i)*r+y1;
            var x=Math.cos(angle*i)*r+x1;
            this.obj.lineTo(x,y);
        }
        this.obj.closePath();
           // this.obj.stroke();
     this.obj[this.type]();
    },
    angles:function (x1,y1,x2,y2) { //多角形
    	var angleNum=this.angleNums*2;
    	var angle=360/(angleNum)*Math.PI/180;
    	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    	var r1=r/3;
    	this.obj.beginPath();
    	for(var i=0;i<angleNum;i++){
    		if(i%2==0){
    			var y=Math.sin(angle*i)*r+y1;
            	var x=Math.cos(angle*i)*r+x1;
    		}else{
    			var y=Math.sin(angle*i)*r1+y1;
            	var x=Math.cos(angle*i)*r1+x1;
    		}
    		 this.obj.lineTo(x,y);
    	}
        this.obj.closePath();
        this.obj[this.type]();
    },
    pen:function(){
    	this.init();
    	var that=this;
    	this.copy.onmousedown=function(e){
    		 var starX=e.offsetX;
    		 var starY=e.offsetY;
    		 that.obj.clearRect(0,0,that.canvas.width,that.canvas.height);
    		 if(that.history.length>0){
                    that.obj.putImageData(that.history[that.history.length-1],0,0);
                }
    		 that.obj.beginPath();
    		 that.obj.moveTo(starX,starY);
    		that.copy.onmousemove=function(e){
    			var endX=e.offsetX;
    			var endY=e.offsetY;
    			that.obj.lineTo(endX,endY);
    			that.obj.stroke();
    		}
    		that.copy.onmouseup=function(){
    			console.log(1);
    			that.history.push(that.obj.getImageData(0,0,that.canvas.width,that.canvas.height));
    			that.copy.onmousemove=null;
    			that.copy.onmouseup=null;
    		}
    	}
    	
    },
    px:function(para){
    	var that =this;
    	var xpObj=para;
    	that.copy.onmousemove=function(e){
    		var x=e.offsetX;
    		var y=e.offsetY;
    		var left=x-$(xpObj).width()/2;
    		var top=y-$(xpObj).height()/2;
    		if(left<=0){
    			left=0;
    			
    		}
    		if(left>e.offsetX-$(xpObj).width()/2){
    			left=e.offsetX-$(xpObj).width()/2
    		}
    		if(top<=0){
    			top=0;
    		
    		}
    		if(top>e.offsetY-$(xpObj).height()/2){
    			top=e.offsetY-$(xpObj).height()/2
    		}
    		$(xpObj).css({left:left,top:top,display:"block"});
    	}

    	that.copy.onmousedown=function(e){
    		that.copy.onmousemove=function(e){
	    		var x=e.offsetX;
	    		var y=e.offsetY;
	    		var left=x-$(xpObj).width()/2;
	    		var top=y-$(xpObj).height()/2;
	    		if(left<=0){
	    			left=0;
	    			
	    		}
	    		if(left>e.offsetX-$(xpObj).width()/2){
	    			left=e.offsetX-$(xpObj).width()/2
	    		}
	    		if(top<=0){
	    			top=0;
	    		}
	    		if(top>e.offsetY-$(xpObj).height()/2){
	    			top=e.offsetY-$(xpObj).height()/2
	    		}
	    		$(xpObj).css({left:left,top:top,display:"block"});
	    		that.obj.clearRect(x,y,$(xpObj).width(),$(xpObj).height());
    		}
    		that.copy.onmouseup=function(){
    			that.history.push(that.obj.getImageData(0,0,that.canvas.width,that.canvas.height));
    			that.copy.onmousedown=null;
    			that.copy.onmousemove=null;
    			that.copy.onmouseup=null;
    			that.px(para);
    		}
    	}
    },
    newFile:function(){//新建
    	if(this.history.length==0){
    		alert("新建成功！");
    	}else{
    		var answer=confirm("是否保存");
    		if(answer){
 				location.href=this.canvas.toDataURL().replace("data:image/png","data:stream/octet");
    		}else{
    			this.obj.clearRect(0,0,this.canvas.width,this.canvas.height);
    			this.history.length=0;
    		}	
    	}
    },
   
    
}