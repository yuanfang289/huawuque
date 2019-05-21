/**
 *
 * @param offset {Number} 触发固定的偏移量
 * @param opts {Object}
 * @param opts.onFixed {Function}
 * @param opts.onUnfixed {Function}
 */
UR.headerFixed = function(offset, opts) {
    var isFixed, currentState;
    var $win = $(window), $header = $('#header');

    opts = opts || {};

    if ($win.scrollTop() > offset) {
        isFixed = true;
        addClass();
        onFixed();
    } else {
        isFixed = false;
        removeClass();
        onUnfixed()
    }

    $win.off('scroll', scroll).on('scroll', scroll);

    function scroll() {
        var _this = this;
        if (_this.scrollY > offset) {
            addClass();
            if (isFixed !== (currentState = true)) onFixed();
            isFixed = true;
        } else {
            removeClass();
            if (isFixed !== (currentState = false)) onUnfixed();
            isFixed = false;
        }
    }
    function onFixed() {
        opts.onFixed && opts.onFixed();
    }
    function onUnfixed() {
        opts.onUnfixed && opts.onUnfixed();
    }
    function addClass() {
        $header.addClass('fixed');
    }
    function removeClass() {
        $header.removeClass('fixed');
    }

    return {
        refresh: function() {
            if ($win.scrollTop() > offset) {
                onFixed()
            } else {
                onUnfixed()
            }
        }
    }
};
