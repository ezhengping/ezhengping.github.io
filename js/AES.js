/**
 * 参数说明：
 * str:需要加密的字符串
 * key:加密密钥
 * iv:密钥偏移量
 * AES_plus 加密方法
 * AES_solution 解密方法 带有
 * @param {obj} obj 
 * 
 */
function AES(obj) {
    this.str = obj.str || 'undefined'; //加密的字符串
    this.key = obj.key ||
        'jlF2E%U4EnSFOOMN5Sg6$qFGYbs5op0T$V09DeJ1xRt+68ZQyZqOG%85$liM2$t2xDGiZhsZHqLnb5PoclvbdfthNzbK%NaQEHATP4kV5MON0P%52pN994UBN9BbUf2j';
    this.iv = obj.iv ||
        'jlF2E%U4EnSFOOMN5Sg6$qFGYbs5op0T$V09DeJ1xRt+68ZQyZqOG%85$liM2$t2xDGiZhsZHqLnb5PoclvbdfthNzbK%NaQEHATP4kV5MON0P%52pN994UBN9BbUf2j';
    var that = this;
    this.key = CryptoJS.enc.Utf8.parse(that.key);
    this.iv = CryptoJS.enc.Utf8.parse(that.iv);
    this.encrypted;
    this.decrypted;
    this.AES_plus = function () {
        this.encrypted = CryptoJS.AES.encrypt(that.str, that.key, {
            iv: that.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        this.encrypted = this.encrypted.toString();
        return this.encrypted;
    }
    this.AES_solution = function (encrypted) {
        this.decrypted = CryptoJS.AES.decrypt(encrypted, that.key, {
            iv: that.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        this.decrypted = CryptoJS.enc.Utf8.stringify(that.decrypted);
        return this.decrypted;
    }
}



/**
 * data:要加密存储的数据
 * name:存储的键的名称
 * @param {string} data 
 * @param {string} name 
 * @returns 
 */
function setLocalData(data, name) {
    if (!data) {
       var data=0;
    }
    if (!window.localStorage) {
        return false
    }
    if (typeof data == 'string') {
        var AD = new AES({
            str: data,
        })
        var string = AD.AES_plus();
        localStorage.setItem(name, string);
    } else {
        var data = JSON.stringify(data);
        var AD = new AES({
            str: data,
        })
        var string = AD.AES_plus();
        localStorage.setItem(name, string);
    }
    return true;
}

/**
 * return 要获取的解密数据
 * name:本地存储的名称
 * 
 * @param {string} name 
 * @returns 
 */
function getLocalData(name) {
    if (!window.localStorage) {
        return false
    }
    if (localStorage.getItem(name)) {
        var dataString = localStorage.getItem(name);
        var AD = new AES({});
        var data = AD.AES_solution(dataString);
        return data;
    } else {
        return false;
    }
}




/**
 * 加密函数   
 * 传入---加密字符串    
 * 返回---加密后的字符串
 * @param {string} str 
 * @returns {string}
 */
function AES_plus(str) {
    // 密钥 16 位
    var key =
        'jlF2E%U4EnSFOOMN5Sg6$qFGYbs5op0T$V09DeJ1xRt+68ZQyZqOG%85$liM2$t2xDGiZhsZHqLnb5PoclvbdfthNzbK%NaQEHATP4kV5MON0P%52pN994UBN9BbUf2j';
    // 初始向量 initial vector 16 位
    var iv =
        'jlF2E%U4EnSFOOMN5Sg6$qFGYbs5op0T$V09DeJ1xRt+68ZQyZqOG%85$liM2$t2xDGiZhsZHqLnb5PoclvbdfthNzbK%NaQEHATP4kV5MON0P%52pN994UBN9BbUf2j';
    // key 和 iv 可以一致
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 转换为字符串
    encrypted = encrypted.toString();
    return encrypted;
}
/**
 * 解密函数    
 * 输入--加密的字符串    
 * 返回--解密的字符串
 * 
 * @param {string} encrypted 
 * @returns {string}
 */
function AES_solution(encrypted) {

    var key =
        'jlF2E%U4EnSFOOMN5Sg6$qFGYbs5op0T$V09DeJ1xRt+68ZQyZqOG%85$liM2$t2xDGiZhsZHqLnb5PoclvbdfthNzbK%NaQEHATP4kV5MON0P%52pN994UBN9BbUf2j';
    // 初始向量 initial vector 16 位
    var iv =
        'jlF2E%U4EnSFOOMN5Sg6$qFGYbs5op0T$V09DeJ1xRt+68ZQyZqOG%85$liM2$t2xDGiZhsZHqLnb5PoclvbdfthNzbK%NaQEHATP4kV5MON0P%52pN994UBN9BbUf2j';
    // key 和 iv 可以一致
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 转换为 utf8 字符串
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
    return decrypted;
}