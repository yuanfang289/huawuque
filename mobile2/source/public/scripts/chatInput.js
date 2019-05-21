// TODO 由于safari 和 微信安全机制导致, 必须使用click事件触发该方法，否则无法自动弹出软键盘
UR.chatInput = function(options) {
    var defs = {
        id: 'chatInput',              // 输入框ID
        active: 'active',             // 用来设置输入框显示后的样式
        sendBtnTxt: '发送',           // 发送按钮文本
        placeholder: '说点什么吧~',
        url: null,                    // 发送评论的接口
        getData: null,                // 评论提交的数据 {Function}
        error: null,                  // ajaxError
        success: null,                // ajaxSuccess
        onBeforeShow: null,           // 输入框显示前触发
        onShow: null,                 // 输入框显示后触发
        ajaxOptions: {}               // 扩展ajax参数
    };

    var sets = $.extend({}, defs, options);

    if (!sets.url) throw new Error('评论接口url，未设置');

    var $body = $('body'),
        $html = $('html');

    sets.onBeforeShow && sets.onBeforeShow();

    $html.addClass('chat-input-show');
    
    $body.append(renderHtml(sets.sendBtnTxt, sets.id, sets.active, sets.placeholder));
    $('#chatInputText').focus();

    sets.onShow && sets.onShow();

    $body
        // 点击关闭输入框
        .off(UR.click, '.chat-clickable')
        .on(UR.click, '.chat-clickable', function(e) {
            e.preventDefault();
            $('#chatInputText').blur();
            $('#' + sets.id).remove();
            $html.removeClass('chat-input-show');
        })
        // enter 提交输入
        .off('keyup', '#chatInputText')
        .on('keyup', '#chatInputText', function(e) {
            e.preventDefault();
            if (e.keyCode == 13) {
                sendMsg(e);
            }
        })
        // 提交输入按钮
        .off(UR.click, '#chatInputBtn')
        .on(UR.click, '#chatInputBtn', sendMsg)
        // 阻止表单提交
        .off('submit', '#' + sets.id + ' form')
        .on('submit', '#' + sets.id + ' form', function(e) {
            e.preventDefault();
        })

    function sendMsg(e) {
        var msg = $.trim($('#chatInputText').val());
        if (!msg.length) {
            UR.msg('请输入内容');
            return;
        }

        $.ajax($.extend({
            url: sets.url,
            data: sets.getData(msg),
            dataType: 'json',
            type: 'POST',
            error: function() {
                sets.error && sets.error();
                UR.ajaxError();
            },
            success: function(res) {
                sets.success && sets.success(res);
            }
        }, sets.ajaxOptions))
    }

    function renderHtml(sendBtnTxt, id, active, placeholder) {
        return `<div class="chatInput ${active}" id="${id}">
                    <div class="chat-clickable"></div>
                    <form class="chatInput-form">
                        <div class="chatInput-form-inner">
                            <input type="text" id="chatInputText" class="input" placeholder="${placeholder}">
                            <button type="button" id="chatInputBtn" class="btn btn-primary">${sendBtnTxt}</button>
                        </div>
                    </form>
                </div>`;
    }
};
