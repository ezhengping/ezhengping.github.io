/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-12-12 11:52:33
 * @version $Id$
 */

// 加入购物车动画
function addCartAnimate(_this) {
    var src = $('.commodity_small_img img').eq(0).attr("src");
    var html = '<div class="cart_add_aim">'+
                                '<img src="'+src+'" alt="">'+
                            '</div>'
    $('.cart_add').html(html);
    var scrolTop = $(window).scrollTop();
    var EleHeight = $(_this).height();
    var EleWidth = $(_this).width() / 2;
    var top = $(_this).offset().top - scrolTop + EleHeight - 60;
    var left = $(_this).offset().left + EleWidth - 34;
    var tabTop = $('.toolbar-tabs').css('top');
    var tabLeft = $('.toolbar-tabs').offset().left + 'px';
    $('.cart_add_aim').show().css({
            'top': top + 'px',
            'left': left + 'px'
        }).delay(150)
        .animate({
            'top': tabTop,
            'left': tabLeft
        }, 300, function () {
            $('.cart_add_aim').hide()
        });
}


// 点击增加或者减少函数
function addOrCut(inputCls, addCls, cutCls) {
    var inputElm = $(inputCls);
    var addElm = $(addCls);
    var cutElm = $(cutCls);
    addNumBtn(addElm, inputCls);
    cutNumBtn(cutElm, inputCls);
    commodityNumChange(inputElm);
}
/**
 * 
 * 
 * @param {Ele} inputElm -传入记录数量的input元素  $(input);
 */
function commodityNumChange(inputElm) {
    inputElm.bind('input propertychange', function (event) {
        // 判断输入是否为数字
        isNaN($(this).val() == '0') ? $(this).val($(this).val().replace("1")) : null;
        isNaN($(this).val() == '') ? $(this).val($(this).val().replace("1")) : null;
        isNaN($(this).val()) ? $(this).val($(this).val().replace(/[^\d]/g, "")) : null;;
        if ($(this).val() == '') {
            $(this).val(1);
        } else if ($(this).val() == '0') {
            $(this).val(1);
        }
        itemPriceTotal()
        checkedPriceTotal()
    })
}
// 购物车增加数量
function addNum(inputElm) {
    var val = parseInt(inputElm.val());
    inputElm.val(val + 1);
}

// 购物车减少数量
function cutNum(inputElm) {
    var val = parseInt(inputElm.val());
    if (val <= 1) {
        return;
    }
    inputElm.val(val - 1);
}
// 购物车点击增加按钮
function addNumBtn(addElm, inputCls) {
    addElm.click(function (event) {
        addNum($(this).parent().parent().find(inputCls))
        itemPriceTotal()
        checkedPriceTotal()
    });
}

// 购物车点击减少按钮
function cutNumBtn(cutElm, inputCls) {
    cutElm.click(function (event) {
        cutNum($(this).parent().parent().find(inputCls))
        itemPriceTotal()
        checkedPriceTotal()
    });
}

// 全选
function inputAllCheckBox(inputChkBoxEle, _this) {
    if ($(_this).prop('checked')) {
        inputChkBoxEle.prop('checked', true);
    } else {
        inputChkBoxEle.prop('checked', false);
    }
}

// 全选按钮点击事件
function AllCheckBox_input() {
    $('.checkbox_all').click(function () {
        var _this = this
        inputAllCheckBox($('input[type=checkbox]'), _this)
        checkedPriceTotal()
    })
}


// 店铺按钮点击事件
function shopAllCheckbox() {
    $('.checkbox_shop_all').click(function () {
        var _this = this;
        // 获取子集选框
        var shopItemCheckbox = $(this).parents('.cart-item-list').find('input[type=checkbox]');
        inputAllCheckBox(shopItemCheckbox, _this);
        allCheckedOr()
        checkedPriceTotal()
    });
}



// 判断是否选中全选
function allCheckedOr() {
    var cartCheckBox = $('#cart-list').find('input.item_checkbox[type=checkbox]:checked')
    var cartBox = $('#cart-list').find('input.item_checkbox[type=checkbox]')
    if (cartCheckBox.length == cartBox.length) {
        $('.checkbox_all').prop('checked', true);
    } else {
        $('.checkbox_all').prop('checked', false);

    }
}


// 判断是否选中店铺，店铺下方如果有一个商品选中则店铺选框为选中状态
function shopAllCheckedOr(_this) {
    var checkBox = $(_this).parents('.cart-item-list').find('input.item_checkbox[type=checkbox]:checked')
    if (checkBox.length == 0) {
        $(_this).parents('.cart-item-list').find('input.checkbox_shop_all').prop('checked', false);
    } else {
        $(_this).parents('.cart-item-list').find('input.checkbox_shop_all').prop('checked', true);
    }
}




// 判断是否选中店铺或全选
function shopOrAllChecked() {
    $('input.item_checkbox[type=checkbox]').each(function () {
        $(this).click(function () {
            var _this = this
            shopAllCheckedOr(_this);
            allCheckedOr();
            checkedPriceTotal();
        })
    })

}

// 根据单价计算出每件商品的总价
function itemPriceTotal() {
    $('input.itxt').each(function () {
        $(this).parents('.item-list').find('.p-sum strong em').html(
            // 价格计算算出总价
            ($(this).val() * $(this).parents('.item-list').find('.p-price strong em').html()).toFixed(2)
        )
    })
}


// 计算商品总价
function checkedPriceTotal() {
    var qtyTotal = 0;
    var itemCount = 0;
    var priceTotal = 0;
    $('input.item_checkbox[type=checkbox]').each(function () {
        if ($(this).prop('checked') == true) {
            itemCount++; //累加商品数量
            qtyTotal += parseInt($(this).parents('.item-list').find('input.itxt').val())
            priceTotal += parseFloat($(this).parents('.item-list').find('.p-sum strong em').text());
        }
    })
    isNaN(qtyTotal) ? $('.amount-sum em').text(0) : $('.amount-sum em').text(qtyTotal)
    $('.sumPrice em').text('￥ ' + (priceTotal).toFixed(2))
}





//弹窗方法
/**
 * @param {string} String -弹窗说明文本
 * @param {function} fn -要执行的函数
 * @param {*} parameter -函数的参数
 */
function alertLayer(String, fn, parameter, buyerItemIds) {
    buyerItemIds = JSON.stringify(buyerItemIds);
    layer.open({
        title: '删除商品',
        content: String,
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shadeClose: true,
        yes: function (index, layero) {
            fn(parameter);
            layer.close(index);
            $.ajax({
                url: PATH + "/buyerCar/deleteBuyerItem.action",
                type: "POST",
                data: {
                    "json": buyerItemIds
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
            });
            productNull()
        },
        btn2: function () {}
    });

}

//删除当前商品函数  传递当前要删除的数组
function DelThisCommodity($this_Arr) {
    for (var i = 0, len = $this_Arr.length; i < len; i++) {
        // 获取要删除的子集
        var Elem = $this_Arr[i].parents('.cart-item-list').find('input.item_checkbox[type=checkbox]');
        var num = $this_Arr[i].parents('.cart-item-list').find('.item-list').length;
        if (num == 1) {
            $this_Arr[i].parents('.cart-item-list').remove();
        }
        $this_Arr[i].parents('.item-list').remove();
        shopAllCheckedOr(Elem);
    }
    checkedPriceTotal();
}


//点击删除
function DelCommodity() {
    // 单机删除购物项
    $('.opsDel').click(function () {
        var buyerItemIds = $(this).data("id");
        singleDelProductItem(this, buyerItemIds);
    })
    //批量删除购物车
    $('.remove-batch').click(function () {
        var than = [];
        var buyerItemIds = [];
        $('input.item_checkbox[type=checkbox]').each(function () {
            if ($(this).prop('checked') == true) {
                // Commodity_0_Del(_this);
                than.push($(this));
                buyerItemIds.push($(this).val());
            }
        })
        alertLayer("确定删除选中的商品吗", DelThisCommodity, than, buyerItemIds);
    })
    //单击移入收藏夹
    $(".add-follow").click(function () {
        var buyerItemIds = $(this).data("id");
        var productId = $(this).data("productId");
        singleTransform(this, buyerItemIds, productId)
        $.ajax({
            url: PATH + "/buyerCar/deleteBuyerItem.action",
            type: "POST",
            data: {
                "buyerItemIds": buyerItemIds,
                "productId": productId
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        });
    })
}
//删除一个购物项
function singleDelProductItem(_this, buyerItemIds) {
    var arr = [];
    arr.push(buyerItemIds);
    buyerItemIds = JSON.stringify(arr);
    layer.open({
        title: '删除商品',
        content: '确定删除该商品吗',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shadeClose: true,
        yes: function (index, layero) {
            layer.close(index);
            delProduct(_this);
            $.ajax({
                url: PATH + "/buyerCar/deleteBuyerItem.action",
                type: "POST",
                data: {
                    "json": buyerItemIds
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
            });

        }
    });
}
//单独移入收藏夹
function singleTransform(_this, buyerItemIds, productId) {
    layer.open({
        title: '移入收藏夹',
        content: '确定移入收藏夹吗',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shadeClose: true,
        yes: function (index, layero) {
            layer.close(index);
            delProduct(_this);
            $.ajax({
                url: PATH + "/buyerCar/deleteBuyerItem.action",
                type: "POST",
                data: {
                    "buyerItemIds": buyerItemIds,
                    "productId": productId
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
            });
        }
    });
}


//删除当前商品函数
function delProduct(_this) {
    var num = $(_this).parents('.cart-item-list').find('.item-list').length;
    if (num == 1) {
        $(_this).parents('.cart-item-list').remove();
    }
    $(_this).parents('.item-list').remove();
    checkedPriceTotal();
    productNull()
}

// 选择收获地址
function addressChecked(inde) {
    var html = '<div class="Checked_style">'+
                    '<i></i>'+
                '<span>寄送至</span>'+
                '</div>'
    $('.select_address input').eq(inde).prop('checked', 'true');
    if ($('.select_address input').eq(inde).prop('checked')) {
        $('.select_address input').eq(inde).parents('li').addClass('address_atv')
            .prepend(html)
            .siblings('li').removeClass('address_atv')
            .children('.Checked_style').remove();
    }
}





/*************************************************************************************************/


//添加购物车商品信息
function addProductInfomation(list) {
    if (list) {
        $.each(list, function (index, obj) {
            addStoreInfomation(obj, index);
        });
        //删除商品
        DelCommodity();
    } else {
        productNull()
    }

}


function productNull() {
    var Ele = document.querySelector('.item-item');
    if (!Ele) {
        var html = '<div class="item_null">'+
                        '<div class="item_text">'+
                            '<p>你的购物车还是空空的,快去挑选商品吧~~~</p>'+
                            '<a href="/index.html">去购物>></a>'+
                        '</div>'+
                    '</div>'
                    
        $('#cart-list').html(html);
    }
}
//添加店铺信息
function addStoreInfomation(store, index) {
    var op ='<div class="cart-item-list">'+
                '<div class="shop">'+
                    '<div class="cart-checkbox">'+
                        '<input type="checkbox" data-id='+store.storeId+'  name="checkShop" class="checkbox_shop_all">'+
                        '<label for="">勾选店铺内全部商品</label>'+
                    '</div>'+
                    '<span class="shop-txt">'+
                        '<a class="shop-name self-shop-name" href="javascript:;"><i style="background-image:url("'+store.storeLogo+'")"></i>'+store.storeName+'</a>'+
                    '</span>'+
                    '<div class="shop-extra-r shop-freight"></div>'+
                '</div>'+
            '</div>';
    $("#cart-list").append(op);
    addItemInfomation(store.buyerItems, index);
}
//添加购物项信息
function addItemInfomation(list, index2) {
    $.each(list, function (index, obj) {
        addProductInformation(obj, index2);
    });
    commodityNumChange($('input.itxt'))
    // 全选
    AllCheckBox_input();
    // 店铺全选
    shopAllCheckbox()
    // 判断全选或店铺全选
    shopOrAllChecked()
    // 计算单行商品价格
    itemPriceTotal();
    // 计算总价
    checkedPriceTotal();
}
//添加单个商品信息
function addProductInformation(product, index) {
    var op ='<div class="item-list" style="z-index: auto;">'+
'<div class="item-item clearfix">'+
    '<!-- 商品控件 -->'+
    '<div class="cell p-checkbox">'+
        '<div class="cart-checkbox">'+
            '<input type="checkbox" name="checkItem" value="'+product.id+'" class="item_checkbox">'+
            '<input type="hidden" name="productId" value="'+product.productId+'"/>'+
            '<label for="">勾选商品</label>'+
        '</div>'+
    '</div>'+
    '<!-- 商品信息 -->'+
    '<div class="cell p-goods">'+
        '<div class="goods-item">'+
            '<!-- 商品图片 -->'+
            '<div class="p-img">'+
                '<a href="javascript:vole(0)" target="_blank" class="J_zyyhq_687682">'+
                    '<img src="'+product.productImg+'">'+
                '</a>'+
            '</div>'+
            '<!-- 商品名称 -->'+
            '<div class="item-msg">'+
                '<div class="p-name">'+
                    '<a href="//item.jd.com/687682.html" target="_blank">'+product.name+'</a>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="cell p-props p-props-new">'+
        '<div class="props-txt">规格：<em>'+product.stander+'</em></div>'+
        '<!--  <div class="props-txt" title="1">尺码：1</div> -->'+
    '</div>'+
    '<div class="cell p-price">'+
        '<!-- 商品价格 -->'+
        '<strong>¥<em>'+product.price+'</em></strong>'+
    '</div>'+
    '<div class="cell p-quantity">'+
        '<!-- 数量加减控件 -->'+
        '<div class="quantity-form clearfix">'+
            '<a href="javascript:;" class="cut_itxt">-</a>'+
            '<input type="text" class="itxt" maxlength=4 value="'+product.amount+'">'+
            '<a href="javascript:;" class="add_itxt">+</a>'+
        '</div>'+
        '<div class="ac ftx-03 quantity-txt">有货</div>'+
    '</div>'+
    '<div class="cell p-sum">'+
        '<strong>¥<em></em></strong>'+
        '<br />'+
    '</div>'+
    '<div class="cell p-ops">'+
        '<a href="javascript:void(0);" class="opsDel" data-id="'+product.id+'">删除</a>'+
        '<a href="javascript:void(0);" class="add-follow" data-id="'+product.id+'" data-productId="'+product.productId+'">移入我的收藏</a>'+
    '</div>'+
'</div>'+
'</div>';
    $(".cart-item-list").eq(index).append(op);
}


//页面加载时查询购物车
function queryBuyerCar() {
    $.ajax({
        url: PATH + "/buyerCar/queryBuyerCar.action",
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {

            if (data.result == 7) {
                location.href = "/page/login/login.html";
                return;
            }
            // 添加地址
            addAddressInfomation(data.buyerAddress);

            // 添加购物车
            addProductInfomation(data.buyerCar.buyerStores);

            // 点击增加减少商品数量
            addOrCut('.itxt', '.add_itxt', '.cut_itxt');
        }
    });
}


//添加收货地址
function addAddressInfomation(list) {
    // 添加收货地址
    addAlladdress(list)

    AddressNull();

    // 删除收获地址  点击事件
    delAddressClick();
}

/**
 * 设置地址对象
 * 
 * @param {any} Status  - 默认地址状态  true  false;
 * 
 */
var addressStatus = {
    html: function (Status) {
        if (Status) {
            return '已是默认地址';
        } else {
            return '设置默认地址'
        }
    },
    class: function (Status) {
        if (Status) {
            return 'default_address';
        } else {
            return 'set_default_address';
        }
    }
};

function addAlladdress(data) {
    html = '';
    $.each(data, function (index, obj) {
        html += '<li class="">'+
                '<div class="Checked_style">'+
                    '<i></i>'+
                    '<span>寄送至</span>'+
                '</div>'+
                '<div class="address_main">'+
                    '<label for="'+obj.id+'">'+
                        '<input id="'+obj.id+'" type="radio" name="address">'+
                        '<span class="user_address">'+
                            '<span class="user_area">'+obj.province+'   '+obj.city+'   '+obj.area+'   '+obj.address+'</span>'+
                        '<span class="user_name">(<em>'+obj.name+'</em>)</span>'+
                        '<span class="user_phone">'+obj.phone+'</span>'+
                        '</span>'+
                    '</label>'+
                    '<div class="Del_address">'+
                        '<span>删除当前地址</span>'+
                    '</div>'+
                    '<div class="'+addressStatus.class(obj.isDefault)+'">'+
                        '<span>'+addressStatus.html(obj.isDefault)+'</span>'+
                    '</div>'+
                '</div>'+
            '</li>'
    })
    $(".select_address").html(html);
    var index = atvDefaultAddress()
    checkedAtv(index);
}

//获取默认选中状态的index;
function atvDefaultAddress() {
    var ind = 0
    $('.select_address li').each(function (index, obj) {
        if ($(obj).find('.default_address')[0]) {
            ind = index;
        }
    })
    return ind;
}
/**
 * 
 * 
 * @param {number} inde  - inde 索引值
 */
function checkedAtv(inde) {
    if (inde != undefined) {
        addressChecked(inde);
    } else {
        var indenomer = 0;
        addressChecked(indenomer);
    }
    var data = addressData();
    setLocalData(data,'address');
    $('.select_address input').change(function () {
        var inde = $('.select_address input').index($(this));
        addressChecked(inde);
        var data = addressData();
        setLocalData(data,'address');
    })
}

function addressData() {
    var id = $('.select_address input[name=address]:checked').attr('id');
    var userArea = $('.select_address input[name=address]:checked').siblings('span').find('.user_area').text();
    var userName = $('.select_address input[name=address]:checked').siblings('span').find('.user_name').find('em').text();
    var userPhone = $('.select_address input[name=address]:checked').siblings('span').find('.user_phone').text();
    var data = {};
    data['id'] = id;
    data['userArea'] = userArea;
    data['userName'] = userName;
    data['userPhone'] = userPhone;
    return data;
}

/******************************************************************************************************/


// 隐藏收获地址表单
function noneAddress() {
    $('.new_address').css('display', 'none');
}
// 显示表单
function blockAddress() {
    var html = '<iframe src="/address/address.html" name="address_iframe" scrolling="no" width="600" height="500" style="background-color: #fff;border:0"></iframe>'
    $('.iframe_box_item').html(html);
    $('.new_address').css('display', 'block');


}


// 添加收获地址填写表单
function addiframePop_ups() {
    $('.iframe_shut').click(function () {
        noneAddress();
    })
    $('.Addaddress').on('click', '.add_address', function (event) {
        blockAddress()
    })
}

/**
 * 删除收获地址
 * 
 * @param {any} id -传入的地址ID
 */
function ajaxDelAddress(id) {
    $.ajax({
        url: PATH + '/address/deleteAddress.action',
        type: 'POST',
        data: {
            'id': id
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if (data == 110) {
                return data;
            } else if (data == 111) {
                return data;
            }
        }
    })
}


// 鼠标悬停到收获地址时显示当前的地址栏删除按钮
function DelAddress(_this) {
    var paren = $(_this).parents('li');
    var id = paren.find('input').attr('id')
    var delInde = $('.select_address li').index(paren);
    var atvInde = $('.select_address li').index($('.address_atv'));
    var lenInde = $('.select_address li').length - 1;
    // console.log('选中的：'+atvInde,'最后一个：'+lenInde,'要删除的：'+delInde);
    layer.open({
        title: '删除商品',
        content: '你确定要删除该商品吗？',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shadeClose: true,
        yes: function (index, layero) {
            if (atvInde == lenInde) {
                atvInde -= 1;
            } else if (atvInde == delInde) {
                atvInde += 1;
            }
            // 调用删除地址请求
            if (ajaxDelAddress(id) == 111) {
                layer.close(index);
                layer.alert('删除失败');
                return;
            }
            addressChecked(atvInde);
            paren.remove();
            AddressNull()
            layer.close(index);
        },
        btn2: function () {
            // 按钮取消的回掉函数
        }
    })
}



// 获取所有收获地址
function ajaxAllAddaddress() {
    $.ajax({
            url: PATH + '/address/getAllAddress.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (data.length == 0) {
                AddressNull()
            } else {
                AddressNoNull()
            }
            // 添加地址数据
            addAlladdress(data);

            // 加载删除地址点击事件
            delAddressClick()
        })
}




//当收获地址等于0时
function AddressNull() {
    var html = '<div class="address_null">'+
                    '<span>你还没有收获地址，快去添加吧~~~</span>'+
                    '<a href="javascript:;" class="add_address" title="">添加收获地址</a>'+
                '</div>'
    var li = $('.select_address li');
    // console.log(li.length);
    if (li.length == 0) {
        $('.address_num').remove();
        $('.Addaddress').html(html);
    }
}

//收获地址等于空时
function AddressNoNull() {
    var html = '<div class="address_num">'+
                    '<ul class="select_address">'+
                    '</ul>'+
                    '<div class="add_address_btn">'+
                        '<a href="javascript:;" class="add_address" title="">添加新地址</a>'+
                    '</div>'+
                '</div>'
    $('.address_num').remove();
    $('.Addaddress').html(html);
}

// 删除收获地址
function delAddressClick() {
    $('.Del_address').on('click', 'span', function () {
        DelAddress(this);
        AddressNull();
    })
}

// 删除地址按钮被点击
function setDefaultAddressClick() {
    $('.Addaddress').on('click', '.set_default_address', function () {
        var ID = $(this).parents('li').find('input').attr('id');
        setDefaultAddress(ID);
    })
}

// 设置默认收获地址
function setDefaultAddress(id) {
    $.ajax({
            url: PATH + '/address/updateDefault.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                'id': id
            },
        })
        .done(function (data) {
            if (data == 110) {
                ajaxAllAddaddress()
            } else if (data == 111) {
                layer.alert('设置默认失败');
            }
        })
}


// 去结算提交订单
function orderData() {
    var data = [];
    var cartItem = $('.cart-item-list');
    $.each(cartItem, function (index, obj) {
        if ($(this).find('.checkbox_shop_all').prop('checked')) {
            var simpleProducts = [];
            var common = {};
            var storeId = $(this).find('.checkbox_shop_all').data('id');
            common['storeId'] = storeId;
            $.each($(this).find('.item-list'), function (index, obj) {
                if ($(this).find('.item_checkbox').prop('checked')) {
                    var commodity = {}
                    var id = $(this).find('.item_checkbox').siblings('input').val();
                    var quantity = $(this).find('input.itxt').val();
                    var price = $(this).find('.p-price').find('em').text();
                    commodity['productId'] = id;
                    commodity['quantity'] = quantity;
                    // commodity['productPrice'] = price;
                    simpleProducts.push(commodity);
                }
            })
            common['simpleProducts'] = simpleProducts;
            data.push(common);
        }
    })
    var dataString = JSON.stringify(data);
    setLocalData(dataString, 'productData');
    return data
}

// 保存本地数据
// function localStorageOrderData() {
//     var dataOrder = [];
//     var data = {};
//     var cartItem = $('.cart-item-list');
//     var commodityElm = $('.item-list');
//     // 获取地址信息
//     var address = $('.select_address input[name=address]:checked').attr('id');
//     var userArea = $('.select_address input[name=address]:checked').siblings('span').find('.user_area').text();
//     var userName = $('.select_address input[name=address]:checked').siblings('span').find('.user_name').find('em').text();
//     var userPhone = $('.select_address input[name=address]:checked').siblings('span').find('.user_phone').text();
//     var sumPrice = $('.sumPrice').text(); //获取总价格
//     $.each(cartItem, function (index, obj) {
//         if ($(this).find('.checkbox_shop_all').prop('checked')) {
//             var common = {}
//             var orderData = [];
//             var storeId = $(this).find('.checkbox_shop_all').data('id');
//             var storeName = $(this).find('.shop-txt').find('a').text();
//             var storeLogo = $(this).find('.shop-txt').find('i').css('background-image');
//             common['storeId'] = storeId;
//             common['storeName'] = storeName;
//             common['storeLogo'] = storeLogo;
//             $.each($(this).find('.item-list'), function (index, obj) {
//                 if ($(this).find('.item_checkbox').prop('checked')) {
//                     var commodity = {};
//                     var productId = $(this).find('input[name=productId]').val();
//                     var productImg = $(this).find('.p-img').find('img').attr('src');
//                     var productName = $(this).find('.item-msg').find('a').text();
//                     var productProps = $(this).find('.p-props').find('em').text();
//                     var productPrice = $(this).find('.p-price').find('em').text();
//                     var productNumber = $(this).find('.p-quantity').find('input.itxt').val();
//                     var productSum = $(this).find('.p-sum').find('em').text();
//                     commodity['productId'] = productId;
//                     commodity['productImg'] = productImg;
//                     commodity['productName'] = productName;
//                     commodity['productProps'] = productProps;
//                     commodity['productPrice'] = productPrice;
//                     commodity['productNumber'] = productNumber;
//                     commodity['productSum'] = productSum;
//                     orderData.push(commodity);
//                 }
//             })
//             common['orderData'] = orderData;
//             dataOrder.push(common);
//         }
//     })
//     data['address'] = address;
//     data['userArea'] = userArea;
//     data['userName'] = userName;
//     data['userPhone'] = userPhone;
//     data['sumPrice'] = sumPrice;
//     data['dataOrder'] = dataOrder;
//     var dataString = JSON.stringify(data);
//     if (window.localStorage) {
//         localStorage.setItem('orderData', dataString);
//     } else {
//         layer.alert('你的浏览器版本过低建议更换为chrome浏览器')
//     }
// }


function shoppingInformation(data) {
    $.ajax({
            url: PATH + '/storage/submitOrderInformation.action',
            type: 'POST',
            data: {
                'param': data
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            window.location.href = '/page/cart/settlement.html'
        })

}

// 结算按钮被点击
function btnAreaClick() {
    $('.btn-area a').click(function () {
        var data = orderData();
        var address = $('.address_num li input:checked')[0];
        if (data.length !== 0 && address) {
            orderData();
            var dataString = JSON.stringify(data);
            shoppingInformation(dataString)
        } else {
            if (data.length == 0) {
                layer.alert('你还没有选择商品呢');
            } else if (!address) {
                layer.alert('你还没有收货地址');
            }
        }

    })
}




// function orderAjax(orderData, addressId) {
//     $.ajax({
//             url: PATH + '/order/addOrder.action',
//             type: 'POST',
//             xhrFields: {
//                 withCredentials: true
//             },
//             crossDomain: true,
//             data: {
//                 'common': orderData,
//                 'addressId':addressId,
//                 'totalBean':0,
//                 'paymentWay':0,
//             },
//         })
//         .done(function (data) {
//             console.log(data);
//         })
// }