UR.tap = function(parent, selector, cb) {
    var startY, endY, isMove = false;
    return $(parent)
        .on('click', selector, function(e) {
            e.preventDefault();
        })
        .on('touchstart', selector, function(e) {
            startY = e.originalEvent.touches[0].screenY;
        })
        .on('touchmove', selector, function(e) {
            endY = e.originalEvent.touches[0].screenY;
            isMove = true;
        })
        .on('touchend', selector, function() {
            if (isMove && (Math.abs(endY - startY) > 5)) {
                isMove = false;
                return;
            }
            isMove = false;
            startY = endY = undefined;
            if (this.href === '#' || this.href.match(/^javascript:(void\(0\))*;*/)) {
                cb && cb(this);
                return;
            }

            UR.setUrl(this.href);
        })
};
