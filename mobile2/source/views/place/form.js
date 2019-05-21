
//= include ../../public/plugins/mobiscroll/scripts/mobiscroll.js

var Form = {
    init: function() {
        this.useDate();
        this.application();
        this.comment();
    },
    useDate: function() {
        var self = this;
        var date = new Date();
        $('#useDate').mobiscroll().date({
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
            onBeforeShow: function(inst) {
                UR.androidRefresh(false)
            },
            onCancel: function(inst) {
                UR.androidRefresh(true)
            },
            onSelect: function(inst) {
                self.checkForm();
                UR.androidRefresh(true)
            }
        });
    },
    application: function() {
        var self = this;
        $('#application').mobiscroll().treelist({
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            inputClass: 'txt',
            maxWidth: [240],
            minWidth: [240],
            buttons: [
                'cancel', 'set'
            ],
            headerText: '场地用途',
            onSelect: function(val, inst) {
                UR.androidRefresh(true);
                var $this = $(this);
                var lis = $this.find('li');
                lis.each(function() {
                    var _this = $(this);
                    if (_this.attr('data-val') == val) {
                        $('#applicationId').val(_this.attr('data-id'));
                    }
                })
                self.checkForm();
            },
            onInit: function(inst) {},
            onBeforeShow: function(inst) {
                UR.androidRefresh(false);
            },
            onCancel: function(inst) {
                UR.androidRefresh(true);
            }
        });
    },

    comment: function() {
        var $commentInput = $('#comments');
        var $commentText = $('.comments');

        var self = this;

        $(document).off(UR.click, '.comments').on(UR.click, '.comments', function(evt) {
            evt.preventDefault();
            $commentInput.val($commentText.text()).attr({type: 'text'}).focus();
            $commentText.hide();
        }).off('blur', '#comments').on('blur', '#comments', function(evt) {
            evt.preventDefault();
            var value = $.trim($commentInput.val());
            $commentText.text(value).show();
            $commentInput.attr({type: 'hidden'});
            self.checkForm();
        });
    },
    checkForm: function() {
        var $btn = $('.btn-group .btn');
        var arr = ['#useDate', '#applicationId'];
        var canSubmit = true;
        arr.map(function(node) {
            if (!$.trim($(node).val())) {
                canSubmit = false;
            }
        });

        $btn.prop('disabled', !canSubmit);
    }
};
$(function() {
    Form.init();
});
