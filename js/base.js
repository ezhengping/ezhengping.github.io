		//从页面获取值
		function getParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}
		//获取滚动条到顶部的距离
		function getScrollTop() {
			var scrollTop = 0;
			if (document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if (document.body) {
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		}

		// 页面加载时判断用户是否登录
		function initialLogin() {
			if (!sessionStorage.getItem("noId")) {
				if (sessionStorage.getItem("Id")) {} else {
					$.ajax({
						url: PATH + "/user/logout.action",
						type: "POST",
						xhrFields: {
							withCredentials: true
						},
						crossDomain: true,
						success: function (data) {
							FalseLogin();
							// sessionStorage.setItem("noId", 'true');
						}
					})
				}
			}
		}
		// initialLogin()

		//退出登录
		function logout() {
			$.ajax({
				url: PATH + "/user/logout.action",
				type: "POST",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function (data) {
					if (110 == data) {
						location.href = "/page/login/login.html";
						localStorage.removeItem('head5_user');
					} else {
						layer.alert("退出失败，请稍后重试");
					}
				}
			});
		}

		// 判断是否登录用
		function TrueLogin() {
			sessionStorage.setItem("onLogin", 'true');
		}

		function FalseLogin() {
			sessionStorage.setItem("onLogin", 'false');
		}

		// 自定义收藏
		// function AddFavorite(title, url) {
		// 	try {
		// 		window.external.addFavorite(url, title);
		// 	} catch (e) {
		// 		try {
		// 			window.sidebar.addPanel(title, url, "");
		// 		} catch (e) {
		// 			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n请使用快捷键Ctrl+D进行添加！");
		// 		}
		// 	}
		// }
		function AddFavorite(title,url) {
			if(window.external && 'addFavorite' in window.external){ // IE
				window.external.addFavorite(url, title);
			} else if(window.sidebar && window.sidebar.addPanel) { // Firefox23后被弃用
				window.sidebar.addPanel(url, title);
			} else if(window.opera && window.print) { // rel=sidebar，读取a链接的href，title 注：opera也转战webkit内核了
				this.title = title;
				return true;
			} else { // webkit - safari/chrome
				alert('请使用快捷键：' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D 加入收藏夹.');
			}
		}

		// function AddFavorite(siteName, siteUrl) {
		// 	//捕获加入收藏过程中的异常
		// 	try {
		// 		//判断浏览器是否支持document.all
		// 		if (document.all) {
		// 			//如果支持则用external方式加入收藏夹
		// 			window.external.addFavorite(siteUrl, siteName);
		// 		} else if (window.sidebar) {
		// 			//如果支持window.sidebar，则用下列方式加入收藏夹
		// 			window.sidebar.addPanel(siteName, siteUrl, '');
		// 		}
		// 	}
		// 	//处理异常
		// 	catch (e) {
		// 		alert("加入收藏夹失败，请使用Ctrl+D快捷键进行添加操作!");
		// 	}
		// }


		/**
		 * 
		 * 
		 * @param {web} web -跳转页面 
		 */
		function ifLogin(web) {
			var i = sessionStorage.getItem('onLogin')
			if (i == 'true') {
				location.href = web;
			} else {
				location.href = "/page/login/login.html";
			}
		}

		/************************
		 * 轮播图函数 (Element,轮播图ulElement,轮播控件OlElement,轮控件激活状态)
		 ************************/


		function carousel(box, boxBanUl, boxBanOl, boxBanOlActive) {

			var len = $(boxBanUl + ' li').length;
			var olLen = $(boxBanOl + ' li').length;
			var index = 0;
			var olNum = 0;
			var tim;
			var olLen = $(boxBanOl + ' li').length;
			// 监听DOM元素 元素改变时执行初始化UI宽度  和添加轮播点
			$(boxBanUl).on("DOMNodeInserted", function (e) {
				carouselWidth();
				boOl()
			})

			function boOl() {
				var olHtml = ''
				for (var i = 0; i < len; i++) {
					olHtml += '<li class="header__banner__ol_item"></li>'
				}
				$(boxBanOl).html(olHtml);
				len = $(boxBanUl + ' li').length;
				olLen = $(boxBanOl + ' li').length;
				$(boxBanOl + ' li').eq(olNum).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
			}

			// 初始化轮播图宽度
			function carouselWidth() {
				for (var i = 0, len = $(boxBanUl + ' li').length; i <= len - 1; i++) {
					$(boxBanUl + ' li').eq(i).css('width', $(box).css('width'));
				}
				var ulItemW = parseInt($(boxBanUl + ' li').eq(1).css('width'));
				$(boxBanUl).css({
					'width': (ulItemW + 1) * len + 'px',
					'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px'
				});
				$(boxBanOl).css('margin-left', -parseInt($(boxBanOl).css('width')) / 2 + 'px');
				var ulItemH = parseInt($(box).css('height')) / 2;
				$(box + ' div span').css({
					'top': ulItemH + 'px'
				})
			}
			carouselWidth();
			// 窗口发生改变时
			$(window).resize(function () {
				carouselWidth();
			});

			function go() {
				if (index < len - 1) {
					index++;
				} else {
					$(boxBanUl).css({
						'left': '0px'
					});
					index = 1;
				}
				if (olNum < olLen - 1) {
					olNum++;
					// olNum = 0
				} else {
					olNum = 0
				}
				$(boxBanUl).stop().animate({
					'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px'
				});
				$(boxBanOl + ' li').eq(olNum).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
			}

			function back() {
				if (index > 0) {
					index--;
				} else {
					$(boxBanUl).css({
						'left': -((len - 1) * parseInt($(boxBanUl + ' li').css('width'))) + 'px'
					});
					index = olLen - 1;
				}
				$(boxBanUl).stop().animate({
					'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px'
				});
				$(boxBanOl + ' li').eq(index).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
			}
			$('#banner_left').click(function () {
				back();
			})

			$('#banner_right').click(function () {
				go();
			})
			$("body").on("click", boxBanOl + " li", function () {
				index = $(this).index();
				olNum = index
				$(boxBanUl).stop().animate({
					'left': -(index * parseInt($(boxBanUl + ' li').css('width'))) + 'px'
				});
				$(boxBanOl + ' li').eq(olNum).addClass(boxBanOlActive).siblings().removeClass(boxBanOlActive);
			});
			tim = setInterval(function () {
				go();
			}, 3000);
			$(box).hover(function () {
				clearInterval(tim);
			}, function () {
				tim = setInterval(function () {
					go();
				}, 3000);
			})
		}
		
		// 销量超过100000显示10万
		function salesNumberCalculate(number){
			if (!number) {
				var number = 0;
			}
			if (typeof(number) != 'number') {
				var number = Number(number);
			}
			var remainder = number/10000
			if ((remainder/10)>1) {
				return remainder.toFixed(2)+'万';
			}else{
				return number;
			}
		}

		/**********************************
		 * 侧边栏显示隐藏返回顶部 *********
		 **********************************/
		function backTop(box, boxItem) {
			$(window).scroll(function () {
				var scrollTop = getScrollTop();
				(scrollTop >= 1000) ? ($(box).css({
					'display': 'block'
				})) : ($(box).css({
					'display': 'none'
				}));
			})
			$(boxItem).eq($(boxItem).length - 1).click(function () {
				$('body,html').stop().animate({
					scrollTop: 0
				}, 500);
			});
		}


		

		$(function () {
			// 装载轮播图函数
			// carousel('#banner', '#banner_ul', '#banner_ol', 'header__banner__ol_item_active');
			// 装载侧边栏显示隐藏返回顶部
			backTop('#sidebar', '.sidebar__mid_item');
			// 装载侧边栏
			// navActive();
			// 装载导航顶部新闻轮播
			// newsCarousel("#newsCarousel","#newsCarouselVector");
			// 弹出登录窗口
			// loginWindow();
		})