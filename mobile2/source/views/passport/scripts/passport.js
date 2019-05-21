//= include ../../../public/plugins/jquery.validate.js

jQuery.validator.addMethod("phone",function(value, element) {
    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
    return this.optional(element) || (reg.test(value));
}, "手机格式无效");


var Passport = function() {
    var VERSION = '1.0';

    this.REFERRER_NAME = 'referrer';
    this.WAIT_TIME     = 60;

    this.domain = UR.host;
    this.apiUrl = {
        smsCode   : this.domain + '/user2/sendSmsValidCode',
        smsVoCode : this.domain + '/user2/sendSmsVoCode',
        register  : this.domain + '/user2/appRegister',
        login     : this.domain + '/user/formlogin',
        forget    : this.domain + '/user2/findPasswordValid',
        forgetPwd : this.domain + '/user2/resetPwd'
    };
    this.defText = {
        sending: '发送中',
        resend: '获取验证码',
        ajaxError: '网络错误请重试'
    };
    this.sendSmsCodeLock = false;
    this.sendSmsVoCodeLock = false;
};

Passport.prototype = {
    setReferrer: function() {
        var referrer = document.referrer;
        // 预防referrer与登录页相同
        if (referrer && referrer.indexOf(location.href) != -1) return;

        localStorage.setItem(this.REFERRER_NAME, referrer);
    },
    getReferrer: function() {
        return localStorage.getItem(this.REFERRER_NAME);
    },
    removeReferrer: function() {
        localStorage.removeItem(this.REFERRER_NAME);
    },
    parseReferrer: function(url) {
        if (!url || url.indexOf(this.domain) === -1) return this.domain;
        return url;
    },
    countdown: function(args) {
        var defs = {
            timer: this.WAIT_TIME,
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
    }
};

Passport.prototype.sendSmsCode = function(params) {
    var $sendBtn = params.sendBtn;
    var self = this;
    var data = {
        mobile: params.mobile,
        isForget: params.isForget ? true : false
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
                    // self.countdown($sendBtn);
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
                    UR.msg(res.retMsg);
                    $sendBtn.val(self.defText.resend).prop('disabled', false);
                    self.sendSmsCodeLock = false;
                }
            }
        });
    };
};
Passport.prototype.sendSmsVoCode = function(params) {
    if (this.sendSmsVoCodeLock) return;
    var self = this;
    var data = {
        mobile: params.mobile,
    };

    ajaxRequset();

    function ajaxRequset() {
        $.ajax({
            url: self.apiUrl.smsVoCode,
            type: 'POST',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                self.sendSmsVoCodeLock = true;
            },
            error: function(xhr, status, error) {
                UR.msg(self.defText.ajaxError);
                self.sendSmsVoCodeLock = false;
            },
            success: function(res) {
                if (res.retCode === 0) {
                    self.countdown({
                        start: function() {
                            $('.send-text').hide();
                            $('.sending-text').show();
                        },
                        end: function() {
                            $('.send-text').show();
                            $('.sending-text').hide();
                            self.sendSmsVoCodeLock = false;
                        }
                    });
                } else {
                    UR.msg(res.retMsg);
                    self.sendSmsVoCodeLock = false;
                }
            }
        });
    };
};
