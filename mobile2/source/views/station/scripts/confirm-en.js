/**
 * Created by zhangguoying on 2016/12/21.
 */

//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/modal/modal.js

var Page = {
    init: function () {
        this.$render = $('[data-render="template"]');

        this.browser = UR.getBrowserParam(); // id|date
        
        this.params = {
            id: this.browser.id,
            date: this.browser.date,
        }

        this.ajaxData = {
            channel: 4,
            stationId: this.browser.id,
            date: this.browser.date,
            couponCodes: '',
            count: 1,
            payWay: 1, //可为0完全优惠券支付,1支付宝 2银联 3微信
            payType: '',
            companyId: '',
        };

        this.modal();

        this.companyCouponList = {};   //企业优惠券列表

        this.render(function (res) {
            let {data = {}} = res;
            this.$payMethods = $('[name="paymethod"]');
            this.totalPrice  = data.price;

            this.$totalPrice = $('#totalPrice');

            this.$count = $('.btn-sum');
            this.$sub   = $('.btn-sub');
            this.$plus  = $('.btn-plus');

            this.$couponItem    = $('#couponItem');     //优惠券条目
            this.$companyItem   = $('#companyItem');


            this.renderModal(data);

            this.selectPayType(data);

            $('#payType label.selected').trigger(UR.click);

            this.calcCount(data);

        }.bind(this));
    },
    calcCount: function(data) {
        // 计算选择数量
        const setBtns = (type, data) => {
            let count        = +this.$count.text();
            let disabledSub  = this.$sub.attr('disabled') == 'disabled',
                disabledPlus = this.$plus.attr('disabled') == 'disabled';
                
            if (type == 'sub') {
                if (disabledSub) {
                    return false;
                }

                count -= 1;
                if (count > 0) {
                    this.$count.text(count);
                }
                disabledSub  = count == 1;
                disabledPlus = false;
            }

            if (type == 'plus') {
                if (disabledPlus) return false;

                count += 1;
                if (count <= data.count) {
                    this.$count.text(count);
                }
                disabledSub  = false;
                disabledPlus = count == data.count;
            }

            this.ajaxData.count = count;
            this.totalPrice     = data.price * count;
            //精确到小数点后两位
            if(this.totalPrice.toString().indexOf('.') != -1){
                this.totalPrice = Math.round(this.totalPrice*100)/100;
            }

            this.$totalPrice.text("¥"+this.totalPrice);

            if (this.getCouponType()) {     //企业
                this.calcCoupon(this.companyCouponList[this.ajaxData.companyId].listCoupon, 'company');
            } else {            //个人
                this.calcCoupon(data.list);
            }

//                this.$payPrice.text(this.totalPrice - (this.couponMoney || 0));


            this.$sub.attr('disabled', disabledSub);
            this.$plus.attr('disabled', disabledPlus);
        }

        $(document)
            .off(UR.click, '.btn-sub')
            .on(UR.click, '.btn-sub', (evt) => {
                evt.preventDefault();

                setBtns('sub', data);
            })
            .off(UR.click, '.btn-plus')
            .on(UR.click, '.btn-plus', (evt) => {
                evt.preventDefault();

                setBtns('plus', data);
            })
    },
    setVal: function (name, text, val, callback) { // 给[data-set]赋值   更新视图
        var elem = $(`[data-set="${name}"]`);

        elem.html(text);

        let sourceText = elem.attr('data-text');
        if (sourceText) {
            elem.toggleClass('val-empty', !text);

            !text && elem.text(sourceText);
        }

        if (val) {
            this.ajaxData[name] = val;
        }

        callback && callback(elem);
    },
    setCouponVal: function (type, isClear) {    //渲染金额显示
        let target = type == 'company' ? 'companyCoupon' : 'coupon';
        let couponMoney = this[`${target}Money`] || 0;  //优惠券总金额
        if (isClear) {      //优惠券清空
            this.setVal('payMoney', this.totalPrice);   //给实付金额赋值
            this.setVal("couponTotal", 0);      //给优惠券金额赋值

            this.$payMethods && this.$payMethods.attr("disabled", false);
            $("#alipay").trigger('click');

            return false;
        }


        var payMoney = this.totalPrice - couponMoney;   //实付金额

        //精确到小数点后两位
        if(payMoney.toString().indexOf('.') != -1){
            payMoney = Math.round(payMoney*100)/100;
        }
        payMoney < 0 && (payMoney = 0);
        this.setVal('payMoney', '&yen;' + payMoney);

        if (this.totalPrice - couponMoney <= 0) {
            this.ajaxData.payWay = 0;

            $('[name="paymethod"]:checked').removeAttr("checked");
            this.$payMethods && this.$payMethods.attr("disabled", true);
        } else {
            this.$payMethods && this.$payMethods.attr("disabled", false);
            $("#alipay").trigger('click');
        }

        this.setVal("couponCodes", couponMoney > 0 ? '&yen;' + couponMoney: null);//代金券金额赋值
        this.setVal("couponTotal", couponMoney);

        this.$couponTotalItem = $('[data-set="couponTotal"]').closest('.info-item');//优惠券显示栏

        if (this.$couponTotalItem.length) {
            if (couponMoney == 0) {
                this.$couponTotalItem.hide();
            } else {
                this.$couponTotalItem.show();
            }
        }
    },
    calcCoupon: function (list, type, ctrl) { // 计算可使用的优惠券 问题2
        if (!ctrl && type == 'company' && this.companyCouponMoney) {    //企业优惠券
            this.setCouponVal('company');
            return false;
        }

        if (!type && this.couponMoney){     //个人优惠券
            this.setCouponVal();
            return false;
        }

        var sub      = this.totalPrice,
            currNode = {};


        (list || []).map(node => {      //list是优惠券列表
            var _sub = this.totalPrice - node.price;//总价大于优惠券单价时
            if (_sub >= 0 && (!currNode.price || (currNode.price - node.price < 0))) {
                sub      = _sub;
                currNode = node;    //当前符合要求的优惠券对象
            }
        });
        
        let money = `${type ? 'companyCoupon' : 'coupon'}Money`;
        if (!$.isEmptyObject(currNode)) {
            this.ajaxData.couponCodes = currNode.couponCode;
            this[money] = currNode.price;
        } else {
            this.ajaxData.couponCodes = '';
            this[money] = 0;
        }

        $(`#${type ? 'companyCouponsModal' : 'couponsModal'}`).attr('data-val', this.ajaxData.couponCodes);

        this.setCouponVal(type);

    },
    formatted: function (data) { // 服务器数据转化
        var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        data     = data.data || {};

        data.date = $.dateFormat(data.date, 'yyyy/MM/dd');
        data.week = week[$.dateFormat(data.date, 'date').getDay()];

        let hasCompany = data.listCompany && data.listCompany.length;
        data.payTypeClass1 = !hasCompany ? 'selected' : '';
        data.payTypeClass2 = hasCompany ? 'selected' : 'disabled';

        return data;
    },
    selectPayType: function (data) {        //选择企业和个人的操作
        var self = this;
        $(document)
            .off(UR.click, '#payType label')
            .on(UR.click, '#payType label', function (evt) {
                evt.preventDefault();

                if ($(this).hasClass('disabled')) return;

                $(this).addClass('selected').siblings().removeClass('selected');

                var id = $(this).attr('data-id');
                self.ajaxData.payType = id;

                let target = id == 2 ? 'companyCouponsModal': 'couponsModal';
                self.$couponItem.find('a').attr('data-target', `#${target}`);

                self.setVal('couponNum', self[target.replace('Modal', 'Len')] || 0);

                self.$companyItem.toggleClass('hidden', id != 2);

                if (id == 2) {   //2 企业   1 个人
                    if ($.isEmptyObject(self.companyCouponList)) {
                        $('[data-set="companyId"]').text('去创建').attr('data-toggle', '');
                        self.$couponItem.hide();
                        self.ajaxData.couponCodes = '';
                        return false;
                    } else {

                        //如果这个企业没有优惠券，隐藏去选择按钮
                        var currCompanyId = $('#companyModal').attr('data-val'); //当前的公司ID
                        for(var item in self.companyCouponList){
                            if(item == currCompanyId){
                                //console.log(self.companyCouponList[item]);
                                if(self.companyCouponList[item].listCoupon){
                                    self.$couponItem.find('.coupon-hide').show();
                                }else {
                                    self.$couponItem.find('.coupon-hide').hide();
                                }
                            }
                        }

                        let couponList = self.companyCouponList[self.ajaxData.companyId];
                        
                        self.renderCompanyCoupons(couponList);
                    }

                } else {
                    if (data.list && data.list.length) {
                        self.$couponItem.find('.coupon-hide').show();
                    } else {
                        self.$couponItem.find('.coupon-hide').hide();
                    }
                    self.$couponItem.show();
                    self.calcCoupon(data.list || []);
                }

                self.ajaxData.couponCodes = $(`#${target}`).attr('data-val') ;
            })
    },
    render: function (callback) { // 渲染页面
        var that   = this;

        UR.template({
            data: {
                stationId: this.browser.id,
                date: this.browser.date,
                sou: 4
            },
            renderRedis: function (res) {
                return that.formatted(res);
            },
            callback: callback
        });
    },
    getCouponName: function (strType) {
        return ["长租工位优惠券",
            "时租工位优惠券",
            "长租会议室优惠券",
            "时租会议室优惠券",
            "电商优惠券"][strType - 1];
    },
    renderCompanyCoupons: function (node, ctrl) {       //渲染企业购物券
        this.setVal("companyId", node.name, node.id);
        $('#companyModal').attr('data-val', node.id);


        this.companyCouponsLen = node.listCoupon ? node.listCoupon.length : 0;
        this.setVal('couponNum', this.companyCouponsLen);


        if (node.accountAuth == 1) {
            this.$couponItem.hide();
            this.ajaxData.couponCodes = '';
            this.setCouponVal('company', 'clear');
            return false;
        }

        if (node.accountAuth == 0) {
            this.ajaxData.couponCodes = $(`#${this.getCouponType() ? 'companyC' : 'c' }ouponsModal`).attr('data-val');
            this.$couponItem.show();
        }

        if(node.listCoupon && node.listCoupon.length) { // 渲染company
            UR.template({
                templateId: 'companyCouponsTpl',
                renderEl: $('#companyCouponsContainer'),
                delay: 0,
                renderRedis: () => {

                    let list = node.listCoupon;
                    list.map((item) => {
                        item.startDate = $.dateFormat(item.startDate, 'yy/MM/dd');
                        item.endDate = $.dateFormat(item.endDate, 'yy/MM/dd');
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
        }
    },
    renderModal: function (data) { // 渲染弹窗

        if (data.list && data.list.length) {
            UR.template({
                templateId: 'couponsTpl',
                renderEl: $('#couponsContainer'),
                delay: 0,
                callback: () => {
                    $('.modal-body').each(function () {
                        new IScroll(this, {
                            click: true,
                            disablePointer: true,
                            disableTouch: false
                        });
                    });
                    this.calcCoupon(data.list);
                },
                renderRedis: () => {
                    let list = data.list || [];

                    let couponIdArray = this.ajaxData.couponCodes.split(',');

                    list.map((node) => {
                        if (node.startDate) {
                            node.startDate = $.dateFormat(node.startDate, 'yy/MM/dd');
                        }
                        if (node.endDate) {
                            node.endDate = $.dateFormat(node.endDate, 'yy/MM/dd');
                        }

                        node.checked = $.inArray(node.couponCode, couponIdArray) != -1;

                        node.strType = this.getCouponName(node.strType);
                    });
                    return {list};
                }
            });

            this.couponsLen = data.list.length;

        }

        if (data.listCompany && data.listCompany.length) {
            UR.template({
                templateId: 'companyTpl',
                renderEl: $('#companyContainer'),
                renderRedis: () => {
                    return {list: data.listCompany};
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


            let getCompanyCoupon = false;
            (data.listCompany || []).map(node => {
                this.companyCouponList[node.id] = node;
                if (!getCompanyCoupon) {
                    getCompanyCoupon = true;
                    this.renderCompanyCoupons(node);
                }
            });
        }

    },
    getCouponType: function () {            //获取支付方式（企业|个人）
        return $('#payType label.selected').attr('data-id') == 2 ? 'company' : '';
    },
    getSelectedCoupons: function (type) {
        return ($(`#${type ? 'companyCouponsModal': 'couponsModal'}`).attr('data-val')||"").split(',')
    },
    modal: function () { // 弹窗参数变化
        let that    = this;
        let _paramName = "";
        let _paramVal  = "";
        let _paramText = "";

        let couponType, ids, vSum;

        $(document)
            .off('shown.bs.modal', '.modal')
            .on('shown.bs.modal', '.modal', function (e) {
                let $modal = $(this);
                let value = $modal.attr('data-val') || "";// 优惠券编号  291|(222,333)
                _paramName = $modal.attr('data-param');//弹窗名 (companyId|couponCodes)
                _paramVal  = value;
                _paramText = $(`[data-target="#${$modal.attr('id')}"]`).text();//google|￥77
                if (this.id.match(/couponsModal/gi)) {  //优惠券弹窗
                    couponType = that.getCouponType();  //company| ''
                    ids = value.split(',');     //优惠券id数组
                    $modal.find(`[data-num]`).each(function () {
                        var $li = $(this);
                        if ($.inArray($li.attr('data-id'), ids) != -1) {
                            $li.attr('checked', true);
                        } else {
                            $li.removeAttr('checked');
                        }

                    });
                } else {    //企业列表弹窗
                    $modal.find('.select-list li').each(function () {
                        var $li = $(this);
                        $li.toggleClass("active", $li.attr('data-id') == value);

                    });
                }
                let _money   = couponType ? 'companyCouponMoney' : 'couponMoney';
                vSum = that[_money];
            })
            .off(UR.click, '.modal .save')     //点击确定操作弹窗操作
            .on(UR.click, '.modal .save', function (evt) {
                evt.preventDefault();

                let $modal  = $(this).closest('.modal'),
                    modalId = $modal.attr('id');

                

                if (_paramName == 'companyId') {
                    that.companyCouponMoney = 0;
                    $('#companyCouponsModal').attr('data-val', '');

                    that.renderCompanyCoupons(that.companyCouponList[_paramVal], 'save');
                    $modal.modal('hide');
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
                    
                    that.ajaxData[_paramName] = _paramVal;
                    $modal.attr('data-val', _paramVal).modal('hide');
                    that.setCouponVal(couponType);
                    return false;
                }

                var $target = $(`[data-target="#${modalId}"]`);
                $target
                    .toggleClass('val-empty', !_paramText)
                    .text(_paramText ? _paramText : ($target.attr('data-text') || ""));


            })
            .off('click', '.modal li a')     //点击企业列表各项的操作
            .on('click', '.modal li a', function (evt) {
                evt.preventDefault();

                var $this = $(this).parent();

                $this.addClass('active')
                    .siblings().removeClass('active');

                _paramName = $this.closest('.modal').attr('data-param');
                _paramVal  = $.trim($this.attr('data-id'));
                _paramText = $.trim($this.text());

                //如果这个企业没有优惠券，隐藏去选择按钮
                for(var item in that.companyCouponList){
                    if(item == _paramVal){
                        //console.log(that.companyCouponList[item]);
                        if(that.companyCouponList[item].listCoupon){
                            that.$couponItem.find('.coupon-hide').show();
                        }else {
                            that.$couponItem.find('.coupon-hide').hide();
                        }
                    }
                }

            })
            .off(UR.click, '.coupon-item')      //点击优惠券各项的操作
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

                that.andriodMethod();
            })
        $(document)
            .off(UR.click, '[data-set="companyId"]')
            .on(UR.click, '[data-set="companyId"]', function (evt) {
                evt.preventDefault();

                if ($(this).attr('data-toggle')) {
                    return false;
                }

                that.andriodMethod();
            })
            .off('change', ':radio')
            .on('change', ':radio', function () {
                that.ajaxData.payWay = $(this).val();
                if ($('#payMoney').text() == "¥0") {
                    that.ajaxData.payWay = 0;
                    $(this).removeAttr("checked");
                }
            })
            .off(UR.click, '#submit').on(UR.click, options.submit, function(evt) {
            evt.preventDefault();
            
            if (that.ajaxData.couponCodes && that.ajaxData.couponCodes.startsWith(',')) {
                that.ajaxData.couponCodes = that.ajaxData.couponCodes.substr(1);
            }

            if (that.ajaxData.couponCodes && that.ajaxData.couponCodes.endsWith(',')) {
                that.ajaxData.couponCodes = that.ajaxData.couponCodes.substr(0, that.ajaxData.couponCodes.length - 1);

            }
            options.data = that.ajaxData;
            $.ajaxGet(options);
        });
    }
}

$(function () {
    Page.init();
})
