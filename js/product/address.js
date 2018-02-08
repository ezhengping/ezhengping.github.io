/**
 * 设置地址对象
 * 
 * @param {any} Status  - 默认地址状态  true  false;
 * 
 */
var addressStatus = {
    html: function (Status) {
        if (Status) {
            return '已是默认地址';
        } else {
            return '设置默认地址'
        }
    },
    class: function (Status) {
        if (Status) {
            return 'default_address';
        } else {
            return 'set_default_address';
        }
    }
};

// 选中状态加载数据
function addAlladdress(data) {
    html = '';
    $.each(data, function (index, obj) {
        html += ''+
            '<li class="">'+
                '<div class="Checked_style">'+
                    '<i></i>'+
                    '<span>寄送至</span>'+
                '</div>'+
                '<div class=address_main>'+
                    '<label for="'+obj.id+'">'+
                        '<input id="'+obj.id+'" type="radio" name="address">'+
                        '<span class="user_address">'+
                            '<span class="user_area">'+obj.province+'   '+obj.city+'   '+obj.area+'   '+obj.address+'</span>'+
                        '<span class="user_name">(<em>'+obj.name+'</em>)</span>'+
                        '<span class="user_phone">'+obj.phone+'</span>'+
                        '</span>'+
                    '</label>'+
                    '<div class="Del_address">'+
                        '<span>删除当前地址</span>'+
                    '</div>'+
                    '<div class="'+addressStatus.class(obj.isDefault)+'">'+
                        '<span>'+addressStatus.html(obj.isDefault)+'</span>'+
                    '</div>'+
                '</div>'+
            '</li>'
    })
    $(".select_address").html(html);
    var index = atvDefaultAddress()
    checkedAtv(index);

    //结算页地址渲染
    addressDataAddBuy()
}

//获取默认选中状态的index;
function atvDefaultAddress() {
    var ind = 0
    $('.select_address li').each(function (index, obj) {
        if ($(obj).find('.default_address')[0]) {
            ind = index;
        }
    })
    return ind;
}
/**
 * 
 * 
 * @param {number} inde  - inde 索引值
 */
function checkedAtv(inde) {
    if (inde != undefined) {
        addressChecked(inde);
    } else {
        var indenomer = 0;
        addressChecked(indenomer);
    }
    $('.select_address input').change(function () {
        var inde = $('.select_address input').index($(this));
        addressChecked(inde);
    })
}

// 选择收获地址
function addressChecked(inde) {
    var html = 
                '<div class="Checked_style">'+
                    '<i></i>'+
                '<span>寄送至</span>'+
                '</div>'
                
    $('.select_address input').eq(inde).prop('checked', 'true');
    if ($('.select_address input').eq(inde).prop('checked')) {
        $('.select_address input').eq(inde).parents('li').addClass('address_atv')
            .prepend(html)
            .siblings('li').removeClass('address_atv')
            .children('.Checked_style').remove();
    }
}

// 隐藏收获地址表单
function noneAddress() {
    $('.new_address').css('display', 'none');
}
// 显示表单
function blockAddress() {
    var html = '<iframe src="/address/address.html" name="address_iframe" scrolling="no" width="600" height="500" style="background-color: #fff;border:0"></iframe>'
    $('.iframe_box_item').html(html);
    $('.new_address').css('display', 'block');
}


// 添加收获地址填写表单
function addiframePop_ups() {
    $('.iframe_shut').click(function () {
        noneAddress();
    })
    $('.Addaddress').on('click', '.add_address', function (event) {
        blockAddress()
    })
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


// 鼠标悬停到收获地址时显示当前的地址栏删除按钮
function DelAddress(_this) {
    var paren = $(_this).parents('li');
    var id = paren.find('input').attr('id')
    var delInde = $('.select_address li').index(paren);
    var atvInde = $('.select_address li').index($('.address_atv'));
    var lenInde = $('.select_address li').length - 1;
    // console.log('选中的：'+atvInde,'最后一个：'+lenInde,'要删除的：'+delInde);
    layer.open({
        title: '删除商品',
        content: '你确定要删除该地址吗？',
        btn: ['确定', '取消'],
        btnAlign: 'c',
        shadeClose: true,
        yes: function (index, layero) {
            if (atvInde == lenInde) {
                atvInde -= 1;
            } else if (atvInde == delInde) {
                atvInde += 1;
            }
            // 调用删除地址请求
            if (ajaxDelAddress(id) == 111) {
                layer.close(index);
                layer.alert('删除失败');
                return;
            }
            addressChecked(atvInde);
            paren.remove();
            AddressNull()
            layer.close(index);
        },
        btn2: function () {
            // 按钮取消的回掉函数
        }
    })
}


// 获取所有收获地址
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
                AddressNoNull()
                // 加载地址
            }
            // 添加页面数据
            addAlladdress(data);

            // 页面点击事件
            delAddressClick()
        })
}


//当收获地址等于0时
function AddressNull() {
    var html = '<div class="address_null">'+
                    '<span>你还没有收获地址，快去添加吧~~~</span>'+
                    '<a href="javascript:;" class="add_address" title="">添加收获地址</a>'+
                '</div>'
    addressDataAddBuy();
    var li = $('.select_address li');
    if (li.length == 0) {
        addressDataAddBuyNull()
        $('.address_num').remove();
        $('.Addaddress').html(html);
    }
}

//收获地址不等于空时
function AddressNoNull() {
    var html = 
                '<div class="address_num">'+
                    '<ul class="select_address">'+
                    '</ul>'+
                    '<div class="add_address_btn">'+
                        '<a href="javascript:;" class="add_address" title="">添加新地址</a>'+
                    '</div>'+
                '</div>'
    $('.address_num').remove();
    $('.Addaddress').html(html);
}

// 删除收获地址
function delAddressClick() {
    $('.Del_address').on('click', 'span', function () {
        DelAddress(this);
    })
}

// 设置默认地址按钮被点击
function setDefaultAddressClick() {
    $('.Addaddress').on('click', '.set_default_address', function () {
        var ID = $(this).parents('li').find('input').attr('id');
        setDefaultAddress(ID);
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
                ajaxAllAddaddress()
            } else if (data == 111) {
                layer.alert('设置默认失败');
            }
        })
}


$(function () {
    // 加载地址数据
    ajaxAllAddaddress();

    // 设置默认点击事件
    setDefaultAddressClick();
    // 开启关闭弹出窗口
    addiframePop_ups();
})