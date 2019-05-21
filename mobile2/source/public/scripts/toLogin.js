UR.toLogin = function(url) {
    if (UR.isApp()) {
        UR.openApp.login(url)
    } else {
        UR.setUrl(UR.getPassportUrl('login'))
    }
};
