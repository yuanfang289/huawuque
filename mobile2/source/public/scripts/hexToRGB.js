UR.hexToRGB = function(hex) {
    function hexToR(h) {
        return parseInt((cutHex(h)).substring(0, 2), 16)
    }
    function hexToG(h) {
        return parseInt((cutHex(h)).substring(2, 4), 16)
    }
    function hexToB(h) {
        return parseInt((cutHex(h)).substring(4, 6), 16)
    }
    function cutHex(h) {
        return h.charAt(0) === "#" ? h.substring(1, 7) : h
    }


    var R = hexToR(hex), G = hexToG(hex), B = hexToB(hex);

    return {
        R: R,
        G: G,
        B: B,
        RGB: R + ',' + G + ',' + B
    }
};
