// 从立即购买页面进入到结算页时渲染寄送地址信息
function addressDataAddBuy() {
    if (document.querySelector('.select_address li')) {
        var address = $('.select_address input[name=address]:checked').attr('id');
        var userArea = $('.select_address input[name=address]:checked').siblings('span').find('.user_area').text();
        var userName = $('.select_address input[name=address]:checked').siblings('span').find('.user_name').find('em').text();
        var userPhone = $('.select_address input[name=address]:checked').siblings('span').find('.user_phone').text();
        var data = {};
        data['address'] = address;
        data['userArea'] = userArea;
        data['userName'] = userName;
        data['userPhone'] = userPhone;
        var html = '<p class="submit-address" data-id='+data.address+'>寄送至<em>'+data.userArea+'</em><span>收货人：<em>'+data.userName+'</em></span><span>'+data.userPhone+'</span></p>'
        $('.submit-address').replaceWith(html);
    } else {
        return;
    }
}
// 地址为空的时候
function addressDataAddBuyNull() {
    if (document.querySelector('.submit-text')) {
        var html = '<p class="submit-address" data-id=null>您还没有收获地址，快去添加收获地址吧</p>';
        $('.submit-address').replaceWith(html);
    } else {
        return;
    }

}

function addressChange() {
    $('.Addaddress').on('change', '.select_address input[name=address]', function () {
        addressDataAddBuy();
    })
}



$(function () {
    addressChange()
})