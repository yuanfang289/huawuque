UR.popup = function(selector, options) {
    var args = arguments;
    if (!args.length) return;

    var $elem = $(selector);
    var defs = {
        headerText: '',
        bodyHtml: '',
        className: '',
        hasHeader: true,
        hasClose: true,
        closeHandler: null, // {Function} 关闭时触发
    };
    var opts = $.extend({}, defs, options);

    var $body = $('body');
    $body
        // 关闭事件
        .off(UR.click, '[data-role=popup] .close-btn')
        .on(UR.click, '[data-role=popup] .close-btn', function(e) {
            e.preventDefault();
            closeLayer();
            opts.closeHandler && opts.closeHandler();
        })


    $elem.attr('data-role', 'popup');

    var method = {
        target: $elem,
        closeLayer: closeLayer
    };

    // 如果之传入选择器参数，则直接显示该弹窗
    if ($elem.length) {
        $elem.show();
        return method;
    } else {
        $body.append($(renderHtml()));
        return method;
    }

    function closeLayer() {
        if ($elem.length) {
            $('[data-role=popup]').hide();
            return;
        }
        $('[data-role=popup]').remove();
    };

    function renderHtml(header, body) {
        var popupHtml = $('<div class="popup ' + opts.className + '" data-role="popup"></div>'),
            innerHtml = $('<div class="layer-inner"></div>');

        opts.hasClose && innerHtml.append(renderClose());
        opts.hasHeader && innerHtml.append(renderHeader(opts.headerText));
        innerHtml.append(renderBody(opts.bodyHtml));

        return popupHtml.append(innerHtml);
    }

    function renderHeader(text) {
        return '<header>' + text + '</header>';
    }

    function renderBody(html) {
        return '<section class="popup-body">' + html + '</section>';
    }

    function renderClose() {
        return '<i class="uricon-close-o close-btn"></i>';
    }
};
