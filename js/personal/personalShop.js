// 分页插件
function pagePs(Pagelength) {
    $("#page_ps").pagination({
        currentPage: 1, //初始页
        totalPage: Pagelength, //末尾页
        isShow: true, //是否显示首页和尾页按钮
        count: 7, //显示多少页
        homePageText: "<<",
        endPageText: ">>",
        prevPageText: "<",
        nextPageText: ">",
        callback: function (pageNo) {
            $("#page_ps").data('pageNo', pageNo);
            ajaxGoodsShop({
                pageNo: pageNo,
                pageSize: 2
            }, function (data) {
                if (data.common.length) {
                    addGoodsShop(data);
                    // 加载店铺商品
                    // 加载商品
                    shopGoods(0, data.common.length, data.common);
                } else {
                    addDataNullGoodsShop();
                }
            })
        }
    });
}

// 添加店铺数据
function addGoodsShop(data) {
    var html = '';
    $.each(data.common, function (index, obj) {

        html +=
            '<div class="ps_shop_item clearfix" data-storeId=' + obj.storeId + '>' +
            '<div class="item_ps_shop">' +
            '<div class="shop_img">' +
            '<a href="/page/store/store.html?storeId=' + obj.storeId + '">' +
            '<img src="' + obj.logo + '" alt="">' +
            '</a>' +
            '</div>' +
            '<p class="shop_title">' + obj.storeName + '</p>' +
            '<a class="shop_a" href="/page/store/store.html?storeId=' + obj.storeId + '">' +
            '<i class="shop_icon"></i>进入店铺</a>' +
            '</div>' +
            '<div class="item_ps_commodity">' +
            '</div>' +
            '<div class="item_ps_check">' +
            '<i class="i-check"></i>' +
            '</div>' +
            '</div>'
        $('.ps_shop_menu').html(html);
    })
}

function addDataNullGoodsShop() {
    var html =
        '<div class="item_null">' +
        '<div class="item_text">' +
        '<p>你还没有关注的店铺</p>' +
        '<a href="/index.html">先去逛逛商场吧>></a>' +
        '</div>' +
        '</div>'
    $('.ps_shop_menu').html(html);
}
// 加载店铺商品请求
function shopGoods(indx, len, data) {
    var dataD = data;
    if (indx >= len) return false;
    ajaxShopProduct({
        'pageNo': 1,
        'pageSize': 5,
        'storeId': data[indx].storeId,
    }, function (data) {
        if (data.common.length) {
            addDataShopProduct(data, indx)
            indx++;
            shopGoods(indx, len, dataD)
        } else {
            addNullDataShopProduct(indx);
            // return;
            indx++;
            shopGoods(indx, len, dataD)
        }
    })
}


// 批量删除
function batchDelcancelCollection(prodIdArr, EleC, DelEleC) {
    ajaxDelShop({
        'json': prodIdArr,
    }, function (data) {
        if (data == 110) {
            $(DelEleC).remove();
            var inde = $(EleC).length;
            var pageNo = $('.page_ps').data('pageNo');
            if (!inde) {
                if (pageNo > 1) {
                    pageNo = pageNo - 1;
                } else {
                    pageNo = 1;
                }
            }
            // 加载Ajax数据
            ajaxGoodsShop({
                'pageNo': pageNo,
                'pageSize': 2,
            }, function (data) {
                if (data.common.length) {
                    addGoodsShop(data);
                    // 加载店铺商品
                    // 加载商品
                    shopGoods(0, data.common.length, data.common);
                    $('#page_pc').data('pageNo', pageNo).data('totalPage', data.totalPage);
                } else {
                    addDataNullGoodsShop();
                }
            })
        } else if (data == 111) {
            layer.alert('取消失败，请刷新后重试');
        } else if (data == 114) {
            layer.alert('取消失败，请刷新后重试');
        }
    })
}
// 批量管理点击事件
function batchDelClick() {
    $('.batchDel_btn').click(function () {
        if($('.z-item-checked')[0]){
            var prodIdArr = [];
            var DelAll = $('.z-item-checked');
            $.each(DelAll, function (index, obj) {
                prodIdArr.push($(obj).data('storeid'))
            })
            batchDelcancelCollection(JSON.stringify(prodIdArr), '.ps_shop_item', '.z-item-checked')
        }else{
            layer.alert('你还没有选中店铺')
        }
        
    })
}


// 加载空数据
function addNullDataShopProduct(indx) {
    var html = '<p style="margin-top: 100px;margin-left: 330px;">暂无商品数据~~~</p>'
    $('.item_ps_commodity').eq(indx).html(html);
}

// 添加店铺商品数据
function addDataShopProduct(data, indx) {
    var productHtml = '';
    var Els = $('.item_ps_commodity');
    $.each(data.common, function (index, obj) {
        productHtml +=
            '<div class="commodity_item">' +
            '<a href="/page/product/productDetails.html?productId=' + obj.id + '&storeId=' +
            obj.storeId + '">' +
            '<div class="commodity_img">' +
            '<img src="' + obj.pic + '" alt="">' +
            '</div>' +
            '<p>￥' +
            '<em>' + obj.price + '</em>' +
            '</p>' +
            '</a>' +
            '</div>'
    })
    $('.item_ps_commodity').eq(indx).html(productHtml);
}

function allShopGoodsdata() {
    ajaxGoodsShop({
        pageNo: 1,
        pageSize: 2
    }, function (data) {
        $("#page_ps").data('pageNo', 1);
        if(data){
            if (data.common.length) {
                addGoodsShop(data);
                // 加载店铺商品
                // 加载商品
                shopGoods(0, data.common.length, data.common);
                pagePs(data.totalPage);
            }
        }else{
            addDataNullGoodsShop();
        }
        
    })
}






// $('.btn-cancle').click(function () {
//     $(this).parents('.pc-delete-tip').css('display', 'none');
// })
// $('.pc_op_item').click(function () {
//     $(this).parents('.pc_commodity_item').children('.pc-delete-tip').css('display', 'block');
// })

$(function () {
    // 加载所有收藏店铺
    allShopGoodsdata()

    // 批量管理数据
    batchDelClick();

    // 批量管理实例化
    var psBeans = new BatchCollection({
        batchbox: '.batch_btn', //批量管理按钮
        batchCombox: '.batch_complete', //完成按钮
        batchMenubox: '.batch_menu', //管理菜单
        batchComMenubox: '.ps_shop_menu', //被管理的菜单
        batchComMenuItembox: '.ps_shop_item', //被管理菜单的子集
        batchComMenuAddClass: 'z-goods-batch', //向被管理菜单盒子添加的class
        batchComMenuItemAddCliss: 'z-item-checked', //向被管理菜单盒子子集添加的class
        batchComMenuItemCheckbox: '.item_ps_check', //被管理菜单盒子子集批量管理遮罩
        batchCheckboxBtn: '.batch_checkbox_btn', //全选按钮
    });
})