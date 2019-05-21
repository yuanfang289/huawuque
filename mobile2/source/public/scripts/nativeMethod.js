// 检测原生方法是否存在
UR.testNative = DANativeApi.testNative;

UR.testNativeOld = function(method) {
    var native = window.webkit || window.jsInterface;
    // 是否有原生方法存在
    if (!native) return false;

    // 测试Android客户端
    if (UR.isAndroid && native[method]) return true;

    // 测试ios客户端
    if (UR.isIos && native.messageHandlers[method]) return true;

    return false;
}

// 关闭webview
UR.nativeWebFinish = UR.androidWebFinish = function(param) {
    if (!UR.testNativeOld('webFinish')) return;
    if (UR.isIos) {
        window.webkit.messageHandlers.webFinish.postMessage(param || null);
    } else
    if (UR.isAndroid) {
        window.jsInterface.webFinish(param);
    }
}

// 调用原生输入框(活动评论)
UR.nativeInputContent = function(obj) {
    if (!UR.testNativeOld('inputContent')) return;
    if (UR.isIos) {
        window.webkit.messageHandlers.inputContent.postMessage(obj);
    } else
    if (UR.isAndroid) {
        window.jsInterface.inputContent(JSON.stringify(obj));
    }
};

// 调用原生输入框(社区评论)
UR.nativeWorkstageInputContent = function(obj) {
    if (!UR.testNativeOld('workstageInputContent')) return;
    if (UR.isIos) {
        window.webkit.messageHandlers.workstageInputContent.postMessage(obj);
    } else
    if (UR.isAndroid) {
        window.jsInterface.workstageInputContent(JSON.stringify(obj));
    }
};


UR.androidRefresh = function(bool) {
    // true 可以使用下拉刷新。false 不可以使用下拉刷新
    if (DANativeApi.isNewApi) {
        DANativeApi.setIsRefresh({
            isRefresh: bool
        });
    } else {
        if (!UR.testNativeOld('setIsRefresh')) return;
        window.jsInterface.setIsRefresh(bool);
    }
};

// 显示 | 隐藏 navigationBar
UR.nativeShowNavigationBar = function(bool) {
    if (DANativeApi.isNewApi) {
        DANativeApi.showNavigationBar({
            isShow: bool
        })
    } else {
        if (!UR.testNativeOld('showNavigationBar')) return;
        if (UR.isIos) {
            window.webkit.messageHandlers.showNavigationBar.postMessage(bool);
        } else
        if (UR.isAndroid) {
            window.jsInterface.showNavigationBar(bool);
        }
    }
}

// 隐藏|显示 分享按钮
UR.nativeShowShareButton = function(bool) {
    if (DANativeApi.isNewApi) {
        DANativeApi.showShareButton({
            isShow: bool
        })
    } else {
        if (!UR.testNativeOld('showShareButton')) return;
        if (UR.isIos) {
            window.webkit.messageHandlers.showShareButton.postMessage(bool);
        } else
        if (UR.isAndroid) {
            window.jsInterface.showShareButton(bool);
        }
    }
};

// 原生软提示
// TODO 不要直接调用该方法，请使用UR.msg
UR.nativeMessage = function(text) {
    if (DANativeApi.isNewApi) {
        DANativeApi.showMessage({
            message: text
        })
    } else {
        if (UR.isIos) {
            window.webkit.messageHandlers.showMessage.postMessage(text);
        } else
        if (UR.isAndroid) {
            window.jsInterface.showMessage(text);
        }
    }
};
