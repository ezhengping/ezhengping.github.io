// 加载物流信息
function LogisticsInformationData(data) {
    var html = '';
    for (var i = 0, len = data.length; i < len; i++) {
        var time = new Date(data[i].ftime);

        html +=
            '<li class="' + ifIndexType(i, len - 1) + '">' +
            '<span class="date ' + ifDateType(i, data, time) + '">' + time.getFullYear() + '-' + (time.getMonth() +
                1) + '-' + time.getDate() + '</span>' +
            '<span class="week ' + ifDateType(i, data, time) + '">' + utcDay(time.getDay()) + '</span>' +
            '<span class="time">' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() +
            '</span>' +
            '<span class="text">' + data[i].context + '</span>' +
            '</li>'
    }
    $('.log_status_box ul').html(html);
}

function LogisticsInformationDataNull() {
    var html = '<li class="null">暂无物流信息~~~</li>'
    $('.log_status_box ul').html(html);
}



// 返回星期
function utcDay(Day) {
    switch (Day) {
        case 1:
            return '周一';
        case 2:
            return '周二';
        case 3:
            return '周三';
        case 4:
            return '周四';
        case 5:
            return '周五';
        case 6:
            return '周六';
        case 0:
            return '周日';
    }
}

function signStatus(number) {
    switch (number) {
        case '0':
            return '在途中';
        case '1':
            return '已揽收';
        case '2':
            return '疑难';
        case '3':
            return '已签收';
        case '4':
            return '退签';
        case '5':
            return '同城派送中';
        case '6':
            return '退回等状态';
    }
}

function ifIndexType(number, len) {
    if (!number) {
        return 'first';
    }
    if (number == len) {
        return 'last';
    }
    return ''
}

function ifDateType(i, data, time) {
    if (!i) {
        return;
    }
    var tTime = new Date(data[i - 1].ftime);
    var y1 = time.getFullYear(),
        y2 = tTime.getFullYear(),
        m1 = time.getMonth(),
        m2 = tTime.getMonth(),
        d1 = time.getDate(),
        d2 = tTime.getDate();
    if (y1 == y2 && m1 == m2 && d1 == d2) {
        return 'hidden';
    } else {
        return;
    }

}


$(function () {
    // 延迟请求
    setTimeout(function () {
        ajaxLogisticsId(getParam('orderId'), function (data) {
            if (data) {
                if (typeof data == 'string') {
                    var data = JSON.parse(data);
                }
                LogisticsInformationData(data.data);
                $('.signStatus span').text(signStatus(data.state))
                $('.logisticsId span').text(data.nu)
            } else {
                LogisticsInformationDataNull();
            }

        })
    }, 300)
})