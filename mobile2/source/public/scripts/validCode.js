UR.validCode = function(args) {

    var defs = {
        isClose: true,
        handler: null,         // {Function} 确定时触发 参数[val]
        closeHandler: null,    // {Function} 关闭时触发
    };
    var opts = $.extend({}, defs, args);

    var timestamp = new Date().getTime();

    var closeLayer = function() {
        $('#validcodeLayer').remove();
    };

    var $body = $('body');
    $body.append($(renderHtml()));

    $body
        // 关闭事件
        .off(UR.click, '#validcodeLayer .close-btn')
        .on(UR.click, '#validcodeLayer .close-btn', function(e) {
            e.preventDefault();
            closeLayer();
            opts.closeHandler && opts.closeHandler();
        })
        // 更新图形验证码
        .off(UR.click, '#validCodeForm .update-code')
        .on(UR.click, '#validCodeForm .update-code', function(e) {
            e.preventDefault();
            updateValidCode($('#validCode'));
        })
        // 提交事件
        .off('submit', '#validCodeForm')
        .on('submit', '#validCodeForm', function(e) {
            e.preventDefault();
            var val = $.trim($('#validCodeForm [name=validCode]').val());
            if (val) {
                if (opts.isClose) {
                    closeLayer();
                }
                opts.handler && opts.handler(val, closeLayer);
            } else {
                UR.msg('请填写验证码');
            }
        })

    function updateValidCode($validCode) {
        var src = $validCode.attr('src');
        if (/t\=\d+/.test(src)) {
            $validCode.attr('src', src.replace(/[^t\=]\d{12,}/, new Date().getTime()));
        } else {
            $validCode.attr('src', src + '&t=' + new Date().getTime());
        }
    }

    function renderHtml() {
        var html  = '<div class="validcode-layer" id="validcodeLayer">'
            html +=     '<div class="layer-inner">'
            html +=         '<header>输入图形验证码</header>'
            html +=         '<form id="validCodeForm" class="form form-validcode">'
            html +=             '<div class="form-item">'
            html +=                 '<div class="valid-code-item">'
            html +=                     '<div class="input-item"><input type="text" maxLength="10" autocomplete="off" class="input" name="validCode" placeholder="图形验证码"/></div>'
            html +=                     '<button type="button" class="btn-code update-code"><img src="/stickyImg?h=34&w=100&s=34&t=' + timestamp + '" width="114" height="52" alt="" id="validCode"></button>'
            html +=                 '</div>'
            html +=             '</div>'
            html +=             '<div class="form-action">'
            html +=                 '<button type="submit" class="btn btn-primary">确定</button>'
            html +=             '</div>'
            html +=         '</form>'
            html +=         '<i class="uricon-close-o close-btn"></i>'
            html +=     '</div>'
            html += '</div>';
        return html;
    }
};
