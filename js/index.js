/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-12-01 14:48:43
 * @version $Id$
 */

// function bannerBack() {
//     var inde = 0;
//     var pMItem = $('.pagingMenu_ul_item');
//     var pMDItem = $('.pagingMenu_detail_itembox');
//     pMItem.hover(function() {
//         inde = pMItem.index($(this));
//         $(this).css('box-shadow','0 0 5px rgba(0, 0, 0, 0.5)').siblings().css('box-shadow', 'none');
//          $(this).children('span').stop().animate({'opacity':'1'},100).parent().siblings().children('span').stop().animate({'opacity':'0'},0);
//          pMDItem.eq(inde).css('display','block').stop().animate({'width':'750px'},400).siblings().css('display','none').stop().animate({'width':'0'},200);
//     });
//     $('.pagingMenu').mouseleave(function(){
//         pMItem.css('box-shadow', 'none');
//         pMDItem.stop().animate({'width':'0'},200);
//         pMItem.children('span').stop().animate({'opacity':'0'},0);
//     })
// }
function brand() {
    $('.brand_img_item').hover(function () {
        $(this).children('img').stop().animate({
            'width': '0'
        }, 200, function () {
            $(this).stop().animate({
                'width': '100%'
            }, 200)
        });
    }, function () {
        $(this).children('img').css('width', '100%');
    })
}

function bannerBack() {
    var inde = 0;
    var pMItem = $('.pagingMenu_ul_item');
    var pMDItem = $('.pagingMenu_detail_itembox');
    pMItem.hover(function () {
        inde = pMItem.index($(this));
        $(this).css('box-shadow', '0 0 5px rgba(0, 0, 0, 0.5)').siblings().css('box-shadow', 'none');
        $(this).children('span').css('opacity', '1').parent().siblings().children('span').css('opacity', '0');
        pMDItem.eq(inde).css({
            'display': 'block'
        }).siblings().css({
            'display': 'none'
        })
    })
    $('.pagingMenu').mouseleave(function () {
        pMItem.css('box-shadow', 'none');
        pMDItem.css({
            'display': 'none'
        });
        pMItem.children('span').css('opacity', '0');
    })
}

$(function () {
    bannerBack()
})
//品牌旋转
function brand() {
    $('.brand_img_item').hover(function () {
        $(this).children('img').stop().animate({
            'width': '0'
        }, 200, function () {
            $(this).stop().animate({
                'width': '100%'
            }, 200)
        });
    }, function () {
        $(this).children('img').css('width', '100%');
    })
}
//页面加载完毕就加载板块信息
$(function () {
    var cookie = navigator.cookieEnabled;
    if (!cookie) {
        layer.alert("cookie被禁用");
        return;
    }
    addPlate();
    addType();
    addModel();
    addBrand();
    brand();
});
//添加板块
function addPlate() {
    $.ajax({
        url: PATH + "/type/selectPageType.action",
        post: "GET",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                addHtml(data[i]);
            }
            for (var i = 0; i < data.length; i++) {
                var types = data[i].childrenTypes;
                var products = data[i].products;
                for (var j = 0; j < types.length; j++) {
                    addChildrenType(types[j], i);
                }
                for (var j = 0; j < products.length; j++) {
                    addProduct(products[j], i);
                }
            }
        }

    });
}
//添加板块页面
function addHtml(pageType) {
    var op = '<div class="section_2_mid">'+
        '<div class="section_2_mid__Column clearfix">'+
        '<h2 class="section_2_mid__Column_title">'+pageType.name+'</h2>'+
        '<span class="section_2_mid__Column_More">'+
            '<a class="cr" href="/page/type/casualsnacks.html?id='+pageType.id+'&state=2">查看更多>></a>'+
        '</span>'+
        '<div class="section_2_mid__Column_nav">'+
        '</div>'+
    '</div>'+
    '<div class="section_2_mid_banner" id="section_2_banner">'+
        '<ul class="section_2_mid_banner__ul" id="section_2_banner_ul">'+
            '<li>'+
                '<a class="section_2_mid_banner__ul__item" href="/page/type/casualsnacks.html?id='+pageType.id+'&state=2">'+
                    '<img src="'+pageType.imgUrl+'" alt="">'+
                '</a>'+
            '</li>'+
        '</ul>'+
    '</div>'+
    '<div class="section_2_mid_Popular clearfix">'+
    '</div>'+
'</div>'
    $("#section2").append(op);
}
//添加板块子分类
function addChildrenType(type, index) {
    var element = $(".section_2_mid__Column_nav").eq(index);
    var op = '<span class="section_2_mid__Column_nav_item">'+
      '<a href="/page/type/casualsnacks.html?id='+type.id+'&state=3">'+type.name+'</a>'+
      '</span>'+
      '<div class="section_2_mid__Column_nav_Emb"></div>'
    element.append(op);
}
//添加商品信息
function addProduct(product, index) {
    var element = $("div.section_2_mid_Popular").eq(index);
    var op = '<a href="/page/product/productDetails.html?productId='+product.id+'&storeId='+product.storeId+'" class="section_2_mid_Popular_item">'+
     '<img src="'+product.pic+'" alt="">'+
     '<span class="section_2_mid_Popular_item_span">'+product.brandName+
     '<strong class="section_2_mid_Popular_item_span_b">'+product.name+'</strong></span>'+
 '</a>'
    element.append(op);
}
//获取分类信息
function addType() {
    $.ajax({
        url: PATH + "/type/selectProductType.action",
        type: "POST",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            addMainType(data);
            bannerBack()
        }

    });

}
//添加主分类
function addMainType(productTypes) {
    $.each(productTypes, function (index, obj) {
        addMainTypePage(index, obj);
        addOneTypeDetailDiv(index, obj);
    });
}
//添加一级分类页面
function addMainTypePage(index, productType) {
    var op = '<li class="pagingMenu_ul_item">'+
        '<h2><a href="/page/type/casualsnacks.html?id='+productType.id+'&state=1" title="">'+productType.name+'</a></h2>'+
        '<span></span>'
    $(".pagingMenu_ul").append(op);
    addTwoType(productType.list, index);
}
//添加二级分类
function addTwoType(productTypes, index) {
    $.each(productTypes, function (index2, obj) {
        if (index2 > 2) {
            return;
        }
        addMainTypeTwoPage(obj, index);
    });
}
//添加二级分类页面
function addMainTypeTwoPage(productType, index) {
    var op = '<a href="/page/type/casualsnacks.html?id='+productType.id+'&state=2" title="">'+productType.name+'</a>';
    $(".pagingMenu_ul_item").eq(index).append(op);
}
var count = 0;
//添加一级分类详情框
function addOneTypeDetailDiv(index, productType) {
    var op = '<div class="pagingMenu_detail_itembox"> <div class="pagingMenu_detail_item"></div></div>';
    $(".pagingMenu_detail").append(op);
    $.each(productType.list, function (index2, obj) {
        addTwoTypeDetailDiv(index, obj);
    })
}
//添加二级分类详情框
function addTwoTypeDetailDiv(index, productType) {
    var op = '<div class="detail_it_det">'+
        '<h3><a href="/page/type/casualsnacks.html?id='+productType.id+'&state=2" title="">'+productType.name+'</a></h3>'+
        '<div class="detail_it_det_item clearfix"></div>'+
        '</div></div>'
    $(".pagingMenu_detail_item").eq(index).append(op);
    addThreeType(productType.list);
    count++;
}
//添加三级分类
function addThreeType(productTypes) {
    var op = "";
    $.each(productTypes, function (index, obj) {
        op = op + '<a href="/page/type/casualsnacks.html?id='+obj.id+'&state=3" title="">'+obj.name+'</a>';
    });
    $(".detail_it_det_item").eq(count).append(op);
}

//判断用户是否登录
function isLogin(callback) {
    $.ajax({
        url: PATH + "/user/queryBuyerLogin.action",
        type: "POST",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if(callback){
                callback(data);
            }else{
                console.log('没有回调');
            }
        }
    });
}
//添加登录页面
function addIsLogin(user) {
    var lev = {};
    lev[0] = '铜牌会员'
    lev[1] = '银牌会员'
    lev[3] = '金牌会员'
    lev[4] = '铂金会员'
    lev[5] = '钻石会员'
    var levObj = JSON.parse(getLocalData('userLeveImg'));
    var op = '<div class="user_box">'+
                '<div class="user_head">'+
                '<a href="/page/personal/personalHome.html">'+
                '<img src="'+user.headSculpture+'" alt="">'+
                '</a>'+
                '</div>'+
                '<h3 class="user_name">'+user.username+'</h3>'+
                '<div class="user_leve">'+
                    '<span >我的等级:<em style="background-image: url('+levObj.img+');">'+lev[levObj.lev]+'</em></span>'+
                '</div>'+
                '<div class="user_order clearfix">'+
                    '<div class="user_order_pay">'+
                        '<a href="/page/personal/personalOrder.html?inde=2" title="">'+
                            '<div class="user_order_pay_img" style="background-image: url('+user.list[0].imgUrl+')"></div>'+
                            '<span>待付款</span>'+
                            '<i>'+user.list[0].count+'</i>'+
                        '</a>'+
                    '</div>'+
                    '<div class="user_order_pay">'+
                    '<a href="/page/personal/personalOrder.html?inde=3" title="">'+
                        '<div class="user_order_pay_img" style="background-image: url('+user.list[1].imgUrl+')"></div>'+
                        '<span>待发货</span>'+
                        '<i>'+user.list[1].count+'</i>'+
                    '</a>'+
                    '</div>'+
                    '<div class="user_order_gain">'+
                        '<a href="/page/personal/personalOrder.html?inde=4" title="">'+
                            '<div class="user_order_gain_img" style="background-image: url('+user.list[2].imgUrl+')"></div>'+
                            '<span>待收货</span>'+
                            '<i>'+user.list[2].count+'</i>'+
                        '</a>'+
                    '</div>'+
                    '<div class="user_order_assess">'+
                        '<a href="/page/personal/personalOrder.html?inde=5" title="">'+
                            '<div class="user_order_assess_img" style="background-image: url('+user.list[3].imgUrl+')"></div>'+
                            '<span>待评价</span>'+
                            '<i>'+user.list[3].count+'</i>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
                    '<div class="login_leave">'+
                       ' <a href="javascript:void(0)" title="" onclick="logout()">退出登录</a>'+
                    '</div>'+
                '</div>'
    $(".user").append(op);
}


//添加未登录页面
function addNotLogin() {
    var op = '<div class="user_box">'+
        '<div class="user_head">'+
        '<img src="/images/index_Avatar.png" alt="">'+
	    '</div>'+
	    '<h3 class="user_name">欢迎登录</h3>'+
	    '<a href="/page/login/login.html" class="user_login" title="">登陆</a>'+
	    '<a href="/page/login/regist.html" class="user_signup" title="">注册</a>'+
		'</div>'
    $(".user").append(op);
}

//加载品牌
function addBrand() {
    $.ajax({
        url: PATH + "/brand/queryPageBrand.action",
        type: "POST",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            $.each(data, function (index, obj) {
                var op = 
                '<a href="/page/brand/brandDetails.html?brandId='+obj.id+'">'+
                    '<div class="brand_img_item">'+
                        '<img src="'+obj.imgUrl+'" alt="">'+
                    '</div>'+
                '</a>'
                    
                $(".section_brand_mid").append(op);
            });
            brand();
        }
    });
}
//添加模块
function addModel() {
    $.ajax({
        url: PATH + "/page/queryPageModel.action",
        type: "POST",
        xhrFields:{
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            var op = '<div class="section_goold_item">'+
                    '<h2><a href="/page/product/hotProduct.html" title="">热卖品牌</a></h2>'+
                    '<a href="/page/product/hotProduct.html">'+
                    '<img src="'+data[1]+'" alt="">'+
                    '</a>'+
                '</div>'+
                '<div class="section_goold_item">'+
                    '<h2><a href="/page/product/newProduct.html" title="">新品推荐</a></h2>'+
                    '<a href="/page/product/newProduct.html">'+
                    '<img src="'+data[2]+'" alt="">'+
                    '</a>'+
                '</div>'+
                '<div class="section_goold_item">'+
                    '<h2><a href="javascript:;" onclick="notOpen()" title="">限时抢购</a></h2>'+
                    '<a href="javascript:;" onclick="notOpen()">'+
                    '<img src="'+data[0]+'" alt="">'+
                    '</a>'+
                '</div>'
            $(".section_goold_mid").append(op);
        }
    });
}