function ajaxNewProductHtml(pageNo) {
    var url = PATH + '/product/queryNewProduct.action'
    $.ajax({
            url: url,
            type: 'GET',
            data: {
                'pageNo': pageNo
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            // console.log(data);
            $("#pagination1").data('value', pageNo);
            addNewProductData(data)
            var len = 1;
            if (data.count < 16) {

            } else {
                len = Math.ceil(data.count / 16);
            }
            topInbottom(len)
        })
}

function topInbottom(length) {
    var pageNo = $("#pagination1").data('value');
    $(window).scroll(function () {
        //获取滚动条高度   获取最后一个元素距离页面顶部的高度
        var scrollTop =$('.section__nut_foodlist_item').last().height()+document.documentElement.scrollTop || document.body.scrollTop;
        var Ele = $('.section__nut_foodlist_item').last().offset().top;
        // 判断滚动条高度是否大于等于最后一个元素距离顶部的高度
        //    console.log('当前滚动条的高度'+scrollTop,'最后一个元素的高度：'+Ele);
        if (scrollTop >= Ele) {
            $(window).unbind("scroll");
            pageNo += 1;
        } else {
            return;
        }
        // 当前页+1是否大于最后一页
        if (pageNo > length) {
            var bottomLine = document.querySelector('.bottom_line');
            //判断元素是否存在存在就return不存在添加元素  
            // 元素作用是提示用户这是底线了
            if (!bottomLine) {
                var html =
                    '<div class="bottom_line" style = "text-align: center;font-size: 12px;padding-top: 40px;">我已经是底线了</div>'
                $('.section__nut_foodlist').append(html)
                return;
            } else {
                return;
            }
        }
        // 需要加载数据的函数ajax传入page页数
        ajaxNewProductHtml(pageNo)

    });
}

function addNewProductData(data) {
    var html = '';

    var bannerHtml =
        '<a class="header__banner__ul_item_link" href="javasript:;">'+
                        '<img src="'+data.imageUrl+'" alt="">'+
                    '</a>'
    //banner图
    for (var i = 0, len = data.list.length; i < len; i++) {
        html +=
            '<li class="section__nut_foodlist_item animate">'+
            '<a href="/page/product/productDetails.html?productId='+data.list[i].id+'&amp;storeId=1">'+
                '<div class="section__nut_foodlist_item_img">'+
                    '<img class="section__nut_foodlist_item_img_goods" src="'+data.list[i].url+'"alt="">'+
                '</div>'+
                '<p class="section__nut_foodlist_item_bewrite">'+
                        data.list[i].description+
                '</p>'+
                '<span class="section__nut_foodlist_item_nowprice">￥'+data.list[i].price+'</span>'+
                '<span class="section__nut_foodlist_item_nowsales">销量：<em>'+salesNumberCalculate(data.list[i].sales||"0")+'</em></span>'+
                '</a>'+
        '</li>'
    }
    $('.section__nut_foodlist_ul').append(html);
    $('.header__banner__ul_item').html(bannerHtml);
}

$(function () {
    ajaxNewProductHtml(1);
})