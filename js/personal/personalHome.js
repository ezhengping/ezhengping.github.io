  // 加载是否签到元素
  function orSign(data) {
      var html = ''
      if (data.isSign) {
          var html = '<a href="javascript:;" data-type="' + data.isSign +
              '">' +
              '<img src="/images/signIn.png" alt="">' +
              '</a>'
      } else {
          var html = '<a href="javascript:;" data-type="' + data.isSign +
              '">' +
              '<img src="/images/signIn-no.png" alt="">' +
              '</a>'
      }
      $('.signIn_box').html(html)
      var dayhtml = data.siginIn;
      $('.personal_signIn_text p em').text(dayhtml)
  }


  // 签到按钮被点击
  function alertSignIn() {
      $('.signIn_box').on('click', 'a', function () {
          if ($(this).data('type')) {
              ajaxSign(function (data) {
                  $('.alertSignIn').show();
                  $('.alertSignIn>div').animate({
                      'height': '80%'
                  }, 'fast', 'swing');
                  setTimeout(function () {
                      $('.alertSignIn>div').animate({
                          'height': '0'
                      }, 'fast', 'swing', function () {
                          $('.alertSignIn').hide();
                      });
                  }, 2000)
                  ajaxIsSign(function (data) {
                      orSign(data);
                  });
              })
          } else {
              layer.alert('你已经签过到了');
          }
      })
  }

  function cancelOrderClick() {
      $('.m_userOrder').on('click', '.cancelOrder', function () {
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
                          ajaxSelectByOrderState({
                              'orderStates': 1,
                              'pageNo': 1,
                              'pageSize': 3,
                          }, function (data) {
                            if (data.common.length) {
                                byOrderState(data);
                            }else{
                              orderNull();
                            }
                          })
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

  // 订单状态
  function dateCalculate(data) {
      switch (data) {
          case 0:
              return '<p style="color:#ff7e23">订单已提交</p>';
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
              return '<p style="color:#aaa">退货成功</p>'
          case 7:
              return '<p style="color:#aaa">失效订单</p>'
          case 8:
              return '<a href="javascript:;" class="order_pay_btn" data-type="3">去评价</a>'
      }
  }
  // 付款状态
  function payDateCalculate(data) {
      switch (data) {
          case 1:
              return '<a href="javascript:;" class="order_pay_btn" data-type="0">去付款</a>';
          case 2:
              return '<p style="color:#ff7e23">已付款</p>'
          case 3:
              return '<p style="color:#ff7e23">待退款</p>'
          case 4:
              return '<p style="color:#ff7e23">退款成功</p>'
          case 5:
              return '<p style="color:#ff7e23">退款失败</p>'
      }
  }

  // 加载付款方式
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
      }

  }
  // 加载订单数据
  function byOrderState(data) {
      var maxhtml = '';
      $.each(data.common, function (index, obj) {
          var orderHtml = '';
          var orderEHtml = '';
          var objD = obj;

          for(var i=0,len=obj.orderItems.length;i<len;i++){
            if (i==2) {
                orderHtml +='<a href="/page/cart/orderDetails.html?orderId='+obj.id+'">'+
                                '<img src="/images/order_goodsitem.jpg" alt="">'+
                            '</a>'
                break
            }              
            orderHtml +=  '<a href="/page/product/productDetails.html?productId=' + obj.orderItems[i].productId +'&storeId=' + objD.buyerStore.storeId + '">'+
                            '<img src="' + obj.orderItems[i].imageUrl + '" alt="">'+
                          '</a>'
          }
        //   orderEHtml += '<em>' + obj.orderItems.productName + '</em>'
              
          maxhtml += '<tr class="uesrOrde_details_item">'+
                        '<td class="userOrder_img">'+
                            '<div>'+
                                orderHtml+
                            '</div>'+
                        '</td>'+
                        '<td class="userOrder_adderssName">'+
                        // DIV内添加用户信息
                            '<div></div>'+
                        '</td>'+
                        '<td class="userOrder_pay">'+
                            '<span>'+
                                    '<em>￥' + obj.totalPrice +'</em>'+
                                    '<br />'+
                                    paymentWayCalculate(obj.paymentWay)+
                            '</span>'+
                        '</td>'+
                        '<td class="userOrder_time">'+
                            '<span>'+
                                '<em>'+orderTimeData(obj.id).substring(0,10)+'</em>'+
                                '<br />'+
                                orderTimeData(obj.id).substring(11,16)+
                            '</span>'+
                        '</td>'+
                        '<td class="PI_control">'+
                        orderOrPayTypeState(obj.orderState,obj.paymentState,obj.id) +
                        '</td>'+
                    '</tr>'
        
      })
      $('.uesrOrde_details table').html(maxhtml);
  }


function orderNull(){
    var html=
                '<tr class="null" style="height:300px;line-height:300px;">'+
                    '<td>'+
                        '<div>暂无订单数据~~<a href="/index.html">前往商城购买</a></div>'+
                    '</td>'+
                '</tr>'

    $('.uesrOrde_details table').html(html);
}



  $(function () {
      // 请求用户名味豆数量
      ajaxUsernameAndBean(function (data) {
          $('.m_userInOf_name').text(data.nickName || data.name);
          $('.m_userInOf_beans em').text(data.bean);
          $('.m_userInOf_img img').attr('src', data.headSculpture);
      })
      // 加载页面签到元素
      ajaxIsSign(function (data) {
          orSign(data);
      });

      // 签到按钮被点击弹窗事件
      alertSignIn();

      // 获取订单状态和数量
      ajaxGetOrderStateCount(function (data) {
          if (data.result == 7) {
              location.href = '/page/login/login.html'
          }
          orderStateCount(data);
      });

      // 查询订单信息
      ajaxSelectByOrderState({
          'orderStates': 1,
          'pageNo': 1,
          'pageSize': 3,
      }, function (data) {
          console.log(data.common.length);
          if (data.common.length) {
              byOrderState(data);
          }else{
            orderNull();
          }
      })

      // 查询用户订单总金额
      ajaxTotalSum(function (data) {
          var numB = vipLeverData(data,userLevStrip);
          $('.personal_userLevNum p em').text(numB);
      })
      // 去付款按钮被点击
      ajaxOrderPay()

      cancelOrderClick();
  })