$("#page_ps").pagination({
    currentPage: 1, //初始页
    totalPage: 100, //末尾页
    isShow: true, //是否显示首页和尾页按钮
    count: 7, //显示多少页
    homePageText: "<<",
    endPageText: ">>",
    prevPageText: "<",
    nextPageText: ">",
    callback: function (pageNo) {}
});

var psBeans = new BatchCollection({
    batchbox: '.batch_btn', //批量管理按钮
    batchCombox: '.batch_complete', //完成按钮
    batchMenubox: '.batch_menu', //管理菜单
    batchComMenubox: '.ps_shop_menu', //被管理的菜单
    batchComMenuItembox: '.ps_shop_item', //被管理菜单的子集
    batchComMenuAddClass: 'z-goods-batch', //向被管理菜单盒子添加的class
    batchComMenuItemAddCliss: 'z-item-checked', //向被管理菜单盒子子集添加的class
    batchComMenuItemCheckbox: '.item_ps_check', //被管理菜单盒子子集批量管理遮罩
    batchCheckboxBtn: '.batch_checkbox_btn', //全选按钮
});
