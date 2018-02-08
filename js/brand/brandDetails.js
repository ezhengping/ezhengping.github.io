// 加载品牌基本信息请求
function brandBasicAjax() {
    $.ajax({
            url: PATH + '/brand/queryBrandById.action',
            type: 'GET',
            data: {
                'brandId': getParam('brandId')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            brandBasicAddData(data)
        })
}

/**
 * 渲染品牌基本数据到页面上
 * 
 * @param {data} data  
 */
function brandBasicAddData(data) {
    var headerHtml ='<div class="shop_logo">'+
                            '<a href="javascript:;" title="">'+
                                '<img src="'+data.brandImage.logo+'" alt="">'+
                            '</a>'+
                        '</div>'+
                        '<div class="shop_name">'+
                            '<h3>'+data.name+'</h3>'+
                        '</div>'+
                        '<div class="shop_description">'+
                            '<p>'+data.description+'</p>'+
                        '</div>';
    var bannerHtml = 
                '<li>'+
                    '<a href="javascript:;">'+
                        '<img src="'+data.brandImage.backGround+'" alt="广告图" />'+
                    '</a>'+
                '</li>';
    
    $('.shop_header_mid').html(headerHtml);
    $('.banner_box ul').html(bannerHtml);
}



function bottomLineHtml(String) {
    var html ='<div class="bottom_line" style = "text-align: center;font-size: 12px;padding-top: 40px;">'+String+'</div>'
    $('.shop_commodity').append(html)
}

// 加载商品父节点
function addCommodityDOM() {
    var html ='<div class="shop_commodity">'+
                '<ul class="shop_commodity_ul clearfix">'+
                '</ul>'+
            '</div>';
    $('.shop_map_top').html(html);
}

/**
 * 鼠标滚动加载数据
 * 
 * @param {number} length 
 * @param {fn} ajaxFn 
 */
function commodityPage(length, ajaxFn) {
    var Ele = document.querySelector('.shop_commodity_ul');
    var pageNo = parseInt(Ele.dataset.pageNo);
    //获取滚动条高度   获取最后一个元素距离页面顶部的高度
    var Ele = $('.shop_commodity_ul li').last().offset().top;
    $(document).scroll(function () {
        var scrollTop = $('.shop_header').height() + (document.documentElement.scrollTop || document.body.scrollTop);
        // 判断滚动条高度是否大于等于最后一个元素距离顶部的高度
        if (scrollTop >= Ele) {
            $(document).unbind("scroll");
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
                bottomLineHtml('这里已经是底线了哟')
                return;
            } else {
                return;
            }
        }
        // 需要加载数据的函数ajax传入page页数
        ajaxFn(pageNo)

    });

}



/**
 * 装载商品数据
 * 
 * @param {data} data -ajax传回来的数据 
 */
function addCommodity(data) {
    var html = '';
    $.each(data.common, function (index, dataEle) {
        html +=
                    '<li>'+
                        '<a href="/page/product/productDetails.html?productId='+dataEle.id+'&storeId='+dataEle.storeId+'" title="">'+
                            '<div class="shop_commodity_item">'+
                                '<div class="shop_commodity_item_img">'+
                                    '<img src="'+dataEle.pic+'" alt="">'+
                                '</div>'+
                                '<div class="shop_commodity_item_text">'+
                                    '<h4>'+dataEle.name+'</h4>'+
                                    '<div class="shop_text clearfix">'+
                                        '<span>售价:￥'+dataEle.price+'</span>'+
                                        '<span>销量:'+salesNumberCalculate(dataEle.sales)+'</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</li>';
    })
    $('.shop_commodity_ul').append(html);
}


// 综合排序请求
function complexCommodityAjax(pageNo) {
    var brandId = getParam('brandId');
    $.ajax({
            url: PATH + '/product/queryProduct.action',
            type: 'POST',
            data: {
                'brandId': brandId,
                'pageSize': 20,
                'pageNo': pageNo
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            //装载父节点
            var Ele = document.querySelector('.shop_commodity_ul');
            if (!Ele) {
                addCommodityDOM();
            }

            var Ele = document.querySelector('.shop_commodity_ul');
            Ele.dataset.pageNo = pageNo;

            // 判断数据是否为零
            if (pageNo == 1 && data.common.length == 0) {
                bottomLineHtml('商家暂时还没有商品')
                return
            }

            addCommodity(data)
            var len = 1;
            if (data.count < 20) {

            } else {
                len = Math.ceil(data.count / 20);
            }
            commodityPage(len, complexCommodityAjax)
        })
}

function commoditySalesAjax(pageNo) {
    var brandId = getParam('brandId');
    $.ajax({
            url: PATH + '/product/queryProduct.action',
            type: 'POST',
            data: {
                'brandId': brandId,
                'pageSize': 20,
                'pageNo': pageNo,
                'sort': 'sales_tww'
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            //装载父节点
            var Ele = document.querySelector('.shop_commodity_ul');
            if (!Ele) {
                addCommodityDOM();
            }

            var Ele = document.querySelector('.shop_commodity_ul');
            Ele.dataset.pageNo = pageNo;
            // 判断数据是否为零
            if (pageNo == 1 && data.common.length == 0) {
                bottomLineHtml('商家暂时还没有商品')
                return
            }
            addCommodity(data)
            var len = 1;
            if (data.count < 20) {

            } else {
                len = Math.ceil(data.count / 20);
            }
            commodityPage(len, commoditySalesAjax)
        })
}


// 按照价格排序  --升序
function commodityPaicAscAjax(pageNo) {
    var sortType = $('.price_Sort').children('i').data('type');
    var brandId = getParam('brandId');
    $.ajax({
            url: PATH + '/product/queryProduct.action',
            type: 'GET',
            data: {
                'brandId': brandId,
                'pageNo': pageNo,
                'sort': 'price',
                'sortType': 'asc',
                'pageSize': 20
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            //装载父节点
            var Ele = document.querySelector('.shop_commodity_ul');
            if (!Ele) {
                addCommodityDOM();
            }

            var Ele = document.querySelector('.shop_commodity_ul');
            Ele.dataset.pageNo = pageNo;


            // 判断数据是否为零
            if (pageNo == 1 && data.common.length == 0) {
                bottomLineHtml('商家暂时还没有商品')
                return
            }

            addCommodity(data);
            var len = 1;
            if (data.count < 20) {

            } else {
                len = Math.ceil(data.count / 20);
            }
            commodityPage(len, commodityPaicAscAjax);
        })
}
// 按照价格排序  --降序
function commodityPaicDescAjax(pageNo) {
    var brandId = getParam('brandId');
    $.ajax({
            url: PATH + '/product/queryProduct.action',
            type: 'GET',
            data: {
                'brandId': brandId,
                'pageNo': pageNo,
                'sort': 'price',
                'sortType': 'desc',
                'pageSize': 20
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            //装载父节点
            var Ele = document.querySelector('.shop_commodity_ul');
            if (!Ele) {
                addCommodityDOM();
            }

            var Ele = document.querySelector('.shop_commodity_ul');
            Ele.dataset.pageNo = pageNo;


            // 判断数据是否为零
            if (pageNo == 1 && data.common.length == 0) {
                bottomLineHtml('商家暂时还没有商品')
                return
            }

            addCommodity(data);
            var len = 1;
            if (data.count < 20) {

            } else {
                len = Math.ceil(data.count / 20);
            }
            commodityPage(len, commodityPaicDescAjax);
        })
}



// 价格升序降序
function priceSort(index) {
    //desc降序
    //asc升序
    if (index == 0) {
        $('.price_Sort').children('i').data('index', 1).addClass('Ascending').removeClass('Descending');
        return;
    } else if (index == 1) {
        $('.price_Sort').children('i').data('index', 0).addClass('Descending').removeClass('Ascending');
        return;
    }
}

/**
 * 商品选中状态
 * 
 * @param {Int} index -选中索引 
 */
function productAtv(index) {
    $('.All-Product-mid ul li a').eq(index).addClass('productAtv').parent().siblings().children().removeClass(
        'productAtv');
    $('.All-Product-mid ul li a').eq(index).parents('.All-Product-mid').data('type', index);
}


function priceSortClick() {
    // 店铺价格按钮被点击
    $('.price_Sort').click(function () {
        $(document).scrollTop($('.banner_box').offset().top + $('.banner_box').height() - 180);
        var index = $(this).children('i').data('index');
        priceSort(index);
    })
}
/**
 * 
 * 商品分类被点击时执行
 */
function allProductitemClick() {
    // 综合分类被点击时
    $('.All-Product-mid ul li a').click(function () {
        var faerIndex = $(this).parents('.All-Product-mid').data('type');
        var index = $('.All-Product-mid ul li a').index($(this));
        $(document).scrollTop($('.banner_box').offset().top + $('.banner_box').height() - 180);

        if (index == 0) {
            productAtv(index);
            $('.shop_commodity').remove() //删除父元素

            $(document).unbind('scroll'); //防止滚动条事件报错
            complexCommodityAjax(1);
            $(document).scroll = function () {} //防止滚动条事件报错

        } else if (index == 1) {
            productAtv(index);
            $('.shop_commodity').remove();
            $(document).unbind('scroll'); //防止滚动条事件报错
            commoditySalesAjax(1)
            $(document).scroll = function () {} //防止滚动条事件报错

        } else if (index == 2) {
            var type = $('.price_Sort').children('i').data('index')
            productAtv(index);

            if (type == 1) {
                $('.shop_commodity').remove();
                $(document).unbind('scroll'); //防止滚动条事件报错
                commodityPaicAscAjax(1);
                $(document).scroll = function () {} //防止滚动条事件报错

            } else if (type == 0) {
                $('.shop_commodity').remove();
                $(document).unbind('scroll'); //防止滚动条事件报错
                commodityPaicDescAjax(1);
                $(document).scroll = function () {} //防止滚动条事件报错
            } else {
                alert('排序出错');
            }
        }


    })
}




$(function () {
    // 加载店铺基本信息
    brandBasicAjax();

    // 加载综合商品排序
    complexCommodityAjax(1);

    //价格按钮被单机
    priceSortClick()

    // 商品分类点击事件
    allProductitemClick()
    // 滚动动画
    $(window).scroll(function () {
        headTopFollow();
    })
})

// 滚动条滚动动画
function headTopFollow() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var shopHead = $('.shop_nav_box').offset().top;

    var shopBann = $('.shop_banner').offset().top;

    if ($('.shop_banner').css('padding-top') == '40px' && scrollTop <= shopBann) {
        $('.shop_nav_box').css({
            'position': 'static',
            'border-top': '0',
            'box-shadow': 'none',
            'top': 'none'
        });
        $('.shop_banner').css('padding-top', '0');
        return;
    }
    if (scrollTop >= shopHead) {
        $('.shop_nav_box').css({
            'position': 'fixed',
            'border-top': '1px solid #ff0035',
            'box-shadow': ' 0 0 5px rgba(0,0,0,.5)',
            'top': '0'
        });
        $('.shop_banner').css('padding-top', '40px');
    }
}