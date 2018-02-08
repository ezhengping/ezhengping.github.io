// 获取所有地址
function ajaxAllAddaddress() {
    $.ajax({
            url: PATH + '/address/getAllAddress.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
        .done(function (data) {
            if (data.result == 7) {
                location.href = '/page/login/login.html'
            }
            if (data.length == 0) {
                AddressNull()
            } else {
                AddressNoNull(data)
                // 加载地址
            }
        })
}

function AddressNoNull(data) {
    // 判断是否是默认收获地址
    function defultAddress(isDefault) {
        switch (isDefault) {
            case true:
                return '<i>默认地址</i>';
                break;

            default:
                return '';
                break;
        }
    }
    // 判断是否是默认地址
    function tabDefultAddress(isDefault) {
        switch (isDefault) {
            case true:
                return '<span class="beenSetDefult">已是默认地址</span>';
                break;

            default:
                return '<a href="javascript:;" class="setDefult">设置默认地址</a>';
                break;
        }
    }
    var html = '';
    var tHtml = '';
    for (var i = 0; i < data.length; i++) {
        if (data[i].isDefault) {
            tHtml =
                '<li class="address_details_item" data-id="'+data[i].id+'">'+
                    '<div class="address_details_title clearfix">'+
                        '<h5>'+
                            '<em>'+data[i].name+'</em>'+
                            defultAddress(data[i].isDefault)+
                        '</h5>'+
                        '<a href="javascript:;" class="delAddress" data-id="'+data[i].id+'">'+
                        '</a>'+
                    '</div>'+
                    '<div class="address_details">'+
                        '<table>'+
                            '<tr>'+
                                '<td>收货人：</td>'+
                                '<td class="ad_receiver">'+data[i].name+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>所在地区：</td>'+
                                '<td class="ad_area"><em>'+data[i].province+'</em> <em>'+data[i].city+'</em> <em>'+data[i].area+'</em></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>地址：</td>'+
                                '<td class="ad_detailed">'+data[i].address+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>邮政编码：</td>'+
                                '<td class="ad_postCodes">'+data[i].postCodes+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>手机：</td>'+
                                '<td class="ad_phone">'+data[i].phone+'</td>'+
                            '</tr>'+
                        '</table>'+
                        '<div class="default_address">'+
                            tabDefultAddress(data[i].isDefault)+
                            '<a href="javascript:;"  class="edit" data-address='+JSON.stringify(data[i]).replace(/\s/g,"&nbsp;")+'>编辑</a>'+
                        '</div>'+
                    '</div>'+
                '</li>'
        } else {
            html +=
                '<li class="address_details_item" data-id="'+data[i].id+'">'+
                    '<div class="address_details_title clearfix">'+
                        '<h5>'+
                            '<em>'+data[i].name+'</em>'+
                            defultAddress(data[i].isDefault)+
                        '</h5>'+
                        '<a href="javascript:;" class="delAddress" data-id="'+data[i].id+'">'+
                        '</a>'+
                    '</div>'+
                    '<div class="address_details">'+
                        '<table>'+
                            '<tr>'+
                                '<td>收货人：</td>'+
                                '<td class="ad_receiver">'+data[i].name+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>所在地区：</td>'+
                                '<td class="ad_area"><em>'+data[i].province+'</em> <em>'+data[i].city+'</em> <em>'+data[i].area+'</em></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>地址：</td>'+
                                '<td class="ad_detailed">'+data[i].address+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>邮政编码：</td>'+
                                '<td class="ad_postCodes">'+data[i].postCodes+'</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>手机：</td>'+
                                '<td class="ad_phone">'+data[i].phone+'</td>'+
                            '</tr>'+
                        '</table>'+
                        '<div class="default_address">'+
                            tabDefultAddress(data[i].isDefault)+
                            '<a href="javascript:;" class="edit" data-address='+JSON.stringify(data[i]).replace(/\s/g,"&nbsp;")+'>编辑</a>'+
                        '</div>'+
                    '</div>'+
                '</li>'
        }
    }
    html = tHtml + html;
    $('.personal_address_details ul').html(html);
}
// 判断地址是否为空
function AddressNull() {
    var Ele = $('.personal_address_details ul li')[0];
    if (!Ele) {
        var html =
        '<li class="address_null">'+
            '<div>'+
                '<div>你还没有收获地址，赶紧添加收获地址吧~~~</div>'+
                '<a href="javascript:;" class="btn_text add_address_btn">添加收获地址</a>'+
            '</div>'+
        '</li>'
        $('.personal_address_details ul').html(html);
        return;
    }
    return;
}

// 隐藏收获地址表单
function noneAddress() {
    $('.new_address').css('display', 'none');
}
// 显示表单
function blockAddress() {
    var html =
        '<iframe src="/address/address.html" name="address_iframe" scrolling="no" width="600" height="500" style="background-color: #fff;border:0"></iframe>'
    $('.iframe_box_item').html(html);
    $('.new_address').css('display', 'block');
    return true;
}

/**
 * 删除收获地址
 * 
 * @param {any} id -传入的地址ID
 */
function ajaxDelAddress(id) {
    $.ajax({
        url: PATH + '/address/deleteAddress.action',
        type: 'POST',
        data: {
            'id': id
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (data) {
            if (data == 110) {
                return data;
            } else if (data == 111) {
                return data;
            }
        }
    })
}


// 删除地址
function DelAddress(_this) {
    var paren = $(_this).parents('li');
    var id = $(_this).data('id');
    layer.open({
        title: '删除地址',
        content: '你确定要删除该地址吗？',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shadeClose: true,
        yes: function (index, layero) {
            if (ajaxDelAddress(id) == 111) {
                layer.close(index);
                layer.alert('删除失败');
                return;
            }
            // 删除当前地址
            paren.remove();
            // 调用地址为空函数
            AddressNull();
            layer.close(index);
        },
        btn2: function () {
            // 按钮取消的回掉函数
        }
    })
}

// 设置默认收获地址
function setDefaultAddress(id) {
    $.ajax({
            url: PATH + '/address/updateDefault.action',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                'id': id
            },
        })
        .done(function (data) {
            if (data == 110) {
                layer.alert('设置成功');
                ajaxAllAddaddress()
            } else if (data == 111) {
                layer.alert('设置默认失败');
                ajaxAllAddaddress()
            }
        })
}

// 编辑修改默认地址
function editAddress(_this) {
    var addresObj = $(_this).data('address');
    // var addresObjParse = JSON.parse($(_this).data('address'));
    // var Ele = $(_this).parents('.address_details_item');
    // var id = Ele.data('id');
    // var provinceVal = Ele.find('.ad_area').find('em:first').text();
    // var cityVal = Ele.find('.ad_area').find('em').eq(1).text();
    // var areaVal = Ele.find('.ad_area').find('em:last').text();
    // var addressVal = Ele.find('.ad_detailed').text();
    // var postCodesVal = Ele.find('.ad_postCodes').text();
    // var phoneVal = Ele.find('.ad_phone').text();
    // var nameVal = Ele.find('.ad_receiver').text();
    address_iframe.window.$('#province').data('val', addresObj.province);
    address_iframe.window.$('#city').data('val', addresObj.city);
    address_iframe.window.$('#area').data('val', addresObj.area);
    address_iframe.window.$('textarea[name=address]').val(addresObj.address);
    address_iframe.window.$('input[name=postCodes]').val(addresObj.postCodes);
    address_iframe.window.$('input[name=phone]').val(addresObj.phone);
    address_iframe.window.$('input[name=name]').val(addresObj.name);
    address_iframe.window.$('.submit').data('id',addresObj.id);
    if(addresObj.isDefault){
        address_iframe.window.$('input[name=isDefault]').attr('checked',true);
    }else{
        address_iframe.window.$('input[name=isDefault]').removeAttr('checked');
    }
}


// 地址点击事件
function funAddressClick() {
    $('.personal_address').on('click', '.delAddress', function () {
        DelAddress(this);
    })
    $('.personal_address').on('click', '.add_address_btn', function () {
        blockAddress();
    })
    $('body').on('click', '.iframe_shut', function () {
        noneAddress();
    })
    $('.personal_address').on('click', '.setDefult', function () {
        var id = $(this).parents('.address_details_item').data('id');
        setDefaultAddress(id);
    })
    $('.personal_address').on('click', '.edit', function () {
        blockAddress();
        var _this = this;
        setTimeout(function () {
            editAddress(_this);
            address_iframe.window.editAddress();
        },80)

    })
}
$(function () {
    ajaxAllAddaddress();
    funAddressClick();
})