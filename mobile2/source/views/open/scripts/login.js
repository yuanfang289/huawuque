var Bind = {
    sendSmsCodeLock: false,
    defText: {
        sending: '发送中',
        resend: '获取验证码',
        ajaxError: '网络错误请重试',
    },
    apiUrl: {
        smsCode   : '/passport/sendSmsLoginCode',
        login      : '/passport/smsFormlogin',
    },
    init: function() {
        var timer = {},
            self  = this;

        var $body = $('body');

        $.validator.setDefaults({
            ignore: '.ignore',
            focusInvalid: false,
            onkeyup: false,
            onfocusout: false,
            onclick: false,
            showErrors:function(errorMap,errorList) {
                if (errorList.length) {
                    UR.msg(errorList[0].message);
                }
            },
        });

        $('#bindForm1').validate({
            rules: {
                mobile: {
                    required: true,
                    phone: true
                },
                smsCode: {
                    required: true
                },
            },
            messages: {
                mobile: {
                    required: '请输入手机号',
                    phone: '手机号输入错误'
                },
                smsCode: {
                    required: '请输入短信验证码'
                },
            },
            submitHandler: function(form) {
                var $form      = $(form),
                    $submit    = $form.find(':submit');
                var submitText = $submit.text();
                var data       = {
                    mobile: $form.find('[name=mobile]').val(),
                    smsCode: $form.find('[name=smsCode]').val(),
                    retUrl: $body.find('[name=retUrl]').val()
                };
                $.ajax({
                    url: self.apiUrl.login,
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    beforeSend: function() {
                        $submit.text('提交中...').prop('disabled', true);
                    },
                    error: function(xhr, status, error) {
                        UR.msg(self.defText.ajaxError);
                    },
                    complete: function() {
                        $submit.text(submitText).prop('disabled', false);
                    },
                    success: function(res) {
                        if (res.retCode == 0) {
                            UR.msg(res.retMsg);
                            location.replace(res.data.retUrl);
                        } else {
                            UR.msg('验证码错误');
                        }
                    }
                })
            }
        });

        $body
            .on(UR.click, '#sendBtn', function(e) {
                e.preventDefault();
                if (e.target.disabled) return;
                var $mobile  = $('#bindForm1 [name=mobile]');

                if ($mobile.valid()) {
                    self.sendSmsCode({
                        sendBtn: $(this),
                        mobile: $mobile.val()
                    })
                }
            })
            .on('input', '#bindForm1 [name=mobile]', function(e) {
                if (self.sendSmsCodeLock) return;

                var val = $.trim(e.target.value);
                var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
                var $codeBtn = $('#bindForm1 .btn-code');
                clearTimeout(timer.regPhoneInput);
                timer.regPhoneInput = setTimeout(setCodeBtn, 300);

                function setCodeBtn() {
                    if (reg.test(val)) {
                        $codeBtn.prop('disabled', false)
                    } else {
                        $codeBtn.prop('disabled', true)
                    }
                }
            })
    },
    countdown: function(args) {
        var defs = {
            timer: 60,
            start: null,
            active: null,
            end: null
        };
        var opts = $.extend({}, defs, args);
        var _time = opts.timer - 1;

        opts.start && opts.start(_time);

        var _t = setInterval(function() {
            _time--;
            opts.active && opts.active(_time);

            if (_time === 0) {
                clearInterval(_t);
                opts.end && opts.end(_time);
            }
        }, 1000);
    },
    sendSmsCode: function(params) {
        var $sendBtn = params.sendBtn;
        var self = this;
        var data = {
            mobile: params.mobile
        };

        ajaxRequset();

        function ajaxRequset(validCode) {
            var _data = validCode ? $.extend({}, data, validCode) : data;

            $.ajax({
                url: self.apiUrl.smsCode,
                type: 'POST',
                dataType: 'json',
                data: _data,
                beforeSend: function() {
                    self.sendSmsCodeLock = true;
                    $sendBtn.val(self.defText.sending).prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    UR.msg(self.defText.ajaxError);
                    $sendBtn.val(self.defText.resend).prop('disabled', false);
                    self.sendSmsCodeLock = false;
                },
                success: function(res) {
                    if (res.retCode === 0) {
                        UR.msg(res.retMsg);
                        self.countdown({
                            start: function(num) {
                                $sendBtn.text(num + 's');
                            },
                            active: function(num) {
                                $sendBtn.text(num + 's');
                            },
                            end: function(num) {
                                $sendBtn.text(self.defText.resend).prop('disabled', false);
                                self.sendSmsCodeLock = false;
                            }
                        })
                    } else
                    if (res.retCode === 6) {
                        UR.validCode({
                            handler: function(val) {
                                ajaxRequset({
                                    validCode: val
                                });
                            },
                            closeHandler: function() {
                                $sendBtn.val(self.defText.resend).prop('disabled', false);
                                self.sendSmsCodeLock = false;
                            }
                        });
                    } else {
                        UR.msg(self.defText.ajaxError);
                        $sendBtn.val(self.defText.resend).prop('disabled', false);
                        self.sendSmsCodeLock = false;
                    }
                }
            });
        };
    }
};

$(function() {
    Bind.init();
});
