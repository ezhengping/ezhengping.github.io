// 获取页面数据
// function getOrderData() {
//     if (localStorage.getItem('orderData') !== '') {
//         return JSON.parse(localStorage.getItem('orderData'));
//     } else {
//         // 你的购物车为空
//         return null;
//     }
// }




// 渲染商品数据
function commodityDataAdd(data) {
    var html = '';
    var parentHtml = '';
    $.each(data, function (index, obj) {
        var childrenHtml = ''
        // 计算价格
        var commodityTotalPrice = 0
        $.each(obj.simpleProducts, function (index, obj) {
            childrenHtml +='<tr data-id="'+obj.productId+'">'+
                                '<td class="commodity-img">'+
                                    '<div>'+
                                        '<a href="javascript:;">'+
                                            '<img src="'+obj.productImage+'" alt="">'+
                                        '</a>'+
                                    '</div>'+
                                '</td>'+
                                '<td class="commodity-text">'+
                                    '<div>'+
                                        '<a href="javascript:;">'+
                                            '<p>'+
                                                obj.productName+
                                            '</p>'+
                                            '<span>'+
                                                '支持7天无理由退货'+
                                            '</span>'+
                                        '</a>'+
                                    '</div>'+
                                '</td>'+
                                '<td class="commodity-price">'+
                                    '<div>'+
                                        '<p>￥'+obj.productPrice+'</p>'+
                                    '</div>'+
                                '</td>'+
                                '<td class="commodity-number">'+
                                    '<div>'+
                                        '<p>x'+
                                            '<em>'+obj.quantity+'</em>'+
                                        '</p>'+
                                    '</div>'+
                                '</td>'+
                                '<td class="commodity-totalPrice">'+
                                    '<div>'+
                                        '<p>￥'+
                                            '<em>'+obj.subtotal+'</em>'+
                                        '</p>'+
                                    '</div>'+
                                '</td>'+
                            '</tr>'
            commodityTotalPrice = commodityTotalPrice + parseFloat(obj.subtotal);
        })
        // 加载店铺
        var tableHtml = '<table>'+
                            '<tbody>'+
                                '<tr class="shop" data-id="'+obj.storeId+'">'+
                                    '<th>'+
                                        '<span>店铺：'+
                                            '<em>'+obj.storeName+'</em>'+
                                        '</span>'+
                                    '</th>'+
                                    '<th>商品属性</th>'+
                                    '<th>单价</th>'+
                                    '<th>数量</th>'+
                                    '<th>小计</th>'+
                                '</tr>'+
                                childrenHtml+
                            '</tbody>'+
                        '</table>'
        parentHtml = '<div class="order-main-item">'+tableHtml+
                        '<div class="store-summary">'+
                            '<div>'+
                                '<p>配送方式：<em>普通配送</em><span>快递<em>免邮</em></span></p>'+
                                '<p class="price-text">店铺合计(含运费)<em>￥<i>'+commodityTotalPrice.toFixed(2)+'</i></em></p>    '+
                            '</div>'+
                        '</div>'+
                    '</div>'
        html += parentHtml;
    })
    $('.order-mid').html(html)
}

// 味豆
function taoWeiTotalBean() {
    $.ajax({
            url: PATH + '/order/getTasteBean.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data < 1000) {
                mintaoWeiBeanAddData(data)
            } else {
                maxtaoWeiBeanAddData(data)
            }
        })

}

// 加载味豆选框
function maxtaoWeiBeanAddData(data) {
    var html =
        '<span>可用的味豆优惠：</span>' +
        '<select class="weidou-form">' +
        '<option value="0">==不选择味豆优惠==</option>' +
        '</select>'
    $('.discount-weidou').html(html);
    // 加载味豆选择项
    function WeiTotalBeanAddData(data) {
        var price = $('.submit-price i').text();
        var discountPrice = Math.floor(parseFloat(price) / 2 / 10);

        var TotalLen = Math.floor(data / 1000);
        if (discountPrice == 0) {
            var TotalHtml = '<span>只有当价格超过20元时才能享受味豆优惠哟，赶紧去补单优惠吧~~~</span>'
            $('.discount-weidou').html(TotalHtml);
            return;
        }
        if (TotalLen > discountPrice) {
            var TotalHtml = '';
            for (var i = 1; i <= discountPrice; i++) {
                TotalHtml += '<option value=' + i * 1000 + '>' + i * 1000 + '</option>'
            }
        } else {
            var TotalHtml = '';
            for (var i = 1; i <= TotalLen; i++) {
                TotalHtml += '<option value=' + i * 1000 + '>' + i * 1000 + '</option>'
            }
        }
        $('.weidou-form').append(TotalHtml);

        // 设置隐藏字段
        $.each($('.weidou-form option'), function (index, obj) {
            var val = $(obj).val();
            $(obj).data('B', val);
        })

    }
    WeiTotalBeanAddData(data)
    // 加载味豆信息
    discountChange()
}

// 当味豆不够的时候加载这一句
function mintaoWeiBeanAddData(data) {
    var html = '<span>亲,你的味豆只有' + data + '个不够优惠的数量哟~~~</span>'
    $('.discount-weidou').html(html);
}

// 折扣
function discount() {
    var Ele = document.querySelector('.weidou-form');
    var discountEle = document.querySelector('.submit-discount i');
    if (Ele) {
        discountEle.innerHTML = Ele.value / 100;
        submitPrice()
    } else {
        return;
    }
}

// 折扣计算
function discountChange() {
    discount()
    var index;
    if ($('.weidou-form')[0]) {
        index = $('.weidou-form').get(0).selectedIndex;
    }
    setLocalData(0, 'p_index')
    $('.weidou-form').change(function () {
        if ($('.weidou-form')[0]) {
            index = $('.weidou-form').get(0).selectedIndex
        }
        setLocalData(index, 'p_index')
        discount();
    })

}

// 计算商品总价
function submitPrice() {
    var priceEle = $('.price-text i');
    var discount = parseFloat($('.submit-discount i').text()).toFixed(2);
    var totalPrice = 0;
    $.each(priceEle, function (index, obj) {
        var a = Number(parseFloat($(this).text()).toFixed(2));
        totalPrice += a;
    })
    totalPrice = (totalPrice - discount).toFixed(2);
    $('.submit-price em i').text(totalPrice);
}

// 选择付款方式
function paymentWay() {
    $('.settlement-method input').change(function () {
        $(this).parent('label').css({
            'border-width': '3px',
            'border-color': '#ff7f26',
            'box-shadow': '0 0 5px rgba(255,127,0,.6)'
        }).siblings('label').css({
            'border-width': '1px',
            'border-color': '#b5b5b5',
            'box-shadow': 'none'
        });
    })
}

// 添加地址信息
function addressDataAdd() {
    var data = JSON.parse(getLocalData('address'));
    if (data.id !== undefined) {
        var html = '<p class="submit-address" data-id='+data.id+'>寄送至<em>'+data.userArea+'</em><span>收货人：<em>'+data.userName+'</em></span><span>'+data.userPhone+'</span></p>';
        $('.submit-address').replaceWith(html);
    }
}
// 提交订单点击
function submitOrder() {
    $('.submit-btn').click(function () {
        var addressId = $('.submit-address').data('id');
        var orderData = getLocalData('orderData-submit');
        var paymentWay = $('.settlement-method input:checked')[0];
        var totalBean = Number(getLocalData('p_index')) * 1000;
        if (paymentWay && addressId) {
            paymentWay = paymentWay.value;
            orderAjax(orderData, addressId, totalBean, paymentWay)
        } else {
            if (!paymentWay) {
                layer.alert('请选择一种付款方式');
            }
            if (!addressId) {
                layer.alert('请添加收货地址');
            }
        }
    })
}




// 提交订单ajax
function orderAjax(orderData, addressId, totalBean, paymentWay) {
    var newWin = window.open('');
    $.ajax({
            url: PATH + '/order/addOrder.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                'common': orderData,
                'addressId': addressId,
                'totalBean': totalBean,
                'paymentWay': paymentWay,
            },
        })
        .done(function (data) {
            if (data.result == 110) {
                layerAlert(carryOut);
                switch (paymentWay) {
                    case '0':
                        var carry = carryOut(data.orderIds,newWin);
                        layerAlert(carry,newWin);
                        newWin.location.href = PATH + "/order/getPaymenInfo.action?orderIds=" + data.orderIds + '&paymentWay=0'
                        break;
                    case '1':
                        var carry = carryOut(data.orderIds,newWin);
                        layerAlert(carry,newWin);
                        newWin.location.href =url+"/page/cart/weChatPay.html?orderIds="+data.orderIds+'&paymentWay=1';
                        break;
                    case '2':
                        newWin.close()
                        break;
                    case '3':
                        newWin.location.href = url+'/page/cart/publicPay.html?orderIds='+data.orderIds+'&paymentWay=3';
                        break;
                    default:
                        newWin.close()
                        layer.alert('付款参数异常');
                }
            } else if (data.result == 111) {
                newWin.close()
                layer.alert('订单参数异常，请刷新后重试');
            } else if (data.result == 114) {
                newWin.close()
                layer.alert('订单参数异常，请刷新后重试');
            }
        })
}

// 已经完成支付窗口
function layerAlert(callback,newWin) {
    layer.open({
        title: '温馨提示',
        content: '请确认是否完成支付，如果完成支付点击下方完成支付按钮',
        btn: '已经完成支付',
        yes: function (index, layero) {
            callback(index);
        },
        cancel:function(){
            newWin.close();
            location.href = '/page/personal/personalOrder.html';
        }
    });
}
// 验证是否成功
function carryOut(orderIds,col) {
    if (typeof(orderIds) != "string") {
      var orderIds = JSON.stringify(orderIds);
    }
    var ajaxCarry = function(index){
        $.ajax({
            url: PATH+'/order/selectPaymentState.action',
            type: 'POST',
            data:{'orderIds':orderIds},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (data==110) {
                layer.close(index);
                localStorage.removeItem('orderData-submit')
                localStorage.removeItem('productData');
                localStorage.removeItem('orderID');
                location.href = '/page/personal/personalOrder.html';
                col.close();
            }else if(data == 111){
                layer.open({
                    title: '温馨提示',
                    content: '支付失败，请确认是否支付，或前往个人中心订单详情页面支付',
                    btn: '继续支付',
                    yes: function (index, layero) {
                        var carry = carryOut(orderIds,col);
                        layerAlert(carry,col);
                    },
                    cancel:function(){
                        col.close();
                        location.href = '/page/personal/personalOrder.html';
                    }
                });
                
            }else if(data == 114){
                layer.open({
                    title: '温馨提示',
                    content: '参数错误，请前往个人中心订单详情页面支付',
                    btn: '确定',
                    yes: function (index, layero) {
                        col.close();
                        location.href = '/page/personal/personalOrder.html';
                    },
                    cancel:function(){
                        col.close();
                        location.href = '/page/personal/personalOrder.html';
                    }
                });

            }
        })
    }
    return ajaxCarry
}


// 获取数据
function getData() {
    $.ajax({
            url: PATH + '/order/getSubmitOrderInfomation.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            orderDataRendering(data)
            buyNowData(data)
        })
}

// 数据渲染
function orderDataRendering(data) {
    // var data = getOrderData();
    commodityDataAdd(data);
    // 计算总价格
    submitPrice();
    // 计算味豆
    taoWeiTotalBean()
}


// 数据存储
function buyNowData(data) {
    setLocalData(data, 'orderData-submit');
    var objData = JSON.parse(getLocalData('orderData-submit'));
    var buyData = []
    var key = 'orderProducts';
    var z_key = 'amount';
    $.each(objData, function (index, obj) {
        obj[key] = obj.simpleProducts;
        delete obj.storeName;
        delete obj.simpleProducts;
        $.each(obj.orderProducts, function (index, obj_z) {
            obj_z[z_key] = obj_z.quantity;
            delete obj_z.quantity;
            delete obj_z.productImage;
            delete obj_z.productName;
            delete obj_z.productPrice;
            delete obj_z.subtotal;
        })
    })
    setLocalData(objData, 'orderData-submit');
}

$(function () {
    // 计算商品总价
    submitPrice();
    // 选择支付方式
    paymentWay()
    // 提交订单
    submitOrder();
    // 获取数据
    getData();
    // 加载地址
    addressDataAdd()
})