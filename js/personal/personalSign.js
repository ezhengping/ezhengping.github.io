function orSign(data) {
    // var data = {isSign: true, buyerId: 271,signTime: 1519574400000,grade: 1, signCount:14,siginIn:1}
    var html = ''
    if (data.isSign) {
        var html =
            '<a href="javascript:;"  data-type="' + data.isSign + '">' +
            '<img src="../../images/pl_signln.png" alt="">' +
            '</a>'
    } else {
        var html = '<a href="javascript:;" data-type="' + data.isSign +
            '">' +
            '<img src="../../images/pl_signln_no.png" alt="">' +
            '</a>'
    }
    $('.signIn_box').html(html);
}

// 签到按钮被点击
function alertSignIn() {
    $('.signIn_box').on('click', 'a', function () {
        if ($(this).data('type')) {
            ajaxSign(function (data) {
                $('.alertSignIn').show();
                $('.alertSignIn>div').animate({
                    'height': '80%'
                }, 'fast', 'swing');
                setTimeout(function () {
                    $('.alertSignIn>div').animate({
                        'height': '0'
                    }, 'fast', 'swing', function () {
                        $('.alertSignIn').hide();
                    });
                }, 2000)
                ajaxIsSign(function (data) {
                    orSign(data);
                    siginInData(data);
                });
            })
        } else {
            layer.alert('你已经签过到了');
        }
    })
}


// // 签到的日期
// function signDateDay(data, dateP) {
//     // 签到日期
//     var signDate = new Date(data.signTime);
//     var sYear = signDate.getFullYear()
//     var sMonth = signDate.getMonth() + 1
//     var sDate = signDate.getDate()
//     var sTime = new Date(sYear, sMonth - 1, sDate);

//     // 获取当前时间
//     var currentDate = new Date();
//     var cYear = currentDate.getFullYear()
//     var cMonth = currentDate.getMonth() + 1
//     var cDate = currentDate.getDate()
//     var cTime = new Date(cYear, cMonth - 1, cDate);

//     var day = null;

//     if (dateP > data.siginIn) {
//         //   计算相加后的日期
//         day = cDate + dateP-data.siginIn
//         return notSignIn(day,cDate,cMonth,cYear)
//     } else if (dateP < data.siginIn) {
//         day = sDate - dateP
//         // return alreadySignedIn(day,sMonth,sYear,cDate,cMonth,cYear)
//         return '-'
//     } else {
//         return '今天'
//     }
// }


// 已签到
// function alreadySignedIn(day, sMonth, sYear, cDate, cMonth, cYear) {
//     // 获取当前月有多少天
//     // var MonthDay = monthOfDay(sMonth, sYear);

//     // 月份是否小于1;  
//     if (day <= 0) {
//         var Month = sMonth - 1
//         if (Month > 1) {
//             day += monthOfDay(Month, sYear);
//         }
//         // 月份是否小于1;  
//         if (Month < 1) {
//             var Year = sYear - 1
//             var Month = 12
//             day += monthOfDay(Month, Year);

//             return ifDayEqual(Year, cYear, Month, cMonth, day, cDate);
//         }
//         return ifDayEqual(sYear, cYear, Month, cMonth, day, cDate);
//     } else {
//         return ifDayEqual(sYear, cYear, sMonth, cMonth, day, cDate);
//     }
// }



// 未签到
// function notSignIn(day, cDate, cMonth, cYear) {
//     // 获取当前月有多少天
//     var MonthDay = monthOfDay(cMonth, cYear);
//     // 月份是否小于1;  
//     if (day > MonthDay) {
//         var Month = cMonth + 1
//         if (Month < 12) {
//             day -= MonthDay
//         }
//         // 月份是否小于1;  
//         if (Month > 12) {
//             var Year = cYear + 1
//             var Month = 1
//             MonthDay = monthOfDay(Month, Year);
//             day -= MonthDay
//             return ifDayEqual(Year, cYear, Month, cMonth, day, cDate);
//         }
//         return ifDayEqual(cYear, cYear, Month, cMonth, day, cDate);
//     } else {
//         return ifDayEqual(cYear, cYear, cMonth, cMonth, day, cDate);
//     }
// }

// 签到的日期
function signDateDay(data, dateP) {
    // 签到日期
    var signDate = new Date(data.signTime);
    var sYear = signDate.getFullYear()
    var sMonth = signDate.getMonth() + 1
    var sDate = signDate.getDate()

    // 获取当前时间
    var currentDate = new Date();
    var cYear = currentDate.getFullYear()
    var cMonth = currentDate.getMonth() + 1
    var cDate = currentDate.getDate()

    //   计算相加后的日期
    var day = null;
    day = sDate - dateP

    // 月份是否小于1;  
    if (day <= 0) {
        var Month = sMonth - 1
        if (Month >= 1) {
            day += monthOfDay(Month, sYear);
        }
        // 月份是否小于1;  
        if (Month < 1) {
            var Year = sYear - 1
            var Month = 12
            day += monthOfDay(Month, Year);

            return ifDayEqual(Year, cYear, Month, cMonth, day, cDate);
        }
        return ifDayEqual(sYear, cYear, Month, cMonth, day, cDate);
    } else {
        return ifDayEqual(sYear, cYear, sMonth, cMonth, day, cDate);
    }
}


// 未签到的日期
function noSignDateDay(data, dateP) {
    // 签到日期
    var signDate = new Date(data.signTime);
    var sYear = signDate.getFullYear()
    var sMonth = signDate.getMonth() + 1
    var sDate = signDate.getDate()
    var sTime = new Date(sYear, sMonth - 1, sDate)

    // 获取当前时间
    var currentDate = new Date();
    var cYear = currentDate.getFullYear()
    var cMonth = currentDate.getMonth() + 1
    var cDate = currentDate.getDate()
    var cTime = new Date(cYear, cMonth - 1, cDate)



    var day = null;
    day = cDate + dateP;
    var MonthDay = monthOfDay(cMonth, cYear);
    // console.log(MonthDay, cMonth, cYear);
    // 月份是否小于1;  
    if (day > MonthDay) {
        var Month = cMonth + 1
        if (Month < 12) {
            day -= MonthDay
        }
        // 月份是否小于1;  
        if (Month > 12) {
            var Year = cYear + 1
            var Month = 1
            MonthDay = monthOfDay(Month, Year);
            day -= MonthDay
            return ifDayEqual(Year, cYear, Month, cMonth, day, cDate);
        }
        return ifDayEqual(cYear, cYear, Month, cMonth, day, cDate);
    } else {
        return ifDayEqual(cYear, cYear, cMonth, cMonth, day, cDate);
    }
}


// 判断日期是否相等 相等返回今天
function ifDayEqual(y1, y2, m1, m2, d1, d2) {
    if (y1 == y2 && m1 == m2 && d1 == d2) {
        return '今天'
    } else {
        // return y1 + '-' + m1 + '-' + d1;
        return m1 + '-' + d1;
    }
}

// 判断当前月有多少天
function monthOfDay(Month, Year) {
    switch (Month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;

        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;

        case 2:
            if (runNian(Year)) {
                return 29;
            } else {
                return 28;
            }
            break;

    }
}

// 判断是否是闰年
function runNian(Year) {
    if (Year % 4 == 0 && Year % 100 != 0 || Year % 400 == 0) {
        return true;
    } else {
        return false;
    }
}




// 签到加载数据
function siginInData(data) {
    // console.log(data);
    // 昨天
    // var data = {
    //     isSign: true,
    //     buyerId: 271,
    //     signTime: 1516896000000,
    //     grade: 1,
    //     signCount: 14,
    //     siginIn: 5
    // }
    // 今天
    // var data = {isSign: false,buyerId: 271,signTime: 1516982400000,grade: 1,signCount: 14,siginIn: 2}
    var html = '';
    // 连续签到的样式
    if (data.isSign) {
        if (data.siginIn) {
            for (var i = 1; i <= data.siginIn; i++) {
                html += '<div class="days_item">' +
                    '<a href="javascript:;" style="background:url(../../images/num_signln.png); color: #fff;">' +
                    siginAddBeans(i) +
                    '</a>' +
                    '<div class="signIn_day">' + signDateDay(data, data.siginIn - i) + '</div>' +
                    '</div>'
            }
            for (var j = data.siginIn + 1; j <= 7; j++) {
                html += '<div class="days_item">' +
                    '<a href="javascript:;" style="background:url(../../images/num_signln_no.png); color: #606060;">' +
                    siginAddBeans(j) +
                    '</a>' +
                    '<div class="signIn_day">' + noSignDateDay(data, j - data.siginIn - 1) + '</div>' +
                    '</div>'
            }
        } else {
            for (var j = 0; j < 7; j++) {
                html += '<div class="days_item">' +
                    '<a href="javascript:;" style="background:url(../../images/num_signln_no.png); color: #606060;">' +
                    siginAddBeans(j + 1) +
                    '</a>' +
                    '<div class="signIn_day">' + noSignDateDay(j,j) + '</div>' +
                    '</div>'
            }
        }
    } else {
        for (var i = 1; i <= data.siginIn; i++) {
            html += '<div class="days_item">' +
                '<a href="javascript:;" style="background:url(../../images/num_signln.png); color: #fff;">' +
                siginAddBeans(i) +
                '</a>' +
                '<div class="signIn_day">' + signDateDay(data, data.siginIn - i) + '</div>' +
                '</div>'
        }
        for (var j = data.siginIn + 1; j <= 7; j++) {
            html += '<div class="days_item">' +
                '<a href="javascript:;" style="background:url(../../images/num_signln_no.png); color: #606060;">' +
                siginAddBeans(j) +
                '</a>' +
                '<div class="signIn_day">' + noSignDateDay(data, j - data.siginIn) + '</div>' +
                '</div>'
        }
    }


    $('.continuity_days').html(html);
}
// 签到添加味豆
function siginAddBeans(day) {
    switch (day) {
        case 1:
            return '+10';
        case 2:
            return '+10';
        case 3:
            return '+20';
        case 4:
            return '+20';
        case 5:
            return '+30';
        case 6:
            return '+40';
        case 7:
            return '+50';
        default:
            return '+10';
    }
}
$(function () {
    // 签到按钮被点击
    alertSignIn()
    // 是否连续签到
    ajaxIsSign(function (data) {
        orSign(data);
        siginInData(data);

    })
})