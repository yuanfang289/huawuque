/**
 * Created by zhangguoying on 2016/12/21.
 */

//= include ./_formatted.js

var Page = {
    init: function () {
        this.$render = $('[data-render="template"]');

        this.browser = UR.getBrowserParam();

        this.render();
    },
    formatted: function (res) { // 服务器数据转化
        var data  = res.data || {};

        data.retCode = res.retCode;

        data = formatted(data, "detail");

        return data;
    },
    render: function () { // 渲染页面
        var that   = this;

        UR.template({
            data: this.browser,
            renderRedis: function (res) {
                return that.formatted(res);
            },
        });
    },
}

$(function () {
    Page.init();
})
