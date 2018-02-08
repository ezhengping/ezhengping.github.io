/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-30 09:06:46
 * @version $Id$
 */
var time=60;
	var timers;
function CodeClick(){
    	$(".code_btn").removeAttr("disabled").css({ 'background-color':'#ddd','cursor':'pointer' })
    }

function testTime() {
     if (time === 0) {
         clearInterval(timers);
         CodeClick();
         $(".code_btn").val('重新发送验证码');
         time = 60;
         return true;
     }
     time--;
     $(".code_btn").val(time+'秒')
 }
 
function timedis(){
	timers=setInterval(function() { testTime() }, 1000);
}

function loginBtn() {
    var index = 0;
    var $loginTab = $('.login__Tab a');
    var $loginForm = $('.login_form');

    var $phoneInput = $('.phone_input')
    var $codeInput = $('.code_input')
    var $usernameInput = $('.username_input')
    var $passwordInput = $('.password_input')


    // 验证函数
    function phone(inputEle) {
        var Ele = $(inputEle);
        var val = Ele.val(); //获取手机输入框号码
        var reg = /^[1][345678]\d{9}$/;
        if (reg.test(val)) { //验证手机格式
            Ele.siblings('i').html('');
            return true;
        } else if (val == '') {
            Ele.siblings('i').html('手机号码为空');
            Ele.parent().css({
                'border-color': 'red',
                'box-shadow': '0 0 5px rgba(255,127,38,.6)'
            })
            return false;
        } else {
            Ele.siblings('i').html('请输入正确的手机号');
            Ele.parent().css({
                'border-color': 'red',
                'box-shadow': '0 0 5px rgba(255,127,38,.6)'
            })
            return false;
        }
    }
    var codeAjax = null;

    function code(inputEle, data) {
        var Ele = $(inputEle);
        var test = Ele.val(); //获取验证码
        if (test == '') {
            Ele.siblings('i').html('验证码不能为空');
            Ele.parent().css({
                'border-color': 'red',
                'box-shadow': '0 0 5px rgba(255,127,38,.6)'
            })
            return false;
        } else if (data != test) {
            Ele.siblings('i').html('请输入正确的验证码');
            Ele.parent().css({
                'border-color': 'red',
                'box-shadow': '0 0 5px rgba(255,127,38,.6)'
            })
            return false;
        } else {
            return true;
        }
    }
    // 获取光标追加样式
    $loginForm.find('input').focus(function() {
        $(this).parent().css({
            'border-color': '#ff7f26',
            'box-shadow': '0 0 5px rgba(255,127,38,.6)'
        })
    })
    $loginForm.find('input').blur(function() {
        $(this).parent().css({
            'border-color': '#d3d3d3',
            'box-shadow': 'none'
        })
    })

    // 验证手机号
    $phoneInput.blur(function() {
        	phone(this);
    })
    function noCodeClick(){
		$('.code_btn').attr("disabled", 'true').css({ 'background-color': '#999' }).parent().css({
            'border-color':'rgb(211, 211, 211)',
            'box-shadow':'none',
            'cursor':'default'
        });
	}
    
    
    
    	
       
    // 点击验证码按钮
    function timefn() {
        $('.code_btn').click(function() {
            if (phone('.phone_form input')) {
            	noCodeClick();
            } else {
                return;
            }
        })
    }
    timefn();



    //表单元素value发送改变时显示清除按钮
    $('.login_form').children('div:first-of-type').find('input:first-of-type').on('input propertychange',function(){
    	if($(this).val().length == 0){
    		$(this).siblings('a.btn_shut').css('display','none');
    	}else{
    		$(this).siblings('a.btn_shut').css('display','block');
    		var than = this;
    		$(this).siblings('a.btn_shut').click(function(event) {
                $(this).css('display','none');
    			$(than).val('');
    		});
    	}
    });	



    // 初始的登陆样式
    $loginTab.eq(index).addClass('form_way_atv').siblings().removeClass('form_way_atv');
    $loginForm.eq(index).css('display', 'block').siblings('.login_form').css('display', 'none');
    // 点击选项卡切换显示表单
    $loginTab.click(function() {
        index = $('.login__Tab a').index($(this));
        $loginTab.eq(index).addClass('form_way_atv').siblings().removeClass('form_way_atv');
        $loginForm.eq(index).css('display', 'block').siblings('.login_form').css('display', 'none');

    })
    // $phoneBtn.click(function() {
    // 	$(this).addClass('form_way_atv').siblings().removeClass('form_way_atv');
    //     $('.login_phone_form').css('display', 'block').siblings('.login_user_form').css('display', 'none');
    // })
    // $uesrBtn.click(function() {
    // 	$(this).addClass('form_way_atv').siblings().removeClass('form_way_atv');
    //     $('.login_user_form').css('display', 'block').siblings('.login_phone_form').css('display', 'none');
    // })
}



$(function() {
    loginBtn();
})