UR.validate = function(data, validator) {

    var defaults = {
        rules: {
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
            date: /Invalid|NaN/,
            number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
            digits: /^\d+$/,
            extension: new RegExp("\\.(png|jpe?g|gif)$", "i"),
            tel: /(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)/,
            price: /^(0|[1-9][0-9]{0,8})(\.[0-9]{1,2})?$/,
            phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/
        },
        messages: {
            required: "这是必填字段",
            remote: "请修正此字段",
            email: "请输入有效的电子邮件地址",
            url: "请输入有效的网址",
            date: "请输入有效的日期",
            number: "请输入有效的数字",
            digits: "只能输入数字",
            extension: "请输入有效的后缀",
            tel: '请输入正确的固定电话',
            price: '请输入正确的价格',
            phone: '请输入正确的手机号码',
            maxlength: `最多可以输入 {0} 个字符`,
            minlength: `最少要输入 {0} 个字符`,
            rangelength: `请输入长度在 {0} 到 {1} 之间的字符串`,
            max: `请输入不大于 {0} 的数值`,
            min: `请输入不小于 {0} 的数值`,
            range: `请输入范围在 {0} 到 {1} 之间的数值`,
            reg: '请输入正确的格式'
        }
    }

    var rules    = validator.rules,
        messages = validator.messages;

    function __error (name, error) {
        var $elem = $('[name="' + name + '"]');
        if ($elem.length) {
            var top =  $elem.closest('.form-item').offset().top;
            if (!UR.isApp()) {
                top -= 44;
            }
            $('html, body').animate({scrollTop: top + 'px'});
        }
        UR.msg(error);
    }

    for (var key in rules) {
        if (!rules.hasOwnProperty(key)) continue;

        var rule = rules[key];
        for (var ruleKey in rule) {
            if (!rule.hasOwnProperty(ruleKey)) continue;

            var express = rule[ruleKey],
                value   = $.trim(data[key]),
                error   = messages[key][ruleKey] || defaults.messages[ruleKey] || null,
                isArray = typeof express == 'object' && express instanceof Array;

            if (/^\s*(maxlength|minlength|max|min)\s*$/.test(ruleKey)) {
                error   = error.replace(/\s*\{0\}\s*/g, express);
            }


            if (/^\s*(rangelength|range)\s*$/.test(ruleKey)) {
                error   = error.replace(/\s*\{0\}\s*/g, express[0]).replace(/\s*\{1\}\s*/g, express[1]);
            }

            // console.log("ruleKey: %s, express: %s, value: %s, error: %s", ruleKey, express, value, error);


            if (ruleKey == 'required' && express && !value) {
                __error(key, error);
                return false;
            }

            if (/^\s*(email|url|date|number|digits|extension|tel|price|phone)\s*$/gi.test(ruleKey) && value && express) {
                if (typeof express != 'object' && (!defaults.rules[ruleKey].test(value))) {
                    __error(key, error);
                    return false;
                }
                else if (typeof express == 'object' && !express.test(value)) {
                    __error(key, error);
                    return false;
                }
            }

            if (ruleKey == 'reg' && value && (!express.test(value))) {
                __error(key, error);
                return false;
            }

            if (ruleKey == 'min' && value && value < express) {
                __error(key, error);
                return false;
            }

            if (ruleKey == 'max' && value && value > express) {
                __error(key, error);
                return false;
            }

            if (ruleKey == 'range' && value && isArray && (value < express[0] || value > express[1])) {
                __error(key, error);
                return false;
            }

            if (ruleKey == 'minlength' && value && value.length < express) {
                __error(key, error);
                return false;
            }

            if (ruleKey == 'maxlength' && value && value.length > express) {
                __error(key, error);
                return false;
            }

            if (ruleKey == 'rangelength' && value && isArray && (value.length < express[0] || value.length > express[1])) {
                __error(key, error);
                return false;
            }

        }
    }

    return true;
}
