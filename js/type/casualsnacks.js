    	$(function () {
    		var id = null;
    		var state = null;
    		id = getParam("id");
    		state = getParam("state");
    		queryType(id, state);
    		queryProductClick()
    	})

    	function queryProductClick() {
    		$('.section_product_box').on('click', '.J_Ajax', function () {
    					$(this).addClass('productAtv').parent('li').siblings('li').children('a').removeClass('productAtv');
    					var indx = $('.J_Ajax').index($(this));
    					if (indx == 2) {
    						var sortType = $(this).data('sortType')
    						if (sortType == 'asc') {
    							$(this).data('sortType', 'desc').children('i').css('background-image', 'url(/images/price_Sort_icon_1.png)')
    						} else {
    							$(this).data('sortType', 'asc').children('i').css('background-image', 'url(/images/price_Sort_icon_0.png)')
    						}
    					}
    					var typeId = $('input[name=typeId]').val();
    					var ajaxObj = $(this).data()
    					ajaxObj['typeId'] = typeId;
    					ajaxObj['pageSize'] = 20;
    					ajaxObj['pageNo'] = 1;
    					ajaxQueryProduct(ajaxObj, function (data) {
							// console.log(data);
							var pageNo = $("#pagination3").data('value',1);
    						$(".section__nut_foodlist_ul").empty();
    						if (data.common.length != 0) {
    							$.each(data.common, function (index, obj) {
    								addProduct(obj);
    							});
    						} else {
    							productNull()
    						}
    						initPage(data.totalPage, function (pageNo) {
    							ajaxObj['pageNo'] = pageNo
    							ajaxQueryProduct(ajaxObj, function (data) {
    								$(".section__nut_foodlist_ul").empty();
    								if (data.common.length != 0) {
    									$.each(data.common, function (index, obj) {
    										addProduct(obj);
    									});
    								} else {
    									productNull()
    								}
    							})
    							$("#pagination3").data('value', pageNo + 1)
    						})
    					})
					})
				}


    				// 请求搜索接口
    				function ajaxQueryProduct(obj, callback) {
    					$.ajax({
    							url: PATH + '/product/queryProduct.action',
    							type: 'POST',
    							data: obj,
    						})
    						.done(function (data) {
    							if (callback) {
    								callback(data);

    							} else {
    								console.log('没有请求回掉')
    							}
    						})
    				}


    				//查询分类
    				function queryType(id, state) {
    					$.ajax({
    						url: PATH + "/type/queryType.action",
    						type: "POST",
    						data: {
    							"id": id,
								"state": state,
								'pageSize':20
    						},
    						xhrFields: {
    							withCredentials: true
    						},
    						crossDomain: true,
    						success: function (data) {
    							$.each(data.type, function (index, obj) {
    								addParent(index, obj);
    							});
    							itemAtv(data.index);
    							addTypeName(data.typeName);
    							if (data.products.length != 0) {
    								$.each(data.products, function (index, obj) {
    									addProduct(obj);
    								});
    							} else {
    								productNull()
    							}

    							$("#" + data.typeId).addClass("atv");
    							$("input[name='typeId']").val(data.typeId);
    							initPage(data.totalPage, queryProduct);
    							//topInbottom(data.totalPage)
    						}
    					});
    				}

    				// 如果商品为空
    				function productNull() {
    					var html = '<li>'+
										'<div class="foodlist_null">'+
											'<p>该分类暂时没有商品</p>'+
										'</div>'+
									'</li>'
						
    					$('.section__nut_foodlist_ul').html(html);
    				}

    				//添加父分类
    				function addParent(index, type) {
    					var op ='<li class="vicenav__mid_ul_item">'+
									'<a href="javascript:void(0)">'+type.name+'</a>'+
								'</li>'
    					$(".vicenav__mid_ul").append(op);
    					addSonOut();
    					$.each(type.list, function (index2, obj) {
    						addSon(index, obj);
    					});
    				}

    				//添加子分类框架
    				function addSonOut() {
    					var op =   '<div class="subnav__mid" style="display: none">'+
										'<ul class="subnav__mid_ul clearfix">'+
										'</ul>'+
									'</div>'
    					$(".subnav").append(op);
    				}
    				//添加子分类
    				function addSon(index, type) {
    					var op = '<li><a href="javascript:void(0)" id="'+type.id+'" onclick="sonQuery(\''+type.name+'\','+type.id+')">'+type.name+'</a></li>';
    					$(".subnav__mid_ul").eq(index).append(op);
    				}


    				function addItemAtv(index) {
    					var vicLi = $('.vicenav__mid_ul_item');
    					vicLi.eq(index).addClass('vicenav__mid_ul_item_active').siblings().removeClass('vicenav__mid_ul_item_active');
    					$(".subnav__mid").eq(index).stop().slideDown().siblings('.subnav__mid').stop().slideUp();
    				}
    				//默认选中
    				function itemAtv(index) {
    					var vicLi = $('.vicenav__mid_ul_item');
    					$('.subnav__mid_ul li a').click(function () {
							$('.J_Ajax').eq(0).addClass('productAtv').parent('li').siblings('li').children('a').removeClass('productAtv');
    						$('.subnav').find('a').removeClass('atv');
    						$(this).addClass('atv');
    						var index = $('.subnav .subnav__mid').index($(this).parents('.subnav__mid'));
    						addItemAtv(index)
    					})
    					//导航动画
    					addItemAtv(index)
    					vicLi.click(function () {
							$('.J_Ajax').eq(0).addClass('productAtv').parent('li').siblings('li').children('a').removeClass('productAtv');
    						$(this).addClass('vicenav__mid_ul_item_active').siblings().removeClass('vicenav__mid_ul_item_active')
    						parentQuery();
    					})
    					vicLi.mouseenter(function () {
    						index = vicLi.index($(this));
    						$(".subnav__mid").eq(index).stop().slideDown().siblings('.subnav__mid').stop().slideUp();
    					})
    					$(".vicnav_box").mouseleave(function () {
    						index = vicLi.index($(".vicenav__mid_ul_item_active"))
    						$(".subnav__mid").eq(index).stop().slideDown().siblings('.subnav__mid').stop().slideUp();
    					})
    				}
    				//添加分类名称
    				function addTypeName(name) {
    					$(".title_text").text(name);
    				}
    				//添加商品信息
    				function addProduct(product) {
    					var op = '<li class="section__nut_foodlist_item animate">'+
									'<a href="/page/product/productDetails.html?productId='+product.id+'&storeId='+product.storeId+'">'+
									'<div class="section__nut_foodlist_item_img">'+
										'<img class="section__nut_foodlist_item_img_goods" src="'+product.pic+'" alt="">'+
									'</div>'+
									'<p class="section__nut_foodlist_item_bewrite">'+
										product.name+
									'</p>'+
									'<span class="section__nut_foodlist_item_nowprice">￥'+product.price+'</span>'+
									'<span class="section__nut_foodlist_item_nowprice float_right">销量：'+salesNumberCalculate(product.sales||"0")+'</span>'+
								'</li></a>'
    					$(".section__nut_foodlist_ul").append(op);
    				}
    				//初始化分页插件
    				function initPage(totalPage, callback) {
    					var pageNo = $("#pagination3").data('value');
    					$("#pagination3").pagination({
    						currentPage: pageNo, //初始页
    						totalPage: totalPage, //末尾页
    						isShow: true, //是否显示首页和尾页按钮
    						count: 7, //显示多少页
    						homePageText: "首页",
    						endPageText: "尾页",
    						prevPageText: "上一页",
    						nextPageText: "下一页",
    						callback: function (current) {
    							callback(current)
    							// queryProduct(current);
    							location.href = "#main";
    						}
    					});
					}
					

    				//    	function topInbottom(length) {
    				//    		var pageNo=$("#pagination3").data('value');
    				//    		console.log(pageNo);
    				//            $(window).scroll(function() {
    				//                //获取滚动条高度   获取最后一个元素距离页面顶部的高度
    				//                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    				//                var Ele = $('.section__nut_foodlist_item').last().offset().top;
    				//                // 判断滚动条高度是否大于等于最后一个元素距离顶部的高度
    				//                console.log('当前滚动条的高度'+scrollTop,'最后一个元素的高度：'+Ele);
    				//                console.log();
    				//                if (scrollTop >= Ele) {
    				//                    $(window).unbind("scroll");
    				//                    pageNo += 1;
    				//                } else {
    				//                    return;
    				//                }
    				//                // 当前页+1是否大于最后一页
    				//                if (pageNo > length) {
    				//                    var bottomLine = document.querySelector('.bottom_line');
    				//                        //判断元素是否存在存在就return不存在添加元素  
    				//                        // 元素作用是提示用户这是底线了
    				//                        if (!bottomLine) {
    				//                            var html = `<div class="bottom_line" style = "text-align: center;font-size: 12px;padding-top: 40px;">我已经是底线了</div>`
    				//                            $('.section__nut_foodlist').append(html)
    				//                            return;
    				//                        }else{
    				//                            return;
    				//                        }
    				//                }
    				//                // 需要加载数据的函数ajax传入page页数
    				//                queryProduct(pageNo)
    				//            });
    				//        }
    				//分页搜索商品
    				function queryProduct(pageNo) {
    					$.ajax({
    						url: PATH + "/product/queryProduct.action",
    						type: "POST",
    						data: {
    							"typeId": $("input[name='typeId']").val(),
    							"pageNo": pageNo,
    							"pageSize": 20
    						},

    						xhrFields: {
    							withCredentials: true
    						},
    						crossDomain: true,

    						success: function (data) {
    							$("#pagination3").data('value', pageNo);
    							$(".section__nut_foodlist_ul").empty();
    							if (data.common.length != 0) {
    								$.each(data.common, function (index, obj) {
    									addProduct(obj);
    								});
    							} else {
    								productNull();
    							}

    							initPage(data.totalPage, queryProduct);
    							$("#pagination3").data('value', pageNo + 1);
    						}
    					});
    				}
    				//子分类查询
    				function sonQuery(typeName, typeId) {
    					$(".section__nut_foodlist_ul").empty();
    					addTypeName(typeName);
    					$("input[name='typeId']").val(typeId);
    					$("#pagination3").data('value', 1);
    					queryProduct(1);
    				}
    				//父分类查询
    				function parentQuery() {
    					$(".section__nut_foodlist_ul").empty();
    					$('.subnav').find('a').removeClass('atv');
    					var index = $('.vicenav__mid_ul .vicenav__mid_ul_item').index($('.vicenav__mid_ul_item_active'));
    					var obj = $('.subnav .subnav__mid').eq(index).find('a').eq(0);
    					addTypeName(obj.text());
    					$("input[name='typeId']").val(obj.attr("id"));
    					$("#" + obj.attr("id")).addClass("atv");
    					$("#pagination3").data('value', 1);
    					queryProduct(1);
    				}