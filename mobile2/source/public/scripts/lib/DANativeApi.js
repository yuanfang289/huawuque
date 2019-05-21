/**
 * Native为H5提供的Api接口
 *
 * @type {js对象}
 */

(function(window, undefined) {

    //下面是一些私有函数和变量
    var userAgent  = navigator.userAgent,
        isAndroid  = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1, //android终端或者uc浏览器
        isiOS      = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        URWorkVer  = userAgent.match(/URWork\/\d+\.\d+.\d+/) || undefined,
        version    = URWorkVer && URWorkVer[0].replace('URWork/',''),
        verNumber  = version && Number(version.split('.').join('')),
        apiVersion = verNumber ? ((isAndroid && verNumber >= 218) || (isiOS && verNumber >= 217) ? 2 : 1) : undefined;

    /**
     * 验证原生API是否存在
     * @param  {String} apiName api名称
     * @return {Boolean}         true 合法 or false 不合法
     */
    function _verifyHasFunction(apiName) {
        var native = window.webkit || window.androidJsInterface;

        // 如果不是新版api，则返回
        if (apiVersion !== 2) {
            console.log("app版本不支持'"+ apiName +"'方法");
            return false
        };

        // 未提供原生API(可能为浏览器环境)
        if (!native) {
            console.log('未提供原生API');
            return false;
        }

        // Android客户端
        if (isAndroid && native[apiName]) return true;

        // ios客户端
        if (isiOS && native.messageHandlers[apiName]) return true;

        console.log("API-->" + apiName + ": 不存在");
        return false;
    }
    /**
     * 将js function 转化为 string，便于传参
     * @param  {Object} param 参数
     * @return {Object}       处理后的参数
     */
    function _convertFunctionToString(param) {
        var callbackFunction = param.completion;
        if (callbackFunction != undefined && callbackFunction != null && typeof callbackFunction === "function") {
            param.completion = callbackFunction.toString();
        }
        return param;
    }
    /**
     * 调用native 端 Api
     * @param  {String} apiName Api名称
     * @param  {Object} param   参数，其中包含回调
     * @return {void}         无返回值
     */
    function _callNativeApi(apiName, param) {
        param = param && _convertFunctionToString(param) || {};

        if (!_verifyHasFunction(apiName)) return;

        if (isiOS) {
            window.webkit.messageHandlers[apiName].postMessage(param);
        } else {
            window.androidJsInterface[apiName](JSON.stringify(param));
        }
    }

    var DANativeApi = function(api) {
        /**
         * 可用的Api列表，此属性为动态，外部通过generateApi增加或者deleteApi减少Api都会影响此数组的内容
         * @type {Array}
         */
        this._availableApis = [];

        //生成默认的Api
        api.availableApis.forEach(function(apiName) {
            this.generateApi(apiName);
        }.bind(this));
    };

    DANativeApi.prototype = {
        /**
         * 生成Api
         * @param  {function} apiName api的名称
         * @return {void}     无返回值
         */
        generateApi: function(apiName) {
            if (this[apiName]) return;

            this[apiName] = function(param) {
                _callNativeApi(apiName, param);
            };
            this._availableApis.push(apiName);
        },
        /**
         * 删除Api
         * @param  {function} apiName api的名称
         * @return {void}         无返回值
         */
        deleteApi: function(apiName) {
            delete this[apiName];
            var index = this._availableApis.indexOf(apiName);
            if (index !== -1) {
                this._availableApis.splice(index, 1);
            }
        },
        getApis: function() {
            return this._availableApis.join("\n");
        },
        testNative: _verifyHasFunction,
        apiVersion: version,
        apiVersionNum: version && +version.replace(/\./g, ''),
        isNewApi: apiVersion === 2
    };


    // 输出API
    window.DANativeApi = new DANativeApi({
        availableApis: [
            "share",
            "choosePhoneContact",
            "payment",
            "navigateTo",
            "redirectTo",
            "navigateBack",
            "showMessage",
            "showLoading",
            "hideLoading",
            "showNavigationBar",
            "showShareButton",
            "inputTextContent",
            "setIsRefresh",
            "networkInfo",
            "longRentStationPayment",
            "webViewResize",
            "reload",
            "showNavigationBar",
            "setStatusBarStyle",
            "selectCompany",
            "asUShow",
            "changeImage"
        ]
    });
})(window);



// //以下Api所有的异步回调结果都包含在res.data里，一般不会出错，异常时res.data则不存在

// /**
//  * 分享
//  * @param {String} title 标题
//  * @param {String} desc 描述、副标题
//  * @param {String} url 分享的链接
//  * @param {String} imgUrl 缩略图链接
//  * @param {Function} completion 分享完成的回调，res.data为 true 时分享成功，false 分享失败
//  */
// DANativeApi.share({
// 	title: document.title,
// 	desc: "",
// 	url: location.href,
// 	imgUrl: "",
// 	completion: function(res) {
// 		alert("分享结果为：" + JSON.stringify(res.data));
// 	}
// });



// /**
//  * 选择联系人
//  * @param {Function} completion 选择完成的回调，res.data为 {name: 'Mike', phone: '10086'}
//  */
// DANativeApi.choosePhoneContact({
// 	completion: function(res) {
// 		alert("选择联系人的结果为：" + JSON.stringify(res.data));
// 	}
// });

// /**
//  * 支付
//  * @param {String} paymentInfo 支付信息，微信支付或者支付宝支付所需要的信息字符串
//  * @param {String} paymentNum 支付编号
//  * @param {Number} payWay 支付方式，1支付宝  3微信
//  * @param {Function} completion 支付完成的回调，res.data为 true 时支付成功，false 支付失败
//  */
// DANativeApi.payment({
//     paymentInfo: "partner=\"2088911785297575\"&seller_id=\"finance@urwork.cn\"&out_trade_no=\"05_147096949854811164\"&subject=\"05_147096949854811164\"&body=\"null\"&total_fee=\"0.01\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"10m\"&notify_url=\"http://103.252.67.50:8090/notify/iospay/alipay/notify_v2\"&sign=\"JKe9%2BOmssZaM3bBQd1XJqDgbEi0c8eENTZN08VrMVH2nxuRWbAHcd%2FyfeY%2FLMOPdUMWHm8YOoxRep87yoyo9PcIdOx%2F5cfBUcjYuE%2BLn2DUFWWiEHymBM394w1ZMDHnqY5j0cSeMy4NwZ5DsRkmuUfEisv5BG8%2FzxEwavgN8kfs%3D\"&sign_type=\"RSA\"",
//     paymentNum: "05_147096949854811164",
//     payWay: 1,
//     completion: function(res) {
//         alert("支付结果为：" + JSON.stringify(res.data))
//     }
// });

// *
//  * 跳转到某页，等同于旧版的 setUrl
//  * @param {String} url 链接，可以是 http://m.urwork.cn/，也可以是 urwork://xxxxxxx

// DANativeApi.navigateTo({
//     url: "http://m.urwork.cn/"
// });

// /**
//  * 重定向到某页，类似于 location.replace()，此方法操作Native页面，会先关闭当前页，再打开一个新页。（等同于先点击App左上角的返回，再打开一个新页）
//  * @param {String} url 链接，可以是 http://m.urwork.cn/，也可以是 urwork://xxxxxxx
//  */
// DANativeApi.redirectTo({
//     url: "http://m.urwork.cn/"
// });

// /**
//  * 返回上一页，操作Native页面，等同于旧版的 webFinish
//  */
// DANativeApi.navigateBack();

// /**
//  * 展示软提示，等同于旧版的 showMessage
//  * @param {String} message 软提示信息
//  */
// DANativeApi.showMessage({
//     message: "请填写手机号码"
// });

// /**
//  * 展示加载中，请记得调用 hideLoading，一定要成对出现，否则App会一直展示加载中，不会主动消失
//  * @param {String} message 提示信息，可以不传（如 DANativeApi.showLoading();  不传默认是 "正在加载中..." ）
//  */
// DANativeApi.showLoading({
//     message: "正在下载中..."
// });

// /**
//  * 隐藏加载中，与 showLoading 成对出现
//  */
// DANativeApi.hideLoading();

/**
 * 是否显示Native导航栏，等同于旧版的 showNavigationBar
 * @param {boolean} isShow 是否显示 true or false, default is true
 */
// DANativeApi.showNavigationBar({
//     isShow: false
// });

/**
 * 是否显示Native导航栏右侧的默认分享按钮，等同于旧版的 showShareButton
 * @param {boolean} isShow 是否显示 true or false, default is true
 */
// DANativeApi.showShareButton({
//     isShow: false
// });

/**
 * 调用Native输入框输入内容
 * @param {String} content 已有的内容，可以不传（一般不传），如果传了，则展示传入的文本，用户可以接着输入
 * @param {String} placeHolder 占位文字（即文本框内容为空时，对用户的提示文本），可以不传，默认是"说点什么吧~"
 * @param {Function} completion 输入完成的回调，res.data为String, 比如 "这是用户输入的内容"
 */
// DANativeApi.inputTextContent({
//     content: "哈哈继续输入吧",
//     placeHolder: "说点什么吧~",
//     completion: function(res) {
//         alert("输入内容为：" + res.data);
//     }
// });

/**
 * 用于Android端，设置是否正在刷新，iOS端无此Api，但调用不会报错
 * @param {boolean} isRefresh 是否正在刷新 true or false
 */
// DANativeApi.setIsRefresh({
//     isRefresh: false
// });

//获取客户端网络信息，目前只有localIP，如192.168.199.222，为了便于以后拓展，res.data为一个对象。
// DANativeApi.networkInfo({
//     completion: function(res){
//         alert(res.data.localIP);
//     }
// });

/**
 * 长租工位支付
 * @param {Number} orderId 必传，长租工位的订单id
 * @param  {Function} completion 支付完成的回调，res.data为 true 时支付成功，false 支付失败
 */
// DANativeApi.longRentStationPayment({
//     orderId: 123,
//     completion: function(res) {
//         alert(res.data);
//     }
// });

/**
 * 重置webview窗口高度
 * @param  {Number}   height
 * @param  {Function} completion
 */
// DANativeApi.webViewResize({
//     height: 100,
//     completion: function(res) {
//     }
// });
/**
 * 企业选择器
 * @return id
 * @return name
 */
// DANativeApi.selectCompany({
//     completion: function(res) {
//     }
// });
/**
 * 成为U企业弹窗
 * @return isUShowType  0未完成   1已完成   2再次编辑
 */
// DANativeApi.asUShow({
//     completion: function(res) {
//     }
// });


//刷新页面
// DANativeApi.reload();
