//= include ../../public/component/uploader/uploader.js
//= include ../../public/plugins/mobiscroll/scripts/mobiscroll.js
//= include ../../public/plugins/template.js
//= include ./_form-base.js
var Form = {
    init: function() {
        BaseForm.select();
        this.dynamicInvestorForm();
        this.redraw();
        this.selectTerm();
    },
    ajaxPost: function (options) {
        BaseForm.post(options);
        Form.options = options;
    },
    setVerify: function (validator) {
        delete Form.options.validator;

        Form.options = $.extend(true, {}, Form.options, {
            validator: validator
        });
        BaseForm.post(Form.options);
    },
    initDate: function() { // 初始化投资人信息时间控件
        var date = new Date();
        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            startYear: date.getFullYear() - 50,
            endYear: date.getFullYear(),
            dateFormat: 'yy/mm/dd',
            maxDate: date,
            buttons: [
                'cancel', 'set'
            ],
            preset : 'date',

            onCancel: function(inst) {
                UR.androidRefresh(true)
            },
            onShow: function (event, inst) {
                $(event).find('.dwv').text(inst + ' 至今');
            },
            onChange: function (inst, event) {
                $(event._header).text(inst + ' 至今');
            },

        }

        var $dates = $('[data-toggle="mdate"]');
        $dates.each(function() {
            var $this = $(this),
                name  = this.id.replace('_dummy', '');
            $this.mobiscroll().date($.extend(true, {}, option, {
                onBeforeShow: function(inst) {
                    inst.setVal($.trim($this.val()).replace(/\s*至今$/g, ''))
                    UR.androidRefresh(false)
                },
                onSelect: function(inst, event) {
                    UR.androidRefresh(true)
                    $this.val(inst + ' 至今');
                    $(`[name="${name}"]`).val($.dateFormat(inst));
                }
            }));
        });
    },
    initFuture: function() { // 初始化服务商申请时间控件
        var date = new Date();
        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            startYear: date.getFullYear(),
            endYear: date.getFullYear() + 1,
            minDate: date,
            buttons: [
                'cancel', 'set'
            ],
            preset : 'date',
            onBeforeShow: function(inst) {
                UR.androidRefresh(false)
            },
            onCancel: function(inst) {
                UR.androidRefresh(true)
            }
        }

        var $dates = $('[data-toggle="mdate"]');
        $dates.each(function() {
            var $this = $(this);
            $this.mobiscroll().date($.extend(true, {}, option, {
                onShow: function (event, inst) {
                    $(document).trigger('init.bs.date', [$this, inst]);
                },
                onSelect: function(inst, event) {
                    UR.androidRefresh(true)
                    $this.trigger('storage', inst);
                }
            }));
        });
    },
    dynamicInvestorForm: function() {
        var that = this;
        $(document)
            .off('change', '[data-toggle="dynamic"]')
            .on('change', '[data-toggle="dynamic"]', function (evt) {
                evt.preventDefault();

                var $this  = $(this),
                    tplId  = $this.attr('data-tpl'),
                    target = $this.attr('data-target'),
                    value  = $this.val();

                $(target).html(template(tplId, {data: {type: value}}))
                that.initDate();
                $(document).trigger('select', value);
            });
    },
    redraw: function () {
        $('[data-toggle="redraw"]').each(function () {
            var $this = $(this);
            $this.off('input').on('input', function () {
                var target    = $this.attr('data-target'),
                    value     = $.trim($this.val());
                var $target   = $(target),
                    className = 'shown';

                if (value.length > 0) {
                    $target.addClass(className);
                } else {
                    $target.removeClass(className);
                }
            });
        });
    },
    counter: function () { // 初始化当前页面所有的富文本输入长度计算函数
        $('textarea').each(function () {
            UR.inputCounter(this);
        });
    },
    selectTerm: function () { // 选择优惠期限
        $(document).off('init.bs.date').on('init.bs.date', function (evt, elem, inst) {
            var $radio = $(elem).closest('.radio-date').find(':radio');
            $radio.prop('checked', true).trigger('storage', $radio.val());
        }).off(UR.click, '.radio-control label').on(UR.click, '.radio-control label', function () {
            var $this  = $(this);
            var $radio = $this.find(':radio');
            $radio.trigger('storage', $radio.val());
            if ($this.hasClass('radio-date')) {
                $this.find(':text').trigger('click');
            } else {
                $this.siblings().find(':text').val('').trigger('storage', '');
            }
        });
    },
};

$(function () {
    Form.init();
});
