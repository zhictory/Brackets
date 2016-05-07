/**
 *  ---------------------------------------------
 *      体验馆首页
 *      体验馆首页的交互脚本  
 *  
 *      author: zhangzhensheng  
 *      data  : 2016-04-29      
 *  ---------------------------------------------
 */
define(function(require, exports, module) {
    var DiyScroll = require("../components/diyScroll/diyScroll");
    var baiduMap = require("../components/BaiduMap/BaiduMap");
    var slider = require("../components/slider/1.0.0/slider");
    var Dialog = require("../components/dialog/1.0.0/dialog");
    var minBar = require("../components/minBar/1.0.1/minBar");
    var tempOffline = require("../template/tempoffline");
    var templateComment = require('../template/tempcomment');
    /* =====================================================================
     *    新版浮动工具栏交互
     * =====================================================================*/
    minBar({
        mainCell: '#J_minBar',
        pathConfig: cdnConfig,
        tpl: templateComment,
        tplName: "tplMinBar",
        data: _globalConfig.minBar.data
    });
    $(function(){
        // 切换体验馆列表右上角样式
        $(document).on("click", "#J_storeList .hd", function(e) {
            var self = $(this);
            if(self.hasClass("on")){
                self.find(".arrow").hide();
                self.find(".link").show();
                self.siblings(".hd").find(".arrow").show();
                self.siblings(".hd").find(".link").hide();
            }
        });
        loadAreaData();
    });
    var apiOffline = {
        loadAreaDataUrl: cdnConfig.apiPath+"/app?app=Offlinestore&class=getunionarea&sign=80768e3eb89619cdc36a4b779cd8ef2e",
        loadStoreDataUrl: cdnConfig.apiPath+"/app?app=Offlinestore&class=getstoreinfobycity&sign=0ca1cc9daba93ba348fd9aca8e1722cb",
        loadStoreImgDataUrl: cdnConfig.apiPath+"/app?app=Offlinestore&class=getstoreimgbyid&sign=fed216e812e2625e92982be5c013bb96",
        loadStoreItemDataUrl: cdnConfig.apiPath + "/app?app=Offlinestore&class=getstorehotsalelist&sign=572e48b713349b4d085725dd813a3a39",
        sendPhoneCodeUrl: cdnConfig.apiPath + "/app?app=Offlinestore&class=sendphonecode&sign=e6c9aafd06a19fb0ce38a0ac086ef831",
        checkPhoneCodeUrl: cdnConfig.apiPath + "/app?app=Offlinestore&class=verifyphonecode&sign=9573e79289da1936ed6c133f3220da7d"
    }
    /*var apiOffline = {
        loadAreaDataUrl: "http://192.168.67.188:3000/api/show/offline_area",
        loadStoreDataUrl: "http://192.168.67.188:3000/api/show/offline_storeList",
        loadStoreImgDataUrl: "http://192.168.67.188:3000/api/show/offline_storeImg",
        loadStoreItemDataUrl: "http://192.168.67.188:3000/api/show/offline_storeItem",
        sendPhoneCodeUrl: "http://192.168.67.188:3000/api/show/smscode",
        checkPhoneCodeUrl: "http://192.168.67.188:3000/api/show/validatecode",
        sendMsgToPhoneUrl: "http://192.168.67.188:3000/api/show/smsaddress"
    }*/
    // 获取地区城市数据
    var defaultStore = {
        area: "华南地区",
        city: "广州市",
        title: "金海马维亚店",
        storeId: "17",
        werksId: "35",
        lat: "113.385972",
        lng: "23.126164"
    };
    function loadAreaData() {
        $.ajax({
            url: apiOffline.loadAreaDataUrl,
            dataType: "jsonp",
            success: function(res){
                if(res.code == 1){
                    res.data.type = "area";
                    $("#J_areaList").html(tempOffline('tplAreaCity', res.data));
                    $("#J_areaList .list li").each(function(){
                        var self = $(this);
                        self.on("click", function(e){
                            $("#J_areaList .title").html(self.attr("data-value"));
                            loadCityData(res.data.list[parseInt(self.attr("data-index"))]);
                        });
                    });
                    loadCityData(res.data.list[2]);
                }
            },
            error: function(res){
                alert("网络错误");
            }
        });
    }
    function loadCityData(cityList){
        // console.log(cityList);
        cityList.type = "city";
        $("#J_cityList").html(tempOffline('tplAreaCity', cityList));
        $("#J_cityList .list li").each(function(){
            var self = $(this);
            self.on("click", function(e){
                $("#J_cityList .title").html(self.attr("data-value"));
                loadStoreData(self.attr("data-value"));
            });
        });
        loadStoreData(cityList.list[0]);
        
    }
    // 获取某个城市所有门店的数据
    var storeData = [];
    function loadStoreData(cityName) {
        $.ajax({
            url: apiOffline.loadStoreDataUrl,
            dataType: "jsonp",
            data: {
                city: cityName
            },
            success: function(res){
                if(res.code == 1){
                    var list = storeData = res.data.storeList;

                    loadStoreImgData(defaultStore.storeId);
                    loadStoreItemData(defaultStore.werksId);// 获取商品信息不用体验馆id，而是用以前的卖场的id
                    setStoreMap({
                        lat: parseFloat(defaultStore.lat),
                        lng: parseFloat(defaultStore.lng)
                    });
                    
                    $("#J_storeList").html(tempOffline('tplStoreList',res.data));
                    $("#J_storeList h4").each(function(){
                        var self = $(this);
                        self.on("click", function(e){
                            loadStoreImgData(self.attr("data-id"));
                            loadStoreItemData(self.attr("data-werksid"));
                            var index = parseInt(self.attr("data-index"));
                            setStoreMap({
                                lat: storeData[index].lat,
                                lng: storeData[index].lng
                            })
                        });
                    });
                    // 体验馆列表（手风琴效果）
                    $("#J_storeList").slide({
                        titCell: ".hd",
                        targetCell: ".bd",
                        defaultIndex: 1,
                        effect: "slideDown",
                        delayTime: 300,
                        trigger: "click",
                        returnDefault: false,
                        autoPlay: false
                    });
                    // 初始化体验馆列表右上角样式
                    $("#J_storeList .bd").each(function(e) {
                        var self = $(this);
                        if (self.is(":hidden")) {
                            self.prev().find(".arrow").show();
                            self.prev().find(".link").hide();
                        } else {
                            self.prev().find(".arrow").hide();
                            self.prev().find(".link").show();
                        }
                    });
                }
            },
            error: function(res){
                alert("网络错误");
            }
        });
    }
    // 实景图的左右按钮样式切换
    function toggleArrowBtn(){
        $(".ofl-detail-small .list li").each(function(i){
            var self = $(this);
            if(self.hasClass("on")){
                if(i<=0){
                    $(".ofl-detail-big .prev").removeClass("active");
                    $(".ofl-detail-small .prev").removeClass("active");
                }else if(i>=$(".ofl-detail-small .list li").length-1){
                    $(".ofl-detail-big .next").removeClass("active");
                    $(".ofl-detail-small .next").removeClass("active");
                }else{
                    $(".ofl-detail-big .arrow a").addClass("active");
                    $(".ofl-detail-small .arrow").addClass("active");
                }
            }
        });
    }
    function loadStoreImgData(storeId) {
        $.ajax({
            url: apiOffline.loadStoreImgDataUrl,
            dataType: "jsonp",
            data: {
                id: storeId
            },
            success: function(res){
                if(res.code == 1){
                    // 加载活动情报站图
                    $("#J_activePic").html(tempOffline('tplStoreActive', res.data));
                    // 活动图的幻灯片效果
                    $("#J_activePic").slide({
                        mainCell: ".bd ul",
                        autoPlay: true,
                        interTime: 8000,
                        mouseOverStop: true
                    });
                    // 体验馆描述
                    for (var i = 0; i < storeData.length; i++) {
                        if(parseInt(storeData[i].id) == storeId){
                            $("#J_detailDscr").html(tempOffline('tplStoreDetail', storeData[i]));
                        }
                    }
                    // 加载体验馆实景图
                    $("#J_detailReal").html(tempOffline('tplStoreReal', res.data));
                    // 大图切换
                    $("#J_detailReal").slide({
                        titCell: ".hd li",
                        mainCell: ".bd ul",
                        effect: "fold",
                        // autoPlay: true,
                        delayTime: 200,
                        prevCell: ".big-prev",
                        nextCell: ".big-next",
                        pnLoop: false,
                        switchLoad: "_src",
                        startFun: function(i, p) {
                            if (i == 0) {
                                $(".small-prev").click();
                            } else if (i % 5 == 0) {
                                $(".small-next").click();
                            }
                        }
                    });
                    // 小图切换
                    $("#J_detailReal .hd").slide({
                        mainCell: "ul",
                        delayTime: 100,
                        vis: 5,
                        scroll: 5,
                        effect: "left",
                        autoPage: true,
                        prevCell: ".small-prev",
                        nextCell: ".small-next",
                        pnLoop: false,
                        mouseOverStop: true,
                        switchLoad: "_src"
                    });
                    // 自定义滚动条
                    new DiyScroll("#J_detailDscr .wrap", "#J_detailDscr .list", { boxClass: "scrollbox", barClass: "scrollbar", barHeight: 10 });
                    // 切换箭头按钮样式
                    $(".ofl-detail-big .arrow a").on("click", function(e){
                        toggleArrowBtn();
                    });
                    $(".ofl-detail-small .arrow").on("click", function(e){
                        toggleArrowBtn();
                    });
                    $(".ofl-detail-small li").on("click", function(e){
                        toggleArrowBtn();
                    });
                }
            },
            error: function(res){
                alert("网络错误");
            }
        });
    }
    function loadStoreItemData(werksId) {
        $.ajax({
            url: apiOffline.loadStoreItemDataUrl,
            dataType: "jsonp",
            data: {
                werks_type_id: werksId
            },
            success: function(res){
                $("#J_oflItem .list").html(tempOffline('tplHotSale', res.data));
            },
            error: function(res){
                alert("网络错误");
            }
        });
    }
    // 体验店地图
    function setStoreMap(site) {
        new BaiduMap(function(){
            var map = new BMap.Map("J_mapContainer");//初始化地图,map暴露为全局对象
            var zoomLevel = 12;
            var marker = new BMap.Marker(new BMap.Point(site.lat, site.lng));
            map.addOverlay(marker);
            map.centerAndZoom(new BMap.Point(site.lat, site.lng), zoomLevel);// 初始化地图,设置城市和地图级别。
            map.enableScrollWheelZoom();    //启用滚轮放大缩小，默认禁用
            map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
            // 放大缩小按钮
            $("#J_zoomIn").on("click", function(e){
                zoomLevel = map.getZoom();
                zoomLevel++;
                if(zoomLevel > 19){
                    zoomLevel = 19;
                    return;
                }
                map.setZoom(zoomLevel);
            });
            $("#J_zoomOut").on("click", function(e){
                zoomLevel = map.getZoom();
                zoomLevel--;
                if(zoomLevel < 2){
                    zoomLevel = 2;
                    return;
                }
                map.setZoom(zoomLevel);
            });

        });
    }
    //自定义下拉  
    !(function() {
        $(document).on('click', '.selector', function(e) {
            e.stopPropagation();
            $('.J_selector').removeAttr('data-open')
                .find('.list').slideUp('fast')
                .end()
                .find('.triangle').removeClass('triangle-up-active');

            var self = $(this),
                tit = self.find('.title'),
                triangle = self.find('.triangle'),
                input = self.find('.selector-input'),
                list = self.find('.list'),
                li = self.find('li');

            function setDef() {
                self.removeAttr('data-open');
                list.slideUp('fast');
                triangle.removeClass('triangle-up-active');
            }

            function setOpen() {
                self.attr('data-open', true);
                list.slideDown();
                triangle.addClass('triangle-up-active');
            }

            if (!self.attr('data-open')) {
                setOpen();
            } else {
                setDef();
            }

            li.on('click', function(e) {
                e.stopPropagation();
                tit.html($(this).find('a').html());
                setDef();
            });

        });

        $(document).on('click', function(e) {
            $('.selector').removeAttr('data-open')
                .find('.list').stop().slideUp('fast')
                .end()
                .find('.triangle').removeClass('triangle-up-active');
        })
    })();
    // 发送短信
    //倒计时
    function countDownFn(t, obj1, obj2) {
        var tempT = t;
        obj1.css('top','-9999px');
        obj2.html(t+"s后重新获取").show();
        var timer =  setInterval(function(){
            if(t<=0){
                clearInterval(timer);
                obj1.css('top','auto').html('重新获取验证码');
                obj2.hide();
            }else{
                t = t - 1;
                obj2.html(t+"s后重新获取");
            }
        },1000);
    }
    //显示提示信息函数
    function showTip(obj, text, type) {
        obj.next(".send-tips").html(text).show();
        //目标input的focus事件
        obj.on("focus", function (event) {
            event.preventDefault();
            obj.next(".send-tips").html('').hide();
        });
    }
    // 发送到手机的弹窗
    $(document).on("click", ".J_sendBtn", function(){
        var self = $(this);
        var index = parseInt(self.attr("data-index"));
        var d = new Dialog({
            title: "免费发送到手机",
            content: tempOffline("tplSendPhone",storeData[index]),
            width: 384,
            fixed: true,
            zIndex: 198502,
            button: [{
                value: '确定',
                className: 'ui-btns-orange',
                id: "J_confirmSendBtn",
                callback: function() {
                    checkPhoneCode(d);
                    return false;
                }
            }]
        }).showModal();
    });
    //发送手机短信
    $(document).on('input', 'input[name="phone"]', function(){
        var self = $(this);
        if(self.val()===""){
            $("#J_getCode").addClass("invalid").removeClass("valid");
        }else{
            $("#J_getCode").addClass("valid").removeClass("invalid");
        }
    });
    $(document).on('click', "#J_getCode", function(){
        var self = $(this);
        if(self.hasClass("invalid")){
            return;
        }
        var phone = $('input[name="phone"]');
        var phoneCode = $('input[name="phonecode"]');
        var phoneNum = $.trim(phone.val()).replace(/\s/g,'');

        if(!/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(phoneNum)) {
            showTip(phone,'手机号码格式有误，请输入正确的手机号');
            return;
        }
        sendPhoneCode(phone, phoneNum);
    });
    //刷新页面的key
    function refreshKey(str){
        /*var tar = $("#security");
        tar.val(str[1]);
        tar.attr("name", str[0]);*/
    }
    var sendCodeClickNum = 0;
    function sendPhoneCode(phone, phoneNum) {
        if(sendCodeClickNum>=3){
            showTip(phone, '发送频繁，请刷新页面重试');
            return;
        }else{
            sendCodeClickNum++;
        }
        countDownFn(60, $("#J_getCode"), $(".J_countDownWrap"));
        $.ajax({
            url: apiOffline.sendPhoneCodeUrl,
            dataType: "jsonp",
            data: {
                "phone": phoneNum,
                "h": $("#security").val(),
                "m": $("#security").attr('name'),
                "n": sendCodeClickNum,
                "r"  : Math.random()
            }
        })
        .done(function(res) {
            if(res.code == 1) {
                refreshKey(res.pin);
                showTip(phone, res.data.msg);
            }
        })
        .fail(function() {
            showTip(phone, '发送失败，请检查网络是否通畅');
        });
    }

    //验证手机验证码
    function checkPhoneCode(dialog) {
        var code = $('input[name="phonecode"]');
        var codeVal = $.trim(code.val());
        var phone = $('input[name="phone"]');
        var phoneNum = $.trim(phone.val());
        var storeId = $('input[name="storeid"]').val();

        if(codeVal != '') {
            if(codeVal.length != 6) {
                showTip(code, '请输入6位手机验证码');
            } else {
                $.ajax({
                    url: apiOffline.checkPhoneCodeUrl,
                    data: {
                        "phone": phoneNum,
                        "code": codeVal,
                        "store_id": storeId
                    },
                    dataType: 'jsonp'
                })
                .done(function(res) {
                    if(res.code == 1) {
                        dialog.remove();
                        var d = new Dialog({
                            title   : res.data.msg,
                            width   : 400,
                            content : '<p style="text-align:center; padding: 20px 0; font-size: 14px;">发送成功，请注意查收！</p>',
                            fixed   : true
                        }).showModal();
                        setTimeout(function(){
                            d.remove();
                        },3000);
                    } else {
                        showTip(code, res.data.msg);
                    }

                })
                .fail(function() {
                    showTip(code, '发送失败，请检查网络是否通畅');
                });
            }
        } else {
            showTip(code, '请输入6位手机验证码');
        }
    }
});
