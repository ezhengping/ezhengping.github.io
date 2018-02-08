$(function () {
	$.ajax({
		url: PATH + "/diamond/queryDiamondAll.action",
		type: "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function (data) {
			addDiamond(data)
			var banner1 = new Carousel('#J_index_ban1', '#J_index_indicator1', '#J_index_btn1');
		}
	});
	bannerDiamondBtnC();
});

function addDiamond(data) {
	var op = '';
	// console.log(data);
	for (var i = 0, len = data.length; i < len; i++) {
		op +=
			'<li>'+
			'<a class="diamond_btn" href="javascript:;" data-diamondid='+data[i].diamondId+' data-type='+data[i].type+'>'+
				'<img src='+data[i].imgUrl+' alt="广告图"/>'+
			'</a>'+
		'</li>'
	}
	$("#banner_index_ul").html(op);
}


function bannerDiamondBtnC() {
	$('.section__banner').on('click', '.diamond_btn', function () {
		var diamondId = $(this).data('diamondid');
		var type = $(this).data('type');
		ajaxDiamond(type, diamondId, function (data) {
			// console.log(data);
			var data = JSON.parse(data);
			ifType(type,data)
		})
	})
}

function ifType(type,data) {
	switch (type) {
		case 1:
			location.href = data;
			break;
		case 2:
			layer.open({

			})
			break;
		case 3:
			location.href ='/page/product/productDetails.html?productId='+data.productId+'&storeId='+data.storeId
		break;
		case 4:
			location.href = '/page/store/store.html?storeId='+data.storeId
			break;
		default:
			break;
	}
}
function ajaxDiamond(type, diamondId, callback) {
	$.ajax({
			url: PATH + '/diamond/queryDiamondObject.action',
			type: 'POST',
			data: {
				'diamondId': diamondId,
				'type': type,
			},
		})
		.done(function (data) {
			if (callback) {
				callback(data);
			} else {
				alert(数据加载失败)
			}
		})

}