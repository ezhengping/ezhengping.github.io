$(function () {
    // 获取用户信息,判断是否登录
    ajaxUsernameAndBean(function (data) {
        // console.log(data);
        if (data.result == 7) {
            $('.header_icenter_out').css('display', 'none');
            layer.open({
                title: '温馨提醒',
                content: '您还没有登录,需要登录之后才能进行入驻操作',
                btn1: function (index, layero) {
                    location.href = '/page/login/login.html'
                    layer.close(index);
                },
                cancel: function (index, layero) {
                    layer.close(index);
                }
            })
        } else {
            $('.header_icenter_out').css('display', 'inline-block');
            $('.header_icenter_info').text(data.name).attr('href', '/page/personal/personalHome.html')
        }
    }, false)

    
    inputStyle()
    
    // 上传图片
    uploadChange()
})

function uploadChange() {
    $('input[type=file]').change(function () {
        // 上传图片
        var _this = this;
        upload(_this, function (data) {
            console.log(data);
            $(_this).parents('.base_fill').find('.img').attr('src', data.URL);
            $(_this).siblings('input[type=hidden]').val(data.URL);
        })
    })
}


// 选框获取焦点时改变样式
function inputStyle() {
    $('input,textarea,select').not('input[type=submit],input[type=file]').focus(function (event) {
        $(this).css({
            'border-color': '#ff7f26',
            'box-shadow': '0 0 5px rgba(255,127,38,.6)'
        });
        $(this).parents('.base_fill').find('.base_fill_p').css({'display':'block'})
    });
    $('input,textarea,select').not('input[type=submit]').blur(function (event) {
        $(this).css({
            'border-color': '#e0e0e0',
            'box-shadow': '0 0 5px rgba(255,127,38,0)'
        });
    });
}



function ajaxGetSelectCompanyType(callback){
    $.ajax({
        url:PATH+'/user2/selectCompanyOccupancy.action',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        })
        .done(function(data) {
            if (callback) {
                callback(data);
            }
        })
        
}




 