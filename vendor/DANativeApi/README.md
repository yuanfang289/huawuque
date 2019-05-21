# Native为H5提供的Api接口

> 以下Api所有的异步回调结果都包含在res.data里，一般不会出错，异常时res.data则不存在

```js
/**
 * 分享
 * @param {String} title 标题
 * @param {String} desc 描述、副标题
 * @param {String} url 分享的链接
 * @param {String} imgUrl 缩略图链接
 * @param {Function} completion 分享完成的回调，res.data为 true 时分享成功，false 分享失败
 */
DANativeApi.share({
	title: document.title,
	desc: "",
	url: location.href,
	imgUrl: "",
	completion: function(res) {
		alert("分享结果为：" + JSON.stringify(res.data));
	}
});

/**
 * 选择联系人
 * @param {Function} completion 选择完成的回调，res.data为 {name: 'Mike', phone: '10086'}
 */
DANativeApi.choosePhoneContact({
	completion: function(res) {
		alert("选择联系人的结果为：" + JSON.stringify(res.data));
	}
});

/**
 * 支付
 * @param {String} paymentInfo 支付信息，微信支付或者支付宝支付所需要的信息字符串
 * @param {String} paymentNum 支付编号
 * @param {Number} payWay 支付方式，1支付宝  3微信
 * @param {Function} completion 支付完成的回调，res.data为 true 时支付成功，false 支付失败
 */
DANativeApi.payment({
    paymentInfo: "partner=\"2088911785297575\"&seller_id=\"finance@urwork.cn\"&out_trade_no=\"05_147096949854811164\"&subject=\"05_147096949854811164\"&body=\"null\"&total_fee=\"0.01\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"10m\"&notify_url=\"http://103.252.67.50:8090/notify/iospay/alipay/notify_v2\"&sign=\"JKe9%2BOmssZaM3bBQd1XJqDgbEi0c8eENTZN08VrMVH2nxuRWbAHcd%2FyfeY%2FLMOPdUMWHm8YOoxRep87yoyo9PcIdOx%2F5cfBUcjYuE%2BLn2DUFWWiEHymBM394w1ZMDHnqY5j0cSeMy4NwZ5DsRkmuUfEisv5BG8%2FzxEwavgN8kfs%3D\"&sign_type=\"RSA\"",
    paymentNum: "05_147096949854811164",
    payWay: 1,
    completion: function(res) {
        alert("支付结果为：" + JSON.stringify(res.data))
    }
});

/**
 * 跳转到某页，等同于旧版的 setUrl
 * @param {String} url 链接，可以是 http://m.urwork.cn/，也可以是 urwork://xxxxxxx
 */
DANativeApi.navigateTo({
    url: "http://m.urwork.cn/"
});

/**
 * 重定向到某页，类似于 location.replace()，此方法操作Native页面，会先关闭当前页，再打开一个新页。（等同于先点击App左上角的返回，再打开一个新页）
 * @param {String} url 链接，可以是 http://m.urwork.cn/，也可以是 urwork://xxxxxxx
 */
DANativeApi.redirectTo({
    url: "http://m.urwork.cn/"
});

/**
 * 返回上一页，操作Native页面，等同于旧版的 webFinish
 */
DANativeApi.navigateBack();

/**
 * 展示软提示，等同于旧版的 showMessage
 * @param {String} message 软提示信息
 */
DANativeApi.showMessage({
    message: "请填写手机号码"
});

/**
 * 展示加载中，请记得调用 hideLoading，一定要成对出现，否则App会一直展示加载中，不会主动消失
 * @param {String} message 提示信息，可以不传（如 DANativeApi.showLoading();  不传默认是 "正在加载中..." ）
 */
DANativeApi.showLoading({
    message: "正在下载中..."
});

/**
 * 隐藏加载中，与 showLoading 成对出现
 */
DANativeApi.hideLoading();

/**
 * 是否显示Native导航栏，等同于旧版的 showNavigationBar
 * @param {boolean} isShow 是否显示 true or false, default is true
 */
DANativeApi.showNavigationBar({
    isShow: false
});

/**
 * 是否显示Native导航栏右侧的默认分享按钮，等同于旧版的 showShareButton
 * @param {boolean} isShow 是否显示 true or false, default is true
 */
DANativeApi.showShareButton({
    isShow: false
});

/**
 * 调用Native输入框输入内容
 * @param {String} content 已有的内容，可以不传（一般不传），如果传了，则展示传入的文本，用户可以接着输入
 * @param {String} placeHolder 占位文字（即文本框内容为空时，对用户的提示文本），可以不传，默认是"说点什么吧~"
 * @param {Function} completion 输入完成的回调，res.data为String, 比如 "这是用户输入的内容"
 */
DANativeApi.inputTextContent({
    content: "哈哈继续输入吧",
    placeHolder: "说点什么吧~",
    completion: function(res) {
        alert("输入内容为：" + res.data);
    }
});

/**
 * 用于Android端，设置是否正在刷新，iOS端无此Api，但调用不会报错
 * @param {boolean} isRefresh 是否正在刷新 true or false
 */
DANativeApi.setIsRefresh({
    isRefresh: false
});

/**
 * 获取客户端网络信息，目前只有localIP，如192.168.199.222，为了便于以后拓展，res.data为一个对象。
 */
DANativeApi.networkInfo({
    completion: function(res){
        alert(res.data.localIP);
    }
});

/**
 * 长租工位支付
 * @param {Number} orderId 必传，长租工位的订单id
 * @param  {Function} completion 支付完成的回调，res.data为 true 时支付成功，false 支付失败
 */
DANativeApi.longRentStationPayment({
    orderId: 123,
    completion: function(res) {
        alert(res.data);
    }
});

/**
 * 重置webview窗口高度
 * @param  {Number}   height
 * @param  {Function} completion
 */
DANativeApi.webViewResize({
    height: 100,
    completion: function(res) {
    }
});

/**
 * 企业选择器
 * @return id
 * @return name
 */
DANativeApi.selectCompany({
    completion: function(res) {
    }
});

/**
 * 成为U企业弹窗
 * @return isUShowType  0未完成   1已完成   2再次编辑
 */
DANativeApi.asUShow({
    completion: function(res) {
    }
});

/**
 * 刷新页面
 */
DANativeApi.reload();
```




