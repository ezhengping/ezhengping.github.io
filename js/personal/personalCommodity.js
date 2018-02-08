  // 分页插件
  function pagePc(pageLen) {
    $("#page_pc").pagination({
        currentPage: 1, //初始页
        totalPage: pageLen, //末尾页
        isShow: true, //是否显示首页和尾页按钮
        count: 7, //显示多少页
        homePageText: "<<",
        endPageText: ">>",
        prevPageText: "<",
        nextPageText: ">",
        callback: function (pageNo) {
            ajaxGoodsCollection({
                pageNo: pageNo,
                pageSize: 8,
            }, function (data) {
                $('#page_pc').data('pageNo',pageNo).data('totalPage',data.totalPage);
                dataAllGoodsCollection(data)
            })
        }
    });
}


// 加载收藏数据  -- 数据为空
function dataNullGoodsCollection(){
    var html = 
            '<div class="item_null">'+
                '<div class="item_text">'+
                    '<p>你还没有收藏的商品</p>'+
                    '<a href="/index.html">先去逛逛商场吧>></a>'+
                '</div>'+
            '</div>'
    $('.pc_commodity_menu').html(html);
}
// 加载收藏所有数据  -- 数据不为空
function dataAllGoodsCollection(data) {
    var maxHtml = ''
    $.each(data.common, function (index, obj) {
        maxHtml +=    
                    '<div class="pc_commodity_item" data-productId='+obj.productId+' data-brandId='+obj.brandId+' data-id='+obj.productId+' data-storeId='+obj.storeId+'>'+
                        '<div class="pc_inner">'+
                            '<div class="pc_commodity_img">'+
                                '<a href="/page/product/productDetails.html?productId='+obj.productId+'&storeId='+obj.storeId+'">'+
                                    '<img src="'+obj.productImage+'" alt="">'+
                                '</a>'+
                            '</div>'+
                            '<div class="pc_commodity_text">'+
                                '<a href="/page/product/productDetails.html?productId='+obj.productId+'&storeId='+obj.storeId+'">'+
                                    '<p>'+obj.productName+'</p>'+
                                '</a>'+
                                '<a href="/page/product/productDetails.html?productId='+obj.productId+'&storeId='+obj.storeId+'">'+
                                    '<p>￥'+
                                        '<em>'+obj.productPrice+'</em>'+
                                    '</p>'+
                                '</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="pc_operate">'+
                            '<a class="pc_op_item" href="javasctipt:;">取消关注</a>'+
                        '</div>'+
                        '<div class="pc-delete-tip">'+
                            '<div class="tip-main">'+
                                '<i class="tip-icon"></i>'+
                                '<em class="tip-title">主人确认要抛弃我么~</em>'+
                            '</div>'+
                            '<div class="tip-btnbox">'+
                                '<a href="javascript:void(0)" class="btn-sure J-confirmSure">确认</a>'+
                                '<a href="javascript:void(0)" class="btn-cancle J-confirmCancle">取消</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="pc_commodity_check">'+
                            '<i class="i-check"></i>'+
                        '</div>'+
                    '</div>'
    })
    $('.pc_commodity_menu').html(maxHtml)
}
// 原型继承点击取消关注显示遮罩-->点击取消
BatchCollection.prototype.btnCancleClick = function () {
    $('.pc_commodity_menu').on('click','.btn-cancle',function () {
        $(this).parents('.pc-delete-tip').css('display', 'none');
    })
}

// 原型继承点击取消关注显示遮罩
BatchCollection.prototype.btnPcOpItem = function () {
    $('.pc_commodity_menu').on('click','.pc_op_item',function () {
        $(this).parents('.pc_commodity_item').children('.pc-delete-tip').css('display', 'block');
    })
}

// 单个取消收藏
function cancelCollection() {
        $('.pc_commodity_menu').on('click', '.btn-sure', function () {
            var that = this;
            var data = [];
            var prodId=$(this).parents('.pc_commodity_item').data('productid');
            data.push(prodId);
            data = JSON.stringify(data);
            // 执行删除
            ajaxDelCollection({
                'json': data,
            }, function (data) {
                if (data == 110) {
                    $(that).parents('.pc_commodity_item').remove();
                    var inde = $('.pc_commodity_item').length;
                    var pageNo = $('.page_pc').data('pageNo');
                    

                    // 判断当前应该处于那一页
                    if (!inde) {
                        if (pageNo > 1) {
                            pageNo = pageNo - 1;
                        } else {
                            pageNo = 1;
                        }
                    }


                    // 加载Ajax数据
                    ajaxGoodsCollection({
                        'pageNo': pageNo,
                        pageSize: 8,
                    }, function (data) {
                        if (data) {
                            dataAllGoodsCollection(data)
                            $('#page_pc').data('pageNo', pageNo).data('totalPage', data.totalPage);
                            pagePc(data.totalPage);
                        } else {
                            dataNullGoodsCollection();
                        }
                    })
                } else if (data = 111) {
                    layer.alert('取消失败，请刷新后重试');
                }
            })
        })
    }
    
    // 批量删除
    function batchDelcancelCollection(prodIdArr,EleC,DelEleC){
        ajaxDelCollection({
            'json': prodIdArr,
        },function(data){
            if (data == 110) {
                    $(DelEleC).remove();
                    var inde = $(EleC).length;
                    var pageNo = $('.page_pc').data('pageNo');
                    if (!inde) {
                        if (pageNo > 1) {
                            pageNo = pageNo - 1;
                        } else {
                            pageNo = 1;
                        }
                    }


                    // 加载Ajax数据
                    ajaxGoodsCollection({
                        'pageNo': pageNo,
                        pageSize: 8,
                    }, function (data) {
                        if (data) {
                            dataAllGoodsCollection(data)
                            $('#page_pc').data('pageNo', pageNo).data('totalPage', data.totalPage);
                            pagePc(data.totalPage);
                        } else {
                            dataNullGoodsCollection();
                        }
                    })
            }else if(data==111){
                layer.alert('取消失败，请刷新后重试');
            }else if(data==114){
                layer.alert('取消失败，请刷新后重试');
            }
        })
    }

    // 批量管理点击事件
    function batchDelClick(){
        $('.batchDel_btn').click(function(){
            if($('.z-item-checked')[0]){
                var prodIdArr = [];
                var DelAll = $('.z-item-checked');
                $.each(DelAll,function(index,obj){
                    prodIdArr.push($(obj).data('productid'))
                })
                batchDelcancelCollection(JSON.stringify(prodIdArr),'.pc_commodity_item','.z-item-checked')
            }else{
                layer.alert('你还没有选中商品')
            }
        })
    }
$(function(){
    // 单个取消收藏
    cancelCollection()

    // 批量管理点击事件
    batchDelClick()

    // 请求加载输出数据
    ajaxGoodsCollection({
        pageNo: 1,
        pageSize: 8,
    }, function (data) {
        if(data){
            $('#page_pc').data('pageNo',1).data('totalPage',data.totalPage);
            dataAllGoodsCollection(data)
            pagePc(data.totalPage);
        }else{
            dataNullGoodsCollection();
        }
    })

    var pcBeans = new BatchCollection({
    batchbox: '.batch_btn', //批量管理按钮
    batchCombox: '.batch_complete', //完成按钮
    batchMenubox: '.batch_menu', //管理菜单
    batchComMenubox: '.pc_commodity_menu', //被管理的菜单
    batchComMenuItembox: '.pc_commodity_item', //被管理菜单的子集
    batchComMenuAddClass: 'z-goods-batch', //向被管理菜单盒子添加的class
    batchComMenuItemAddCliss: 'z-item-checked', //向被管理菜单盒子子集添加的class
    batchComMenuItemCheckbox: '.pc_commodity_check', //被管理菜单盒子子集批量管理遮罩
    batchCheckboxBtn: '.batch_checkbox_btn', //全选按钮
    });
    pcBeans.btnPcOpItem();
    pcBeans.btnCancleClick();

})