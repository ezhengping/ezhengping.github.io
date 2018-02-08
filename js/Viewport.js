
    var dpr = 1 / window.devicePixelRatio; //用1除以当前设备的独立像素比，得到页面的缩放系数
    //然后把缩放系数给meta标签，重新输出在页面中
    document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale='+dpr+'" />');

    var W = document.documentElement.clientWidth / 10;//获取屏幕的宽度除以10，将屏幕分成10等份
    document.getElementsByTagName('html')[0].style.fontSize = W+'px'; //然后把宽度除以10的值，给html字体大小
