/**
 * Created by zhangguoying on 2016/12/21.
 */

//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/modal/modal.js

var Page = {
    init: function () {
        this.$render = $('[data-render="template"]');

        /*
         * meetingRoomId=100053&startTime=12:00&endTime=13:00&plantId=10010&selectDate=2016-03-04&strMeetingType=0
         **/
        this.browser = UR.getBrowserParam();

        /*
         * strMeetingType == 0
         * meetingRoomId=100053&startTime=12:00&endTime=13:00&plantId=10010&selectDate=2016-03-04
         * strMeetingType == 1
         * meetingRoomId=100053&startTime=12:00&endTime=13:00&plantId=10010&selectDate=2016-03-04&source=2
         * */
        this.params = $.extend({}, this.browser); // 获取预定信息参数

        this.params.source = 4;
        delete this.params.strMeetingType;

        this.companyCouponList = {};

        this.render(function (res) {
            let {data = {}} = res;
            this.redis = data;
            this.totalNum = data.peopleNumber;


            this.$payMethods = $('[name="paymethod"]');
            this.totalPrice  = data.totalPrice;

            this.ajaxSubmitData = { // 确认预定参数
                meetingRoomId: data.meetingRoomId,
                startTime: data.startTime,
                endTime: data.endTime,
                plantId: data.plantId,
                companyId: data.limitCompanyId ? data.limitCompanyId : '',
                payWay: '',         //可为0完全优惠券支付,1支付宝 2银联 3微信
                orderChanel: 4,
                couponCodes: '',
                remindTime: 0,
                meetingUserMobile: '',
                meetingUserName: '',
                invoiceTitle: '',
                meetingTheme: ''
            };

            this.ajaxCompanyAvailable = { // 检测企业时长是否可用
                meetingRoomId: data.meetingRoomId,
                startTime: $.dateFormat(data.startTime),
                orderTimeLength: data.hours,
                companyId: '',
            }

            this.$timeTotalItem = $('[data-set="timeTotal"]').closest('.info-item');
            this.$couponItem    = $('#couponItem');     //优惠券列表
            this.$companyItem   = $('#companyItem');    //企业列表

            this.renderModal(data);

            this.modal(data);

            this.selectPayType(data);

            $('#payType label.selected').trigger(UR.click);

            this.info = UR.localStorage({dataType: 'json'});
            this.setVal('meetingInfos', 'refresh');

        }.bind(this));

        this.submit({
            submit: "#submit",
        });

    },
    setVal: function (name, text, val, callback) { // 给[data-set]赋值
        var elem = $(`[data-set="${name}"]`);

        if (name == 'meetingInfos') {
            let canSave = true, canSaveMsg;

            let names = [], tels = [];
            if (text == 'refresh') {
                for (let key in this.info) {
                    if (!this.info.hasOwnProperty(key)) continue;
                    let node = this.info[key];

                    if((!node.name) || (!node.tel) || (node.tel && !(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/.test(node.tel)))) {
                        delete this.info[node.id];
                    } else {
                        names.push(node.name);
                        tels.push(node.tel);
                    }
                }
            } else {
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
            }

            this.ajaxSubmitData.meetingUserMobile = tels.join(',');
            this.ajaxSubmitData.meetingUserName   = names.join(',');

            text = names.join(',');

            if (!canSave) {
                return canSave;
            }

        }

        if (name == 'countTime') {
            text = text ? text.match(/\d+(\.\d+)?/g)[0] : '';
            let disabled = text - this.redis.payHours < 0;
            $('[data-set="timeTotal"]').text(disabled ? 0: this.redis.payHours );
            $('[data-set="payMoney"]').html((disabled ? this.totalPrice: 0));

            setTimeout(() => {
                $('#hour')
                    .attr({
                        'disabled': disabled
                    });
                if (disabled) {
                    this.ajaxSubmitData.payWay = 1;
                    $('#alipay').attr('checked', true).prop('checked', true);
                    this.$timeTotalItem.length && this.$timeTotalItem.hide();
                } else {
                    this.ajaxSubmitData.payWay = 4;
                    $('#hour').attr('checked', true).prop('checked', true);
                    this.$timeTotalItem.length && this.$timeTotalItem.show();
                }
            }, 0);
            text = `剩余${text}小时`;

        }
        elem.html(text);

        let sourceText = elem.attr('data-text');
        if (sourceText) {
            elem.toggleClass('val-empty', !text);

            !text && elem.text(sourceText);
        }

        if (val) {
            this.ajaxSubmitData[name] = val;
        }

        callback && callback(elem);

    },
    setCouponVal: function (type, isClear) {

        let target = type == 'company' ? 'companyCoupon' : 'coupon';
        let couponMoney = this[`${target}Money`] || 0;

        if (isClear) {
            this.setVal('payMoney', this.totalPrice);
            this.setVal('couponTotal', 0);

            this.$payMethods && this.$payMethods.attr("disabled", false);
            $("#alipay").trigger('click');

            return false;
        }


        var payMoney = this.totalPrice - couponMoney;
        payMoney < 0 && (payMoney = 0);
        this.setVal('payMoney', payMoney);

        if (this.totalPrice - couponMoney <= 0) {
            this.ajaxSubmitData.payWay = 0;

            $('[name="paymethod"]:checked').removeAttr("checked");
            this.$payMethods && this.$payMethods.attr("disabled", true);
        } else {
            this.$payMethods && this.$payMethods.attr("disabled", false);
            $("#alipay").trigger('click');
        }

        this.setVal("couponCodes", couponMoney > 0 ? '&yen;' + couponMoney: null);
        this.setVal("couponTotal", couponMoney);

        this.$couponTotalItem = $('[data-set="couponTotal"]').closest('.info-item');

        if (this.$couponTotalItem.length) {
            if (couponMoney == 0) {
                this.$couponTotalItem.hide();
            } else {
                this.$couponTotalItem.show();
            }

        }
    },
    calcCoupon: function (list, type, ctrl) { // 计算可使用的优惠券

        if (!ctrl && type == 'company' && this.companyCouponMoney) {
            this.setCouponVal('company');
            return false;
        } else if (!type && this.couponMoney){
            this.setCouponVal();
            return false;
        }


        var sub      = this.totalPrice,
            currNode = {};

        (list || []).map(node => {
            var _sub = this.totalPrice - node.price;
            if (_sub >= 0 && (!currNode.price || (currNode.price - node.price < 0))) {
                sub      = _sub;
                currNode = node;
            }
        });

        let money = `${type ? 'companyCoupon' : 'coupon'}Money`;
        if (!$.isEmptyObject(currNode)) {
            this.ajaxSubmitData.couponCodes = currNode.couponCode;
            this[money] = currNode.price;
        } else {
            this.ajaxSubmitData.couponCodes = '';
            this[money] = 0;
        }

        $(`#${type ? 'companyCouponsModal' : 'couponsModal'}`).attr('data-val', this.ajaxSubmitData.couponCodes);

        this.setCouponVal(type);

    },
    getEquipments: function (data) { // 根据设备标识获取设备名称
        var arr = [];

        var prop = {
            meetingRoomTel: "电话",
            meetingRoomProjector: "投影仪",
            meetingRoomSound: "音响",
            meetingRoomVideo: "电视",
        };

        for (var propKey in prop) {
            if (data[propKey] == 1) {
                arr.push(prop[propKey]);
            }
        }

        return arr.join(' ');
    },
    formatted: function (data) { // 服务器数据转化
        var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        data     = data.data || {};

        data._equipments = this.getEquipments(data);

        data._date = $.dateFormat(data.startTime, 'yyyy/MM/dd');
        data._week = data._date && week[$.dateFormat(data._date, 'date').getDay()];

        data._startTime = $.dateFormat(data.startTime, 'h:mm');
        data._endTime   = $.dateFormat(data.endTime,   'h:mm');


        let hasCompany = data.list && data.list.length;
        data.payTypeClass1 = hasCompany ? 'selected' : '';
        data.payTypeClass2 = hasCompany ? '' : 'selected';

        return data;
    },
    selectPayType: function (data) {        //选择支付方式
        var self = this;
        $(document)
            .off('blur', '[data-name=meetingTheme]')
            .on('blur', '[data-name=meetingTheme]', function (evt) {
                var $this = $(this);
                if($this.val()){
                    self.ajaxSubmitData.meetingTheme = $this.val();
                }
            })
            .off(UR.click, '#payType label')
            .on(UR.click, '#payType label', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                $(this).addClass('selected').siblings().removeClass('selected');

                var id = $(this).attr('data-id');   //2 企业    1 个人
                self.ajaxSubmitData.payType = id;

                let target = id == 2 ? 'companyCouponsModal': 'couponsModal';
                self.$couponItem.find('a').attr('data-target', `#${target}`);
                $('[data-set="companyId"]').attr('data-toggle', 'modal');
                
                self.setVal('couponNum', self[target.replace('Modal', 'Len')] || 0);

                self.$companyItem.toggleClass('hidden', id != 2);

                // if (data.strMeetingType == 0 && data.allowTime == 1 ) {     //时长支付
                //     if (id == 2) {
                //         self.ajaxSubmitData.companyId = $('#companyModal').attr('data-val');
                //         $('#timeItem').show();
                //         $('#companyItem').show();
                //         $('#payType').css('border-bottom-width', '1px');
                //         if ($.isEmptyObject(self.companyCouponList)) {
                //             $('[data-set="companyId"]').text('去创建').attr('data-toggle', '');
                //             return false;
                //         } else {
                //             self.renderCompanyTime(self.companyCouponList[self.ajaxSubmitData.companyId]);
                //         }
                //     } else {
                //         $('#timeItem').hide();
                //         $('#companyItem').hide();
                //         $('#payType').css('border-bottom-width', 0);
                //         self.ajaxSubmitData.companyId = '';
                //         $('#alipay').trigger('click');
                //     }
                // }

                // if (data.isCoupons == 1) {
                    if (id == 2) {
                        $('#companyItem').show();
                        $('#payType').css('border-bottom-width', '1px');
                        if ($.isEmptyObject(self.companyCouponList)) {
                            $('[data-set="companyId"]').text('去创建').attr('data-toggle', '');
                            // self.$couponItem.hide();
                            self.ajaxSubmitData.couponCodes = '';
                            return false;
                        } else {
                            self.$couponItem.find('.coupon-hide').show();

                            let couponList = self.companyCouponList[self.ajaxSubmitData.companyId];
                            self.renderCompanyCoupons(couponList);
                        }
                        // self.ajaxSubmitData.companyId = $('#companyModal').attr('data-val');
                        //         // $('#timeItem').show();
                        // $('#companyItem').show();
                        // $('#payType').css('border-bottom-width', '1px');
                        // // console.log(self.companyCouponList);
                        // if ($.isEmptyObject(self.companyCouponList)) {
                        //     $('[data-set="companyId"]').text('去创建').attr('data-toggle', '');
                        //     return false;
                        // } else {
                        //     self.renderCompanyTime(self.companyCouponList[self.ajaxSubmitData.companyId]);
                        // }
                    } else {
                        $('#companyItem').hide();
                        $('#payType').css('border-bottom-width', 0);
                        if (data.listCouponsVo && data.listCouponsVo.length) {
                            self.$couponItem.find('.coupon-hide').show();
                        } else {
                            self.$couponItem.find('.coupon-hide').hide();
                        }
                        self.$couponItem.show();
                        self.calcCoupon(data.listCouponsVo || []);
                    }

                    self.ajaxSubmitData.couponCodes = $(`#${target}`).attr('data-val');
                // }

            })
    },
    render: function (callback) { // 渲染页面 //

        // let url = "";
        // if (!this.$render.attr('data-url')) {
        //     if (this.browser.strMeetingType == 0) { // 室内>>>长租
        //         url = "/meetingRoom/reserve";
        //     }
        //     if (this.browser.strMeetingType == 1) { // 室外>>>时租
        //         url = "";
        //     }
        // }

        UR.template({
            renderEl: this.$render,
            url: '/rentMeetingRoom/reserve',
            data: this.params,
            renderRedis: (res) => {
                return this.formatted(res);
            },
            callback: callback
        });
    },
    meetingInfos: function () {
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
        const newInfo = (info, index) => {
            let id    = `info${Date.now() || new Date().getTime()}`;
            info[id]  = {
                id: id,
                index: index,
                tel: '',
                name: ''
            }

            renderInfo(info, index);
            return info;
        };

        this.info = UR.localStorage({dataType: 'json'});
        let index = 0;

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
    renderCompanyCoupons: function (node, ctrl) {
        this.setVal("companyId", node.name, node.id);
        $('#companyModal').attr('data-val', node.id);
        this.setVal("countTime", node.countTime);
        this.companyCouponsLen = node.listCoupon ? node.listCoupon.length : 0;
        this.setVal('couponNum', this.companyCouponsLen);

        if (node.accountAuth == 1) {
            $('#timeItem').hide();
            this.$couponItem.hide();
            this.ajaxSubmitData.couponCodes = '';
            this.setCouponVal('company', 'clear');

            return false;
        }


        if (node.accountAuth == 0) {
            this.ajaxSubmitData.couponCodes = $(`#${this.getCouponType() ? 'companyC' : 'c' }ouponsModal`).attr('data-val');
            $('#timeItem').show();
            this.$couponItem.show();
        }


        if(node.listCoupon && node.listCoupon.length) { // company
            UR.template({
                templateId: 'companyCouponsTpl',
                renderEl: $('#companyCouponsContainer'),
                delay: 0,
                renderRedis: () => {
                    let list = node.listCoupon;
                    list.map((item) => {
                        item.startDate = $.dateFormat(item.startDate, 'yy/MM/dd');
                        item.endDate   = $.dateFormat(item.endDate, 'yy/MM/dd');
                    })
                    return {list};
                },
                callback: () => {
                    $('.modal-body').each(function () {
                        new IScroll(this, {
                            click: true,
                            disablePointer: true,
                            disableTouch: false
                        });
                    });

                    this.calcCoupon(node.listCoupon, 'company', ctrl);
                }
            });
            $('#couponItem').find('.coupon-hide').show();
        }else{
            
            $('#couponItem').find('.coupon-hide').hide();
        }
    },
    renderCompanyTime: function (node) {
        $('#companyModal').attr('data-val', node.id);
        this.setVal("companyId", node.name, node.id);
        this.setVal("countTime", node.countTime);

        if (node.countTime - this.redis.payHours >= 0) {
            $('#hour').attr('checked', true);
            this.ajaxSubmitData.payWay = 4;
        } else {
            $('#alipay').attr('checked', true);
            this.ajaxSubmitData.payWay = 1;
            this.$timeTotalItem.length && this.$timeTotalItem.hide();
        }

        //判断一下有没有权限
        if (node.accountAuth == 1) {
            $('#timeItem').hide();
            //this.$couponItem.hide();
            //this.ajaxSubmitData.couponCodes = '';
            // this.setCouponVal('company', 'clear');
            return false;
        }

        if (node.accountAuth == 0) {
            //this.ajaxSubmitData.couponCodes = $(`#${this.getCouponType() ? 'companyC' : 'c' }ouponsModal`).attr('data-val');
            $('#timeItem').show();
            // this.$couponItem.show();
        }
    },
    renderModal: function (data) { // 渲染弹窗
        var _this6 = this;
        UR.template({
            templateId: 'companyTpl',
            renderEl: $('#companyContainer'),
            renderRedis: () => {
                return {list: data.list};
            },
            callback: () => {
                $('.modal-body').each(function () {
                    new IScroll(this, {
                        click: true,
                        disablePointer: true,
                        disableTouch: false
                    });
                });
            }
        });
        // if (data.strMeetingType == 0 && data.allowTime == 1 ) {
        //     if (data.list && data.list.length) {
        //         let getCompanyTime = false;
        //         (data.list || []).map(node => {
        //             _this6.companyCouponList[node.id] = node;
        //             if (!getCompanyTime) {
        //                 getCompanyTime = true;
        //                 _this6.renderCompanyTime(node);
        //             }
        //         });
        //     } else {
        //
        //     }
        //
        // } else

            if(data.listCouponsVo && data.listCouponsVo.length) { // person
                UR.template({
                    templateId: 'couponsTpl',
                    renderEl: $('#couponsContainer'),
                    renderRedis: () => {
                        let list = data.listCouponsVo || [];
                        list.map((item) => {
                            item.startDate = $.dateFormat(item.startDate, 'yy/MM/dd');
                            item.endDate = $.dateFormat(item.endDate, 'yy/MM/dd');
                        })
                        return {list:list};
                    },
                    callback: () => {
                        $('.modal-body').each(function () {
                            new IScroll(this, {
                                click: true,
                                disablePointer: true,
                                disableTouch: false
                            });
                        });
//                            this.calcCoupon(data.listCouponsVo);
                    }
                });
                this.couponsLen = data.listCouponsVo.length;
            }
            if (data.list && data.list.length) {
                // console.log('进来了')
                let getCompanyCoupon = false;
                (data.list || []).map(node => {
                    _this6.companyCouponList[node.id] = node;
                    if (!getCompanyCoupon) {
                        getCompanyCoupon = true;
                        _this6.renderCompanyCoupons(node);
                    }
                });
            }
        if (data.isCoupons == 2) {
            $('#alipay').attr('checked', true);
            this.ajaxSubmitData.payWay = 1;
        }
    },
    getCouponType: function getCouponType() {
        return $('#payType label.selected').attr('data-id') == 2 ? 'company' : '';
    },
    getSelectedCoupons: function getSelectedCoupons(type) {
        return ($(`#${type ? 'companyCouponsModal': 'couponsModal'}`).attr('data-val')||"").split(',')
    },
    modal: function (data) { // 弹窗参数变化
        let that    = this;
        let _paramName = "";
        let _paramVal  = "";
        let _paramText = "";
        let _hour      = "";

        var couponType = void 0,
            ids = void 0,
            vSum = void 0;

        $(document)
            // .off(UR.click, '.select-list li')
            // .on(UR.click, '.select-list li',function() {
            //     $(this).addClass('active').siblings().removeClass('active');
            // })
            .off('shown.bs.modal', '.modal')
            .on('shown.bs.modal', '.modal', function (e) {

                if (this.id == 'meetingInfosModal') {
                    that.meetingInfos();
                    return false;
                }

                let $modal = $(this);
                let value = $modal.attr('data-val');

                _paramName = $modal.attr('data-param');
                _paramVal  = value;
                _paramText = $(`[data-target="#${$modal.attr('id')}"]`).text();


                if (this.id.match(/couponsModal/gi)) {
                    couponType = that.getCouponType();
                    ids = value.split(',');
                    // console.log(ids);
                    $modal.find(`[data-num]`).each(function () {
                        var $li = $(this);
                        if ($.inArray($li.attr('data-id'), ids) != -1) {
                            $li.attr('checked', true);
                        } else {
                            $li.removeAttr('checked');
                        }
                    });
                } else {
                    $modal.find('.select-list li').each(function () {
                        var $li = $(this);
                        $li.toggleClass("active", $li.attr('data-id') == value);

                    });
                }
                let _money   = couponType ? 'companyCouponMoney' : 'couponMoney';
                vSum = that[_money];
            })

            .off('hidden.bs.modal', '.modal')
            .on('hidden.bs.modal', (evt) => {
                if (evt.target.id == 'meetingInfosModal') {
                    UR.localStorage({
                        type: 'set',
                        values: this.sourceInfo,
                    });
                }
            })
            .off('click', '.modal li a')
            .on('click', '.modal li a', function (evt) {
                evt.preventDefault();
                
                var $this = $(this).parent();
                
                $this.addClass('active')
                    .siblings().removeClass('active');

                _paramName = $this.closest('.modal').attr('data-param');
                _paramVal  = $.trim($this.attr('data-id'));
                _paramText = $.trim($this.text());
                if (_paramName == 'companyId') {
                    let time = $this.attr('data-time');
//                        that.setVal('countTime', +time);
                    // $('#hour').attr('disabled', (+time) < that.redis.payHours);
                    _hour    = (`剩余${time}小时`);
                }

            })
            .off(UR.click, '.modal .save')
            .on(UR.click, '.modal .save', function (evt) {
                evt.preventDefault();

                let $modal  = $(this).closest('.modal'),
                    modalId = $modal.attr('id');

                if (modalId == 'meetingInfosModal') { // 参会人单独处理
                    that.sourceInfo = $.extend(true, {}, that.info);
                    UR.localStorage({
                        type: 'set',
                        values: that.info
                    });

                    let canSave = that.setVal('meetingInfos');
                    if (canSave === false) {
                        return false;
                    }

                    $modal.modal('hide');

                    return false;
                }

               if (_paramName == 'companyId') {
                    that.companyCouponMoney = 0;
                    $('#companyCouponsModal').attr('data-val', '');

                    that.renderCompanyCoupons(that.companyCouponList[_paramVal], 'save');
                }

                
                if (_paramName == 'couponCodes') {
                    var $item = $modal.find('.coupon-item');
                    let _money   = couponType ? 'companyCouponMoney' : 'couponMoney';
                    let moneySum = that[_money];
                    $item.each(function(){
                        var $this = $(this),
                        id    = $.trim($this.attr('data-id')),
                        money = +$.trim($this.attr('data-num')),
                        pos   = $.inArray(id, ids);
                        if($this.attr('checked')) {  
                            if($.inArray(id, ids) == -1){   //不存在
                                ids.push(id);
                                moneySum += money;
                            }
                        }else{
                            if($.inArray(id, ids) != -1){
                                ids.splice(pos, 1);
                                moneySum -= money;
                            }
                        }
                        that[_money] = moneySum;
                        _paramName = $this.closest('.modal').attr('data-param');
                        _paramVal  = ids.join(',');
                        _paramText = `¥${moneySum}`; 
                        
                    })
                    that.ajaxSubmitData[_paramName] = _paramVal;
                    $modal.attr('data-val', _paramVal).modal('hide');
                    that.setCouponVal(couponType);
                    return false;
                }
                $modal.modal('hide');
                var $target = $(`[data-target="#${modalId}"]`);
                $target
                    .toggleClass('val-empty', !_paramText)
                    .text(_paramText ? _paramText : ($target.attr('data-text') || ""));

            })
            .off(UR.click, '.coupon-item')
            .on(UR.click, '.coupon-item', function (evt) { // 选优惠券
                evt.preventDefault();

                var $this = $(this);

                var id    = $.trim($this.attr('data-id')),
                    money = +$.trim($this.attr('data-num'));

                if ($this.attr('checked')) {    //已选择
                    vSum -= money;
                    $this.removeAttr("checked");
                } else {
                    if (vSum < that.totalPrice) {
                        vSum += money;
                        $this.attr('checked', true);
                    } else {
                        UR.msg("您选择的优惠券已超出实付金额");
                    }
                }

            });
    },
    submit: function (options) { // 提交订单
        var that = this;

        $('#companyModal').off(UR.click, '.btn-container .btn')
            .on(UR.click, '.btn-container .btn', function (evt) {
                evt.preventDefault();

                // that.andriodMethod();
            })
        $(document)
            .off(UR.click, '[data-set="companyId"]')
            .on(UR.click, '[data-set="companyId"]', function (evt) {
                evt.preventDefault();

                if ($(this).attr('data-toggle')) {
                    return false;
                }

                // that.andriodMethod();
            })
            .off('change', ':radio')
            .on('change', ':radio', function () {
                let value = $(this).val();
                that.ajaxSubmitData.payWay = value;


                if (value == 1) {
                    that.setVal('timeTotal', 0);
                    that.setVal('couponTotal', 0);
                    that.$timeTotalItem.length && that.$timeTotalItem.hide();
                } else if (value == 4) {
                    that.$timeTotalItem.length && that.$timeTotalItem.show();
                    that.setVal('timeTotal', that.redis.payHours);
                }

                if (that.$timeTotalItem && that.$timeTotalItem.length) {
                    $('[data-set="payMoney"]').html((that.$timeTotalItem.css('display') == 'none' ? that.totalPrice: 0));
                }

            })
            .off(UR.click, '#submit')
            .on(UR.click, options.submit, function(evt) {
                evt.preventDefault();

                if(!$('[data-name=meetingTheme]').val()){
                    UR.msg('请填写会议主题');
                    return false;
                };
                // 长租会议室>>>普通支付 + 时租会议室>>>优惠券支付、普通支付
                var payUrl = "/rentMeetingRoom/creatOrderAndPay";

                // if (that.browser.strMeetingType == 0 && that.ajaxSubmitData.payWay == 4) { // 长租会议室>>>免费时长支付
                //     payUrl = "/rentMeetingRoom/payByHour";
                //
                //     delete that.ajaxSubmitData.couponCodes;
                //     delete that.ajaxSubmitData.payWay;
                //
                //     $.ajaxGet({
                //         url: payUrl,
                //         data: that.ajaxSubmitData,
                //         success: (res) => {
                //             that.payHour && that.payHour(res, that);
                //         }
                //     })
                // } else {
                if (that.ajaxSubmitData.couponCodes && that.ajaxSubmitData.couponCodes.startsWith(',')) {
                    that.ajaxSubmitData.couponCodes = that.ajaxSubmitData.couponCodes.substr(1);
                }

                if (that.ajaxSubmitData.couponCodes &&  that.ajaxSubmitData.couponCodes.endsWith(',')) {
                    that.ajaxSubmitData.couponCodes = that.ajaxSubmitData.couponCodes.substr(0, that.ajaxSubmitData.couponCodes.length - 1);
                }

                $.ajaxGet({
                    url: payUrl,
                    data: that.ajaxSubmitData,
                    success: (res) => {
                        that.payOther && that.payOther(res, that);
                        UR.localStorage({
                            type: 'remove'
                        });
                    }
                })
            // }
        });
    }
}

$(function () {
    Page.init();
})
