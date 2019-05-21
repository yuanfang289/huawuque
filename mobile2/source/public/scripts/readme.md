# H5 (v2.0版) JS 方法使用指南

> 提示: 仅限于v2.0版 H5 内有效

> 作者: 张海斌

## 不渲染下载条

```html
<!-- 添加 no-downloadbar -->
<body no-downloadbar></body>
```

## 阻止 titlebar 自动隐藏

```html
<!-- 添加 hold-header -->
<body hold-header></body>
```

## 属性

- 获取当前域名 {String}

```javascript
UR.host    // 结果 如:http://192.168.2.232:8083
```

- 获取当前系统环境 {Object}

```javascript
UR.clientTest

// 系统类型 {Boolean}
UR.clientTest.isAndroid
UR.clientTest.isIos
UR.clientTest.isMobile    // 是否移动设备

// 系统版本 {String} (默认值: undefined)
UR.clientTest.androidVer
UR.clientTest.iosVer

// 客户端类型 {Boolean}
UR.clientTest.isQQ
UR.clientTest.isWechat

// 浏览器类型 {Boolean}
UR.clientTest.isChrome
UR.clientTest.isFirefox
UR.clientTest.isSafari
UR.clientTest.isUC
UR.clientTest.isQQBrowser
```


## JS原生方法封装

- JSON.parse 的封装

```js
UR.toJson('{"a": 0}');
// 结果 {a: 0}
```


- JSON.stringify 的封装 (接口限制数据类型为JSON时，需要使用)

```js
UR.strJson({a: 0});
// 结果 "{"a": 0}"
```


## APP原生方法封装

- 开启 / 关闭 Android WebView 下拉刷新 (该方法需要客户端提供支持)

```javascript
// 参数: {Boolean}
UR.androidRefresh(true)    // 可以下拉
UR.androidRefresh(false)   // 不能下拉
```

- 显示 / 隐藏 App 原生分享按钮

```javascript
// 参数: {Boolean}
UR.nativeShowShareButton(true)    // 显示
UR.nativeShowShareButton(false)   // 隐藏
```

- 原生输入框

```javascript
// 参数: {Object}
// 活动评论
UR.nativeInputContent(obj)

// 社区评论
UR.nativeWorkstageInputContent(obj)
```


## 方法

- openApp {Object}

```javascript
/* 打开app或下载 {Function} */

UR.openApp.init()    // 默认

// 传入参数 [可选] {Object}
UR.openApp.init({
    intentUrlParams: '',    // url的参数, 默认: null
    appUrl: '',             // 默认: 'urwork://webPage'
    iosAppUrl: '',          // 默认: 'https://mtest.urwork.cn/goDownload'
    downAppUrl: '',         // 默认: 'https://mtest.urwork.cn/goDownload'
    downWeixin: ''          // 默认: 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.urwork.www'
})

// 打开app的登录页
UR.openApp.login(redirect)    // [redirect] 可选项，登录后跳转到指定链接
UR.openApp.qrcode()           // 打开app的扫码
UR.openApp.setUrl(url)        // app内链接跳转，参数不要加 "urwork://"

// 系统类型 {Boolean}
UR.openApp.isIos       // ios
UR.openApp.isAndroid   // android
```

- 判断是否在app内

```javascript
UR.isApp()    // 返回 [true|false]
```

- 创建跳转链接

```javascript
// 参数: url字符串
UR.setUrl(url)
```

- 软提示

> 如果在webview中，则调用客户端提供的方法

```javascript
// 默认调用
UR.msg('string');

// 传入其他参数
UR.msg('string', {
    fadeIn: 100,      // 淡入时间 ms
    delay: 1300,      // 停留时间 ms
    fadeOut: 200,     // 淡出时间 ms
    className: ''     // 扩展 class 名，方便处理特殊样式
    tapClose: false,  // 点击关闭, 默认 false
    handler: null     // {Function} 信息淡出后执行
})
```

- 对话框

```javascript
// 使用方法同Urwork.dialog
// alert 提示，不自动关闭
UR.dialog.alert({
   // title: '',
   message: '<p>只是提示</p>',
   buttons: {
       ok: {
           label: '确定',
           fn: function() {

           }
       },
   }
});

// alert 提示，自动关闭
UR.dialog.alert({
 // title: '',
   message: '<p>5s后自动消失</p>',
   autoClose: true,
   timeout: 3000,
   buttons: {
       ok: {
           label: '确定',
           fn: function() {

           }
       },
   }
});

// confirm 提示
UR.dialog.confirm({
  // title: '',
   message: '<p>即刻认证成为投资人<br />去关注自己中意的项目吧</p>',
   buttons: {
       no: {
           label: '暂不',
           fn: function(dialog) {
               console.log(dialog);
           }
       },
       yes: {
           label: '立即认证',
           fn: function(dialog) {
               console.log(dialog);
           }
       }
   }
});
```

> alert

参数名称 |                                     默认值 |                        描述
:--------- | --------------------------------------: | ------------------------:
mask       |                                    true |                    是否有遮罩层
title      |                                      '' |                     默认无标题
message    |                                      '' |                    提示信息内容
autoClose  |                                   false |               是否自动关闭，默认不会
timeout    |                                    2500 |      打开2500 ms后自动关闭， 单位ms
buttons    | { ok: {label: '确定', fn: function() {}}} | label：按钮文本， fn：关闭提示框后立即回调

> confirm

 参数名称 |                                                                           默认值 |                                     描述
:----------- | ----------------------------------------------------------------------------: | -------------------------------------:
mask         |                                                                          true |                                 是否有遮罩层
title        |                                                                            '' |                                  默认无标题
message      |                                                                            '' |                                 提示信息内容
buttons      | {no: {label: '放弃', fn: function() {}}, yes: {label: '确定', fn: function() {}}} | label：按钮文本， yes->fn：确定回调， no->fn: 取消回调

- 计数器 {Constructor}

```js
var my_counter = new UR.Counter({
	number  : 60,             // 默认值: 60
	increase: false,          // true 递增, false 递减 (默认)
	start   : function(o) {   // {Function} 计数开始时执行
		// o.current      当前数值
		// o.string       自动补零的字符串
	},
	active  : function(o) {   // {Function} 计数中执行
		// 同上
	},
	end     : function(o) {   // {Function} 计数结束时执行
		// 同上
	}
});

```

- getHost {Function}

> 根据不同环境获取设置的域名
>
> 返回值 Object

```js
// 获取5Lmeet域名
var host = UR.getHost({
	local     : 'http://localhost:8085',
	test      : 'http://211.144.5.130:8065',
	production: 'http://passport.5lmeet.com',
})

// 获取环境
host.env    // ['local' | 'test' | 'production']

// url
host.url    // 根据环境输出参数设定的域名

// 当前环境参数
host.origin.protocol
host.origin.hostname
host.origin.port
host.origin.origin
host.origin.href
```

- getPassportUrl {Function}

> 根据不同环境获取passportUrl
>
> 返回值 URL

```js
// 返回登录页的url
UR.getPassportUrl('login');

// 返回passport接口路径
UR.getPassportUrl();    // 如 http://localhost:8085/passport/
```

- setPassportUrl  {Function}

> 根据不同环境跳转passport指定页面
>
> 无返回值

```js
// 跳转登录页
UR.setPassportUrl('login');

```

- chatInput {Function}

> H5评论输入框
>
> TODO 由于safari 和 微信安全机制导致, 必须使用click事件触发该方法，否则无法自动弹出软键盘

```js
UR.chatInput({
    id: 'chatInput',              // 输入框ID
    active: 'active',             // 用来设置输入框显示后的样式
    sendBtnTxt: '发送',           // 发送按钮文本
    placeholder: '说点什么吧~',
    url: null,                    // 发送评论的接口
    getData: null,                // 评论提交的数据 {Function}
    error: null,                  // ajaxError
    success: null,                // ajaxSuccess
    onBeforeShow: null,           // 输入框显示前触发
    onShow: null,                 // 输入框显示后触发
    ajaxOptions: {}               // 扩展ajax参数
})
```

## 对jQuery方法扩展

- tap 事件

```javascript
// 使用 tap 代替 click
$('body').on('tap', selector, function(e) {});
```

- 时间格式转换

```javascript
$.dateFormat(date, [format])    // 如果不传format, 默认: 'yyyy-mm-dd'
```

调用方式                                             |                                         结果
:----------------------------------------------- | -----------------------------------------:
$.dateFormat(new Date(), 'yyyy/M/d hh:mm:ss')    |                         2016/8/30 16:25:05
$.dateFormat('2016-08-12', 'date')               | Thu Aug 12 2016 00:00:00 GMT+0800 (中国标准时间)
$.dateFormat('2016/08/12', 'Date')               | Thu Aug 12 2016 00:00:00 GMT+0800 (中国标准时间)
$.dateFormat('2016-08-12', 'number')             |                              1470931200000
$.dateFormat('2016-08-12', 'DateTime')           |                              1470931200000
$.dateFormat('2016-8-30')                        |                                 2016-08-30
$.dateFormat(new Date(), 'yyyy/M/d hh:mm:ss')    |                         2016/8/30 16:27:51
$.dateFormat(new Date(), 'yyyy/M/d hh:mm')       |                            2016/8/30 16:27
$.dateFormat(new Date(), 'yyyy/M/d hh')          |                               2016/8/30 16
$.dateFormat(new Date(), 'yyyy/MM/dd hh:mm:ss')  |                        2016/08/30 16:27:51
$.dateFormat('2016/8/30', 'yyyy-MM-dd hh:mm:ss') |                        2016-08-30 00:00:00
$.dateFormat(1470931200000)                      |                                 2016-08-12
$.dateFormat(1470931200000, 'date')              | Thu Aug 12 2016 00:00:00 GMT+0800 (中国标准时间)
$.dateFormat(new Date(), 'datetime')             |                              1470931200000
$.dateFormat(new Date(), 'hh:mm')                |                                      16:27

- ajax封装

```
`JS调用`
// get请求
$.ajaxGet({
    url: "data/server.json",
    success: function(res) {
        console.log(res);
    }
})

// post请求
$.ajaxPost({
    url: "./data/server.json",
    data: {
        a: 1
    },
    submit: '#post',
    beforeSend: function (xhr) {
        // 此处验证省略....
        if ('验证不通过') {
            return false;
        }
        return true;
    },
    success: function(res) {
        console.log(res);
    },
    error: function(res) {
        console.log('error...');
    },
})
```

参数名称        |                默认值 | 描述
:---------- | -----------------: | :--------------------------------------------------------
url         |                 '' | 发送请求的地址
type        |              'GET' | 请求方式
cache       |               true | 是否从浏览器缓存中加载请求信息，默认请求缓存
data        |                 {} | 请求参数
dataType    |             'json' | 预期服务器返回的数据类型
contentType | 'application/json' | 当发送信息至服务器时，内容编码类型
beforeSend  |               null | 在beforeSend中如果返回false可以取消本次ajax请求。XMLHttpRequest对象是惟一的参数。
success     |               null | 请求成功后调用的回调函数
error       |               null | 请求失败时被调用的回调函数
submit      |               null | 触发ajax的按钮
className   |         'disabled' | 按钮防重复提交的className

## 更新记录

更新时间     | 更新内容
:---------- | :------------------------------------------------------------------------------
2016-11-4   | UR.openApp.login 新增可选参数 [redirect] , 登录后跳转到指定链接
2016-11-10  | 新增UR.Counter(计数器)、UR.nativeShowShareButton方法
2016-12-13  | 新增UR.getPassportUrl方法
2016-12-20  | 新增UR.openApp.setUrl、UR.setPassportUrl、UR.chatInput方法
2016-12-21  | 新增UR.nativeWorkstageInputContent(原生社区评论输入框)方法
2016-12-29  | 新增UR.androidWebFinish(关闭webview)方法
2017-01-11  | 新增UR.getHost方法
