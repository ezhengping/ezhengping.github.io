// 请求加载数据
function ajaxOrderDetails(){
    $.ajax({
        url: PATH + '/order/getOrderDetails.action',
        type: 'POST',
        data: {
            orderId: getParam('orderId')
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    })
    .done(function (data) {
        // 加载地址
        addressDataAdd(data.itemInfoList[0])
        // 加载订单信息
        commodityDataAdd(data.itemInfoList[1]);
        // 加载支付方式
        payWay(data.itemInfoList[1].paymentWay)
    })
}

// 添加地址信息
function addressDataAdd(data) {
    var html = '<p class="submit-address" data-id=' + data.id + '>寄送至<em>' + data.province + '  ' + data.city +
        '  ' + data.area + '</em><span>收货人：<em>' + data.name + '</em></span><span>' + data.phone +
        '</span></p>';
    $('.submit-address').replaceWith(html);
}

// 渲染商品数据
function commodityDataAdd(data) {
    var html = '';
    var parentHtml = '';
    var childrenHtml = ''
    // 计算价格
    var commodityTotalPrice = 0;
    $.each(data.orderItems, function (index, obj) {
        childrenHtml +=
                        '<tr data-id="'+obj.productId+'">'+
                        '<td class="commodity-img">'+
                            '<div>'+
                                '<a href="/page/product/productDetails.html?productId='+obj.productId+'&storeId='+data.storeId+'">'+
                                    '<img src="'+obj.imageUrl+'" alt="">'+
                                '</a>'+
                            '</div>'+
                        '</td>'+
                        '<td class="commodity-text">'+
                            '<div>'+
                                '<a href="/page/product/productDetails.html?productId='+obj.productId+'&storeId='+data.storeId+'">'+
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
                                    '<em>'+obj.productAmount+'</em>'+
                                '</p>'+
                            '</div>'+
                        '</td>'+
                        '<td class="commodity-totalPrice">'+
                            '<div>'+
                                '<p>￥'+
                                    '<em>'+(obj.productPrice*obj.productAmount).toFixed(2)+'</em>'+
                                '</p>'+
                            '</div>'+
                        '</td>'+
                    '</tr>'
        commodityTotalPrice = commodityTotalPrice + parseFloat((obj.productPrice * obj.productAmount).toFixed(
            2));
    })
    // 加载店铺
    var tableHtml =
        '<table>'+
                    '<tbody>'+
                        '<tr class="shop" data-id="'+data.storeId+'">'+
                            '<th>'+
                                '<span>商品：'+
                                    '<em>图片</em>'+
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
    parentHtml =
            '<div class="order-main-item">'+tableHtml+
                '<div class="store-summary">'+
                    '<div>'+
                        '<p>配送方式：<em>普通配送</em><span>快递<em>免邮</em></span></p>'+
                        '<p class="price-text">店铺合计(含运费)<em>￥<i>'+commodityTotalPrice.toFixed(2)+'</i></em></p>'+
                    '</div>'+
                '</div>'+
            '</div>'
    html += parentHtml;
    $('.order-mid').html(html)
    $('.discount-weidou em').html(data.tasteBean);
    $('.submit-price i').text((data.totalPrice-data.tasteBean/100).toFixed(2));
    $('.submit-discount i').text(data.tasteBean/100);
}

function payWay(data){
    var html = '';
    switch(data){
        case 0:
        html = 
            '<label for="0" style="background-image:url(/images/payment/Alipay.png)">'+
                '<input id="0" type="radio" value=0 name="paymentWay" />'+
            '</label>'
        break;
        case 1:
        html = 
            '<label for="1" style="background-image:url(/images/payment/WeChatPayment.png)">'+
                '<input id="1" type="radio" value=1 name="paymentWay" />'+
            '</label>'
        break;
        case 2:
        html = 
            '<label for="2" style="background-image:url(/images/payment/UnionPay.png)">'+
                '<input id="2" type="radio" value=2 name="paymentWay" />'+
            '</label>'
        break;
        case 3:
        html = 
            '<label for="3" style="background-image:url(/images/payment/PublicAccounts.png)">'+
                '<input id="3" type="radio" value=3 name="paymentWay" />'+
            '</label>'
        break;
    }
    $('.settlement-method').html(html);
}



$(function(){
    // 加载商品数据
    ajaxOrderDetails();
})