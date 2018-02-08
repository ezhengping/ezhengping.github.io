function animedTab() {
    /****************************************
     * 调用 shoppingCart.js 里的addOrCut(inputCls,addBtnCls,cutBtnCls)函数
     * 功能： 点击 上下（加减）按钮 增加或减少数量
     * 参数: inputCls   input元素class 或 id
     *      addBtnCls  增加按钮元素class 或 id 
     *      cutBtnCls  减少按钮元素class 或 id
     *****************************************/
    addOrCut('.commodity_num', '.add_commod', '.cut_commod');
}
// imgTabAnim() 图片放大插件及选项卡切换动画
function imgTabAnim() {
    $(".jqzoom").imagezoom();

    function imgTab() {
        // 初始图片
        $("#thumblist li").eq(0).css('border-color', '#ff7f26');
        $("#thumblist li a").hover(function () {
            $(this).parents("li").css('border-color', '#ff7f26').siblings().css('border-color',
                'rgba(0,0,0,0)')
            $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
            $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
        })
    }
    imgTab()
}
//商品详情和评价切换
function commodityTab() {
    var inde = 0;

    function Tab() {
        $('.J_TabBar li').eq(inde).addClass('J_TabAtv').siblings().removeClass('J_TabAtv')
        $('.J_commodity').eq(inde).css('display', 'block').siblings('.J_commodity').css('display', 'none');
    }
    Tab()
    $('.J_TabBar li').click(function (event) {
        inde = $('.J_TabBar li').index($(this));
        Tab()
    });
}

//从页面获取值
function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//获取商品详情
function getProductItem(productId, storeId) {
    $.ajax({
        url: PATH + "/product/getProductItem.action",
        type: "POST",
        data: {
            "productId": productId,
            "storeId": storeId
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            var productId = data.productId;
            var storeId = data.store.id;
            setLocalData(data, 'productData');
            addImage(data.images);
            addProductInformation(data);
            animedTab();
            addStoreInformation(data.store, data.storeIsCollect)

            if (data.isCollect) {
                true_dataCollection()
            } else {
                false_dataCollection()
            }
            // storeCollection(data.)

            // 保存数据
            productNumberData(storeId, productId);
        }
    });
}




function valNumber(ELe) {
    isNaN($(ELe).val() == '0') ? $(ELe).val($(ELe).val().replace("1")) : null;
    isNaN($(ELe).val() == '') ? $(ELe).val($(ELe).val().replace("1")) : null;
    isNaN($(ELe).val()) ? $(ELe).val($(ELe).val().replace(/[^\d]/g, "")) : null;
}

function productNumberData(storeId, productId) {
    var numBerVal = $('.commodity_num').value;
    var ELe = '.commodity_num';
    valNumber(ELe);
    var data = [];
    var simpleProducts = {};
    var product = {};
    simpleProducts.storeId = storeId;
    product.productId = productId;
    numBerVal = $('.commodity_num').val();
    simpleProducts.simpleProducts = [];

    product.quantity = numBerVal;

    simpleProducts.simpleProducts.push(product);
    data.push(simpleProducts);
    setLocalData(data, 'productData');
    $('.commodity_num').bind('input propertychange', function (event) {
        // 判断输入是否为数字
        isNaN($(this).val() == '0') ? $(this).val($(this).val().replace("1")) : null;
        isNaN($(this).val() == '') ? $(this).val($(this).val().replace("1")) : null;
        isNaN($(this).val()) ? $(this).val($(this).val().replace(/[^\d]/g, "")) : null;
        // if ($(this).val() == '') {
        //     $(this).val(1);
        // } else if ($(this).val() == '0') {
        //     $(this).val(1);
        // }
        numBerVal = $('.commodity_num').val();

        var data = [];

        simpleProducts.simpleProducts = [];

        product.quantity = numBerVal;

        simpleProducts.simpleProducts.push(product);
        data.push(simpleProducts);
        setLocalData(data, 'productData');

    })
    $('.add_commod').click(function () {
        numBerVal = $('.commodity_num').val();

        var data = [];
        simpleProducts.simpleProducts = [];

        product.quantity = numBerVal;

        simpleProducts.simpleProducts.push(product);
        data.push(simpleProducts);
        setLocalData(data, 'productData');

    })
    $('.cut_commod').click(function () {
        numBerVal = $('.commodity_num').val();

        var data = [];

        simpleProducts.simpleProducts = [];

        product.quantity = numBerVal;

        simpleProducts.simpleProducts.push(product);
        data.push(simpleProducts);
        setLocalData(data, 'productData');
    })




}

//添加图片
function addImage(images) {
    var op1 =
        '<a href="'+images[0].imgurl+'" rel="gal1" title="triumph"> '+
            '<img class="jqzoom" src="'+images[0].imgurl+'"  rel="'+images[0].imgurl+'" title="triumph"> '+
        '</a>'
    $("#image").append(op1);
    $.each(images, function (index, obj) {
        var op2 =
            '<li class="tb-selected">'+
        '<a href="javascript:void(0)" title="">'+
        '<img src="'+obj.imgurl+'" mid="'+obj.imgurl+'" big="'+obj.imgurl+'" alt="">'+
     '</a>'+
    '</li>'
        $(".commodity_small_img").append(op2);
    });
    imgTabAnim();
}

//添加店铺信息
function addStoreInformation(store, storeIsCollect) {
    var op =
     '<h3>店铺详情</h3>'+
     '<div class="storeInfo clearfix">'+
         '<a href="/page/store/store.html?storeId='+store.id+'" title="" class="storeInfo_Logo">'+
             '<img src="'+store.logo+'" alt="">'+
         '</a>'+
         '<h2>'+store.name+'</h2>'+
         '<table class="shop_Attributes">'+
             '<tbody><tr>'+
                 '<td>店铺类型:</td>'+
                 '<td>'+store.typeView+'</td>'+
             '</tr>'+
             '<tr>'+
                 '<td>店铺等级:</td>'+
                 '<td>'+store.grandView+'</td>'+
             '</tr>'+
             '<tr>'+
                 '<td>营业状态:</td>'+
                 '<td>'+store.statusView+'</td>'+
             '</tr>'+
         '</tbody></table>'+
         '<a href="/page/store/store.html?storeId='+store.id+'" title="">'+
             '<span class="shop_translation"><i style="background-image: url(\'/images/hire_icon.png\')"></i>进店铺看看</span>'+
         '</a>'
    if (!storeIsCollect) {
        op = op +
            '<a href="javascript:void(0)" title="" onclick="isCollectStore(this,'+store.id+')"><span class="shop_translation"><i style="background-image: url(\'/images/Collection_Icon.png\')"></i>收藏店铺</span></a></div>'
    } else {
        op = op +
            '<a href="javascript:void(0)" title="" onclick="cancleCollectStore(this,'+store.id+')"><span class="shop_translation"><i style="background-image: url(\'/images/Collection_Icon_tav.png\')"></i>收藏店铺</span></a></div>'
    }
    $(".commodity_main_shop").append(op);
}
//收藏商品
function isCollectStore(obj, storeId) {

    $.ajax({
        url: PATH + "/user2/collectStore.action",
        type: "POST",
        data: {
            "storeId": storeId,
            "type": 1
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if (110 == data) {
                $(obj).remove();
                $(".storeInfo").append(
                    '<a href="javascript:void(0)" title="" onclick="cancleCollectStore(this,'+storeId+')"><span class="shop_translation"><i style="background-image: url(\'/images/Collection_Icon_tav.png\')"></i>收藏店铺</span></a>'
                );
            } else if (19 == data) {
                layer.alert("该店铺已经收藏");
            } else {
                location.href = "/page/login/login.html";
            }
        }
    });
}
//取消收藏
function cancleCollectStore(obj, storeId) {
    var dataD = [];
    dataD.push(storeId);
    dataD = JSON.stringify(dataD);
    $.ajax({
        url: PATH + "/user2/cancleCollectStores.action",
        type: "POST",
        data: {
            "json": dataD,
            // "type": 0
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if (data.result == 7) {
                location.href = "/page/login/login.html";
            }
            if (110 == data) {
                $(obj).remove();
                $(".storeInfo").append(
                    '<a href="javascript:void(0)" title="" onclick="isCollectStore(this,'+storeId+')"><span class="shop_translation"><i style="background-image: url(\'/images/Collection_Icon.png\')"></i>收藏店铺</span></a>'
                );
            }
        }
    });
}

// 收藏按钮被点击
function collectionClick() {
    // console.log(1)
    var dataP = [];
    var productId = getParam('productId');
    dataP.push(productId)
    dataP = JSON.stringify(dataP);
    $('.commodity_Collection').on('click', '.true_Collection', function () {

        ajaxCollection({
            url: '/user2/cancleCollectionProducts.action',
            data: {
                'json': dataP
            }
        }, function (data) {
            if (data == 110) {
                false_dataCollection();
            } else {
                layer.alert('取消收藏失败')
            }
        })
    })
    $('.commodity_Collection').on('click', '.false_Collection', function () {
        ajaxCollection({
            url: '/user2/colectionProduct.action',
            data: {
                'productId': productId
            }
        }, function (data) {
            if (data == 17) {
                layer.alert('商品已经被收藏');
            } else if (data == 110) {
                true_dataCollection();
            } else if (data == 111) {
                layer.alert('商品收藏失败')
            }
        })
    })
}

function false_dataCollection() {
    var html = '<span class="Collection false_Collection">收藏商品</span>'
    $('.commodity_Collection').html(html);
}

function true_dataCollection() {
    var html = '<span class="Collection true_Collection">收藏商品</span>'
    $('.commodity_Collection').html(html);
}

function ajaxCollection(ajax, callback) {
    $.ajax({
            url: PATH + ajax.url,
            type: 'POST',
            data: ajax.data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result) {
                location.href = '/page/login/login.html';
            }
            if (callback) {
                callback(data);
            } else {
            }
        })

}

//添加商品信息
function addProductInformation(product) {
    addProductName(product);
    addPrice(product);
    addDescription(product);
    addSales(product);
    addSku(product);
}
//添加商品名称
function addProductName(product) {
    var note = '<h2>'+product.productName+'</h2>';
    $(".commodity_hd").append(note);
    if (null != product.note) {
        $(".commodity_hd").append("<p>" + product.note + "</p>")
    }
}
//添加商品价格
function addPrice(product) {
    $(".or-price").append('<span>建议零售价:￥</span>'+product.marketPrice);
    $(".price").append('<span>￥</span><em>'+product.salePrice+'</em><i>限时抢购</i>');
}
//添加描述信息
function addDescription(product) {
    var op =
        '<table>'+
            '<tbody>'+
                '<tr>'+
                    '<td>品牌：<span>'+product.productName+'</span></td>'+
                    '<td>种类：<span>'+product.typeName+'</span></td>'+
                '</tr>'+
                '<tr>'+
                    '<td>包装：<span>'+product.packs+'</span></td>'+
                    '<td>规格：<span>'+product.introduce.weight+'</span></td>'+
                '</tr>'+
                '<tr>'+
                    '<td>生产日期：<span>'+product.introduce.manufactureDate+'</span></td>'+
                    '<td>保质期：<span>'+product.introduce.qualityGuaranteePeriod+'</span></td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'
        
    $(".commodity_info").append(op);
}
//添加销量信息
function addSales(product) {
    var op =
            '<div>'+
                '<div>'+
                '销量:<span>'+salesNumberCalculate(product.totalSales||"0")+'</span>'+
                '</div>'+
            '<div>'+
                '评论:<span>'+product.evaluateCount+'</span>'+
            '</div>'+
        '</div>'
    $(".commodity_Stock").append(op);
}
//添加库存信息
function addSku(product) {
    var op =
        '<span>数量</span>'+
    '<input type="text" class="commodity_num" maxlength=3 name="cart" value=1>'+
    '<div class="Cart_Control">'+
    '<span class="add_commod">∧</span>'+
    '<span class="cut_commod">∨</span>'+
    '</div>'+
    '<span>件</span>'+
    '<span>库存：<i>'+product.sku+'</i></span>'+
    '<a href="javascript:void(0)" title="" onclick="addOrder()">立即购买</a>'+
    '<a href="javascript:void(0)" title="" class="cart" onclick="addBuyerCar('+product.productId+',this)">加入购物车</a>'
    $(".commodity_Cart").append(op);
}
//获取商品信息描述
function getProductItemDescription(productId) {
    $.ajax({
        url: PATH + "/product/getDescription.action",
        type: "POST",
        data: {
            "productId": productId
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            addProductItemDescription(data);
            commodityTab();
        }
    });
}
//添加商品详情描述页面
function addProductItemDescription(descriptions) {
    var ele = $(".commodity_Details");
    $.each(descriptions, function (index, obj) {
        ele.append('<img src="'+obj.imgurl+'" alt="">');
    });
}
//获取商品的评价信息
function queryEvaluate(productId) {
    $.ajax({
        url: PATH + "/evaluate/queryEvaluateByScore.action",
        type: "POST",
        data: {
            "tag": "all",
            "productId": productId
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            // console.log(data);
            if (data.common.length) {
                addEvaluate(data.common);
            } else {
                addNullEvaluate();
            }
        }
    });
}

// 评论数据为空
function addNullEvaluate() {
    var html = '<li class="null_Evaluate">' +
        '<div>' +
        '<p>' +
        '暂无评论数据~~~' +

        '</p>' +
        '</div>' +
        '</li>'
    $('.comment_ul').html(html);

}

// 评论图片弹窗
function userCommentImg(){
    $('.commodity_comment').on('click','.comment_img',function(){
        var imgurl = $(this).children('img').attr('src');
        
        $('.layer_img img').attr('src',imgurl);
        layer.open({
            type:1,
            title:'查看图片',
            maxWidth :800,
            maxHeight:540,
            content:$('.layer_img')
        })
    })
}
//添加评价信息
function addEvaluate(evaluates) {
    var ele = $(".commodity_comment")
    $.each(evaluates, function (index, obj) {
        var username = repalceBuyerName(obj.buyerName);
        var op =
            '<li class="comment_item">'+
    '<div class="comment_item_user">'+
    '<div class="user_img">'+
        '<div class="user_img_box">'
        if (null == obj.headSculpture) {
            op = op + '<img src="/images/index_Avatar.png" alt="">'
        } else {
            op = op + '<img src="'+obj.headSculpture+'" alt="">'
        }
        op = op +
            '</div>'+
            '<span>'+username+'</span>'+
        '<div class="user_star">'+
            '<div class="star" style="'+userStar(obj.description)+'"></div>'+
        '</div>'+
    '</div>'+
    '<div class="user_text">'+
        '<p>'+
           obj.buyerEvaluate+
        '</p>'+
        '<p class="user_comment_img">'+
         adduserCommentImg(obj.evaluateImages)+
        '</p>'+
        '<time datetime="'+obj.createTimeStr+'">'+obj.createTimeStr+'</time>'+
    '</div>'+
    '</div>'+
    '</li>'
        ele.append(op);
    });
}

function adduserCommentImg(obj){
    var html = '';
    $.each(obj,function(inex,obj){
        html+='<span class="comment_img"><img src='+obj.imgUrl+'></span>'
    })
    return html;
}
//隐藏部分用户名
function repalceBuyerName(username) {
    var str1 = username.slice(0, 3);
    var str2 = username.slice(username.length - 3);
    return str1 + "****" + str2;
}
//添加购物车
function addBuyerCar(productId, obj) {
    var amount = $(".commodity_num").val();
    $.ajax({
        url: PATH + "/buyerCar/addBuyerCar.action",
        type: "POST",
        data: {
            "productId": productId,
            "amount": amount
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if (110 == data) {
                addCartAnimate(obj);
            } else {
                location.href = "/page/login/login.html";
            }
        }
    });
}



//立即购买
function addOrder() {
    // addOrderData()
    orderData()
}

// 购买数据
function orderData() {
    $.ajax({
            url: PATH + '/storage/submitOrderInformation.action',
            type: 'POST',
            data: {
                'param': getLocalData('productData')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data == 110) {
                location.href = '/page/cart/buyNowSettlement.html'
                return;
            } else if (data.result == 7) {
                location.href = '/page/login/login.html'
                return;
            } else if (data == 114) {
                layer.alert('参数有误，请刷新页面后重试');
                return;
            }

        })
}


// 获取数据
// function addOrderData() {
//     var data = {};
//     var dataOrder = [];
//     var dataOrderObj = {};


//     var storeName = $('.commodity_main_shop h2').text();
//     var storeId = getParam('storeId');
//     var storeLogo = $('.commodity_main_shop .storeInfo_Logo img').attr('src');


//     var productData = [];
//     var product = {}


//     var productId = getParam('productId');


//     var productImg = $('.commodity_small_img li').eq(0).find('img').attr('src');
//     var productName = $('.commodity_hd h2').text();
//     var productProps = $('.commodity_info tr').eq(1).find('td').eq(1).children('span').text();
//     var productPrice = $('.price').find('em').text();


//     var productNumber = $('.commodity_Cart input.commodity_num').val();
//     var productSum = (productNumber * productPrice).toFixed(2);
//     product['productId'] = productId
//     product['productImg'] = productImg
//     product['productName'] = productName
//     product['productProps'] = productProps
//     product['productPrice'] = productPrice
//     product['productNumber'] = productNumber
//     product['productSum'] = productSum
//     productData.push(product);
//     dataOrderObj['storeId'] = storeId;
//     dataOrderObj['storeLogo'] = storeLogo;
//     dataOrderObj['storeName'] = storeName;
//     dataOrderObj['orderData'] = productData;
//     dataOrder.push(dataOrderObj);
//     data['dataOrder'] = dataOrder;
//     var dataString = JSON.stringify(data);
//     localStorage.setItem('orderData', dataString);
// }

//添加评价星级
function userStar(INT) {
    switch (INT) {
        case 0:
            ;
            break;

        case 1:
            return 'background-position: -48px 0px;';
            break;


        case 2:
            return 'background-position: -36px 0px;';
            break;

        case 3:
            return 'background-position: -24px 0px;';
            break;

        case 4:
            return 'background-position: -12px 0px;';
            break;

        case 5:
            return 'background-position: 0px 0px;';
            break;

        default:
            return;
    }
}
//页面加载完毕执行
$(function () {
    var productId = getParam("productId");
    var storeId = getParam("storeId");
    getProductItem(productId, storeId);
    getProductItemDescription(productId);
    queryEvaluate(productId);
    userCommentImg();
    collectionClick();
});