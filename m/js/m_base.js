/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-25 15:57:04
 * @version $Id$
 */

	function carousel(box, boxBanUl, boxBanOl, boxBanOlActive) {
		    var len = $(boxBanUl + ' li').length;
		    var olLen = $(boxBanOl + ' li').length;
		    var index = 0;
		    var olNum = 0;
		    var tim;
		    // 初始化轮播图宽度
		    function carouselWidth() {
		    	$(boxBanUl).css('width',$(boxBanUl+' li').outerWidth()/parseFloat($("html").css("font-size"))*len+"rem");
		    }
		    carouselWidth();
		    // 窗口发生改变时
		    function go() {
		        if (index < len - 1) {
		            index++;
		        } else {
		            $(boxBanUl).css({ 'left': '0px' });
		            index = 1;
		        }
		        if (olNum >= olLen-1) {
		            olNum = 0
		        } else {
		            olNum++
		        }
		        $(boxBanUl).stop().animate({ 'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px' });
		        $(boxBanOl + ' li').eq(olNum).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
		    }

		    function back() {
		        if (index > 0) {
		            index--;
		        } else {
		            $(boxBanUl).css({ 'left': -((len - 1) * parsefloat($(boxBanUl + ' li').css('width'))) + 'px' });
		            index = olLen-1;
		        }
		        $(boxBanUl).stop().animate({ 'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px' });
		        $(boxBanOl + ' li').eq(index).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
		    }
		    $('#banner_left').click(function() {
		        back();
		    })

		    $('#banner_right').click(function() {
		        go();
		    })
		    $(boxBanOl + ' li').click(function() {
		        index = $(this).index();
		        olNum = index
		        $(boxBanUl).stop().animate({ 'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px' });
		        $(boxBanOl + ' li').eq(olNum).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
		    });
		    tim = setInterval(function() {
		        go();
		    }, 3000);
		    $(box).hover(function() {
		        clearInterval(tim);
		    }, function() {
		        tim = setInterval(function() {
		            go();
		        }, 3000);
		    })
		}