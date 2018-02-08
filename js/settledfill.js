	function form() {

	    // 验证入驻人姓名
	    function name(namecls) {
	        var val = $(namecls + ' .input').val();
	        var reg = /[\u4e00-\u9fa5]/
	        if (reg.test(val)) {
	            $(namecls + ' i').css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $(namecls + ' i').html('');
	            return true;
	        } else {
	            $(namecls + ' i').html('请输入正确的姓名要求为中文汉字').css('display', 'block');
	            $(namecls + ' .input').css({ 'border-color': 'red' })
	            return false;
	        }
	    }

	    // 验证入驻人邮箱
	    function mail(mailCls) {
	        var val = $(mailCls + ' .input').val();
	        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
	        if (reg.test(val)) {
	            $(mailCls + ' i').css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $(mailCls + ' i').html('');
	            return true;
	        } else {
	            $(mailCls + ' i').html('请输入正确的邮箱地址').css('display', 'block');
	            $(mailCls + ' .input').css({ 'border-color': 'red' })
	            return false;
	        }
	    }


	    // 验证入驻人手机号
	    function phone(phoneCls) {
	        var val = $(phoneCls + ' .input').val(); //获取手机输入框号码
	        var reg = /^[1][345678]\d{9}$/;
	        if (reg.test(val)) { //验证手机格式
	            $(phoneCls + ' .input').css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $(phoneCls + ' i').html('');
	            return true;
	        } else if (val == '') {
	            $(phoneCls + ' i').html('手机号码不能为空').css('display', 'block');
	            $(phoneCls + ' .input').css('border-color', 'red');
	            return false;
	        } else {
	            $(phoneCls + ' i').html('请输入有效的11位手机号').css('display', 'block');
	            $(phoneCls + ' .input').css('border-color', 'red');
	            return false;
	        }
	    }


	    // 验证再次输入手机号
	    function rePhone(phoneCls, rePhoneCls) {
	        var val = $(phoneCls + ' .input').val(); //获取手机输入框号码
	        var reval = $(rePhoneCls + ' .input').val() //获取再次输入的手机框号码
	        if (phone(phoneCls) == true && val == reval) {
	            $(rePhoneCls + ' .input').css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $(rePhoneCls + ' i').html('');
	            return true;
	        } else if (phone(phoneCls) == false) {
	            $(rePhoneCls + ' i').html('请先完成上方手机号码输入').css('display', 'block');
	            $(rePhoneCls + ' .input').css('border-color', 'red');
	            return false;
	        } else {
	            $(rePhoneCls + ' i').html('两次输入的手机号码不一样').css('display', 'block');
	            $(rePhoneCls + ' .input').css('border-color', 'red');
	            return false;
	        }
	    }


	    // 验证身份证号
	    function identity(IDCls) {
	        var val = $(IDCls + ' .input').val(); //获取身份证号码
	        var reg = /^\d{17}(\d|x)$|^\d{15}$/;
	        if (reg.test(val)) { //验证身份证
	            $(IDCls + ' .input').css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $(IDCls + ' i').html('');
	            return true;
	        } else {
	            $(IDCls + ' i').html('请输入正确的身份证号码').css('display', 'block');
	            $(IDCls + ' .input').css('border-color', 'red');
	            return false;
	        }
	    }

	    //验证第三方链接
	    function thirdLink(i) {
	        var val = $('.settled_thirdlink .input').eq(i).val(); //链接表单value
	        var reg = /[a-zA-z]+:\/\/[^\s]*/;
	        if (reg.test(val)) {
	            $('.settled_thirdlink .input').eq(i).css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $('.settled_thirdlink i').eq(i).html('');
	            return true;
	        } else {
	            $('.settled_thirdlink i').eq(i).html('示范:“ http://www.taoweiw.com/ ”').css('display', 'block');
	            $('.settled_thirdlink .input').eq(i).css('border-color', 'red');
	            return false;
	        }
	    }

		// 验证日期
		

	    // input获取到焦点时
	    $('form').on('focus', 'input.input', function() {
	        $(this).css({ 'box-shadow': '0 0 6px rgba(255,127,38,.5)', 'border-color': '#ff7f26' });
	    })
	    // input失去到焦点时
	    $('form').on('blur', 'input.input', function() {
	        $(this).css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	    })

	    // 入驻人姓名
	    $('.settled_name .input').focus(function() {
	        $('.settled_name p.settled_p').css('display', 'block');
	    })
	    $('.settled_name .input').blur(function() {
	        name('.settled_name');
	    })

	    // 入驻人邮箱
	    $('.settled_mail .input').focus(function() {
	        $('.settled_mail p.settled_p').css('display', 'block');
	    })
	    $('.settled_mail .input').blur(function() {
	        mail('.settled_mail');
	    })

	    // 入驻人手机号
	    $('.settled_phone .input').focus(function() {
	        $('.settled_phone p.settled_p').css('display', 'block');
	    })
	    $('.settled_phone .input').blur(function() {
	        phone('.settled_phone');
	    })

	    //再次输入手机号
	    $('.settled_rephone .input').focus(function() {
	        $('.settled_rephone p.settled_p').css('display', 'block');
	    })
	    $('.settled_rephone .input').blur(function() {
	        rePhone('.settled_phone', '.settled_rephone');
	    })

	    //身份验证
	    $('.settled_identity .input').focus(function() {
	        $('.settled_identity p.settled_p').css('display', 'block');
	    })
	    $('.settled_identity .input').blur(function() {
	        identity('.settled_identity');
	    })

	    // 验证紧急联系人名称
	    $('.settled_urgentname .input').focus(function() {
	        $('.settled_urgentname p.settled_p').css('display', 'block');
	    })
	    $('.settled_urgentname .input').blur(function() {
	        name('.settled_urgentname');
	    })

	    //验证紧急联系人手机号
	    $('.settled_urgentphone .input').focus(function() {
	        $('.settled_urgentphone p.settled_p').css('display', 'block');
	    })
	    $('.settled_urgentphone .input').blur(function() {
	        phone('.settled_urgentphone');
	    })

	    //再次验证紧急联系人手机号
	    $('.settled_reurgentphone .input').focus(function() {
	        $('.settled_reurgentphone p.settled_p').css('display', 'block');
	    })
	    $('.settled_reurgentphone .input').blur(function() {
	        rePhone('.settled_urgentphone', '.settled_reurgentphone');
	    })
	    

	    //  //验证网址
	    //  $('.settled_thirdlink .input').focus(function() {
	    //      var index = $('.settled_thirdlink .input').index($(this));
	    //      $('.settled_thirdlink p.settled_p').eq(index).css('display', 'block');
	    //  })
	    //  // 失去焦点时
	    // $('.settled_thirdlink .input').blur(function() {
	    //      // 获取当前input的index值
	    //      var index = $('.settled_thirdlink .input').index($(this));
	    //      thirdLink(index);
	    //  })

	    //验证网址
	    $('form').on('focus', '.settled_thirdlink .input', function() {
	        var index = $('.settled_thirdlink .input').index($(this));
	        $('.settled_thirdlink p.settled_p').eq(index).css('display', 'block');
	    })
	    // 失去焦点时
	    $('form').on('blur', '.settled_thirdlink .input', function() {
	        // 获取当前input的index值
	        var index = $('.settled_thirdlink .input').index($(this));
	        thirdLink(index);
	    })

	    function thirdlinkClick() {
	        $('.settled_thirdlink .settled_form').on('click', '.icon', function() {
	            var but = $('.settled_formitem .icon');
	            var box = $('.settled_formitem');
	            var boxinput = $(".settled_formitem .input");
	            var indexs = but.index($(this));
	            var html = '<div class="settled_formitem clearfix">'+
								'<i>警告提示</i>'+
								'<input class="input" type="text" name="" placeholder="请输入第三方店铺链接">'+
								'<b class="icon">+</b>'+
								'<p class="settled_p">'+
								'</p>'+
							'</div>'
	            //验证网址
	            if (thirdLink(indexs) == true) {
	                if ($(this).html() === '+') {
	                    $(this).html('-');
	                    box.eq(indexs).after(html);
	                } else {
	                    box.eq(indexs).remove();
	                }
	            } else {
	                $('.settled_thirdlink i').eq(indexs).html('请输入正确的网址示范:“ http://www.taoweiw.com/ ”').css('display', 'block');
	                return false;
	            }
	        })
	    }
	    thirdlinkClick()
	}

	function formImg() {

	    //上传图片添加缩略图到IMG标签
	    function cardPositive(Ele) {
	        var reg = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
	        var preview = document.querySelector(Ele + ' img.img');
	        var file = document.querySelector(Ele + ' input.imginput').files[0];
	        var reader = new FileReader();
	        if (typeof(FileReader) != 'undefined') {
	            if (reg.test(file.name.toLowerCase())) { //判断是否是图片
	                reader.addEventListener("load", function() {
	                    preview.src = reader.result;
	                    $(Ele + ' i').html('').css('display', 'none');
	                }, false);
	                if (file) {
	                    reader.readAsDataURL(file);
	                }
	            } else {
	                $(Ele + ' i').html('要求文件是图片格式').css('display', 'block');
	                $(Ele + ' input.imginput').val(null);
	                $(Ele + ' img').attr('src', null);
	                return false;
	            }
	        } else {
	            alert('你的浏览器不支持查看缩略图，建议更换chrome浏览器');
	        }

	    }


	    // 当input表单字段发生改变时
	    $('.settled_cardpositive input.imginput').change(function() {
	        cardPositive('.settled_cardpositive');
	    })
	    $('.settled_cardopposite input.imginput').change(function() {
	        cardPositive('.settled_cardopposite');
	    })
	    $('.settled_handcardpositive input.imginput').change(function() {
	        cardPositive('.settled_handcardpositive');
	    })
	    $('.settled_halfphoto input.imginput').change(function() {
	        cardPositive('.settled_halfphoto');
	    })
	}

	$(function() {
	    form();
	    formImg();
	})