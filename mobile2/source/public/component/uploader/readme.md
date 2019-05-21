# Mobile 上传图片

## 引入文件说明

```
<link rel="stylesheet" href="/assets/public/styles/public.min.css">

<script src="/assets/example/uploader/uploader.js"></script>
```

## 源文件

```
- JS  - source/public/component/uploader/uploader.js
      -
  CSS - source/public/component/uploader/_uploader.scss
      -
```

## DOM 结构

- Html

```
<!-- upload -->
<div class="uploader">
    <input type="hidden" name="logo" data-role="hidden">
    <div data-role="placeholder" style="width: 100px; height: 100px;">
        <div data-role="add-plus"></div>
        <label data-role="add">
            <input type="file" data-role="file">
        </label>
    </div>
</div>
<!--/ upload -->
```

- AutoInit Html

```
<!-- upload -->
<div data-role="uploader" class="uploader" data-options="
    // imgSrc: 'http://placehold.it/300x300',
    // serverSrc: './data/a.jpg',
    url: 'data/upload.json',
    pxLimit: false,
    ratioLimit: true,
    maxSize: 5,
    require: true,
    method: 'get',
    className: {
        close: 'uricon-close'
    },
    formatted: function(res) {
        return {url: res.url, src: res.url}
    },
    name: 'logo'
">
    <input type="hidden" name="logo" data-role="hidden">
    <div data-role="placeholder" style="width: 100px; height: 100px;">
        <div data-role="add-plus"></div>
        <label data-role="add">
            <input type="file" data-role="file">
        </label>
    </div>
</div>
<!--/ upload -->
```

- JS 手动初始化 (默认window.load时自动初始化)

```
uploader = $('.uploader')
  // .uploader({
  //     imgSrc: 'http://placehold.it/300x300',
  //     serverSrc: './data/a.jpg',
  //     url: 'data/upload.json',
  //     pxLimit: true,
  //     // ratioLimit: true,
  //     maxSize: 5,
  //     require: true,
  //     method: 'get',
  //     className: {
  //         close: 'uricon-close'
  //     },
  //     formatted: function(res) {
  //         return {url: res.url, src: res.url}
  //     },
  //     name: 'logo'
  // });
```

- 重置插件

```
uploader.uploader('reset');
```

- 重置参数

```
uploader.uploader({
    url: 'a.....',
    src: 'http://placehold.it/180x180'
});
```

## options

参数名称        | 默认值                       |                      作用
:---------- | :------------------------ | ----------------------:
add         | [data-role="add"]         |                    添加按钮
file        | [data-role="file"]        |      input[type=file]对象
tip         | [data-role="tip"]         |                  错误提示信息
remove      | [data-role="remove"]      |                    删除按钮
hidden      | [data-role="hidden"]      |                服务器地址隐藏域
placeholder | [data-role="placeholder"] |                 未上传时的样式
progress    | [data-role="progress"]    |                     进度条
ctrl        | [data-role="ctrl"]        |           操作按钮container
className   | close: 'uricon-close'     |                 class对象
extensions  | jpg,jpeg,png              |                    文件格式
name        | jpg,jpeg,png              |              hidden 的参数
require     | false                     |             hidden项是否必填
imgPX       | '150x150'                 |                   图片像素值
pxLimit     | false                     |       是否限制图片宽高， 默认false
ratioLimit  | false                     | 是否检查像素比，只提示不阻断， 默认false
maxSize     | 20                        |        文件最大限制，单位M，默认20M
url         | ''                        |                  图片上传地址
method      | 'POST'                    |             POST 或者 GET
data        | {}                        |                  后台所需参数
formatted   | null                      |             处理上传成功返回的结果
success     | null                      |              上传成功后的回调函数
error       | null                      |              上传失败后的回调函数

## methods

`.uploader('toString')` return 版本号

`.uploader('reset')` 重置插件

`.uploader(options)` 设置参数

## events

both events have the following additional properties:

- `ajax` 服务器返回数据.
- `relatedTarget` The DOM element that is being clicked.

Event Type          |                                 description
:------------------ | ------------------------------------------:
success.bs.uploader | This event is fired when the upload success
error.bs.uploader   | This event is fired when the upload success
