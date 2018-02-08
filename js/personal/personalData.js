        $(function () {

            // 初始化选项卡
            var tab = new Tab({
                TabEle: '.pd_Tab',
                optionEle: '.pd_item',
                addClass: 'pd_title_atv'
            });
            // 编辑完成按钮被点击时
            modifyClick()

            // 获取用户信息
            UserData();

            // input添加悬停样式
            inputStyle()

            // 上传文件
            uploadChange()
            upCompleteClick()
        })


        // 自定义验证  传入正则表达式进行验证
        $.validator.addMethod('custom', function (value, element, params) {
            var reg = params;
            if (reg.test(value)) {
                return true;
            } else {
                return false;
            }
        }, '请输入验证提示信息')

        // 自定义验证  传入字符串进行验证，如果字符串为'null'则返回false 
        $.validator.addMethod('valueNotNull', function (value, element, params) {
            return params !== value
        }, '该选项不能为空')

        $().ready(function () {
            $("#user_data").validate({
                rules: {
                    year: {
                        valueNotNull: 'null'
                    },
                    month: {
                        valueNotNull: 'null'
                    },
                    day: {
                        valueNotNull: 'null'
                    },
                    userName: {
                        required: true,
                        maxlength: 10
                    },
                    sex: {
                        required: true
                    }

                },
                messages: {
                    year: {
                        valueNotNull: '该选项不能为空'
                    },
                    month: {
                        valueNotNull: '该选项不能为空'
                    },
                    day: {
                        valueNotNull: '该选项不能为空'
                    },
                    userName: {
                        required: '该选项不能为空',
                        maxlength: '最大长度不能超过10个字符'
                    },
                    sex: {
                        required: '必须选中一个'
                    }
                },
            })
        })

        // 获取用户信息
        function UserData() {
            // 初始化到全局变量
            // 初始化日期
            var day = new Day({
                DayBox: '.user_birthday',
                yearName: 'year',
                monthName: 'month',
                dayName: 'day',
                plusNumber: 0,
                lessNumber: 100,
            })

            $.ajax({
                    url: PATH + '/user2/getBuyerInfomation.action',
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                })
                .done(function (data) {
                    // console.log(data);

                    if (data.result == 7) {
                        location.href = '/page/login/login.html'
                    }

                    // 加载名称类
                    $('.user_name_text').text(judgeNull(data.nickName))
                    $('.user_sex_text').text(sex(judgeNull(data.sex)))
                    $('.user_birthday_text').text(dayFormat(data.birthDay))
                    $('.pd_user_Img img').attr('src', data.headSculpture);
                    $('input[name=userName]').val(judgeNull(data.nickName))
                    $('.pd_user_text h3 em').text(judgeNull(data.nickName));

                    // 查询用户订单总金额
                    ajaxTotalSum(function (data) {
                        vipLeverData(data, function (a, b, c) {
                            var lever;
                            switch (c) {
                                case 0:
                                    lever = 'V1铜牌会员'
                                    break;
                                case 1:
                                    lever = 'V2银牌会员'
                                    break;
                                case 2:
                                    lever = 'V3金牌会员'
                                    break;
                                case 3:
                                    lever = 'V2铂金会员'
                                    break;
                                case 4:
                                    lever = 'V2钻石会员'
                                    break;
                                default:
                                    break;
                            }
                            $('.pd_user_text h4 em').text(judgeNull(lever));
                        });
                    })
                    
                    // 判断选择哪一个
                    $.each($('input[name=sex]'), function (index, obj) {
                        if ($(obj).val() == data.sex) {
                            $(obj).prop('checked', true);
                        }
                    })

                    // 初始化图像资料
                    $('.pd_img_box img').attr('src', '');
                    $('.Img_preview img').attr('src', '');
                    $('input[name=picture]').val('');

                    // 初始化日期
                    // var data = {};
                    // data.birthDay=null
                    if (data.birthDay) {
                        var date = new Date(data.birthDay)
                        day.Year = date.getFullYear();
                        day.Month = date.getMonth() + 1;
                        day.Day = date.getDate();
                        day.initDate();
                    }else{
                        var date = new Date()
                        day.Year = date.getFullYear();
                        day.Month = date.getMonth()+1;
                        day.Day = date.getDate();
                        day.initDate();
                    }
                })
        }
        // 如果用户数据为空
        function judgeNull(data) {
            if (data == null) {
                return ''
            } else {
                return data;
            }
        }
        // 判断男女
        function sex(data) {
            switch (data) {
                case 0:
                    return '男';
                case 1:
                    return '女';
            }
        }
        // 格式化日期
        function dayFormat(data) {
            if (data) {
                var Format = new DayFormat({
                    msec: data
                });
                var date = Format.standardDay();
                return date.Year + ' 年 ' + date.Month + ' 月 ' + date.Day + ' 日 ';
            }else{
                return '--';
            }
        }


        // 完成或编辑按钮被点击时
        function modifyClick() {
            $('.modifyUserData_btn').click(function () {
                if ($(this).data('type') == '0') {
                    $(this).data('type', '1')
                    $(this).text('完成').css('background-color', '#fdfae9');
                    $('.pd_user_data').eq(1).css('display', 'block').siblings('.pd_user_data').css('display',
                        'none');
                } else if ($(this).data('type') == '1') {
                    var name = $('input[name=userName]').val();
                    var sex = ''
                    $.each($('input[name=sex]'), function (input, obj) {
                        if ($(obj).prop('checked')) {
                            sex = $(obj).val();
                        }
                    })
                    var year = $('select[name=year]').val();
                    var month = $('select[name=month]').val();
                    var day = $('select[name=day]').val();
                    var data = {};
                    data['nickName'] = name;
                    data['sex'] = sex;
                    // data['birthDayString'] = year + '-' + month + '-' + day;
                    data['birthDay'] = new Date(year, month - 1, day)
                    // var data = $('#user_data').serialize()

                    $(this).data('type', '0')
                    $(this).text('编辑').css('background-color', '#e9f7fd');
                    modifyUserData(data, UserData);
                    $('.pd_user_data').eq(0).css('display', 'block').siblings('.pd_user_data').css('display',
                        'none');
                } else {
                    alert('点击出错，请刷新后重试');
                }
            })
        }


        // 修改个人信息
        function modifyUserData(data, callback) {
            $.ajax({
                    url: PATH + '/user2/updateUserInfomation.action',
                    type: 'POST',
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                })
                .done(function (data) {
                    if (data.result == 7) {
                        location.href = '/page/login/login.html'
                    }
                    if (data == 110) {
                        callback()
                    } else if (data == 111) {
                        layer.alert('参数错误，请刷新后重试！！！');
                    }
                })
        }

        function nullImg() {
            if ($('.pd_img_box img').attr('src')) {
                $('.pd_img_box img').siblings('div').css('display', 'none');
            } else {
                $('.pd_img_box img').siblings('div').css('display', 'block');
            }
        }

        // 上传文件表单元素val发送改变时执行上传
        function uploadChange() {
            $('input[name=picture]').change(function () {
                // 上传图片
                upload(this, function (data) {
                    $('.pd_img_box img').attr('src', data.URL);
                    $('.Img_preview img').attr('src', data.URL);
                    nullImg()
                })
            })
        }



        // 完成修改
        function upCompleteClick() {
            $('.img_complete').click(function () {
                if ($('input[name=picture]').val()) {
                    var data = {};
                    data.headSculpture = $('.Img_preview img').attr('src');
                    modifyUserData(data, UserData)
                    $('.pd_img_box div').css('display', 'block');
                    layer.alert('头像修改成功');
                } else {
                    layer.alert('请选择上传的文件');
                }
            })

        }

        // 选框获取焦点时改变样式
        function inputStyle() {
            $('input,textarea,select').not('input[type=submit],input[type=radio]').focus(function (event) {
                $(this).css({
                    'border-color': '#ff7f26',
                    'box-shadow': '0 0 5px rgba(255,127,38,.6)'
                });
            });
            $('input,textarea,select').not('input[type=submit],input[type=radio]').blur(function (event) {
                $(this).css({
                    'border-color': '#afafaf',
                    'box-shadow': '0 0 5px rgba(255,127,38,0)'
                });
            });
        }