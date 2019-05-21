//= include ../../public/component/uploader/uploader.js
//= include ../../public/plugins/mobiscroll/scripts/mobiscroll.js
//= include ../../public/plugins/template.js
//= include ./_form-base.js
var Form = {
    init: function() {
        BaseForm.select();
        BaseForm.backOrClose();
        this.initWorkstage();
        this.initVisitedDate();
        this.initVisitReason();
        this.initVisitedTime();
        UR.nativeShowShareButton(false);
    },
    ajaxPost: function(options) {
        BaseForm.post(options);
        Form.options = options;
    },
    initWorkstage: function() {
        $.ajax({
            url: '/workstageVisit/workstageList',
            // url: '/views/form/data/workstageList.json',
            type: 'GET',
            dataType: 'json',
            error: function(xhr) {
                UR.msg('Refresh the screen, data acquisition failed', {
                    delay: 2000
                })
            },
            success: function(res) {
                if (res.retCode != 0) {
                    UR.msg(res.retMsg);
                    return;
                }

                $('#workstageList').html(template('workstageTpl', res));
            }
        })
    },
    initVisitedDate: function() {
        var $el     = $('#visitedDate'),
            target  = $el.attr('data-target'),
            $target = target ? $(`[name=${target}]`) : null;

        var date   = new Date();
        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'en',
            startYear: date.getFullYear(),
            endYear: date.getFullYear() + 1,
            minDate: date,
            buttons: [
                'cancel', 'set'
            ],
            preset: 'date',
            dateFormat: 'yy-mm-dd',
            onBeforeShow: function() {
                UR.androidRefresh(false)
            },
            onCancel: function() {
                UR.androidRefresh(true)
            },
            onSelect: function(event, inst) {
                UR.androidRefresh(true)
                $target && $target.val(new Date(event).getTime());
            }
        }

        $el.mobiscroll().date(option);
    },
    initVisitReason: function() {
        var $el     = $('#reason'),
            target  = $el.attr('data-target'),
            $target = target ? $(`[name=${target}]`) : null;

        var date   = new Date();
        $.ajax({
            url: '/workstageVisit/visitReasonList',
            // url: '/views/form/data/visitReasonList.json',
            type: 'GET',
            dataType: 'json',
            error: function() {
                UR.msg('Refresh the screen, data acquisition failed', {
                    delay: 2000
                })
                $el.prop('disabled', true);
            },
            success: function(res) {
                if (res.retCode != 0) {
                    UR.msg(res.retMsg);
                    return;
                }

                var data = [];

                (res.data || []).forEach(function(item) {
                    data.push({
                        text: item.reasonName,
                        value: item.id
                    })
                });

                var option = {
                    theme: 'android-holo-light',
                    mode: 'scroller',
                    display: 'modal',
                    lang: 'en',
                    buttons: [
                        'cancel', 'set'
                    ],
                    minWidth: 248,
                    data: data,
                    onBeforeShow: function() {
                        UR.androidRefresh(false)
                    },
                    onCancel: function() {
                        UR.androidRefresh(true)
                    },
                    onSelect: function(event, inst) {
                        UR.androidRefresh(true)
                        $target && $target.val(inst.getVal());
                    },
                    onInit: function(inst) {
                        var $dummy = $('#reason_dummy');
                        $dummy.attr('placeholder', $el.attr('placeholder'));
                        if ($target.val()) {
                            inst.setVal($target.val(), true);
                        } else {
                            $dummy.val('');
                        }
                    }
                }

                $el.mobiscroll().select(option);
            }
        })
    },
    initVisitedTime: function() {
        var $el     = $('#visitedTime'),
            target  = $el.attr('data-target'),
            $target = target ? $(`[name=${target}]`) : null;

        var date   = new Date();
        $.ajax({
            url: '/workstageVisit/visitTimeList',
            // url: '/views/form/data/visitTimeList.json',
            type: 'GET',
            dataType: 'json',
            error: function() {
                UR.msg('Refresh the screen, data acquisition failed', {
                    delay: 2000
                })
                $el.prop('disabled', true);
            },
            success: function(res) {
                if (res.retCode != 0) {
                    UR.msg(res.retMsg);
                    return;
                }

                var data = [];

                (res.data || []).forEach(function(item) {
                    data.push({
                        text: item.visitTime,
                        value: item.id
                    })
                });

                var option = {
                    theme: 'android-holo-light',
                    mode: 'scroller',
                    display: 'modal',
                    lang: 'en',
                    buttons: [
                        'cancel', 'set'
                    ],
                    minWidth: 248,
                    data: data,
                    onBeforeShow: function() {
                        UR.androidRefresh(false)
                    },
                    onCancel: function() {
                        UR.androidRefresh(true)
                    },
                    onSelect: function(event, inst) {
                        UR.androidRefresh(true)
                        $target && $target.val(inst.getVal());
                    },
                    onInit: function(inst) {
                        var $dummy = $('#visitedTime_dummy');
                        $dummy.attr('placeholder', $el.attr('placeholder'));
                        if ($target.val()) {
                            inst.setVal($target.val(), true);
                        } else {
                            $dummy.val('');
                        }
                    }
                }

                $el.mobiscroll().select(option);
            }
        })
    },
};

$(function() {
    Form.init();
});
