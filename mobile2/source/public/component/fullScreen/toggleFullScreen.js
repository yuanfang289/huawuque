function toggleFullScreen(elem) {
    var ele = document.querySelector(elem);
    isFullScreen() ? cancelFullScreen() : setFullScreen();

    function setFullScreen() {
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    function cancelFullScreen() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    function isFullScreen() {
        return !(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement)
    }
}
