 // 星级事件监听
 function star(onClass) {
    $('.comment_mid').on('mouseover', onClass, function () {
        $(this).parent('.goods_comment_x').children('img').attr('src', '/images/comment_no.png');
        var inde = $(this).parent('.goods_comment_x').children('img').index($(this));
        starNumber(inde, this)
    }).on('mouseleave', onClass, function () {
        var inde = $(this).siblings('input').val();
        $(this).parent('.goods_comment_x').children('img').attr('src', '/images/comment_no.png');
        if (inde) {
            inde = inde - 1
            starNumber(inde, this);
        } else {
            $(this).parent('.goods_comment_x').children('img').attr('src', '/images/comment_no.png');
        }
    }).on('click', onClass, function () {
        var inde = $(this).parent('.goods_comment_x').children('img').index($(this));
        $(this).siblings('input').val(inde + 1)
        starNumber(inde, this)
    })
}

// 计算星级显示
function starNumber(inde, _this) {
    for (var i = 0; i <= inde; i++) {
        $(_this).parent('.goods_comment_x').children('img').eq(i).attr('src', '/images/comment_yes.png');
    }
}

// 加载订单请求
function ajaxOrderDetails(id, callback) {
    $.ajax({
            url: PATH + '/order/selectOrderProduct.action',
            type: 'POST',
            data: {
                orderId: id
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
                return;
            }
        })
}
// 加载订单商品数据
function orderGoodsDetails(data) {
    var html = '';
    $.each(data, function (inde, obj) {
        html +=
            '<li class="goods_com_item clearfix" data-id="' + obj.productId + '">' +
            '<div class="goods_left">' +
            '<div class="goods_in">' +
            '<div class="goods_in_img">' +
            '<img src="' + obj.productImage + '" alt="商品图片">' +
            '</div>' +
            '<div class="goods_in_text">' +
            '<p>' + obj.productName + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="goods_right">' +
            '<div class="goods_comment">' +
            '<span class="goods_comment_title">商品与描述相符</span>' +
            '<span class="goods_comment_x">' +
            '<img class="goods_star_img" src="/images/comment_no.png" alt="星级">' +
            '<img class="goods_star_img" src="/images/comment_no.png" alt="星级">' +
            '<img class="goods_star_img" src="/images/comment_no.png" alt="星级">' +
            '<img class="goods_star_img" src="/images/comment_no.png" alt="星级">' +
            '<img class="goods_star_img" src="/images/comment_no.png" alt="星级">' +
            '<input type="hidden" name="description" value=null>' +
            '</span>' +
            '</div>' +
            '<div class="goods_comment_textbox">' +
            '<textarea name="" id="" maxlength="200" placeholder="晒单评价 , 商品您还满意吗 ? 评价有机会获得味豆哦。"></textarea>' +
            '</div>' +
            '<div class="goods_comment_upimg">' +
            '<div class="goods_comment_file">' +
            '<div class="goods_comment_file_box">' +
            '<input type="file" name="evaluateImages" id="" data-val=>' +
            '</div>' +
            '<div class="goods_comment_file_text">' +
            '<span>最多上传5张</span>' +
            '</div>' +
            '</div>' +
            '<div class="goods_comment_imgbox">' +
            '<div class="goods_comment_img_item">' +
            '<div class="mask_box"></div>' +
            '<img src="" alt="" data-type=flase>' +
            '<i class="del_upimg"></i>' +
            '</div>' +
            '<div class="goods_comment_img_item">' +
            '<div class="mask_box"></div>' +
            '<img src="" alt="" data-type=flase>' +
            '<i class="del_upimg"></i>' +
            '</div>' +
            '<div class="goods_comment_img_item">' +
            '<div class="mask_box"></div>' +
            '<img src="" alt="" data-type=flase>' +
            '<i class="del_upimg"></i>' +
            '</div>' +
            '<div class="goods_comment_img_item">' +
            '<div class="mask_box"></div>' +
            '<img src="" alt="" data-type=flase>' +
            '<i class="del_upimg"></i>' +
            '</div>' +
            '<div class="goods_comment_img_item">' +
            '<div class="mask_box"></div>' +
            '<img src="" alt="" data-type=flase>' +
            '<i class="del_upimg"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</li>'
    })
    $('.goods_com_box ul').html(html);
}
// 加载订单店铺信息
function orderShopDetails(data) {
    var html =
        '<div class="shop_left" data-shopId=' + data.id + '>' +
        '<div class="shop_in">' +
        '<div class="shop_in_img">' +
        '<img src="' + data.logo + '" alt="商品图片">' +
        '</div>' +
        '<div class="shop_in_text">' +
        '<p>' + data.name + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="shop_right"  data-shopId=' + data.id + '>' +
        '<div class="goods_comment">' +
        '<span class="goods_comment_title">卖家的服务态度</span>' +
        '<span class="goods_comment_x">' +
        '<img class="seller_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="seller_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="seller_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="seller_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="seller_star_img" src="/images/comment_no.png" alt="星级">' +
        '<input type="hidden" name="server" value=null>' +
        '</span>' +
        '</div>' +
        '<div class="goods_comment logistics">' +
        '<span class="goods_comment_title">物流的服务质量</span>' +
        '<span class="goods_comment_x">' +
        '<img class="logistics_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="logistics_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="logistics_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="logistics_star_img" src="/images/comment_no.png" alt="星级">' +
        '<img class="logistics_star_img" src="/images/comment_no.png" alt="星级">' +
        '<input type="hidden" name="logistics" value=null>' +
        '</span>' +
        '</div>' +
        '</div>'

    $('.shop_com_box').html(html);
}

// 上传商品图片
function upGoodsImg() {
    $('.comment_mid').on('change', 'input[name=evaluateImages]', function () {
        var val = $(this).data('val')
        var imgArr = $(this).data('imgArr');
        var _this = this;
        if (val == 5) {
            layer.alert('单个商品只能上传五张图片');
        }
        upload(this, function (data) {
            obj = commentImgShow(_this, val, imgArr, data.URL);
            $(_this).data('val', obj.val);
            $(_this).data('imgArr', obj.imgArr);
        })
    })
}

// 显示图片
function commentImgShow(_this, val, imgArr, data) {
    if (!val) {
        var val = 1;
        var imgArr = [];
        imgArr.push(data);
    } else {
        val += 1;
        imgArr = JSON.parse(imgArr)
        imgArr.push(data);
    }
    // $(_this).parents('.goods_comment_file').siblings('.goods_comment_imgbox').children('.goods_comment_img_item').eq(val-1).children('img').attr('src',imgArr[val-1]).data('type',true);
    ifUpGoodsImgType(_this, imgArr);
    return {
        'val': val,
        'imgArr': JSON.stringify(imgArr)
    };
}

// 删除上传图片
function commentDelUpImg() {
    $('.comment_mid').on('click', '.del_upimg', function () {
        var url = $(this).siblings('img').attr('src');
        var index = $(this).parents('.goods_comment_imgbox').index($(this).parent(
            '.goods_comment_img_item'))
        var _this = this;
        delUpImg(url, function (data) {
            var inputE = $(_this).parents('.goods_comment_upimg').find('input[type=file]');
            var imgArr = JSON.parse(inputE.data('imgArr'));
            var val = inputE.data('val');
            imgArr.splice(index, 1);
            inputE.data('imgArr', JSON.stringify(imgArr));
            inputE.data('val', val - 1);
            ifUpGoodsImgType(_this, imgArr);
        })

    })
}

// 循环img添加图片
function ifUpGoodsImgType(_this, imgArr) {
    $(_this).parents('.goods_comment_upimg').find('.goods_comment_img_item').removeClass('goods_up_img').children(
        'img').attr('src', '').data('type', false);
    $.each($(_this).parents('.goods_comment_upimg').find('.goods_comment_img_item'), function (index, obj) {
        if (imgArr[index]) {
            $(obj).addClass('goods_up_img').children('img').attr('src', imgArr[index]).data('type',
                true);
        } else {
            return;
        }
    })
}

function CommentData() {
    var storeId = $('.shop_com_box .shop_left').data('shopid');
    var storeCom = {};
    var objectJson = [];
    storeCom['storeId'] = storeId;
    storeCom['server'] = $('input[name=server]').val();
    storeCom['logistics'] = $('input[name=logistics]').val();
    $.each($('.goods_com_item'), function (index, obj) {
        var goodsJson = {}
        goodsJson['productid'] = $(obj).data('id');
        goodsJson['buyerEvaluate'] = $(obj).find('.goods_comment_textbox').children('textarea').val();
        if(goodsJson['buyerEvaluate']==''){
            goodsJson['buyerEvaluate']='用户没有填写相关评论信息';
        }
        goodsJson['description'] = $(obj).find('input[name=description]').val();
        var imgArr = [];

        if ($(obj).find('input[type=file]').data('imgArr')) {
            imgArr = JSON.parse($(obj).find('input[type=file]').data('imgArr'));
        } else {
            imgArr = [];
        }


        if (imgArr.length) {
            var userUpimgArr = [];
            for(var i =0,len=imgArr.length;i<len;i++){
                var userimg = {};
                userimg['imgUrl'] = imgArr[i];
                userUpimgArr.push(userimg);
            }
        }

        goodsJson['evaluateImages'] = userUpimgArr;
        objectJson.push(goodsJson);
    })
    
    var obj = {};
    obj['orderId'] = getParam('orderId');
    obj['storeObj'] = JSON.stringify(storeCom)
    obj['goodsObj'] = JSON.stringify(objectJson)
    return obj;
}


function subime() {
    $('.subime_btn').click(function () {
        var data = CommentData();
        var goodsObj = JSON.parse(data.goodsObj)
        for(var i=0;i<goodsObj.length;i++){
            if(goodsObj[i].description=='null'||(!goodsObj[i].description)){
                layer.alert('商品与描述相符星级不能为零');
                return;
            }
        }
        var store = JSON.parse(data.storeObj)
        if(store.server == 'null'||(!store.server)){
            layer.alert('卖家的服务态度星级不能为零');
            return;
        }
        if(store.logistics=='null'||(!store.logistics)){
            layer.alert('物流的服务质量星级不能为零');
            return;
        }
        ajaxSettlementComment(data, function (data) {
            if (data == 110) {
                layer.open({
                    title: '温馨提示',
                    content: '评价成功',
                    btn1: function (index, layero) {
                        layer.close(index)
                        location.href = '/page/personal/personalOrder.html';
                    },
                    cancel: function(index, layero){
                        layer.close(index)
                        location.href = '/page/personal/personalOrder.html';
                    }

                });
            } else if (data == 111) {
                layer.alert('评价失败，请刷新后重试!');
            }
        })
    })
}


$(function () {
    // 加载订单商品数据
    ajaxOrderDetails(getParam('orderId'), function (data) {
        orderGoodsDetails(data.productInfomation)
        orderShopDetails(data.storeInfomation);
    })
    // 上传图片
    upGoodsImg();

    // 删除上传图片
    commentDelUpImg();
    // 评星动画
    star('.logistics_star_img');
    star('.seller_star_img');
    star('.goods_star_img');

    // 提交
    subime();
})