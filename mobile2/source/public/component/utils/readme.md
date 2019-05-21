# 工具函数

## 1\. Ajax封装

### 调用

```
$.ajaxGet({
    url: "data/server.json",
    success: function(res) {
        console.log(res);
    }
})
```

```
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

### options

- ajaxGet
- ajaxPost

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

### methods

- `.ajaxGet()` get请求
- `.ajaxPost()` post请求

## 2\. dateFormat

### 调用

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
