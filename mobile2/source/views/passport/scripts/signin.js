//= include ../../../public/component/tab/tab.js

var Signin = function() {

    var timer = {};

    var app = new Passport();
    app.setReferrer();

    updateImg();

    var $body = $('body');

    $('.tab').tab({
        activeIndex: getActiveIndex()
    });

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

    $('#loginForm').validate({
        rules: {
            mobile: {
                required: true,
                phone: true
            },
            password: {
                required: true
            }
        },
        messages: {
            mobile: {
                required: '请输入手机号',
                phone: '手机号输入错误'
            },
            password: {
                required: '请输入密码'
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
                url: app.apiUrl.login,
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    $submit.text('登录中...').prop('disabled', true);
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
                                location.replace(app.parseReferrer(app.getReferrer()));
                                app.removeReferrer();
                            }
                        });
                    } else {
                        UR.msg(res.retMsg);
                    }
                }
            })
        }
    });

    $('#registerForm').validate({
        rules: {
            mobile: {
                required: true,
                phone: true
            },
            smsCode: {
                required: true
            },
            password: {
                required: true,
                rangelength: [6, 18]
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
                smsCode: $form.find('[name=smsCode]').val(),
                password: $form.find('[name=password]').val()
            };
            $.ajax({
                url: app.apiUrl.register,
                type: 'POST',
                dataType: 'json',
                data: data,
                beforeSend: function() {
                    $submit.text('注册中...').prop('disabled', true);
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
                                location.replace(app.parseReferrer(app.getReferrer()));
                                app.removeReferrer();
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
            var $mobile  = $('#registerForm [name=mobile]');

            if ($mobile.valid()) {
                app.sendSmsCode({
                    sendBtn: $(this),
                    mobile: $mobile.val(),
                })
            }
        })
        .on('input', '#registerForm [name=mobile]', function(e) {
            if (app.sendSmsCodeLock) return;

            var val = $.trim(e.target.value);
            var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
            var $codeBtn = $('#registerForm .btn-code');
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

    function getActiveIndex() {
        var hash = location.hash;
        return (hash && hash == '#register') ? 1 : 0
    }

    function updateImg() {
        var reg       = /(\S+\/bg_)(\d+)(\.(jpg|jpeg|png))/i;
        var imgLength = UR.env.SIGN_IMG_LENGTH;
        var random    = Math.ceil(imgLength * Math.random());
        var $img      = $('#signinImg');
        var imgUrl    = $img.css('backgroundImage');
        $img.css('backgroundImage', imgUrl.replace(reg, '$1' + random + '$3'));
    }
};

$(function() {
    Signin();
})
