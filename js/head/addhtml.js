/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-27 20:03:09
 * @version $Id$
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return "";
}
// 主导航
var headerMain = '<nav class="nav">'+
                    '<div class="nav__mid">'+
                    '<ul class="nav__mid__menu">'+
                    '<li class="nav__mid__menu_item">'+
                    '<a class="nav__mid__menu_item_a" href="/index.html">'+
                    '首页'+
                    '</a>'+
                    '</li>'+
                    '<li class="nav__mid__menu_item">'+
                    '<a class="nav__mid__menu_item_a" href="/page/indexPage/news.html">热点资讯</a>'+
                    '</li>'+
                    '<li class="nav__mid__menu_item">'+
                    '<a class="nav__mid__menu_item_a" href="/page/indexPage/settled.html">商家入驻</a>'+
                    '</li>'+
                    '</ul>'+
                    '<h1 class="nav__mid__logo">'+
                    '淘味网'+
                    '<a href="/index.html" class="nav__mid__logo_link">'+
                    '淘味网'+
                    '</a>'+
                    '</h1>'+
                    '<ul class="nav__mid__menu">'+
                    '<li class="nav__mid__menu_item">'+
                    '<a class="nav__mid__menu_item_a" href="/page/indexPage/APPdownload.html">下载APP</a>'+
                    '</li>'+
                    '<li class="nav__mid__menu_item">'+
                    '<a class="nav__mid__menu_item_a" href="/page/indexPage/aboutus.html">'+
                    '关于我们'+
                    '</a>'+
                    '</li>'+
                    '<li class="nav__mid__menu_item">'+
                    '<a class="nav__mid__menu_item_a" href="/page/indexPage/hire.html">'+
                    '招聘人才'+
                    '</a>'+
                    '</li>'+
                    '</ul>'+
                    '</div>'+
                    '</nav>'+
                    '<!-- banner模块 -->'




// 导航2
function getUrlname(url) { //假如传进来的url是    http://www.qq.com/index.html?name=joey   这里一共是有3个斜杠,如果我们想获取index.html
    url = url.split('?')[0]; // 我们只要?号前的
    var urlSlashCount = url.split('/').length; // 统计有3斜杠 
    return url.split('/')[urlSlashCount - 1].toLowerCase(); //获取数组最后一个
}

function htmlTitle(herf) {
    switch (herf) {
        case 'shoppingcart.html':
            return '购物车';
        case 'settlement.html':
            return '结算';
        case 'buynowsettlement.html':
            return '结算';
        case 'branddetails.html':
            return '品牌';
        case 'productdetails.html':
            return '商品详情';
        case 'store.html':
            return '店铺';
        default:
            return '';
    }
}
var head3 =
    '<!-- nav菜单导航部分 -->' +
    '<nav class="nav">' +
    '<div class="nav__mid">' +
    '<h1 class="nav__mid__logo">' +
    '淘味网' +
    '<a href="/index.html" class="nav__mid__logo_link">' +
    '淘味网' +
    '</a>' +
    '</h1>' +
    '<h2 class="nav-title">' + htmlTitle(getUrlname(window.location.href)) + '</h2>' +
    '<ul class="nav__mid__menu clearfix">' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/index.html">首页</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<span class="nav__mid__menu_item_span"></span>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/news.html">热点资讯</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<span class="nav__mid__menu_item_span"></span>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/settled.html">商家入驻</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<span class="nav__mid__menu_item_span"></span>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/hire.html">招聘人才</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<span class="nav__mid__menu_item_span"></span>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/aboutus.html">关于我们</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<span class="nav__mid__menu_item_span"></span>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/APPdownload.html">下载APP</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<span class="nav__mid__menu_item_span"></span>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</nav>';


var vicenav = '<div class="vicenav__mid">' +
    '<ul class="vicenav__mid_ul clearfix">' +
    '<li class="vicenav__mid_ul_item">' +
    '<a href="/page/indexPage/settled.html">我要入驻</a>' +
    '</li>' +
    '<li class="vicenav__mid_ul_item">' +
    '<a href="/page/business/process.html">入驻流程</a>' +
    '</li>' +
    '<li class="vicenav__mid_ul_item">' +
    '<a href="/page/business/cooperation.html">合作品牌</a>' +
    '</li>' +
    '<li class="vicenav__mid_ul_item">' +
    '<a href="/page/business/problem.html">常见问题</a>' +
    '</li>' +
    '</ul>' +
    '</div>'
var headTop = '<div class="head_top clearfix">' +
    '<div class="head_top_mid">' +
    '<div class="head_top_left">' +
    '<a href="javascript:;" class="collection" onclick=AddFavorite(\'淘味网&nbasp;-&nbasp;天天淘味网\',\'美味齐分享,www.taoweiw.com\')>' +
    '<i></i>' +
    '收藏本站' +
    '</a>' +
    '<a>' +
    '淘味网 欢迎您！' +
    '</a>' +
    '</div>' +
    '<div class="head_top_right">' +
    '<div class="user_nameOrlev">' +
    '<a href="/page/login/login.html">' +
    '淘味网 请登录' +
    '<i class="vip_level_icon" style="background-image:url()"></i>' +
    '</a>' +
    '</div>' +
    '<div>' +
    '<a href="/page/personal/personalHome.html">' +
    '个人首页' +
    '</a>' +
    '</div>' +
    '<div>' +
    '<a href="/page/cart/shoppingCart.html">' +
    '购物车' +
    '<i class="cart_icon"></i>' +
    '</a>' +
    '</div>' +
    '<div>' +
    '<a href="javascript:;" onclick="logout()">' +
    '退出' +
    '</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'


var head1 = headTop + '<nav class="nav">' +
    '<div class="nav__mid">' +
    '<h1 class="nav__mid__logo">淘味网' +
    '<a href="/index.html" class="nav__mid__logo_link">淘味网' +
    '<img src="/images/index_logo.png" />' +
    '</a>' +
    '</h1>' +
    '<ul class="nav__mid__menu clearfix">' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/index.html">首页</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/news.html">热点资讯</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/settled.html">商家入驻</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/hire.html">招聘人才</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/aboutus.html">关于我们</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/APPdownload.html">下载APP</a>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</nav>'
var head2 = headTop + '<nav class="nav">' +
    '<div class="nav__mid">' +
    '<h1 class="nav__mid__logo">淘味网' +
    '<a href="/index.html" class="nav__mid__logo_link">淘味网' +
    '<img src="/images/header_logo2.png" />' +
    '</a>' +
    '</h1>' +
    '<ul class="nav__mid__menu clearfix">' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/index.html">首页</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/news.html">热点资讯</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/settled.html">商家入驻</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/hire.html">招聘人才</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/aboutus.html">关于我们</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/APPdownload.html">下载APP</a>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</nav>'
var head3 = headTop + '<nav class="nav">' +
    '<div class="nav__mid">' +
    '<h1 class="nav__mid__logo">淘味网' +
    '<a href="/index.html" class="nav__mid__logo_link">淘味网' +
    '<img src="/images/header_logo3.png" />' +
    '</a>' +
    '</h1>' +
    '<ul class="nav__mid__menu clearfix">' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/index.html">首页</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/news.html">热点资讯</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/settled.html">商家入驻</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/hire.html">招聘人才</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/aboutus.html">关于我们</a>' +
    '</li>' +
    '<li class="nav__mid__menu_item">' +
    '<a class="nav__mid__menu_item_a" href="/page/indexPage/APPdownload.html">下载APP</a>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</nav>'
// 侧边栏数据
var sidebarHtml = '<div class="sidebar__mid">' +
    '<a class="sidebar__mid_item" href="/index.html">首页</a>' +
    '<a class="sidebar__mid_item" href="/page/indexPage/news.html">热点</a>' +
    '<a class="sidebar__mid_item" href="/page/indexPage/settled.html">商家</a>' +
    '<a class="sidebar__mid_item" href="/page/indexPage/APPdownload.html">下载</a>' +
    '<a class="sidebar__mid_item" href="/page/indexPage/aboutus.html">关于</a>' +
    '<a class="sidebar__mid_item" href="/page/indexPage/hire.html">招聘</a>' +
    '<a class="sidebar__mid_item" href="javascript:;"></a>' +
    '</div>'

// 底部 HTML
var footerHtml =
    '<div class="footer__mid">' +
    '<div class="footer__QR clearfix">' +
    '<div class="footer__QR_left">' +
    '<img src="/images/wc_QR.png" alt="">' +
    '<span>扫描关注微信公众号</span>' +
    '</div>' +
    '<div class="footer__QR_right">' +
    '<img src="/images/casualsnacks_QR.jpg" alt="">' +
    '<span>扫描二维码下载APP</span>' +
    '</div>' +
    '</div>' +
    '<div class="foonter__cut">' +
    '<div class="foonter__cut_content">' +
    '<h2 class="foonter__cut_title">天天淘味网，美味齐分享</h2>' +
    '<div class="foonter__cut_phoneAndMail">' +
    '<span>客服热线：400-669-7188/027-87003988</span>' +
    '<span>邮箱：1360703191@qq.com</span>' +
    '</div>' +
    '<div class="foonter__cut_address">' +
    '地址：武汉市洪山区关东街道关南园4路35号东港科技产业园4号楼6楼淘味网络（武汉）技术有限公司' +
    '</div>' +
    '<div class="foonter__cut_Inscription">' +
    'Copyright © 1996 - 2017 taoweiw Corporation, All Rights Reserved 淘味网公司版权所有' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="foonter__cut_friendship">' +
    '<div class="friendship">' +
    '<span>友情链接<i></i></span>' +
    '<ul class="friendship_List" style="display: none;">' +
    '<li><a href="https://taoweisp.jd.com/" title="">京东淘味食品专营店</a></li>' +
    '<li><a href="https://yilongyuan.tmall.com/shop/view_shop.htm" title="">亿龙源天猫旗舰店</a></li>' +
    '<li><a href="https://tangchaoshidai.tmall.com/search.htm" title="">醣潮食代天猫旗舰店</a></li>' +
    '<li><a href="https://ylyfoodalbb.1688.com" title="">阿里巴巴亿龙源</a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<script type="text/javascript">' +
    '$(".friendship").hover(function() {' +
    '$(".friendship_List").stop().slideToggle();' +
    '})' +
    '</script>'





function headAtv(head) {
    var urlstr = location.href;
    //alert((urlstr + '/').indexOf($(this).attr('href')));
    var urlstatus = false;
    $(head.id + " a" + head.aCls).each(function () {
        if ((urlstr + '/').indexOf($(this).attr('href')) > -1 && $(this).attr('href') != '') {
            $(this).addClass(head.addCls);
            urlstatus = true;
        } else {
            $(this).removeClass(head.addCls);
        }
    });
    if (!urlstatus) {
        $(head.id + " a" + head.aCls).eq(0).addClass(head.addCls);
    }

}

var unlogin =
    '<a href="toLogin.action" class="header__top__mid__Module_signin cur" id="login">' +
    '登录' +
    '</a>' +
    '<div class="header__top__mid__Module_Emb"></div>' +
    '<a href="toRegist.action" class="header__top__mid__Module_signup cur" id="login">' +
    '注册' +
    '</a>'
var unlogin2 =
    '<a class="nav__mid__menu_item_signin" href="javascript:;" id="login">登录</a>' +
    '<a class="nav__mid__menu_item_signup" href="javascript:;" id="login">注册</a>'

/**
 * 用户味豆和名称请求  
 * callback -- 请求回调函数
 * 
 * @param {any} callback 
 */
function ajaxUsernameAndBean(callback) {
    $.ajax({
            url: PATH + '/user2/selectUsernameAndBean.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (callback) {
                callback(data)
                return true;
            } else {
                return
            }
        })
}
/**
 * 查询订单交易总金额  
 * callback -- 回调函数
 * @param {any} callback 
 */
function ajaxTotalSum(callback) {
    $.ajax({
            url: PATH + '/user2/selectTotalSum.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (callback) {
                callback(data)
                return true;
            } else {
                return;
            }
        })
}


// 判断用户等级
function vipLeverData(data, callback) {
    var A = 100000,
        B = 300000,
        C = 500000,
        D = 1000000;

    // 钻石
    if (data > D) {
        callback(D, D, 4);
        return '∞';
        // 铂金
    } else if (D > data && data > C) {
        callback(data, D, 3);
        return D - data;
        // 黄金
    } else if (C > data && data > B) {
        callback(data, C, 2);
        return C - data;
        // 白银
    } else if (B > data && data > A) {
        callback(data, B, 1);
        return B - data;
        // 青铜
    } else if (data < A) {
        callback(data, A, 0);
        return A - data;
    }
}


function ifUserloginOrName() {
    var Ele = document.getElementsByClassName('head_top');
    if (Ele) {

        // 查找用户使用金额判断等级
        ajaxUsernameAndBean(function (data) {
            // 取到用户名称
            if (data.result == 7) {
                var isEle = document.getElementsByClassName('user')[0];
                if (isEle) {
                    addNotLogin();
                }
                return;
            }

            var userName = data.name;
            var html = '<a class="user_nameOrlev_login" href="/page/personal/personalHome.html">' +
                'Hi, ' + data.name +
                '<i class="vip_level_icon" data-lev=' + null + ' style="backgound-image:url(' + null + ')"></i>' +
                '</a>'
            $('.head_top .user_nameOrlev').html(html)


            // 取到用户等级
            ajaxTotalSum(function (data) {
                if (data.result == 7) {
                    return;
                }
                vipLeverData(data, function (Num, maxNum, lev) {
                    var img = '/images/v' + (lev + 1) + '.png'
                    $('.head_top .user_nameOrlev i').data('lev', lev + 1).css('backgound-image', 'url(' + img + ')')
                    
                    // 判断是否在首页    通过判断是否存在该元素，执行下面语句
                    var isEle = document.getElementsByClassName('user')[0];
                    if (isEle) {
                        var dataUserLev = {};
                        dataUserLev['img'] = img;
                        dataUserLev['lev'] = lev;
                        setLocalData(dataUserLev, 'userLeveImg')

                        // 请求是否登录
                        // 设置是否登录样式
                        isLogin(function (data) {
                            if (data.result) {
                                addIsLogin(data.info);
                            } else {
                                addNotLogin();
                            }
                        });
                    }
                })
            })
        })
    }
}

// 导航栏的跳转选中状态初始化
var head1Atv = {
    id: ".header_main",
    addCls: "nav__mid__menu_item__active",
    aCls: ".nav__mid__menu_item_a"
}

var head2Atv = {
    id: ".vicenav",
    addCls: "vicenav__mid_ul_item_active",
    aCls: ""
}

$(function () {
    $("#footer").html(footerHtml);
    $("#sidebar").html(sidebarHtml);
    $("#head1").html(head1);
    $("#head2").html(head2);
    $("#head3").html(head3);
    $('.vicenav').html(vicenav)
    headAtv(head1Atv);
    headAtv(head2Atv);
    ifUserloginOrName()

    var username = getCookie("taoweiwusername");
    if ("" != username) {
        $("#top1").html("<span>" + username + "欢迎您！</sapn>");
        $("#top2").html("<span>" + username + "欢迎您！</sapn>");
    } else {
        $("#top1").html(unlogin);
        $("#top2").html(unlogin2);
    }
})