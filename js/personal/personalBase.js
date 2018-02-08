/**
 * 用户味豆和名称请求  
 * callback -- 请求回调函数
 * 
 * @param {any} callback 
 */
function ajaxUsernameAndBean(callback,type) {
    if (type != false) {
        var type = true;
    }
    $.ajax({
            url: PATH + '/user2/selectUsernameAndBean.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7&&type==true) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data)
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
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data)
            } else {
                return;
            }
        })
}

/**
 * 判断是否可以签到
 * callback -- 回调函数
 * @param {any} callback 
 */
function ajaxIsSign(callback) {
    $.ajax({
            url: PATH + '/user2/isSign.action',
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
            if (callback) {
                callback(data);
            } else {
                return;
            }
        })
}


/**
 * 签到
 * callback -- 回调函数
 * @param {any} callback 
 */
function ajaxSign(callback) {
    $.ajax({
            url: PATH + '/user2/sign.action',
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
            if (callback) {
                callback(data);
            } else {
                return;
            }
        })
}

// 查询订单状态和数量
function ajaxGetOrderStateCount(callback) {
    $.ajax({
            url: PATH + '/order/getOrderStateCount.action',
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
            if (callback) {
                callback(data);
            } else {
                return;
            }
        })
}


/**
 * 根据订单状态查询订单  
 * 
 * obj：对象  
 * data -- 传递参数  
 * 
 * callback -- 回调函数
 * @param {any} obj 
 */
function ajaxSelectByOrderState(obj, callback) {
    $.ajax({
            url: PATH + '/order/selectByOrderState.action',
            type: 'POST',
            data: obj || null,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data)
            }
            return;
        })

}


/**
 * 获取味豆使用详情
 * 
 * obj - 传递的参数 
 * pageNo:页数
 * callback - 回调函数
 * @param {any} obj 
 * @param {any} callback 
 */
function ajaxBeansDetails(obj, callback) {
    $.ajax({
            url: PATH + '/user2/getBeanLogger.action',
            type: 'POST',
            data: obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })

}
/**
 * 五、查询收藏的商品  
 * 参数说明：  
 * obj: -- 对象
 * pageNo:页数（int）
 * pageSize:每页显示条数（int）
 * 
 * callback: -- 请求回掉函数
 * 
 * @param {any} obj 
 * @param {any} callback 
 */
function ajaxGoodsCollection(obj, callback) {
    $.ajax({
            url: PATH + '/user2/queryCollectProduct.action',
            type: 'POST',
            data: obj || {
                'pageNo': 1,
                'pageSize': 8
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })

}

/**
 * 取消收藏商品
 * obj - 请求发送数据对象  
 * productIds： - 取消收藏的商品ID  
 * 
 * callback - 请求回调函数
 * 
 * @param {any} obj 
 * @param {any} callback 
 */
function ajaxDelCollection(obj, callback) {
    $.ajax({
            url: PATH + '/user2/cancleCollectionProducts.action',
            type: 'POST',
            data: obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })

}
// 加载等级图片用户图片
function ajaxUserLeverImg() {
    $.ajax({
            url: PATH + '/user/selectGradeImage.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            userLeverImgData(data)
        })

}

// 获取订单详情页面
function getOrderData(orderId) {
    $.ajax({
            url: PATH + '/order/getOrderDetails.action',
            type: 'POST',
            data: {
                orderId: orderId
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            var orderD = transformationData(data.itemInfoList[1]);
            sendOutorderData(orderD)
        })
}


// 购买数据
function sendOutorderData(orderdata) {
    $.ajax({
            url: PATH + '/storage/submitOrderInformation.action',
            type: 'POST',
            data: {
                'param': orderdata
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

// 加载收藏店铺
function ajaxGoodsShop(obj, callback) {
    $.ajax({
            url: PATH + '/user2/selectCollectStore.action',
            type: 'POST',
            data: obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })
}

// 请求搜索接口搜索商品数据
function ajaxShopProduct(obj, callback) {
    $.ajax({
            url: PATH + '/product/queryProduct.action',
            type: 'GET',
            data: obj,
            // xhrFields: {
            //     withCredentials: true
            // },
            // crossDomain: true,
        })
        .done(function (data) {
            callback(data);
        })

}
/**
 * 取消收藏店铺
 * 
 * 
 * @param {any} obj 
 * @param {any} callback 
 */
function ajaxDelShop(obj, callback) {
    $.ajax({
            url: PATH + '/user2/cancleCollectStores.action',
            type: 'POST',
            data: obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })

}


// 加载订单状态点击事件
function ajaxOrderPay() {
    $('.order_details,.m_userOrder').on('click', '.order_pay_btn', function () {
        var Type = $(this).data('type');
        var orderIds = '';
        orderIds = $(this).data('orderid') || $(this).parents('.uesrOrde_details_item').data('id');
        switch (Type) {
            case 0:
                //去付款 
                fnLayerArter(orderIds);
                return;
            case 1:
                // 确认收获
                fnLayerConfirmHarvest(orderIds);
                return;
            case 2:
                // 再次购买
                getOrderData(orderIds);
                return;
            case 3:
                // 去评价
                return;
            case 4:
                // 退款
                fnLayerCancelOrder(orderIds);
                return;
        }
    })
}

// 确认收获
function ajaxConfirmHarvest(orderId, callback) {
    $.ajax({
            url: PATH + '/order/confirmReceipt.action',
            type: 'POST',
            data: {
                'orderState': 1,
                'orderId': orderId
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })
}
// 申请退款
function ajaxApplyRefund(orderId, callback) {
    $.ajax({
            url: PATH + '/order/confirmReceipt.action',
            type: 'POST',
            data: {
                'orderState': 2,
                'orderId': orderId
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })
}

// 取消订单
function ajaxCancelOrder(obj, callback) {
    $.ajax({
            url: PATH + '/order/cancleOrder.action',
            type: 'POST',
            data: obj,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })

}

// 获取订单快递单号
function ajaxLogisticsId(orderId, callback) {
    $.ajax({
            url: PATH + '/order/getLogisticsInfomation.action',
            type: 'POST',
            data: {
                'orderId': orderId
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })
}


/**
 * _this--上传input元素  
 * callback--回掉  
 * 
 * @param {any} _this 
 * @param {any} callback 
 */
function upload(_this, callback) {
    var reg = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
    var file = _this.files[0];
    var formData = new FormData();
    if (typeof (FileReader) != 'undefined') {
        if (reg.test(file.name.toLowerCase())) {
            formData.append("picture", file);
            $.ajax({
                    url: PATH + '/upload/upload.action',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    contentType: false, // 告诉jQuery不要去设置Content-Type请求头  
                    processData: false, // 告诉jQuery不要去处理发送的数据
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                })
                .done(function (data) {
                    if (callback) {
                        callback(data);
                    }
                })
        } else {
            layer.alert('您上传的不是图片格式的文件');
        }
    } else {
        layer.alert('你的浏览器不支持查看缩略图，建议更换chrome浏览器');
    }

}

// 删除上传图片
function delUpImg(url, callback) {
    $.ajax({
            url: PATH + '/upload/delete.action',
            type: 'POST',
            data: {
                'URL': url
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })
}

/**
 * 提交评论请求  
 * 参数说明：  
 * orderId:商品id  
 * storeObj: 店铺评价json详情见文档  
 * goodsObj: 商品评价json详情见文档
 * 
 * @param {number} orderId 
 * @param {string} storeObj 
 * @param {string} goodsObj 
 * @param {function} callback 
 */
function ajaxSettlementComment(obj,callback) {
    $.ajax({
            url: PATH+'/evaluate/addEvaluate.action',
            type: 'POST',
            data: {
                'orderId': obj.orderId,
                'storeJson':obj.storeObj,
                'objectJson':obj.goodsObj
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (callback) {
                callback(data);
            } else {
                console.log('没有请求回掉函数')
            }
        })
        
}

// 查询订单出现
// function ajaxLogisticsInformation(data, callback) {
//     var customer = 'A90D3076DDD6777050994A85723E9244';
//     var key = 'mlOnaNTg2742';
//     var param = {};
//     param['com'] = data.logisticsDealer;
//     param['num'] = data.logisticsId;
//     // var sign =JSON.stringify(param)+key+customer
//     var sign = CryptoJS.MD5(JSON.stringify(param) + key + customer)
//     var sige = (sign.toString(CryptoJS.enc.Base32)).toUpperCase();
//     // console.log(sign, JSON.stringify(param) + key + customer);
//     $.ajax({
//             url: 'http://poll.kuaidi100.com/poll/query.do',
//             type: 'POST',
//             // dataType:'jsonp',
//             // jsonp: "callback",
//             data: {
//                 'customer': customer,
//                 'sign': sige,
//                 'param': JSON.stringify(param),
//             },
//         })
//         .done(function (data) {
//             console.log(data);
//             // callback();
//         })

// }

/******************************************************************************************** 
 * 订单弹窗
 */
/**
 * 
 * 
 * @param {any} callback 
 * @param {any} newWin 
 */
function layerAlert(callback, newWin) {
    layer.open({
        title: '温馨提示',
        content: '请确认是否完成支付，如果完成支付点击下方完成支付按钮',
        btn: '已经完成支付',
        yes: function (index, layero) {
            callback(index);
        },
        cancel: function () {
            newWin.close();
            location.href = '/page/personal/personalOrder.html';
        }
    });
}
// 验证是否成功
function carryOut(orderIds, col) {
    if (typeof (orderIds) != "string") {
        var orderIds = JSON.stringify(orderIds);
    }
    var ajaxCarry = function (index) {
        $.ajax({
                url: PATH + '/order/selectPaymentState.action',
                type: 'POST',
                data: {
                    'orderIds': orderIds
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
            })
            .done(function (data) {
                if (data.result == 7) {
                    location.href = '/page/login/login.html'
                }
                if (data == 110) {
                    layer.close(index);
                    localStorage.removeItem('orderData-submit')
                    localStorage.removeItem('productData');
                    localStorage.removeItem('orderID');
                    location.href = '/page/personal/personalOrder.html';
                    col.close();
                } else if (data == 111) {
                    layer.open({
                        title: '温馨提示',
                        content: '支付失败，请确认是否支付，或前往个人中心订单详情页面支付',
                        btn: '继续支付',
                        yes: function (index, layero) {
                            var carry = carryOut(orderIds, col);
                            layerAlert(carry, col);
                        },
                        cancel: function () {
                            col.close();
                            location.href = '/page/personal/personalOrder.html';
                        }
                    });

                } else if (data == 114) {
                    layer.open({
                        title: '温馨提示',
                        content: '参数错误，请前往个人中心订单详情页面支付',
                        btn: '确定',
                        yes: function (index, layero) {
                            col.close();
                            location.href = '/page/personal/personalOrder.html';
                        },
                        cancel: function () {
                            col.close();
                            location.href = '/page/personal/personalOrder.html';
                        }
                    });

                }
            })
    }
    return ajaxCarry
}




/******************************************************************************************** */

// 加载订单状态数量
function orderStateCount(data) {
    // 全部订单数量
    // if ($('.order_all i')[0]) {
    //     var dataAll = (data[0].count) + (data[1].count) + (data[2].count) + (data[3].count) + (data[4].count)
    //     $('.order_all i').text(dataAll);
    // }
    for(var i=0,len = data.length;i<len;i++){
        if (!data[i].count) {
            $('.po_title_item i').eq(i).css('display','none');
        }
    }
    
    $('.order_fk em,.order_fk i').text(data[0].count);
    $('.order_fh em,.order_fh i').text(data[1].count);
    $('.order_shu em,.order_shu i').text(data[2].count);
    $('.order_pj em,.order_pj i').text(data[3].count);
    $('.order_sh em,.order_sh i').text(data[4].count);
}


/******************************************************************************************* */

/**
 * 
 * 
 * @param {any} obj 
 */
function alertFn(obj) {
    layer.open({
        title: obj.title || '温馨提醒',
        content: obj.content || '你确定要该商品吗？',
        btn: [obj.btn1 || '确定', obj.btn2 || '取消'],
        btn1: function (index, layero) {
            if (obj.btn1fn) {
                obj.btn1fn();
            }
            layer.close(index);
        },
        btn2: function (index, layero) {
            if (obj.btn2fn) {
                obj.btn2fn();
            }
            layer.close(index);
        }
    })
}




// 订单详情页面处理数据
function transformationData(data) {
    var maxData = {};
    maxData.storeId = data.storeId;
    maxData.simpleProducts = [];
    $.each(data.orderItems, function (index, obj) {
        var simpleProducts = {}
        simpleProducts.productId = obj.productId
        simpleProducts.quantity = obj.productAmount
        maxData.simpleProducts.push(simpleProducts);
    })
    var Data = [];
    Data.push(maxData);
    setLocalData(Data, 'productData');
    return JSON.stringify(Data);
}

// 确认收获弹窗
function fnLayerConfirmHarvest(orderId) {
    alertFn({
        content: '确认收到此商品？',
        btn1fn: function () {
            ajaxConfirmHarvest(orderId, function (data) {
                console.log(data);
                if (data == 110) {
                    if ($('.order_details')[0]) {
                        var inde = $('.po_title_item').index($('.po_title_atv')) + 1
                        var pageNo = $('#page_od').data('pageNo');
                        orderState(inde, pageNo);
                        ajaxGetOrderStateCount(function (data) {
                            orderStateCount(data);
                        })
                    } else {
                        ajaxSelectByOrderState({
                            'orderStates': 1,
                            'pageNo': 1,
                            'pageSize': 3,
                        }, function (data) {
                            byOrderState(data);
                        })
                        ajaxGetOrderStateCount(function (data) {
                            orderStateCount(data);
                        })
                    }
                } else if (data == 111) {
                    layer.alert('确认收获失败，请刷新后重试');
                }
            })
        }
    })
}

// 申请退款
function fnLayerCancelOrder(orderId) {
    alertFn({
        content: '您确定申请退款吗？\n 申请退款24小时内会有客服人员与您沟通。',
        btn1fn: function () {
            ajaxApplyRefund(orderId, function (data) {
                console.log(data);
                if (data == 110) {
                    if ($('.order_details')[0]) {
                        var inde = $('.po_title_item').index($('.po_title_atv')) + 1
                        var pageNo = $('#page_od').data('pageNo');
                        orderState(inde, pageNo);
                        ajaxGetOrderStateCount(function (data) {
                            orderStateCount(data);
                        })
                    } else {
                        ajaxSelectByOrderState({
                            'orderStates': 1,
                            'pageNo': 1,
                            'pageSize': 3,
                        }, function (data) {
                            byOrderState(data);
                        })
                        ajaxGetOrderStateCount(function (data) {
                            orderStateCount(data);
                        })
                    }
                } else if (data == 111) {
                    layer.alert('申请退款失败，请刷新后重试');
                }
            })
        }
    })
}

// 支付弹窗
function fnLayerArter(orderIds) {
    layer.open({
        title: '提醒',
        content: '请选择付款方式',
        btn: ['支付宝', '微信', '对公转账'],
        btn1: function (index, layero) {
            var newWin = window.open('')
            newWin.location.href = PATH + "/order/getPaymenInfo.action?orderIds=" + orderIds + '&paymentWay=0';
            var carry = carryOut(orderIds, newWin);
            layerAlert(carry, newWin);
            layer.close(index);
        },

        btn2: function (index, layero) {
            var newWin = window.open('')
            newWin.location.href = url + "/page/cart/weChatPay.html?orderIds=" + orderIds + '&paymentWay=1';
            var carry = carryOut(orderIds, newWin);
            layerAlert(carry, newWin);
            layer.close(index);
        },
        btn3: function (index, layero) {
            var newWin = window.open('')
            newWin.location.href = url + "/page/cart/publicPay.html?orderIds=" + orderIds + '&paymentWay=3';
            layer.close(index);
        }
    });
}

// 判断订单状态
function dateCalculate(data) {
    switch (data) {
        case 0:
            return '<a href="javascript:;">去付款</a>';
        case 1:
            return '<p style="color:#ff7e23">待发货</p>';
        case 2:
            return '<p style="color:#ff7e23">---</p>'
        case 3:
            return '<p style="color:#ff7e23">等待收货</p>'
        case 4:
            return '<p style="color:#ff7e23">订单完成</p>'
        case 5:
            return '<p style="color:#ff7e23">等待退货</p>'
        case 6:
            return '<p style="color:#eee">退货成功</p>'
        case 7:
            return '<p style="color:#eee">失效订单</p>'
        case 8:
            return '<a href="javascript:;">去评价</a>'
    }
}

// 判断订单状态
function orderDateCalculate(data) {
    switch (data) {
        case 0:
            return '还没有付款哟';
        case 1:
            return '等待发货';
        case 2:
            return '---'
        case 3:
            return '等待收货'
        case 4:
            return '订单完成'
        case 5:
            return '等待退货'
        case 6:
            return '退货成功'
        case 7:
            return '失效订单'
        case 8:
            return '去评价'
    }
}

// 判断付款方式
function paymentWayCalculate(data) {
    switch (data) {
        case 0:
            return '支付宝付款';
        case 1:
            return '微信支付';
        case 2:
            return '银行卡付款';
        case 3:
            return '对公转账';
        default:
            return '';
    }
}
// 日期
function orderTimeData(data) {
    return (data.substring(0, 4)) + '-' + (data.substring(4, 6)) + '-' + (data.substring(6, 8)) + ' ' + (data.substring(8, 10)) + ':' + (data.substring(10, 12))
}


// 判断订单状态和付款状态
function orderOrPayTypeState(orderTy,payTy,id) {
    // console.log(orderTy,payTy)
    var html = '';
    // 提交订单没有付款
    if (payTy==1) {
        html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn" data-type=' + 0 + '  data-orderid="' + id + '">去付款</a></div>'
        html +='<div><a href="javascript:;" class="PI_confirm_btn PI_or_btn cancelOrder order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">取消订单</a></div>'
    }
    
    if (payTy==2) {
        if (orderTy==1) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555">等待发货</a></div>'
            html +='<div><a href="javascript:;" style="background-color:rgba(255,255,255,0);font-size:12px; color:#39abff" class="PI_confirm_btn order_pay_btn"  data-type=' + 4 + ' data-orderid="' + id + '">申请退款</a></div>'
        }
        if (orderTy==3) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555">等待收货</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 1 + ' data-orderid="' + id + '">确认收获</a></div>'
            html +='<div><a href="javascript:;" style="background-color:rgba(255,255,255,0);font-size:12px; color:#39abff" class="PI_confirm_btn order_pay_btn"  data-type=' + 4 + ' data-orderid="' + id + '">申请退款</a></div>'
            
        }
        if (orderTy==4) {
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555">订单完成</a></div>'
        }
        if (orderTy==8) {
            html+='<div><a href="/page/cart/settlementComment.html?orderId=' + id + '" class="PI_confirm_btn order_pay_btn"  data-type=' + 3 + ' data-orderid="' + id + '">去评价</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">交易完成</a></div>'
        }
    }
    if (payTy==3) {
        if (orderTy==1||orderTy==2||orderTy==3||orderTy==4) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">待退款</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
        }
        if (orderTy==5) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">等待退货</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
        }
        if (orderTy==6) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">退货成功</a></div>'
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">待退款</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
        }
    }
    if (payTy==4) {
        html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">退款成功</a></div>'
        html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
    }
    if (payTy==5) {
        html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">退款失败</a></div>'
        html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
    }
    if (orderTy==7) {
        if (payTy==1) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">失效的订单</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn order_pay_btn"  data-type=' + 2 + ' data-orderid="' + id + '">再次购买</a></div>'
            html +='<div><a href="javascript:;" class="PI_confirm_btn PI_or_btn cancelOrder order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">删除订单</a></div>'
        }
        if (payTy==2) {
            html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">失效的订单</a></div>'
            html +='<div><a href="javascript:;" style="background-color:rgba(255,255,255,0);font-size:12px; color:#39abff" class="PI_confirm_btn order_pay_btn"  data-type=' + 4 + ' data-orderid="' + id + '">申请退款</a></div>'
        }
    }
    // if (orderTy==8) {
    //         html +='<div><a class="PI_confirm_btn order_pay_btn" style="background-color:rgba(255,255,255,0); color:#555" data-orderid="' + id + '">交易完成</a></div>'
    //         html+='<div><a href="/page/cart/settlementComment.html?orderId=' + id + '" class="PI_confirm_btn order_pay_btn"  data-type=' + 3 + ' data-orderid="' + id + '">去评价</a></div>';
    // }

   return html
}
/**
 * 计算滚动条宽度  
 * Unumber - 用户总金额  
 * total - 升级所需金额  
 * number - 用户等级  
 * 
 * @param {any} Unumber 
 * @param {any} total 
 * @param {any} number 
 */
function userLevStrip(Unumber, total, number) {
    var toWidth = $('.personal_userLevStrip_m').data('lever', number).width();

    // 加载用户等级图片
    ajaxUserLeverImg()
    var c = Unumber / total;
    $('#LevStrip').animate({
        'width': toWidth * c + 'px'
    });
}

// 判断用户等级
function vipLeverData(data,callback) {
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

// ajax请求数据用户等级
// function userLeverImgData(data){
//     var lever = Number($('.personal_userLevStrip_m').data('lever'))
//     $('.pV_user_leve_img img').attr('src',data[lever])
//     $('.sp_userLevStrip_left').css('background-image','url('+data[lever]+')')
//     $('.sp_userLevStrip_right').css('background-image','url('+data[lever+1]+')')
// }

// 本地数据
function userLeverImgData() {
    var lever = Number($('.personal_userLevStrip_m').data('lever'))
    $('.pV_user_leve_img img,.personal_userLevImg img').attr('src', '/images/level_icon_' + lever + '.png')
    $('.sp_userLevStrip_left').css('background-image','url(/images/v'+(lever+1)+'.png)')
    $('.sp_userLevStrip_right').css('background-image','url(/images/v'+(lever+2)+'.png)')
}