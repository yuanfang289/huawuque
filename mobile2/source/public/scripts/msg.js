/**
 * 消息软提示
 * @param  {String}    text    提示文本
 * @param  {Object}    params  其他参数
 */
UR.msg = function(text, params) {

    var opts = $.extend({
        fadeIn   : 100,        // ms
        delay    : 1300,       // ms
        fadeOut  : 200,        // ms
        className: '',         // 扩展 class 名
        disableNative: false,
        tapClose : false,
        handler  : null
    }, params);

    if (UR.testNative && UR.testNative('showMessage') && !opts.disableNative) {
        UR.nativeMessage(text);
        if (!opts.handler) return;

        setTimeout(function() {
            opts.handler && opts.handler();
        }, 300);

        return;
    }

    $('.msgbox').stop(true, true).remove();
    var domHTML = $(renderHtml(text, opts.className));

    $('body').append(renderHtml(text, opts.className));

    var $msgBox  = $('.msgbox'),
        $textBox = $msgBox.find('.msgbox-text');

    var mLeft    = ($(window).width() - $textBox.outerWidth()) / 2;

    $textBox.css({marginLeft: mLeft});

    $msgBox
        .fadeIn(opts.fadeIn, function() {
            $msgBox.delay(opts.delay)
                .fadeOut(opts.fadeOut, function() {
                    $msgBox.remove();
                    opts.handler && opts.handler();
                });
        });

    $('body')
        .off(UR.click, '.msgbox')
        .on(UR.click, '.msgbox', function(e) {
            e.preventDefault();
            if (opts.tapClose) {
                $('.msgbox').stop(true, true).remove();
            }
        });

    function renderHtml(text, className) {
        var _html  = '<div class="msgbox ' + className + '">';
            _html += '<div class="msgbox-text"><span>' + text + '</span></div>';
            _html += '</div>';
        return _html;
    };
};
