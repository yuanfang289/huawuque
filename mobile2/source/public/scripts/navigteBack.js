UR.navigateBack = function() {
    if (UR.isApp()) {
        if (DANativeApi && DANativeApi.isNewApi) {
            DANativeApi.navigateBack();
        } else {
            UR.nativeWebFinish();
        }
    } else {
        history.back();
    }
};
