// 加载订单数量
function orderStateData(data) {
    var maxHtml = ''
    $.each(data.common, function (index, obj) {
        var orderItemHtml = '';
        var objStore = obj;
        $.each(obj.orderItems, function (index, obj) {
            orderItemHtml +=
                '<div class="P_Information clearfix" data-addressId="' + objStore.addressId +
                '" data-id="' + obj.productId + '">' +
                '<div class="PI_img">' +
                '<a href="/page/product/productDetails.html?productId=' + obj.productId +
                '&storeId=' + objStore.buyerStore.storeId + '">' +
                '<img src="' + obj.imageUrl + '" alt="">' +
                '</a>' +
                '</div>' +
                '<div class="PI_info">' +
                '<a href="/page/product/productDetails.html?productId=' + obj.productId +
                '&storeId=' + objStore.buyerStore.storeId + '">' +
                '<p>' +
                obj.productName +
                '</p>' +
                '</a>' +
                '<span style="margin-top: 44px;color:#999;display: block;">规格：'+obj.productStander+'</span>'+
                '</div>' +
                '<div class="PI_number">' +
                '<span>x' +
                '<em>' + obj.productAmount + '</em>' +
                '</span>' +
                '</div>' +
                '</div>'
        })
        maxHtml +=
            '<div class="order_details_item clearfix">' +
            '<div class="od_title">' +
            '<time>' + orderTimeData(obj.id) + '</time>' +
            '<span>订单编号：' +
            '<em>' + obj.id + '</em>' +
            '</span>' +
            // '<a href="javascript:;" class="Del_order_item" style="background-image:url(/images/Del_icon_L.png)"></a>' +
            '</div>' +
            '<div class="od_item clearfix">' +
            orderItemHtml +
            '</div>' +
            '<div class="od_billing">' +
            '<div class="PI_price">' +
            '<div>总额：' +
            '<span>' +
            '￥' +
            '<em>' + obj.reallyPrice + '</em>' +
            '</span>' +
            '</div>' +
            '<div class="pay_method">' +
            paymentWayCalculate(obj.paymentWay) +
            '</div>' +
            '</div>' +
            '<div class="PI_transaction" data-id="' + obj.id + '">' +
            '<div>' +
            logisticsShow(obj.orderState,obj.paymentState, obj.id)+
            '</div>'+
            '<div>'+
            '<a href="/page/cart/orderDetails.html?orderId='+obj.id+'">查看订单信息</a>'+
            '</div>' +
            '</div>' +
            '<div class="PI_control">' +
            '<!-- <a class="PI_or_btn" href="javascript:;">再次购买</a> -->' +
            orderOrPayTypeState(obj.orderState,obj.paymentState, obj.id) +
            '</div>' +
            '</div>' +
            '</div>'
    })
    $('.order_details').html(maxHtml);
}
// 判断是否显示物流信息
function logisticsShow(orderType,payType,id){
    var html = '<a href="/page/cart/orderLogistics.html?orderId='+id+'">查看物流信息</a>'
    if (payType>=2&&orderType>1) {
        return html;
    }else{
        return '';
    }
    
}

// 递归函数 循环添加订单物流信息
function dataLogistics(inex,len) {
    if (inex < len) {
        var orderId = $('.PI_transaction').eq(inex).data('id');
        ajaxLogisticsId(orderId, function (data) {
            if (typeof data == 'string') {
                var dataObj = JSON.parse(data);
            }
            dataLogisticsInformation(dataObj,inex,len);
        })
    }
}

function dataLogisticsInformation(data,inex,len){
    var html = '';
    $.each(data.data,function(index,obj){
        html+=
            '<div style="font-size: 12px;">'+
                '<time>'+obj.ftime+'</time>'+
                '<p>'+obj.context+'</p>'+
            '</div>'
    })
    $('.PI_transaction').eq(inex).html(html);
    inex = inex+1;
    dataLogistics(inex, len);
}


// 订单为空的时候
function orderNull() {
    var html =
        '<div class="order_null">' +
        '<p>' +
        '暂无订单数据~~~' +
        '</p>' +
        '</div>'
    $('.order_details').html(html);
}
// 查询订单情况
function orderState(inde, pageNo) {
    var pageLen;
    ajaxSelectByOrderState({
        'orderStates': inde,
        'pageNo': pageNo,
        'pageSize': 3,
    }, function (data) {
        if (data) {
            pageLen = data.totalPage;
            if (data.result == 7) {
                location.href = '/page/login/login.html';
            } else {
                $('#page_od').data('pageNo', pageNo);
                pageOd(inde, pageNo, pageLen);
                if (data.common.length) {
                    orderStateData(data);
                } else {
                    orderNull();
                }
            }
        } else {
            pageOd(inde, pageNo, 0);
            orderNull();
        }
    });
}

function pageOd(inde, pageNo, pageLen) {
    $("#page_od").pagination({
        currentPage: pageNo, //初始页
        totalPage: pageLen, //末尾页
        isShow: true, //是否显示首页和尾页按钮
        count: 7, //显示多少页
        homePageText: "<<",
        endPageText: ">>",
        prevPageText: "<",
        nextPageText: ">",
        callback: function (pageNo) {
            ajaxSelectByOrderState({
                'orderStates': inde,
                'pageNo': pageNo,
                'pageSize': 3,
            }, function (data) {
                $('#page_od').data('pageNo', pageNo);
                orderStateData(data);
                location.hash = "#main_href";
            });
        }

    });
}
//  默认选中
function judgeOrderAtv() {
    var inde = Number(getParam('inde'));
    if (inde) {
        $('.po_title_item').eq(inde - 1).addClass('po_title_atv').siblings().removeClass('po_title_atv');
        orderState(inde, 1);
    } else {
        inde = 1;
        $('.po_title_item').eq(inde - 1).addClass('po_title_atv').siblings().removeClass('po_title_atv');
        orderState(inde, 1);
    }
    $('.po_title_item').click(function () {
        $(this).addClass('po_title_atv').siblings().removeClass('po_title_atv');
        var inde = $('.po_title_item').index($(this)) + 1;
        orderState(inde, 1);
    })

}

//  取消订单函数
function cancelOrderClick() {
    $('.personal_order').on('click', '.cancelOrder', function () {
        var that = this;
        alertFn({
            content: '你确定要取消该订单吗？',
            btn1fn: function () {
                var data = {};
                data['orderId'] = $(that).data('orderid');
                ajaxCancelOrder(data, function (data) {
                    if (data == 115) {
                        layer.alert('参数异常，请刷新后重试！');
                    } else if (data == 111) {
                        layer.alert('取消失败！');
                    } else if (data == 110) {
                        var inde = $('.po_title_item').index($('.po_title_atv')) + 1
                        var pageNo = $('#page_od').data('pageNo');
                        if ($('.order_details_item').length == 1) {
                            pageNo = pageNo - 1;
                        }
                        if (pageNo == 0) {
                            pageNo = 1;
                        }
                        orderState(inde, pageNo);
                        ajaxGetOrderStateCount(function (data) {
                            orderStateCount(data);
                        })
                    }
                })
            },
            btn2fn: function () {
                return;
            }
        })

    })
}




$(function () {
    ajaxGetOrderStateCount(function (data) {
        orderStateCount(data);
    })


    judgeOrderAtv();

    // 付款状态按钮被点击
    ajaxOrderPay()

    //  取消订单
    cancelOrderClick()
})