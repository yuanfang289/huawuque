//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/modal/modal.js
//= include ../../form/_form-base.js

var Page = {
    init: function init() {
        this.browser = UR.getBrowserParam();

        this.ajaxSubmitData = {
            memberPackageId: '',
            count: '',
            payUser: '', // 1 person 2 enterprise
            payType: 1, // 1 zhifubao 3 weixin
            invoice: '', //
            channel: '', //
            companyId: '' // calc
        };

        this.ctrlPayType();

        this.modal();

        this.render(function (res) {
            $('.lazy').lazy();

            var data = res.data;
            this.companyList = data.companyList || [];

            this.ajaxSubmitData.memberPackageId = data.memberPackageOrder.packageId;
            this.ajaxSubmitData.count = data.memberPackageOrder.count;
            this.ajaxSubmitData.channel = this.browser.channel;
            var companyId = this.browser.companyId;
            //console.log(companyId)
            this.renderModal(this.companyList, companyId);

            this.$payType = $('#payType');
            this.$payPerson = this.$payType.find('[data-type="person"]');
            this.$payEnterprise = this.$payType.find('[data-type="enterprise"]');

            this.$company = $('#companyList').closest('.info-layout');
            this.$compayElem = $('[data-set="companyId"]');
            this.$compayModal = $('#companyModal');

            this.getPayType(this.companyList);

            UR.inputCounter('textarea', 50);
            $('#channelCode').mobiscroll().select({
                theme: 'android-holo-light',
                mode: 'scroller',
                display: 'modal',
                lang: 'zh',
                buttons: [
                    'cancel', 'set'
                ],
                minWidth: 248,
                onBeforeShow: function () {
                    UR.androidRefresh(false)
                },
                onCancel: function () {
                    UR.androidRefresh(true)
                },
                onSelect: function () {
                    UR.androidRefresh(true)
                },
            });
        }.bind(this));
    },
    render: function render(callback) {
        // 渲染页面
        UR.template({
            data: this.browser,
            renderRedis: function renderRedis(res) {
                res.data.isWechat = UR.clientTest.isWechat;
                return res.data;
            },
            callback: callback
        });
    },
    ctrlPayType: function ctrlPayType() {
        var self = this;
        $(document).off(UR.click, '#payType label').on(UR.click, '#payType label', function (evt) {
            evt.preventDefault();

            var $this = $(this);

            $this.addClass('selected').siblings().removeClass('selected');

            self.ajaxSubmitData.payUser = $this.attr('data-id');

            var type = $this.attr('data-type');

            self.getPayType(type);

            self.$company.toggleClass('hidden-company', type != 'enterprise');
        });
    },
    getPayType: function getPayType(arg) {
        var _this = this;

        if (typeof arg == 'string') {

            this.ajaxSubmitData.companyId = arg == 'enterprise' ? this.$compayModal.attr('data-val') : '';

            return false;
        }

        if (arg.length == 0) {
            this.$payPerson.trigger(UR.click);
        } else {

            var companyId = UR.getBrowserParam().companyId;
            var companyIdLock = false,
                companyLock = false;
            var companySetData = function (company) {
                _this.ajaxSubmitData.companyId = company.id;
                _this.$compayElem.text(company.name).removeClass('val-empty');
                _this.$compayModal.attr('data-val', company.id);
            }
            arg.map(function (company) {
                // if (company.accountAuth == 0) {

                if (companyIdLock) return;

                if (!companyId) {
                    companySetData(company);
                    companyIdLock = true;
                } else if (companyId && (companyId == company.id)) {
                    companySetData(company);
                    companyIdLock = true;
                } else {
                    if (companyLock) return;
                    companySetData(company);
                    companyLock = true;
                }

                // }
            });


            this.$payEnterprise.trigger(UR.click);
        }
    },
    renderModal: function renderModal(list, companyId) {
        // 渲染弹窗
        if (list.length == 0) {
            $('#companyList').find('a').text('暂无企业').attr('data-toggle', '').next().addClass('hidden');
            return;
        }
        UR.template({
            templateId: 'companyTpl',
            renderEl: $('#companyContainer'),
            delay: 0,
            renderRedis: function renderRedis() {
                return {list: list, companyId: companyId};
            },
            callback: function callback() {
                $('.modal-body').each(function () {
                    new IScroll(this, {
                        click: true,
                        disablePointer: true,
                        disableTouch: false
                    });
                });

            }
        });
    },
    modal: function modal() {
        // 弹窗参数变化
        var that = this;
        var _paramName = "";
        var _paramVal = "";
        var _paramText = "";

        $(document).off('shown.bs.modal', '.modal').on('shown.bs.modal', '.modal', function (e) {

            var $modal = $(this);
            var value = $modal.attr('data-val');

            _paramName = $modal.attr('data-param');
            _paramVal = value;
            _paramText = $('[data-target="#' + this.id + '"]').text();

            $modal.find('.select-list li').each(function () {
                var $li = $(this);
                console.log(value);
                $li.toggleClass("active", $li.attr('data-id') == value);
            });
        }).off('click', '.modal li a').on('click', '.modal li a', function (evt) {
            evt.preventDefault();

            var $this = $(this).parent();

            $this.addClass('active').siblings().removeClass('active');

            _paramVal = $.trim($this.attr('data-id'));
            _paramText = $.trim($this.text());
        }).off(UR.click, '.modal .save').on(UR.click, '.modal .save', function (evt) {
            evt.preventDefault();

            var $modal = $(this).closest('.modal'),
                modalId = $modal.attr('id');

            that.ajaxSubmitData[_paramName] = _paramVal;

            $modal.attr('data-val', _paramVal).modal('hide');

            var $target = $('[data-target="#' + modalId + '"]');
            $target.toggleClass('val-empty', !_paramText).text(_paramText ? _paramText : $target.attr('data-text') || "");
        });
    },
    submit: function submit(callback) {
        var self = this;

        $(document).off(UR.click, '#go').on(UR.click, '#go', function (evt) {
            evt.preventDefault();
            var payUser = $('.selected').attr('data-id');
            if (payUser == '2' && self.companyList.length == 0) {
                UR.msg('您还没有企业,请先到”我的-我的企业“中创建企业，才能使用企业支付哦。', {
                    delay: 3000
                });
                return;
            }
            callback && callback(self.ajaxSubmitData);
        });
    }
};
$(function () {
    Page.init();
});
