//= include ../../public/plugins/mobiscroll/scripts/mobiscroll.js
//= include ./_form-base.js
var Form = {
    init: function() {
        BaseForm.select();
        this.initFuture();
        this.counter();
    },
    counter: function() { // 初始化当前页面所有的富文本输入长度计算函数
        $('textarea').each(function() {
            if ($(this).attr('maxlength'))
                UR.inputCounter(this);
            }
        );
    },
    ajaxPost: function(options) {
        BaseForm.post(options);
        Form.options = options;
    },
    initFuture: function() { // 初始化预约日期
        var date   = new Date();
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
            preset: 'date',
            onBeforeShow: function(inst) {
                UR.androidRefresh(false)
            },
            onCancel: function(inst) {
                UR.androidRefresh(true)
            }
        }

        var $dates = $('[data-toggle="mdate"]');
        $dates.each(function() {
            var $this   = $(this),
                target  = $this.attr('data-target'),
                $target = target ? $(`[name=${target}]`) : null;
            $this.mobiscroll().date($.extend(true, {}, option, {
                onShow: function(event, inst) {
                    $(document).trigger('init.bs.date', [$this, inst]);
                },
                onSelect: function(inst, event) {
                    UR.androidRefresh(true)
                    $target && $target.val($.dateFormat(inst, 'datetime'));
                }
            }));
        });
    }
};

$(function() {
    Form.init();
});
