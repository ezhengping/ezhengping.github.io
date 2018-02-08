/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-26 17:04:02
 * @version $Id$
 */
    


//初始化banner高度
var bannerH = function() {
        for (var i = 0, len = $('.section__banner').length; i < len; i++) {
            $('.section__banner').eq(i).css('padding-top', $('.section__banner').eq(i).children().children().children().children('img').eq(0).css('height'));
        }


}


        // banner_初始化参数
        var banner = function() {
            $('#banner-wrap').swipeSlide({
                continuousScroll: true,
                speed:2000,
                transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                firstCallback: function(i, sum, me) {
                    var html = ''
                    for (var num = 0; num < sum; num++) {
                        html += '<span></span>';
                    }
                    me.children(".banner__ol")[0].innerHTML = html;
                    me.children(".banner__ol").children('span').eq(0).addClass('atv_ol');
                },
                callback: function(i, sum, me) {
                    console.log(me.children(".banner__ol")[0].childNodes)
                    me.children(".banner__ol").children('span').eq(i).addClass('atv_ol').siblings("span").removeClass('atv_ol');
                }
            })
        }
$(function(){
        bannerH();
    banner();

})
