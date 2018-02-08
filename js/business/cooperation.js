function bottomLineHtml(String) {
    var html =
        '<div class="bottom_line" style = "text-align: center;font-size: 12px;padding-top: 40px;padding-bottom: 40px;">'+String+'</div>'
    $('.shop_commodity').append(html)
}

/**
 * 鼠标滚动加载数据
 * 
 * @param {number} length 
 * @param {fn} ajaxFn 
 */
function commodityPage(length, ajaxFn) {
    var Ele = document.querySelector('.section_cooperation');
    var pageNo = parseInt(Ele.dataset.pageNo);
    //获取滚动条高度   获取最后一个元素距离页面顶部的高度
    var Ele = $('.section_cooperation a').eq($('.section_cooperation a').length - 13).offset().top;
    $(document).scroll(function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 判断滚动条高度是否大于等于最后一个元素距离顶部的高度
        //    console.log('当前滚动条的高度'+scrollTop,'最后一个元素的高度：'+Ele);
        if (scrollTop >= Ele) {
            $(document).unbind("scroll");
            pageNo += 1;
        } else {
            return;
        }
        // 当前页+1是否大于最后一页
        if (pageNo > length) {
            var bottomLine = document.querySelector('.bottom_line');
            //判断元素是否存在存在就return不存在添加元素  
            // 元素作用是提示用户这是底线了
            if (!bottomLine) {
                bottomLineHtml('这里已经是底线了哟')
                return;
            } else {
                return;
            }
        }
        // 需要加载数据的函数ajax传入page页数
        ajaxFn(pageNo)

    });

}



// 品牌数据
function brandAjax(pageNo) {
    $.ajax({
            url: PATH + '/brand/queryAllBrand.action',
            type: 'GET',
            data: {
                'pageNo': pageNo,
                'pageSize': 30
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            // console.log(data);
            // 装载数据
            addcoopeation(data)

            // 将当前页数赋值给自定义属性
            var Ele = document.querySelector('.section_cooperation');
            Ele.dataset.pageNo = pageNo;

            commodityPage(data.totalPage, brandAjax)
        })
        .fail(function () {
            coopeationNull();
        })

}

function addcoopeation(data) {
    var html = '';
    $.each(data.result, function (index, obj) {
        html +=
                '<a class="cooperation__item" href="/page/brand/brandDetails.html?brandId='+obj.brandImage.id+'">'+
                    '<div>'+
                        '<img src="'+obj.brandImage.logo+'" alt="">'+
                    '</div>'+
                '</a>'
    })
    $('.section_cooperation__mid').append(html);
}


function coopeationNull() {
    var html =
        '<div class="null">' +
        '暂无品牌数据~~~~' +
        '</div>'
    $('.section_cooperation__mid').html(html);
}
$(function () {
    brandAjax(1);

})