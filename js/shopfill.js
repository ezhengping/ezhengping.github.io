	
	function form() {
		// 验证入驻人姓名
	    function name() {
	        var val = $('.shop_name .input').val();
	        var reg = /[\u4e00-\u9fa5]/
	        if (reg.test(val)) {
	            $('.shop_name i').css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	            $('.shop_name i').html('');
	            return true;
	        } else {
	            $('.shop_name i').html('请输入正确的姓名要求为中文汉字').css('display', 'block');
	            $('.shop_name .input').css({ 'border-color': 'red' })
	            return false;
	        }
	    }

	    // input获取到焦点时
	    $('input.input').focus(function() {
	        $(this).css({ 'box-shadow': '0 0 6px rgba(255,127,38,.5)', 'border-color': '#ff7f26' });
	    })
	    // input失去到焦点时
	    $('input.input').blur(function() {
	        $(this).css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	    })


	    $('textarea').focus(function() {
	        $(this).css({ 'box-shadow': '0 0 6px rgba(255,127,38,.5)', 'border-color': '#ff7f26' });
	    })
	    $('textarea').blur(function() {
	        $(this).css({ 'box-shadow': 'none', 'border-color': '#bfbfbf' });
	    })

	    // 验证名称
	    $('.shop_name .input').focus(function() {
	        $('.shop_name p.settled_p').css('display', 'block');
	    })
	    $('.shop_name .input').blur(function() {
	        name();
	    })

	}



	function formImg(){

		//上传图片添加缩略图到IMG标签
		function cardPositive(Ele){
			var reg = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
			var preview = document.querySelector(Ele+' img.img');
			var file = document.querySelector(Ele+' input.imginput').files[0];
			var reader = new FileReader();
			if(typeof(FileReader)!='undefined'){
				if(reg.test(file.name.toLowerCase())){  //判断是否是图片
					reader.addEventListener("load",function(){
					preview.src = reader.result;
					$(Ele+' i').html('').css('display', 'none');
					},false);
					if(file){
						reader.readAsDataURL(file);
					}
				}else{
					$(Ele+' i').html('要求文件是图片格式').css('display', 'block');
					$(Ele+' input.imginput').val(null);
					$(Ele+' img').attr('src',null);
					return false;
				}
			}else{
				alert('你的浏览器不支持查看缩略图，建议更换chrome浏览器');
			}
			
		}
		// 当input表单字段发生改变时
		$('.shop_logo input.imginput').change(function(){
			cardPositive('.shop_logo');
		})
	}

	$(function() {
	    form();
	    formImg();
	})
