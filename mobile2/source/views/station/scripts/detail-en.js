/**
 * Created by zhangguoying on 2016/12/21.
 */

var Page = {
    init: function init() {
        this.$render = $('[data-render="template"]');

        this.browser = {
            id: UR.getBrowserParamByName('id')
        };

        this.ajaxCancelData = {
            orderId: this.browser.id
        };

        this.ajaxPayData = {
            orderIds: this.browser.id,
            payWay: "",
            channel: 4
        };

        this.start && this.start();

        this.render();
    },
    getStatusText: function getStatusText(orderStatus) {
        var arr = ["Wait for payment", "To be used", "Canceled", "Completed"];
        return arr[orderStatus - 1];
    },
    getEquipments: function getEquipments(data) {
        var arr = [];

        var prop = {
            isWifi: "WIFI",
            isMeetingRoom: "Meeting room",
            isRelaxZone: "Recreational",
            isActivity: "Event",
            isReproTyp: "Duplicator and printer",
            isPhoneBooth: "Telephone booth",
            isSelfSupermarket: "Self-service supermarket",
            isCoffeeHouse: "Coffee",
            isPurifiedWater: "Purified water"
        };

        for (var propKey in prop) {
            if (data[propKey] == 1) {
                arr.push(prop[propKey]);
            }
        }

        return arr.join('、');
    },
    formatted: function formatted(data) {
        // 服务器数据转化
        var a = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        data = data.data || {};

        data.orderStatus = this.getStatusText(data.orderStatus);
        data.equipments = this.getEquipments(data);

        data.day = $.dateFormat(data.day, 'yyyy/MM/dd');
        data.week = week[$.dateFormat(data.day, 'date').getDay()];

        data.createTime = $.dateFormat(data.createTime, 'yyyy/MM/dd hh:mm:ss');

        data._payType = { 2: 'Company pay', 1: 'Person pay' }[data.payType];

        this.ajaxPayData.payWay = data.payWay;

        return data;
    },
    render: function render() {
        // 渲染页面
        var that = this;

        UR.template({
            data: {
                orderId: this.browser.id
            },
            renderRedis: function renderRedis(res) {
                return that.formatted(res);
            }
        });
    },

    submit: function submit(options) {
        var that = this;

        $(document).off(UR.click, options.submit).on(UR.click, options.submit, function (evt) {

            evt.preventDefault();

            options.data = this.id == 'cancel' ? that.ajaxCancelData : that.ajaxPayData;
            $.ajaxGet(options);
        });
    }
};

$(function () {
    Page.init();
});