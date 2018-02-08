//分页插件
$(function() {



    (function pag1() {
        var url = 'http://route.showapi.com/109-35';
        var oCon = document.querySelector('.section__content_entry_entry');
        var conBox = $('.section__content');
        var page = 1; //初始化数据页码
        // var maxstart = 0;
        var maxResult = 10; //每页数据
        var start = 0 //当前首页数据

        var cache = {}; //缓存池
        // 0 10 20 30

        // 监听box内容
        conBox.on('click', function(event) {
            // var listPage = event.toElement.dataset.current;
            // console.log(event)
            // if (event.toElement === 'a.ui-pagination-page-item') {
            //     start = (listPage * 10) - 10;
            //     page = listPage;


            //     if (page in cache) {
            //         //从缓存中渲染数据
            //         showPage(cache[page]);
            //         console.log('数据已经缓存' + page)
            //     } else {
            //         getJson();
            //     }
            // }

        })

        getJson();
        // ajax 获取数据
        function getJson() {
            console.time('获取数据' + page) //测试预测时间
            var params = [];
            var sendData = {
                showapi_appid: '50162',
                showapi_sign: 'c908aaec5c5341b0a08748d24b5a483c',
                page: page,
                maxResult: 10 //每页数据数量
            }

            // 遍历sendData对象
            for (var key in sendData) {
                params.push(key + '=' + sendData[key]); //将对象数据变为数组
            }

            var postData = params.join('&'); //用“&”符号进行数据分割
            // console.log(url + postData);
            $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: postData,
                    xhrFields:{
                        withCredentials: true
                    },
                    crossDomain: true,
                })
                .done(function(argument) {
                    var data = argument.showapi_res_body.pagebean.contentlist
                    showPage(data);
                    // 更新缓存池
                    cache[page] = data;
                    // console.log(cache);
                })
                .fail(function() {
                })
                .always(function() {
                    // console.log("complete");
                });
            console.timeEnd('获取数据' + page) //测试预测时间
        }
        //渲染数据
        function showPage(data) {
            var str = '';
            for (var i = 0, len = data.length; i < len; i++) {
                // 执行体
                str += '<li class="section__content_entry_item">'+
                '<div class="section__content_entry_item_block" href="javascript:;">'+
                    '<div class="section__content_entry_item_imgbox">'+
                        '<a href="'+data[i].link+'" title="">'+
                            '<img class="section__content_entry_item_img" src="/images/news.jpg" alt="">'+
                        '</a>'+
                    '</div>'+
                    '<div class="section__content_entry_item_text">'+
                        '<a href="'+data[i].link+'" title=""><h2 class="section__content_entry_item_title">'+data[i].title+'</h2></a>'+
                        '<p class="section__content_entry_item_content">'+data[i].desc+'</p>'+
                        '<a class="section__content_entry_item_button" href="'+data[i].link+'">&gt;&gt;更多内容</a>'+
                    '</div>'+
                '</div>'+
            '</li>'
            }

            // 用于渲染分页数据 str 渲染的内容
            oCon.innerHTML = str;

            // maxStart = len/maxResult;
            //  console.log(maxStart)
            // console.log(start);
        }
        //新闻列表分页
        $("#pagination1").pagination({
            currentPage: 1, //初始页
            totalPage: 30, //末尾页
            isShow: true, //是否显示首页和尾页按钮
            count: 7, //显示多少页
            homePageText: "<<",
            endPageText: ">>",
            prevPageText: "<",
            nextPageText: ">",
            callback: function(current) {
                
            }
        });
    })()




    //热门商品分页
    $("#pagination2").pagination({
        currentPage: 1, //初始页
        totalPage: 30, //末尾页
        isShow: true, //是否显示首页和尾页按钮
        count: 7, //显示多少页
        homePageText: "<<",
        endPageText: ">>",
        prevPageText: "<",
        nextPageText: ">",
        callback: function(current) {
            $("#current2").text(current);
        }
    });

    //热门商品分页
    $("#pagination3").pagination({
        currentPage: 1, //初始页
        totalPage: 30, //末尾页
        isShow: true, //是否显示首页和尾页按钮
        count: 7, //显示多少页
        homePageText: "首页",
        endPageText: "尾页",
        prevPageText: "上一页",
        nextPageText: "下一页",
        callback: function(current) {
            $("#current2").text(current);
        }
    });





})