# 图片懒加载 lazy

## 引入文件说明

```
<link rel="stylesheet" href="/assets/public/styles/public.min.css">

<script src="/assets/paging/scripts/paging.min.js"></script>
```

## 源文件

```
- JS  - source/public/component/paging/paging.js
      -
  CSS - source/public/component/paging/_paging-loading.scss
      -
```

## DOM 结构

- Html

```
<div class="lazy" data-src="http://img.urwork.cn/36cf4ecd-b5bc-4f07-914f-5c238af1c631.jpg" width="100" height="100"></div>
<img class="lazy" data-src="http://img.urwork.cn/5ac99e0e-c5df-4106-bac8-e87521970edb.jpg" width="100" height="100">
```

- JS 手动初始化

```
$(".lazy").lazy({
    domain: ['img.urwork.cn', 'static.urwork.cn']
});
```

## options

参数名称        |                                                                                     默认值 | 作用
:---------- | --------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------
dataAttr    |                                                                              'data-src' | 获取元素加载地址的属性名
placeholder |                                                                                    null | 占位图
container   |                                                                              \$(window) | 滚动的容器。默认为$(window)，也就是默认的网页滚动。
callback    |                                                                                  $.noop | 回调。元素动态加载完毕后执行的回调函数。其中回调函数的上下文this就是当前DOM元素。注意：如果无法获取元素加载地址，则不执行动态加载，但是会触发回调。在某些需求下，您可以缺省url值，仅仅触发回调。
rule        | '?imageMogr2/thumbnail/!{{width}}x{{height}}r/gravity/Center/crop/{{width}}x{{height}}' | 图片处理规则，其中{{width}}为图片宽，触发resize事件时也需改变。
domain      |                                                   ['img.urwork.cn', 'static.urwork.cn'] | 地址域名
threshold   |                                                                                     200 | 距离200px开始加载

## methods

`.lazy('toString')` return 版本号

 
