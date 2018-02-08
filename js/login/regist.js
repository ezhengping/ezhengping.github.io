 var publicKeyExponent=null;
    var publicKeyModulus=null;
    //获取公钥
    $(function(){
    	$.ajax({
			url:PATH+"/user/getPublicKey.action",
            type:"GET",
            xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			success:function(data){
				publicKeyExponent=data.publicKeyExponent;
				publicKeyModulus=data.publicKeyModulus;
			}
		});
        $('.code_btn').click(function() {
            var Validator = $("#signUp-form").validate();
            var phoneCode = Validator.element($('.phone_input input'));
            if(phoneCode){
            	sendCode(this);
            }
        })
    });
  	//数据加密
	function dataEncryption(data){
		RSAUtils.setMaxDigits(200);
		var key = new RSAUtils.getKeyPair(publicKeyExponent, "",
				publicKeyModulus);
		return RSAUtils.encryptedString(key,data.split("").reverse().join(""));
	}
	//发送验证码
	function sendCode(obj){
		var phone=dataEncryption($("input[name='phone']").val());
		$.ajax({
			url:PATH+"/user/sendCode.action",
			type:"POST",
            data:{phone:phone},
            xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			success:function(data){
				if(data==110){
					layer.alert("验证码发送成功，请注意查收");
					timedis(obj);
				}else{
					layer.alert("验证码发送失败，请稍后重试");
				}
			}
		});
	}
	//发送成功读秒
	function timedis(obj){
		 $(obj).attr("disabled", 'true').css({ 'background-color': '#d6d6d6' });
         timers = setInterval(function() { testTime() }, 1000);
	}
  	
    function inputHover() {
        $('input').not('input[type=submit]').not('input.code_btn').focus(function(event) {
            $(this).parent().css({
                'border-color': '#ff7f26',
                'box-shadow': '0 0 5px rgba(255,127,38,.6)'
            });
        });
        $('input').not('input[type=submit]').not('input.code_btn').blur(function(event) {
            $(this).parent().css({
                'border-color': '#d3d3d3',
                'box-shadow': 'none'
            });
        });
    }
    //注册
    function regist(){
    	var nickName=$("input[name='nickName']").val();
    	var password=dataEncryption($("input[name='password']").val());
    	var phone=dataEncryption($("input[name='phone']").val());
    	var saveCode=$("input[name='code']").val();
    	$.ajax({
    		url:PATH+"/user/regist.action",
    		type:"POST",
            data:{"nickName":nickName,"password":password,"phone":phone,"saveCode":saveCode},
            xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
    		success:function(data){
    			if(110==data){
    				location.href="/page/login/login.html";
    			}else if(3==data){
    				layer.alert("手机号码错误!");
    			}else if(8==data){
    				layer.alert("密码不符合要求!");
    			}else if(0==data){
    				layer.alert("验证码为空!");
    			}else if(1==data){
    				layer.alert("验证码错误!");
    			}else if(18==data){
    				layer.alert("手机号码已被注册!");
    			}
    		}
    	});
    }
    inputHover()
    $.validator.addMethod('custom', function(value, element, params) {
        var reg = params;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    }, '请输入验证提示信息')
    $().ready(function() {
        $("#signUp-form").validate({
            ignore: '.code_btn',
            rules: {
            	nickName: {
                    // required: true,
                    // custom: //,
                    maxlength:10,
                },
                password: {
                    required: true,
                    rangelength: [6, 20],
                    custom: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
                },
                orpassword: {
                    required: true,
                    equalTo: '#password',
                    rangelength: [6, 20],
                },
                phone: {
                    required: true,
                    custom: /^[1][345678]\d{9}$/,
                },
                code: {
                    required: true,
                    custom: /\d/,
                }

            },
            messages: {
            	nickName: {
                    // required: '名称不能为空',
                    // custom: '请输入有效的用户信息',
                    maxlength: '昵称长度最多为10个字符',
                },
                password: {
                    required: '密码不能为空',
                    custom: '密码必须以字母字开头和数字下划线组合',
                },
                phone: {
                    required: '用户手机号不能为空',
                    custom: '请输入有效是11位手机号',
                },
                code: {
                    required: '验证码不能为空',
                    custom: '请查看手机验证码确认后输入',
                }

            },

            //验证错误时执行的函数
            errorPlacement: function(error, element) {
                element.siblings('i').html(error)
            },
            highlight: function(element, errorClass) {
                $(element).parent('div').addClass('diverror').children('b').css('background-image', 'url(images/code_error.png)');
            },
            // 验证正确时
            success: function(i) {
                $(i).html('');
                $(i).parent().parent('div').removeClass('diverror').children('b').css('background-image', 'url("/images/code_correct.png")');
            },

            //通过验证后提交表单
            submitHandler: function(form) {
              regist();
            }
        })
    })

        var time = 60;
        var timers
        // 发送验证码时间函数
        function testTime() {
            if (time === 0) {
                clearInterval(timers);
                $(".code_btn").removeAttr("disabled").css({ 'background-color': '#ff953f', 'cursor': 'pointer' }).val('重新发送验证码');
                time = 60;
                return true;
            } else {
                time--;
                $(".code_btn").val(time + '秒');
            }
        }
        