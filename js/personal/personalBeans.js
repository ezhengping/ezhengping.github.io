

        // 加载味豆详情数据
        function dataDeansDetails(data) {
            var html = '';
            $.each(data.commonPage.common,function(index,obj){
                html+=  '<tr>'+
                            '<td>'+
                                '<time>'+obj.createTimeString+'</time>'+
                            '</td>'+
                            '<td>'+obj.number+'</td>'+
                            '<td>'+obj.title+'</td>'+
                        '</tr>'
            })
            $('.pb_details_item table').html(html);
        }

        // 分页插件
        function pageBase(pagelen){
            $("#page_pb").pagination({
                currentPage: 1, //初始页
                totalPage: pagelen, //末尾页
                isShow: true, //是否显示首页和尾页按钮
                count: 7, //显示多少页
                homePageText: "<<",
                endPageText: ">>",
                prevPageText: "<",
                nextPageText: ">",
                callback: function (pageNo) {
                    ajaxBeansDetails({'pageNo':pageNo},function(data){
                        dataDeansDetails(data);
                    })
                }
            })
        }

        // 获取味豆详情
        function BeansDetails(){
            var pagelen;
            ajaxBeansDetails({'pageNo':1},function(data){
                dataDeansDetails(data);
                pagelen = data.commonPage.totalPage;
                pageBase(pagelen);
            });
        }

        $(function(){
            // 加载总味豆数
            ajaxUsernameAndBean(function (data) {
                $('.pb_toN h3').text(data.bean);
            })
            // 选项卡
            var tab = new Tab({
                TabEle: '.pb_Tab',
                optionEle: '.pb_item',
                addClass: 'pb_title_atv'
            });

            // 查询味豆详情
            BeansDetails()
        })
        