var flag=false,winH,winW,len,tt;
addEventListener( "load", init, false );
function init( event ) {
	setTimeout(function(){
		$("#loading").animate({top:-winH},600);
		setTimeout(function(){
			arrow();
		},600)
	},600)
}
window.addEventListener("orientationchange", function(){
	if (window.orientation == 90 || window.orientation == -90) {
		alert("请使用竖屏浏览，以获得更好的操作体验！");
		return false;
	}else if(window.orientation == 0 || window.orientation == 180){
		window.location.reload();
	}
}, false);

$(function(){
	winH=$(window).height();
	winW=$(window).width();
	$(".page").height(winH);
	len=$(".page").length;
	//滑动
	$(".page").touchwipe({
		wipeUp:function(){
			goPrev();
		},wipeDown:function(){
			goNext();
		},
		preventDefaultEvents: true
	});
	flag=true;
	
	//判断打开设备是手机还是电脑
	var urlhash = window.location.hash;  
	if (!urlhash.match("fromapp")){  
		if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {  
			var conH=winW/640*1100;
			var scale=winH/conH;
			var top=(winH-1100)/2;
			if(winW<conH){
				//alert(winH+"====="+conH+"====="+scale+"====="+top);
				$(".page .con").css({transform:"scale("+scale+")","-webkit-transform":"scale("+scale+")",top:top,height:winH-top});
			}
		}/*else{
			$("body").hide();
			alert("请使用手机浏览！");
		}*/
	}  	
})

function goNext(){
	$("img.arrow").attr("class","stop");
	var index=$(".page.show").index();
	var cur=$(".page.show");
	var next=$(".page").eq(index+1);
	if(index < len-1 && flag){
		flag=false;
		next.find(".con img").css({top:winH,opacity:0});
		next.removeClass("hide").addClass("active").css({top:winH});
		$(".page.active").animate({top:0},600);
		setTimeout(function(){
			setTimeout(function(){next.find("img.p1").animate({top:0,opacity:1},700);},200);
			setTimeout(function(){
				next.find("img.p2").animate({top:0,opacity:1},700,function(){arrow();});
			},400);
			setTimeout(function(){
				next.find("img.p3").animate({top:0,opacity:1},700,function(){arrow();});
			},600);
			cur.removeClass("show").addClass("hide");
			next.removeClass("active").addClass("show");
			flag=true;
		},600);
	}else if(index >= len-1 && flag){
		flag=false;
		$(".page").eq(0).find(".con img").css({top:winH,opacity:0});
		$(".page").eq(0).removeClass("hide").addClass("active").css({top:winH});
		$(".page.active").animate({top:0},600);
		setTimeout(function(){
			setTimeout(function(){$(".page").eq(0).find("img.p1").animate({top:0,opacity:1},700);},200);
			setTimeout(function(){
				$(".page").eq(0).find("img.p2").animate({top:0,opacity:1},700,function(){arrow();});
			},400);
			setTimeout(function(){
				$(".page").eq(0).find("img.p3").animate({top:0,opacity:1},700,function(){arrow();});
			},600);
			$(".page").eq(index).removeClass("show").addClass("hide");
			$(".page").eq(0).removeClass("active").addClass("show");
			flag=true;
		},600);
	}
}
function goPrev(){
	$("img.arrow").attr("class","stop");
	var index=$(".page.show").index();
	var cur=$(".page.show");
	var prev=$(".page").eq(index-1);
	$(".arrow").addClass("cur");
	setTimeout(function(){$(".arrow").addClass("stop").removeClass("cur");},3000);
	setTimeout(function(){$(".arrow").attr("class","arrow");},3200);
	if(index>0 && flag){
		flag=false;
		prev.find(".con img").css({top:winH,opacity:0});
		prev.removeClass("hide").addClass("active").css({top:-winH});
		$(".page.active").animate({top:0},600);
		setTimeout(function(){
			setTimeout(function(){prev.find("img.p1").animate({top:0,opacity:1},700);},200);
			setTimeout(function(){
				prev.find("img.p2").animate({top:0,opacity:1},700,function(){arrow();});
			},400);
			setTimeout(function(){
				prev.find("img.p3").animate({top:0,opacity:1},700,function(){arrow();});
			},600);
			cur.removeClass("show").addClass("hide");
			prev.removeClass("active").addClass("show");
			flag=true;
		},600);
	}else if(index<=0 && flag){
		flag=false;
		$(".page").eq(len-1).find(".con img").css({top:winH,opacity:0});
		$(".page").eq(len-1).removeClass("hide").addClass("active").css({top:-winH});
		$(".page.active").animate({top:0},600);
		setTimeout(function(){
			setTimeout(function(){$(".page").eq(len-1).find("img.p1").animate({top:0,opacity:1},700);},200);
			setTimeout(function(){
				$(".page").eq(len-1).find("img.p2").animate({top:0,opacity:1},700,function(){arrow();});
			},400);
			setTimeout(function(){
				$(".page").eq(len-1).find("img.p3").animate({top:0,opacity:1},700,function(){arrow();});
			},600);
			$(".page").eq(index).removeClass("show").addClass("hide");
			$(".page").eq(len-1).removeClass("active").addClass("show");
			flag=true;
		},600);
	}
}
function arrow(){
	$("img.stop").attr("class","arrow");
	$("img.arrow").addClass("cur").show();
}
