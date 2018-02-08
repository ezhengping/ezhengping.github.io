// 加载店铺信息请求
function shopHomeAjax() {
    $.ajax({
            url:PATH+'/store/queryStorePage.action',
            type: 'get',
            data: {
                'storeId': getParam('storeId')
            },
            xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
        })
        .done(function (data) {
            if (data.store) {
                // 渲染店铺不变数据
                shopHeaderAddDATA(data);
                 // 渲染数据
                busShopAddDATA(data)
                // 判断初始店铺收场状态
                var statusData = data.store.isCollect;
                ifShopKeep(statusData)

                // 点击收藏按钮
                storeKeepClBtn()
            }else{
                alert('暂无该店铺数据');
            }

           
        })
}
// 添加店铺信息
function shopHeaderAddDATA(data) {
    // console.log(data);
    var shopTrickHtml =
                        '<div class="shop_logo">'+
                            '<a href="javascript:;" title="">'+
                                '<img src="'+data.store.logo+'" alt="">'+
                            '</a>'+
                        '</div>'+
                        '<div class="shop_name">'+
                            '<h3>'+data.store.name+'</h3>'+
                        '</div>'+
                        '<div class="shop_description">'+
                            '<p></p>'+
                        '</div>'+
                        '<div class="shop_Collection">'+
                            '<a href="javascript:;" title="" class="shop_Collection_btn">'+
                                '<span style="background-image:url("/images/Collection_Icon.png")" data-id='+data.store.id+'>收藏店铺</span>'+
                            '</a>'+
                        '</div>'
    var bannerHtml =
                    '<li>'+
                        '<a href="javascript:;">'+
                            '<img src="'+data.store.storeSign+'" alt="广告图" />'+
                        '</a>'+
                    '</li>'

    $('.shop_header_mid').html(shopTrickHtml);
    $('.banner_box ul').html(bannerHtml);
}
// 加载店铺首页信息
function busShopAddDATA(data) {
    // console.log(data);
    var shopDOM = '<div class="shop_index"></div>'

    $('.shop_map_top').html(shopDOM);
    var shopHtml = '';
    for (var i = 0, len = data.itemList.length; i < len; i++) {
        if (data.itemList[i].productId!=null) {
            shopHtml +=
                    '<a href="/page/product/productDetails.html?productId='+data.itemList[i].productId+'&storeId='+data.itemList[i].storeId+'" title="">'+
                        '<img src="'+data.itemList[i].imageUrl+'" alt="">'+
                    '</a>'
        }else{
            shopHtml +=
                    '<a href="javascript:;" title="">'+
                        '<img src="'+data.itemList[i].imageUrl+'" alt="">'+
                    '</a>'
        }
    }
    $('.shop_index').html(shopHtml);
}

// 点击收藏按钮
function storeKeepClBtn() {
    $('.shop_Collection_btn').click(function () {

        // 初始获取参数
        var chiEle = $(this).children('span')
        var storeKeepSt = chiEle.data('type');
        var storeId = getParam('storeId');
        var data = [];
        data.push(storeId);
        data = JSON.stringify(data);

        if (storeKeepSt == 0) {
            chiEle.data('type', 1);
            storeKeepSt = chiEle.data('type');
            storeKeepAjax(storeId, storeKeepSt);
        } else if (storeKeepSt == 1) {
            chiEle.data('type', 0);
            storeKeepSt = chiEle.data('type');
            noStoreKeepAjax(data)
        } else {
            chiEle.data('type', 0);
            storeKeepSt = chiEle.data('type');
        }

    })
}

// 收藏Ajax
function storeKeepAjax(storeId, storeKeepSt) {
    $.ajax({
            url:PATH+'/user2/collectStore.action',
            type: 'POST',
            data: {
                "storeId": storeId,
                'type': storeKeepSt
            },
            xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
        })
        .done(function (data) {
            if (data.result==7) {
                location.href = "/page/login/login.html";
            }
            if (data == 110) {
                var chiEle = $('.shop_Collection_btn').children('span')
                var storeKeepSt = chiEle.data('type')
                ifShopKeep(storeKeepSt);
            } 
        })
}

// 取消收藏Ajax
function noStoreKeepAjax(storeIdArr) {
    $.ajax({
            url:PATH+'/user2/cancleCollectStores.action',
            type: 'POST',
            data: {
                "json": storeIdArr,
            },
            xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
        })
        .done(function (data) {
            if (data.result==7) {
                location.href = "/page/login/login.html";
            }
            if (data == 110) {
                var chiEle = $('.shop_Collection_btn').children('span')
                var storeKeepSt = chiEle.data('type')
                ifShopKeep(storeKeepSt);
            } 
        })
}


// 判断用户是否收藏
function ifShopKeep(statusData) {
    if (statusData) {
        $('.shop_Collection_btn span').css('background-image', 'url(/images/Collection_Icon_tav.png)').data('type',
            1);
    } else {
        $('.shop_Collection_btn span').css('background-image', 'url(/images/Collection_Icon.png)').data('type', 0);
    }
}




/**
 * 
 * 
 * @param {Int} length -Int 类型 分页的尾数
 * @param {fn} ajaxFn -请求函数
 */
function commodityPage(length, ajaxFn) {
    var Ele = document.querySelector('.shop_commodity_ul');
    var pageNo = parseInt(Ele.dataset.pageNo);
    //获取滚动条高度   获取最后一个元素距离页面顶部的高度
    var Ele = $('.shop_commodity_ul li').last().offset().top;
    $(document).scroll(function () {
        var scrollTop = $('.shop_header').height() + (document.documentElement.scrollTop || document.body.scrollTop);
        // 判断滚动条高度是否大于等于最后一个元素距离顶部的高度
        //    console.log('当前滚动条的高度'+scrollTop,'最后一个元素的高度：'+Ele);
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


function bottomLineHtml(string) {
    var html =
        '<div class="bottom_line" style = "text-align: center;font-size: 12px;padding-top: 40px;">'+string+'</div>'
    $('.shop_commodity').append(html)
}

// 加载商品父节点
function addCommodityDOM() {
    var html = 
            '<div class="shop_commodity">'+
                '<ul class="shop_commodity_ul clearfix">'+
                '</ul>'+
            '</div>'
    $('.shop_map_top').html(html);
}

// 加载商品
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
                                        '<span>售价：￥'+dataEle.price+'</span>'+
                                        '<span>销量：'+salesNumberCalculate(dataEle.sales)+'</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                    '</li>'
                
    })
    $('.shop_commodity_ul').append(html);
}

/**
 * 
 * 
 * @param {number} pageNo -当前页 
 */
function commodityAjax(pageNo) {
    var storeId = getParam('storeId');
    $.ajax({
            url:PATH+'/product/queryProduct.action',
            type: 'GET',
            data: {
                'storeId': storeId,
                'pageNo': pageNo,
                'pageSize': 16
            },
            xhrFields:{
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
            if (data.count < 16) {

            } else {
                len = Math.ceil(data.count / 16);
            }
            commodityPage(len, commodityAjax);
        })
}





// 按照商品销量排序
function commoditySalesAjax(pageNo) {
    var storeId = getParam('storeId');
    $.ajax({
            url:PATH+'/product/queryProduct.action',
            type: 'GET',
            data: {
                'storeId': storeId,
                'pageNo': pageNo,
                'sort': 'sales_tww',
                'pageSize': 16
            },
            xhrFields:{
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
            if (data.count < 16) {

            } else {
                len = Math.ceil(data.count / 16);
            }
            commodityPage(len, commoditySalesAjax);

        })

}
// 价格升序降序
function priceSort(index) {
    //desc降序
    //asc升序
    if (index == 0||index == '0') {
        $('.price_Sort').children('i').data('index', 1).addClass('Ascending').removeClass('Descending');
        return;
    } else if (index == 1||index == '1') {
        $('.price_Sort').children('i').data('index', 0).addClass('Descending').removeClass('Ascending');
        return;
    }
}


// 按照价格排序  --升序
function commodityPaicAscAjax(pageNo) {
    var sortType = $('.price_Sort').children('i').data('type');
    var storeId = getParam('storeId');
    $.ajax({
            url:PATH+'/product/queryProduct.action',
            type: 'GET',
            data: {
                'storeId': storeId,
                'pageNo': pageNo,
                'sort': 'price',
                'sortType': 'asc',
                'pageSize': 16
            },
            xhrFields:{
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
            if (data.count < 16) {

            } else {
                len = Math.ceil(data.count / 16);
            }
            commodityPage(len, commodityPaicAscAjax);
        })
}
// 按照价格排序  --降序
function commodityPaicDescAjax(pageNo) {
    var storeId = getParam('storeId');
    $.ajax({
            url:PATH+'/product/queryProduct.action',
            type: 'GET',
            data: {
                'storeId': storeId,
                'pageNo': pageNo,
                'sort': 'price',
                'sortType': 'desc',
                'pageSize': 16
            },
            xhrFields:{
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
            if (data.count < 16) {

            } else {
                len = Math.ceil(data.count / 16);
            }
            commodityPage(len, commodityPaicDescAjax);
        })
}

// 按照新品
function commodityNewAjax(pageNo) {
    var storeId = getParam('storeId');
    $.ajax({
            url:PATH+'/product/queryProduct.action',
            type: 'GET',
            data: {
                'storeId': storeId,
                'pageNo': pageNo,
                'newProduct': 'yes',
                'pageSize': 16

            },
            xhrFields:{
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
            if (data.count < 16) {

            } else {
                len = Math.ceil(data.count / 16);
            }
            commodityPage(len, commodityNewAjax);
        })
}




// 店铺导航被点击
function navclickElm() {
    // 导航被点
    $('.shop_nav li').click(function () {
        var index = $('.shop_nav li').index($(this));
        shopNavAtv(index);
        $(document).scrollTop($('.banner_box').offset().top + $('.banner_box').height() - 180);

        // 判断是否为店铺首页
        if (index == 0) {
            $(document).unbind('scroll')
            var Ele = document.querySelector('.shop_index')
            if (!Ele) {
                // 判断元素是否存在不存在执行请求加载店铺首页内容
                shopHomeAjax();
            }
        }

        // 判断是否为店铺首页
        if (index == 1) {
            var i = 0;
            productAtv(i);
            // 添加商品
            $('.shop_commodity').remove()
            commodityAjax(1);

            $('.All-Product').css('display', 'block');
        } else {
            $('.All-Product').css('display', 'none');
        }

        if (index == 2) {
            $('.shop_commodity').remove()
            commodityNewAjax(1);
        }

        if (index == 3) {
            $('.shop_commodity').remove()
            var html = 
                        '<div class="shop_commodity" style="height:500px;line-height:500px;text-align:center">'+
                            '<p>暂无活动数据<p>'+
                        '</div>'
                        
            $('.shop_map_top').html(html)
        }

    })
}

function priceSortClick() {
    // 店铺价格按钮被点击
    $('.price_Sort').click(function () {
        $(document).scrollTop($('.banner_box').offset().top + $('.banner_box').height() - 180);
        var index = $(this).children('i').data('index');
        // console.log(index);
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
            commodityAjax(1)
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
/**
 * 导航选中状态
 * 
 * @param {Int} index -选中索引
 */
function shopNavAtv(index) {
    $('.shop_nav li').eq(index).addClass('atv').siblings().removeClass('atv');
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







// 店铺导航跟随效果--动画
function headTopFollow() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var shopHead = $('.shop_nav_box').offset().top;

    var shopBann = $('.shop_banner').offset().top;

    if ($('.shop_banner').css('padding-top') == '40px' && scrollTop <= shopBann) {
        $('.shop_nav_box').css({
            'position': 'static',
            // 'border-top': '0',
            'box-shadow': 'none',
            'top': 'none'
        });
        $('.shop_banner').css('padding-top', '0');
        return;
    }
    if (scrollTop >= shopHead) {
        $('.shop_nav_box').css({
            'position': 'fixed',
            // 'border-top': '1px solid #ff0035',
            'box-shadow': ' 0 0 5px rgba(0,0,0,.5)',
            'top': '0'
        });
        $('.shop_banner').css('padding-top', '40px');
    }
}





$(function () {
    // 导航被点击事件
    navclickElm();

    //店铺价格被点击
    priceSortClick();

    //导航子菜单被点击
    allProductitemClick();

    // 加载店铺信息请求
    shopHomeAjax();

    // 滚动条滚动
    $(window).scroll(function () {
        headTopFollow();
    })
})

