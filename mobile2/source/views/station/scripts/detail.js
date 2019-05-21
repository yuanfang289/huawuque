/**
 * Created by zhangguoying on 2016/12/21.
 */


var Page = {
    init: function () {
        this.$render = $('[data-render="template"]');

        this.browser = {
            id: UR.getBrowserParamByName('id'),
        };

        this.ajaxCancelData = {
            orderId: this.browser.id,
        };

        this.ajaxPayData = {
            orderIds: this.browser.id,
            payWay: "",
            channel: 4,
        };

        this.start && this.start();

        this.render();
    },
    getStatusText: function (orderStatus) {
        var arr = ["等待付款", "待使用", "已取消", "已完成"];
        return arr[orderStatus - 1];
    },
    getEquipments: function (data) {
        var arr = [];

        var prop = {
            isWifi: "WIFI",
            isMeetingRoom: "会议室",
            isRelaxZone: "休闲区",
            isActivity: "活动",
            isReproTyp: "复印打印",
            isPhoneBooth: "电话亭",
            isSelfSupermarket: "无人超市",
            isCoffeeHouse: "咖啡",
            isPurifiedWater: "纯净水"
        };

        for (var propKey in prop) {
            if (data[propKey] == 1) {
                arr.push(prop[propKey]);
            }
        }

        return arr.join('、');
    },
    formatted: function (data) { // 服务器数据转化
        var week  = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        data      = data.data || {};

        data.orderStatus = this.getStatusText(data.orderStatus);
        data.equipments  = this.getEquipments(data);

        data.day  = $.dateFormat(data.day, 'yyyy/MM/dd');
        data.week = week[$.dateFormat(data.day, 'date').getDay()];

        data.createTime = $.dateFormat(data.createTime, 'yyyy/MM/dd hh:mm:ss');

        data._payType = {2: '企业支付', 1: '个人支付'}[data.payType];


        this.ajaxPayData.payWay = data.payWay;

        return data;
    },
    render: function () { // 渲染页面
        var that   = this;

        UR.template({
            data: {
                orderId: this.browser.id
            },
            renderRedis: function (res) {
                return that.formatted(res);
            },
        });
    },

    submit: function (options) {
        var that = this;

        $(document)
            .off(UR.click, options.submit)
            .on(UR.click, options.submit, function (evt) {

                evt.preventDefault();

                options.data = this.id == 'cancel' ? that.ajaxCancelData: that.ajaxPayData;
                $.ajaxGet(options);
            });
    }
}

$(function () {
    Page.init();
})
