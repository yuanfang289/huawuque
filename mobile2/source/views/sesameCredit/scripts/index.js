var accredit = {
    sendSmsCodeLock: false,
    defText: {
        ajaxError: '网络错误请重试',
    },
    apiUrl: {
        login      : '/alipayAuth/auth'
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

        $('#accredit').validate({
            rules: {
                name: {
                    required: true,
                },
                identityCode: {
                    required: true
                },
            },
            messages: {
                name: {
                    required: '请输入真实姓名',
                },
                identityCode: {
                    required: '请输入身份证号码'
                },
            },
            submitHandler: function(form) {
                var idCode = $('[name=identityCode]').val();
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!reg.test(idCode)) {
                    UR.msg('请输入有效的身份证号');
                    return;
                }


                var $form      = $(form),
                    $submit    = $form.find(':submit');
                var submitText = $submit.text();
                var data       = $form.serialize();
                /*{
                    name: $form.find('[name=name]').val(),
                    identityCode: $form.find('[name=identityCode]').val(),
                };*/
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
                            UR.msg('授权成功');
                            if(res.data){
                                if (UR.isApp()) {
                                    if(UR.isIos){
                                        UR.nativeWebFinish({needReload:true});
                                    }else{
                                        UR.nativeWebFinish("{'needReload':true}");
                                    }
                                }else{
                                    location.replace(res.data);
                                }
                                return;
                            }
                            location.replace(UR.host + '/alipayAuth/success');
                        } else {
                            UR.msg('授权失败');
                            //入口不一样。确认订单页data不为空，h5和客户端逻辑不一样。
                            //从个人中心进入逻辑相同。
                            if(res.data){
                                if (UR.isApp()) {
                                    if(UR.isIos){
                                        UR.nativeWebFinish({needReload:true});
                                    }else{
                                        UR.nativeWebFinish("{'needReload':true}");
                                    }
                                }else{
                                    location.replace(res.data);
                                }
                                return;
                            }
                        }
                    }
                })
            }
        });

        $body
            .on('click', '#accredit [name=deal]', function(e) {
                var $this = $(this);
                var $codeBtn = $('#accredit .btn-primary');
                clearTimeout(timer.regPhoneInput);
                timer.regPhoneInput = setTimeout(setCodeBtn, 300);
                function setCodeBtn() {
                    if ($this.prop('checked')) {
                        $codeBtn.prop('disabled', false)
                    } else {
                        $codeBtn.prop('disabled', true)
                    }
                }
            })
    }
    
};

$(function() {
    accredit.init();
});
