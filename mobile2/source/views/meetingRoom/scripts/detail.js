/**
 * Created by zhangguoying on 2016/12/21.
 */
//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/modal/modal.js


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
            orderNo: this.browser.id,
            paychannel: '',
        };

        this.ajaxSaveUsers = {
            orderid: this.browser.id,
            meetingUserName: '',
            meetingUserMobile: '',
        }

        this.render(function (res) {
            res = res.data || {};

            this.totalNum = res.peopleNum;
            this.modal(res);

        }.bind(this));
    },
    modal: function (res) { // 弹窗参数变化

        let that    = this;

        $(document)
            .off('shown.bs.modal', '.modal')
            .on('shown.bs.modal', '.modal', function (e) {
                that.meetingInfos(res);
            })
            .off('hidden.bs.modal', '.modal')
            .on('hidden.bs.modal', (evt) => {
                UR.localStorage({
                    name: 'ur.mobile.meetinginfo.edit',
                    type: 'set',
                    values: this.sourceInfo,
                });
            });
    },
    checkAndFormat: function () {
        let canSave = true, canSaveMsg;

        this.formattedUsers = {
            mobile: [],
            name: []
        }

        let names = [], tels = [];
        for (let key in this.info) {
            if (!this.info.hasOwnProperty(key)) continue;
            let node = this.info[key];

            let titleEl = $(`.layout-item[data-id="${node.id}"]`).find('h2').text();
            if(!node.name) {
                canSave    = false;
                canSaveMsg = `请填写${titleEl}姓名`;
                UR.msg(canSaveMsg);
                return false;
            }
            if (!node.tel) {
                canSave    = false;
                canSaveMsg = `请填写${titleEl}手机号`;
                UR.msg(canSaveMsg);
                return false;
            }
            if(node.tel && !(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/.test(node.tel))) {
                canSave    = false;
                canSaveMsg = `请填写正确的${titleEl}的手机号`;
                UR.msg(canSaveMsg);
                return false;
            }

            names.push(node.name);
            tels.push(node.tel);
        }

        this.formattedUsers.mobile = tels;
        this.formattedUsers.name   = names;

        this.ajaxSaveUsers.meetingUserMobile = tels.join(',');
        this.ajaxSaveUsers.meetingUserName   = names.join(',');


        if (!canSave) {
            return canSave;
        }
    },
    meetingInfos: function (res) {
        this.$meetingInfo  = $('#meetingContainer');
        this.meetingScroll = null;

        const updateIndex = (info) => {
            let index = 0;
            for(let key in info) {
                if (!info.hasOwnProperty(key)) continue;
                index += 1;
                info[key].index = index;
            }
            return info;
        }
        const renderInfo  = (info, index) => {
            this.$meetingInfo.html(template('meetingTpl', {
                info,
                visible: index < this.totalNum
            }));
            UR.localStorage({
                name: 'ur.mobile.meetinginfo.edit',
                type: 'set',
                values: info,
            });
            if (!this.meetingScroll && IScroll) {
                this.meetingScroll = new IScroll(this.$meetingInfo.parent()[0], {
                    disablePointer: true,
                    disableTouch: false
                });
            }
            if (this.meetingScroll) {
                this.meetingScroll.refresh();
            }
        }
        const newInfo = (info, index, tel, name) => {
            if (!info) info = {};

            let id    = `info${Date.now() || new Date().getTime()}`;
            info[id]  = {
                id: id,
                index: index,
                tel: tel || '',
                name: name || ''
            }

            renderInfo(info, index);
            return info;
        };

        let index = 0;

        if ($.isEmptyObject(this.info)) {
            if (res.name) {
                res.name.map(function (value, k) {
                    index       += 1;
                    this.info   = newInfo(this.info, index, res.mobile[k], value);
                }.bind(this));
            } else {
                this.info = UR.localStorage({name: 'ur.mobile.meetinginfo.edit', dataType: 'json'});
            }
        }

        if ($.isEmptyObject(this.info)) {
            index       += 1;
            this.info   = newInfo(this.info, index);
        } else {
            for(let key in this.info) {
                index = Math.max(index, this.info[key].index);
            }

            renderInfo(this.info, index);
        }

        this.sourceInfo = $.extend(true, {}, this.info);

        this.$meetingInfo
            .off(UR.click, '.btn-container .new')
            .on(UR.click, '.btn-container .new', (evt) => {
                evt.preventDefault();
                index += 1;
                this.info   = newInfo(this.info, index);
            })
            .off(UR.click, '.delete')
            .on(UR.click, '.delete', (evt) => {
                evt.preventDefault();
                index -= 1;
                delete this.info[$(evt.target).closest('.layout-item').attr('data-id')];

                this.info = updateIndex(this.info);
                renderInfo(this.info, index);
            })
            .off('input', '[data-name]')
            .on('input', '[data-name]', (evt) => {
                evt.preventDefault();

                let $this = $(evt.target);
                let id    = $this.closest('.layout-item').attr('data-id');

                let value = $.trim($this.val()),
                    key   = $this.attr('data-name');

                UR.inputClear({
                    parent: $this.closest('.info-cont'),
                    value: value,
                    clearFn: () => {
                        this.info[id][key] = "";
                    }
                });

                this.info[id][key] = value;
            })
            .off('focus', '[data-name]')
            .on('focus', '[data-name]', (evt) => {
                evt.preventDefault();

                let $this = $(evt.target);
                let id    = $this.closest('.layout-item').attr('data-id'),
                    key   = $this.attr('data-name');

                UR.inputClear({
                    parent: $this.closest('.info-cont'),
                    clearFn: () => {
                        this.info[id][key] = "";
                    }
                });
            });
    },
    getStatusText: function (orderStatus) {
        return {
            s0: '等待付款',
            s1: '待使用',
            s2: '使用中',
            s3: '已完成',
            s4: '已取消',
            s5: '已取消',
            s6: '已取消',
            s7: '已取消',
            s8: '已取消',
            s9: '已取消',
            s10: '已取消',
            s11: '已取消',
            s12: '已取消',
            s13: '已取消',
        }[`s${orderStatus}`];
    },
    getPayType: function (payType) {
        return {
            "2": '企业支付',
            "1": '个人支付'
        }[payType];
    },
    getTime: function (date , format) {
        if (date) {
            date = $.dateFormat(date, format);
        }

        if (format == 'h:mm' && /^0[1-9]/g.test(date)) {
            date = date.substr(1);
        }
        return date;
    },
    formatted: function (data) { // 服务器数据转化
        var week  = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        data      = data.data || {};


        this.ajaxPayData.paychannel = data.payWay;

        data._orderStatus = this.getStatusText(data.orderStatus);

        data._day  = data.startTime && data.startTime.substr(0, 10);
        data._day  = $.dateFormat(data._day, 'yyyy/MM/dd');

        data._week = data._day && week[$.dateFormat(data._day, 'date').getDay()];

        data._startTime = this.getTime(data.startTime, 'h:mm');
        data._endTime   = this.getTime(data.endTime,   'h:mm');

        data._openStarttime = this.getTime(data.openStarttime, 'h:mm');
        data._openEndtime   = this.getTime(data.openEndtime, 'h:mm');

        data._createTime = $.dateFormat(data.createTime, 'yyyy/MM/dd hh:mm:ss');

        data.mobile = data.mobile ? data.mobile.split(','): [];
        data.name   = data.name   ? data.name.split(',')  : [];

        this.formattedRestful = data;
        data._payType = this.getPayType(data.payType);


        return data;
    },
    render: function (fn) { // 渲染页面
        var that   = this;

        UR.template({
            data: {
                orderId: this.browser.id
            },
            renderRedis: function (res) {
                return that.formatted(res);
            },
            callback: function (res) {
                fn && fn(res);
            }
        });
    },

    submit: function (options) {
        var that = this;

        $(document)
            .off(UR.click, options.submit)
            .on(UR.click, options.submit, function (evt) {

                evt.preventDefault();

                if (this.id) {
                    options.data = this.id == 'cancel' ? that.ajaxCancelData: that.ajaxPayData;
                } else {
                    options.data = that.ajaxSaveUsers;

                    let $modal  = $(this).closest('.modal');

                    that.sourceInfo = $.extend(true, {}, that.info);
                    UR.localStorage({
                        name: 'ur.mobile.meetinginfo.edit',
                        type: 'set',
                        values: that.info
                    });

                    let canSave = that.checkAndFormat();
                    if (canSave === false) {
                        return false;
                    }

                    $modal.modal('hide');

                    var success = options.success;
                    options.success = function () {
                        success && success();

                        that.formattedRestful.mobile = that.formattedUsers.mobile;
                        that.formattedRestful.name = that.formattedUsers.name;
                        that.$render.html(template('pageTpl', that.formattedRestful))
                    }

                    // options.success();

                }

                $.ajaxGet(options);
            });
    }
}

$(function () {
    Page.init();
})
