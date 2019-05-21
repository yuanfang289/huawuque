UR.layerNativeFix = function(target, options) {
    var opts = {};
    var state;
    var dom = document.getElementById(target);

    if (typeof options === 'string') {
        state = options;
    } else
    if ($.isPlainObject(options)) {
        opts = options;
        state = opts.state;
    }

    switch (state) {
        case 'show':
            addEvent();
            break;
        case 'hide':
            removeEvent();
            break;
    }

    function addEvent() {
        document.body.style.overflow = 'hidden';
        dom.addEventListener('touchmove', preventDefault, false);
        UR.androidRefresh(false);
        opts.onShow && opts.onShow(dom);
    }
    function removeEvent() {
        document.body.style.overflow = '';
        dom.removeEventListener('touchmove', preventDefault, false);
        UR.androidRefresh(true);
        opts.onHide && opts.onHide(dom);
    }
    function preventDefault(e) {
        e.preventDefault();
    }
};
