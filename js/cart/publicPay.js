function ajaxWeChatPayPic() {
    var oIArr = JSON.stringify(getParam('orderIds').split(','));
    $.ajax({
            url: PATH + '/order/getTotalPrice.action',
            type: 'POST',
            data: {
                'json': oIArr,
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data == -1) {
                alert('参数错误,请前往个人页面继续付款');
                return;
            }
            if (data == 0.0) {
                alert('订单异常');
            }
            // $('.pic em').text(data);
        })

    $.ajax({
            url: PATH + '/order/getPaymenInfo.action',
            type: 'POST',
            data: {
                'orderIds': getParam('orderIds'),
                'paymentWay': 3
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            addDataAddress(data.address);
            addDataPublic(data.publicTransferInfo)
            $('.pic em').text(data.totalPrice);
            $('.oI_number em').text(getParam('orderIds'));
        })
}

function addDataAddress(obj) {
    var html =
        '<tr >' +
        '<td colspan=2>查看收获地址</td>' +
        '</tr>' +
        '<tr>' +
        '<td>收获人:</td>' +
        '<td>' + obj.name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>收获地区:</td>' +
        '<td>' + obj.province + ' ' + obj.city + ' ' + obj.area + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>收获详细地址:</td>' +
        '<td>' + obj.address + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>收获人电话:</td>' +
        '<td>' + obj.phone + '</td>' +
        '</tr>'
    $('.address').html(html);
}
function addDataPublic(obj){
    var html =  '<tr>'+
                    '<td colspan=2>联系公司</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>户名:</td>'+
                    '<td>淘味网络技术（武汉）有限公司</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>账号:</td>'+
                    '<td>3202105809100124068</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>开户行:</td>'+
                    '<td>工行武汉软件园支行</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>联系人</td>'+
                    '<td>朱淑君</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>联系电话</td>'+
                    '<td>18671956888</td>'+
                '</tr>'+
                '<tr>'+
                    '<td colspan=2>请联系我们的相关负责人，进行咨询订单情况</td>'+
                '</tr>'
    $('.public_I').html(html);
}


$(function(){
    ajaxWeChatPayPic();
})