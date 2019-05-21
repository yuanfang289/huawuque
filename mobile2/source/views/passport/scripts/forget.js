var Forget = function() {

    var timer = {};

    var app = new Passport();

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

    $('#forgetForm').validate({
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
            };
            $.ajax({
                url: app.apiUrl.forget,
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    $submit.text('提交中...').prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    UR.msg(app.defText.ajaxError);
                },
                complete: function() {
                    $submit.text(submitText).prop('disabled', false);
                },
                success: function(res) {
                    if (res.retCode === 0) {
                        location.href = res.data.pwdUrl + '?mobile=' + data.mobile;
                    } else {
                        UR.msg(res.retMsg);
                    }
                }
            })
        }
    });

    $('#forgetFormPwd').validate({
        rules: {
            password: {
                required: true,
                rangelength: [6, 18]
            }
        },
        messages: {
            password: {
                required: '请输入6-18位密码',
                rangelength: '密码长度错误'
            }
        },
        submitHandler: function(form) {
            var $form      = $(form),
                $submit    = $form.find(':submit');
            var submitText = $submit.text();
            var data       = {
                mobile: $form.find('[name=mobile]').val(),
                password: $form.find('[name=password]').val()
            };
            $.ajax({
                url: app.apiUrl.forgetPwd,
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    $submit.text('提交中...').prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    UR.msg(app.defText.ajaxError);
                },
                complete: function() {
                    $submit.text(submitText).prop('disabled', false);
                },
                success: function(res) {
                    if (res.retCode === 0) {
                        UR.msg(res.retMsg, {
                            handler: function() {
                                location.replace(app.domain + '/' + res.data.loginUrl);
                            }
                        });
                    } else {
                        UR.msg(res.retMsg);
                    }
                }
            })
        }
    });

    $body
        .on(UR.click, '#sendBtn', function(e) {
            e.preventDefault();
            if (e.target.disabled) return;
            var $mobile  = $('#forgetForm [name=mobile]');

            if ($mobile.valid()) {
                app.sendSmsCode({
                    sendBtn: $(this),
                    mobile: $mobile.val(),
                    isForget: true
                })
            }
        })
        .on(UR.click, '#sendSmsVoBtn', function(e) {
            e.preventDefault();
            var $mobile  = $('#forgetForm [name=mobile]');

            if ($mobile.valid()) {
                app.sendSmsVoCode({
                    mobile: $mobile.val()
                })
            }
        })
        .on('input', '#forgetForm [name=mobile]', function(e) {
            if (app.sendSmsCodeLock) return;

            var val = $.trim(e.target.value);
            var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
            var $codeBtn = $('#forgetForm .btn-code');
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
};

$(function() {
    Forget();
});
