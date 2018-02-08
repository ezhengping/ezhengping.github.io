/**
 * 
 * @param {data} data -渲染数据 
 */
function showPage(data) {
    var oCon = document.querySelector('.section__content_entry_entry');
    var str = '';
    for (var i = 0, len = data.length; i < len; i++) {
        // 执行体
        str += '<li class="section__content_entry_item">'+
        '<div class="section__content_entry_item_block" href="javascript:;">'+
            '<div class="section__content_entry_item_imgbox">'+
                '<a class="section__content_entry_item_img" href="'+data[i].fileUrl+'" target="_blank"  style="background-image:url('+data[i].imgUrl+')">'+
                '</a>'+
            '</div>'+
            '<div class="section__content_entry_item_text">'+
                '<a href="'+data[i].fileUrl+'" target="_blank"><h2 class="section__content_entry_item_title">'+data[i].fileName+'</h2></a>'+
                '<p class="section__content_entry_item_content">'+data[i].fileName+'</p>'+
                '<a class="section__content_entry_item_button" target="_blank" href="'+data[i].fileUrl+'">&gt;&gt;更多内容</a>'+
            '</div>'+
        '</div>'+
    '</li>'
    }
    oCon.innerHTML = str;
}

function newsNull(){
    var oCon = document.querySelector('.section__content_entry_entry');
    
    var html = 
    '<li class="null">'+
        '当前页面暂无数据~~~~~~~'+
    '</li>'

    oCon.innerHTML = html;
}




//新闻列表分页初始化
function paginationNew(){
    // var pagLen =  document.getElementById('pagination1').dataset.val;
    $("#pagination1").pagination({
        currentPage: 1, //初始页
        totalPage: 1, //末尾页
        isShow: true, //是否显示首页和尾页按钮
        count: 7, //显示多少页
        homePageText: "<<",
        endPageText: ">>",
        prevPageText: "<",
        nextPageText: ">",
        callback: function(pageNo) {
            ajaxPaginationNew(pageNo);
        }
    });
}
/**
 * 
 * @param {number} pageNo -当前页 
 */
function ajaxPaginationNew(pageNo){
    var url =PATH+'/news/newsList.action'
    $.ajax({
    url:url,
    type:'POST',
    data: {'pageNo':pageNo},
    xhrFields:{
        withCredentials: true
    },
    crossDomain: true,
    })
    .done(function(data) {
        if (data.length) {
            showPage(data);
        }else{
            newsNull();
        }
    })
    .fail(function() {
        newsNull();
    })
}

$(function() {
    ajaxPaginationNew(1);
    paginationNew()
})