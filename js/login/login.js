	var publicKeyExponent=null;
	var publicKeyModulus=null;
	//获取公钥
	$(function(){
		var cookie=navigator.cookieEnabled;
		if(!cookie){
			alert("cookie被禁用");
			return;
		}
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
	});
	//手机登录
	function phoneLogin(){
		var phone=$("input[name='phone']").val();
		if(phone==""){
			$("#phone").text("手机号码为空");
			return;
		}
		phone=dataEncryption(phone);
		var code=$("input[name='code']").val();
		if(code==""){
			$("#phone").text("验证码为空");
			return;
		}
		$.ajax({
			url:PATH+"/user/phoneLogin.action",
			type:"POST",
			data:{phone:phone,saveCode:code},
			xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			success:function(data){
				var result=data.result;
				if(result==110){
					setCookie(data.phone);
					location.href="/index.html";
					TrueLogin();
				}else if(result==20){
					$("#phone").text("手机号码为空");
				}else if(result==21){
					$("#phone").text("状态异常,请刷新页面再输入");
				}else if(result==13){
					$("#phone").text("验证码已过期");
				}else if(result==1){
					$("#phone").text("验证码错误");
				}else if(result==0){
					$("#phone").text("验证码为空");
				}
			}
		});
	}
	
	//用户名登录
	function usernameLogin(){
		var username=$("input[name='username']").val();
		if(username==""){
			$("#username").text("用户名为空");
			return;
		}
		var password=$("input[name='password']").val();
		if(password==""){
			$("#username").text("密码为空");
			return;
		}
		username=dataEncryption(username);
		password=dataEncryption(password);
		$.ajax({
			url:PATH+"/user/usernameLogin.action",
			type:"POST",
			data:{username:username,password:password},
			xhrFields:{
				withCredentials: true
			},
			crossDomain: true,
			success:function(data){
				var result=data.result;
				if(result==110){
					setCookie(data.phone)
					location.href="/index.html";
					TrueLogin();
				}else if(result==5){
					$("#username").text("用户名或密码错误");
				}else if(result==20){
					$("#username").text("用户名或密码为空");
				}else if(result==21){
					$("#username").text("状态异常,请刷新页面再输入");
				}
			}
		});
	}
	//回车登录
	$(document).keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			login();
		}
	});
	//数据加密
	function dataEncryption(data){
		RSAUtils.setMaxDigits(200);
		var key = new RSAUtils.getKeyPair(publicKeyExponent, "",
				publicKeyModulus);
		return RSAUtils.encryptedString(key,data.split("").reverse().join(""));
	}
	//发送验证码
	function sendCode(){
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
					timedis();
				}else if(data==20){
					$("#phone").text("手机号码为空");
					CodeClick();
				}else if(data==21){
					$("#phone").text("状态异常,请刷新页面再输入");
					CodeClick();
				}else if(data==3){
					$("#phone").text("手机号码错误");
					CodeClick();
				}else{
					layer.alert("验证码发送失败，请稍后重试");
					CodeClick();
				}
			}
		});
	}
	//登录
	function login(){
		var type=$("a.form_way_atv").attr("data-Tab");
		if(type=="phone"){
			phoneLogin();
		}else{
			usernameLogin();
		}
	}
	//设置cookie
	function setCookie(nanme,value){
		var date = new Date();  
	    date.setTime(date.getTime() +31*24* 3600);
		document.cookie=name+"="+value+";expires="+date.toGMTString();
	}
	//从cookie中取值
	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        c_start = document.cookie.indexOf(c_name + "=")
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1
	            c_end = document.cookie.indexOf(";", c_start)
	            if (c_end == -1) c_end = document.cookie.length
	            return unescape(document.cookie.substring(c_start, c_end))
	        }
	    }
	    return "";
	}