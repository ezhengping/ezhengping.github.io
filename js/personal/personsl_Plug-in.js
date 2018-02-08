/*************************************************************************************************
 * TabEle - 选项卡选项元素
 * optionEle - 选项卡控制元素
 * index - 默认选中项number
 * @param {any} obj 
 */
function Tab(obj) {
    this.TabEle = obj.TabEle
    this.optionEle = obj.optionEle;
    this.addClass = obj.addClass;
    this.index = obj.index || 0;
    // 初始化选项卡
    this.optionBoxAtv(this.index);
    this.TabBoxClick();
}
// 选项按钮被点击事件
Tab.prototype.TabBoxClick = function () {
    var that = this;
    $('body').on('click', that.TabEle, function () {
        that.index = $(that.TabEle).index($(this));
        that.optionBoxAtv(that.index);
        $(this).addClass(that.addClass).siblings(that.TabEle).removeClass(that.addClass)
    })
}
// 选中事件
Tab.prototype.optionBoxAtv = function (index) {
    $(this.optionEle).eq(index).css('display', 'block').siblings(this.optionEle).css('display', 'none');
}
/**
 * batchbox-批量管理按钮  
 * batchCombox-完成按钮  
 * batchMenubox-管理菜单  
 * batchComMenubox-被管理的菜单  
 * batchComMenuItembox-被管理菜单的子集  
 * batchComMenuAddClass-向被管理菜单盒子添加的class  
 * batchComMenuItemAddCliss-向被管理菜单盒子子集添加的class  
 * batchComMenuItemCheckbox-被管理菜单盒子子集批量管理遮罩  
 * 
 * @param {obj} obj - obj  
 * 
 * 需要使用 new 构造  
 * @class  
 * 
 */
function BatchCollection(obj) {
    this.batchbox = obj.batchbox; //批量管理按钮
    this.batchCombox = obj.batchCombox; //完成按钮
    this.batchMenubox = obj.batchMenubox; //管理菜单
    this.batchComMenubox = obj.batchComMenubox; //被管理的菜单
    this.batchComMenuItembox = obj.batchComMenuItembox; //被管理菜单的子集
    this.batchComMenuAddClass = obj.batchComMenuAddClass; //向被管理菜单盒子添加的class
    this.batchComMenuItemAddCliss = obj.batchComMenuItemAddCliss; //向被管理菜单盒子子集添加的class
    this.batchComMenuItemCheckbox = obj.batchComMenuItemCheckbox; //被管理菜单盒子子集批量管理遮罩
    this.batchCheckboxBtn = obj.batchCheckboxBtn; //全选按钮
    // 菜单被点击事件
    this.fnBatchMenuClick = function () {
        var that = this;
        $(this.batchbox).click(function () {
            $(that.batchMenubox).css('display', 'block');
            $(this).css('display', 'none');
            $(that.batchComMenubox).addClass(that.batchComMenuAddClass);

            // this.fnBatchClick();
        })
        $(this.batchCombox).click(function () {
            $(this).parent('div').css('display', 'none');
            $(that.batchbox).css('display', 'block');
            $(that.batchComMenubox).removeClass(that.batchComMenuAddClass);
            $(that.batchComMenubox).find(that.batchComMenuItembox).removeClass(that.batchComMenuItemAddCliss);
            $(that.batchCheckboxBtn).prop('checked', false);
        })
    }
    // 被管理事项被点击事件
    this.fnBatchClick = function () {
        var that = this;
        $(this.batchComMenubox).on('click', this.batchComMenuItemCheckbox, function () {
            $(this).parent(that.batchComMenuItembox).toggleClass(that.batchComMenuItemAddCliss);
            // console.log($(this).parent(that.batchComMenuItembox));
        })
    }

    this.fnAllCheckbox = function () {
        var that = this;
        $(this.batchCheckboxBtn).change(function () {
            if ($(this).prop('checked')) {
                $(that.batchComMenuItembox).addClass(that.batchComMenuItemAddCliss)
            } else {
                $(that.batchComMenuItembox).removeClass(that.batchComMenuItemAddCliss)
            }
        })
    }

    // 执行管理点击事件
    this.fnBatchMenuClick();

    // 被管理事项被点击事件
    this.fnBatchClick();

    // 全选按钮被点击
    this.fnAllCheckbox()
}





/**
 * 功能说明：  
 * 三级城市联动
 * 
 * 参数说明
 * obj:{}    
 * boxEle:包裹联动盒子   
 * provinceName:省名称  
 * cityName:市名称  
 * areaName:县名称  
 * 
 * ajax:{}  
 * url:请求地址  
 * type:请求类型（GET OR POST)  
 * @param {any} obj 
 * @param {any} ajax 
 */
function City(obj, ajax) {
    this.boxEle = obj.boxEle //获取盒子
    // 获取省市区名称
    this.provinceName = obj.provinceName;
    this.cityName = obj.cityName;
    this.areaName = obj.areaName;
    // 请求地址
    this.url = ajax.url;
    this.type = ajax.type;

    // 默认的初始值
    this.provinceVal = obj.provinceVal; //省名称
    this.cityVal = obj.cityVal; //市名称
    this.areaVal = obj.areaVal; //县名称

    this.ajax = function () {
        var that = this;
        $.ajax({
                url: that.url,
                type: that.type,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
            })
            .done(function (data) {

                // 此处可能会发生更改   
                that.provinceData = data.data.areaJSON;
                that.provinceAddData();
                that.edit();
            })
            .fail(function () {})
            .always(function () {
                // console.log("complete");
            });
    }
    // 装载省
    this.provinceAddData = function () {
        var html = '<option value="null" data-val=null>=请选择省份=</option>';
        var data = this.provinceData;
        for (var i = 0, len = data.length; i < len; i++) {
            html += '<option value="'+data[i].name+'" data-val="'+i+'">'+data[i].name+'</option>'
        }
        // console.log($(this.boxEle + ' select[name=' + this.provinceName + ']'));
        $(this.boxEle + ' select[name=' + this.provinceName + ']').html(html);
    }

    this.cityAddData = function (provinceNum) {
        var html = '<option value="null" data-val=null>=请选择城市=</option>';
        var data = this.provinceData[provinceNum].provinceChildren
        for (var i = 0, len = data.length; i < len; i++) {
            html += '<option value="'+data[i].name+'" data-val="'+i+'">'+data[i].name+'</option>'
        }
        $(this.boxEle + ' select[name=' + this.cityName + ']').html(html);
    }

    this.areaAddData = function (provinceNum, cityNum) {
        var html = '<option value="null" data-val=null>=请选择地区=</option>';
        var data = this.provinceData[provinceNum].provinceChildren[cityNum].cityChildren;
        for (var i = 0, len = data.length; i < len; i++) {
            html +=
                '<option value="'+data[i].name+'" data-val="'+i+'" data-areaid="'+data[i].areaid+'">'+data[i].name+'</option>'
        }
        $(this.boxEle + ' select[name=' + this.areaName + ']').html(html);
    }

    this.eventClick = function () {
        var that = this;
        $(this.boxEle).on('change', 'select[name=' + this.provinceName + ']', function () {
            var cityEle = that.boxEle + ' select[name=' + that.cityName + ']'
            var areaEle = that.boxEle + ' select[name=' + that.areaName + ']'
            var cityhtml = '<option value="null" data-val=null>=请选择城市=</option>';
            var areahtml = '<option value="null" data-val=null>=请选择地区=</option>';
            var provinceNum = $(this).children('option[value=' + $(this).val() + ']').data('val');
            // console.log(provinceNum)
            if (provinceNum != null) {
                provinceNum = parseInt(provinceNum);
                $(cityEle).val('null')
                $(areaEle).val('null')
                that.cityAddData(provinceNum);
            } else {
                $(cityEle).html(cityhtml);
                $(areaEle).html(areahtml);
                $(cityEle).val('null')
                return;
            }
        })

        $(this.boxEle).on('change', ' select[name=' + this.cityName + ']', function () {
            var html = '<option value="null" data-val="null">=请选择地区=</option>';
            var areaEle = that.boxEle + ' select[name=' + that.areaName + ']'
            var provinceEle = that.boxEle + ' select[name=' + that.provinceName + ']'
            var provinceNum = $(provinceEle).children('option[value=' + $(provinceEle).val() + ']')
                .data('val');
            var cityNum = $(this).children('option[value=' + $(this).val() + ']').data('val');
            if (cityNum != null) {
                cityNum = parseInt(cityNum);
                $(areaEle).val('null')
                that.areaAddData(provinceNum, cityNum);
            } else {
                $(areaEle).html(html);
                $(areaEle).val('null')
                return;
            }
        })
    }
    this.edit = function () {
        var provinceVal = this.provinceVal; //省名称
        var cityVal = this.cityVal; //市名称
        var areaVal = this.areaVal; //县名称
        // var provinceVal = $(this.boxEle + ' select[name=' + this.provinceName + ']').data('val');
        // var cityVal = $(this.boxEle + ' select[name=' + this.cityName + ']').data('val');
        // var areaVal = $(this.boxEle + ' select[name=' + this.areaName + ']').data('val');
        if (provinceVal) {
            $(this.boxEle + ' select[name=' + this.provinceName + ']').val(provinceVal);
            // console.log($(this.boxEle + ' select[name=' + this.provinceName + ']').val());
            var provinceNum = $(this.boxEle + ' select[name=' + this.provinceName + ']').children('option[value=' + $(this.boxEle + ' select[name=' + this.provinceName + ']').val() + ']').data('val');
            this.cityAddData(provinceNum)
            if (cityVal) {
                $(this.boxEle + ' select[name=' + this.cityName + ']').val(cityVal);
                var cityNum = $(this.boxEle + ' select[name=' + this.cityName + ']').children('option[value=' + $(this.boxEle + ' select[name=' + this.cityName + ']').val() + ']').data('val');
                this.areaAddData(provinceNum, cityNum)
                if (areaVal) {
                    $(this.boxEle + ' select[name=' + this.areaName + ']').val(areaVal);
                    return;
                }
            }
        }
        return;
    }
    this.ajax();
    this.eventClick();
}





/**
 * 功能说明：
 * 日期信息框
 * 修改日期
 * 
 * 参数说明：  
 * obj:对象  
 * DayBox -- 盒子元素class||id*  
 * yearName -- 年的name属性名称*  
 * monthName -- 月的name属性名称*  
 * dayName -- 日的name属性名称*  
 * Year -- 传入的年（可选如不填则是当前年）  
 * Month -- 传入的月（可选如不填则是当前月）1-12  
 * Day -- 传入的日（可选如不填则是当前月）  
 * plusNumber -- {number}最大年数当前年加上数值  
 * lessNumber -- {number}最小年数当前年加减去数值  
 * 
 * ajaxObj:对象  
 * url -- 请求路径  
 * type -- 请求类型  
 * dataObj -- 请求参数（对象）  
 * 
 * callback -- 请求回调函数  
 * 
 * @param {any} obj 
 * @param {any} fn 
 */
function Day(obj, ajaxObj, callback) {
    this.DayBox = $(obj.DayBox); //盒子元素class||id
    this.yearName = obj.yearName; //年的name属性名称
    this.monthName = obj.monthName; //月的name属性名称
    this.dayName = obj.dayName; //日的name属性名称
    if (obj.plusNumber===0) {
        this.plusNumber=obj.plusNumber;
    }else{
        this.plusNumber = obj.plusNumber||50
    }
    if (obj.lessNumber===0) {
        this.lessNumber = obj.lessNumber
    }else{
        this.lessNumber = obj.lessNumber||50 //最小年数当前年加减去数值
    }

    // 当前日期
    this.Date = new Date();
    this.Year = obj.Year || this.Date.getFullYear(); //Year 年
    this.Month = obj.Month || this.Date.getMonth() + 1; //Month 年
    this.Day = obj.Day || this.Date.getDate(); //Day 年


    // if (ajaxObj) {
    //     this.url = ajaxObj.url || null;
    //     this.type = ajaxObj.type || null;
    //     this.url = ajaxObj.dataObj || null;
    // } else {
    //     this.url = null;
    //     this.type = null;
    //     this.url = null;
    // }

    this.maxYear = this.Date.getFullYear() + this.plusNumber;
    this.minYear = this.Date.getFullYear() - this.lessNumber;
    var that = this;

    // 初始化插件
    this.initDate = function () {
        this.loadYear();
        this.loadMonth();
        this.loadDay();
    }
    // 装载年
    this.loadYear = function (YearVal) {
        var yearHtml = ''
        var YearLen = this.maxYear - this.minYear;
        for (var i = 0; i < YearLen; i++) {
            yearHtml += '<option value="' + (this.minYear + i) + '">' + (this.minYear +
                i) + '</option>'
        }
        this.DayBox.find('select[name=' + this.yearName + ']').html(yearHtml);
        this.DayBox.find('select[name=' + this.yearName + ']').val(this.Year);
    }
    // 装载月
    this.loadMonth = function (MonthVal) {
        var monthHtml = ''
        for (var i = 0; i < 12; i++) {
            monthHtml += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>'
        }
        this.DayBox.find('select[name=' + this.monthName + ']').html(monthHtml);
        this.DayBox.find('select[name=' + this.monthName + ']').val(this.Month);
    }
    // 装载日
    this.loadDay = function (DayVal) {
        var dayHtml = '';
        var Daylen = this.monthOfDay();
        for (var i = 0; i < Daylen; i++) {
            dayHtml += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>'
        }
        this.DayBox.find('select[name=' + this.dayName + ']').html(dayHtml);
        this.DayBox.find('select[name=' + this.dayName + ']').val(this.Day);
    }

    // 判断是否是闰年
    this.runNian = function () {
        var Year = Number(this.DayBox.find('select[name=' + this.yearName + ']').val());
        if (Year % 4 == 0 && Year % 100 != 0 || Year % 400 == 0) {
            return true;
        } else {
            return false;
        }
    }

    // 返回天数
    this.monthOfDay = function () {
        var value = this.DayBox.find('select[name=' + this.monthName + ']').val()
        switch (value) {
            // 大月
            case '1':
            case '3':
            case '5':
            case '7':
            case '8':
            case '10':
            case '12':
                return 31;

            // 小月
            case '4':
            case '6':
            case '9':
            case '11':
                return 30;


            case '2':
                if (this.runNian()) {
                    return 29;
                } else {
                    return 28;
                }
        }
    }

    // 事件处理函数
    this.DateCheck = function () {
        var yearBox = this.DayBox.find('select[name=' + this.yearName + ']')
        var monthBox = this.DayBox.find('select[name=' + this.monthName + ']')
        var dayBox = this.DayBox.find('select[name=' + this.dayName + ']')
        yearBox.change(function () {
            that.loadMonth();
            monthBox.val(1);
            dayBox.val(1);
        })
        monthBox.change(function () {
            that.loadDay();
            dayBox.val(1);
        })
        dayBox.change(function () {
            if (that.url) {
                $.ajax({
                        url: that.url,
                        type: that.type,
                        data: that.dataObj,
                    })
                    .done(function (data) {
                        if (callback) {
                            callback(data);
                        } else {
                            return;
                        }
                    })
            } else {
                return;
            }
        })

    }
    this.initDate();
    this.DateCheck();
}


/**
 * 日期格式化  
 * 参数说明  
 * obj: -日期对象  
 * .Year : 年  
 * .Month: 月  
 * .Day :日  
 *
 *函数说明:
 * standardDay() 格式化日期返回日期对象
 * standardMsec() 格式化日期返回毫秒值
 * @param {*} obj 
 */
function DayFormat(obj) {
    this.Year = obj.Year || 0;
    this.Month = obj.Month || 0;
    this.Day = obj.Day || 0;
    this.msec = obj.msec || 0;
}
DayFormat.prototype.standardDay = function () {
    var date = new Date(this.msec);
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    var obj = {};
    obj.Year = Year;
    obj.Month = Month;
    obj.Day = Day;
    return obj;
}
DayFormat.prototype.standardMsec = function () {
    var msec = new Date(this.Year, this.Month - 1, this.Day);
    return msec;
}


/**
 * 上传图片
 * 
 * 
 * @param {any} obj 
 * @param {any} ajax 
 * @param {any} callback 
 */
function Upload(obj, ajax, callback) {
    this.Cls = obj.Cls; //上传表单元素
    this.Ele = document.querySelector(this.Cls);
}

Upload.prototype.handleData = function () {
    this.fail = Ele.files[0];
    var formData = new FormData();
    formData.append(name, file);

}

// 上传数据
Upload.prototype.up = function (name) {
    ajax.data = formData;
    if (ajax.url) {
        $.ajax({
                url: ajax.url,
                type: 'POST',
                data: ajax.data,
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头  
                processData: false, // 告诉jQuery不要去处理发送的数据
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
            })
            .done(function (data) {
            })
    }

}