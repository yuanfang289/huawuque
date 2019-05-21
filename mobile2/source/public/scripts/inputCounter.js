UR.inputCounter = function (elem, maxLen, $count) {
    typeof elem == 'string' && (elem = $(elem));
    if (typeof elem == 'object' && !elem[0]) {
        elem = $(elem);
    }

    if (typeof maxLen == 'undefined') {
        maxLen = elem.attr('maxlength');
    }

    elem.attr('maxlength', maxLen);

    if (!$count) {
        $count = elem.closest('.form-item').find('.form-counter span');
    }

    elem.on('input', function (evt) {
        if (!maxLen) {
            UR.msg('请设置最长输入限制');
            return false;
        }
        
        var len = $.trim(elem.val()).length;
        if (len > maxLen) {
            elem.val(elem.val().substr(0, maxLen));
            len = maxLen;
        }
        $count.text(len);
    });
}
