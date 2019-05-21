# Mobile 加载 JS

## 引入文件说明

```
<link rel="stylesheet" href="/assets/list/styles/list.css">

<script src="/assets/list/scripts/list.js"></script>
```

## 源文件

```
- JS  - source/public/component/refresh/pull.js
      -
  CSS - source/public/component/refresh/_refresh.scss
      -
```

## DOM 结构

- Html

```
<div class="mall-list"><div class="list-container"></div>/div>
```

- window.load Init html

```
<div class="list">
    <div data-scroll="pullUp" data-options="
        url: './data/list.json',
        data: {
            sort: 4
        },
        template: 'tlpList',
        isFirstLoad: true,
        formatted: function(res) {
            return res.result || [];
        }
        ">
    </div>
</div>
```

- Template

```
<script type="text/html" id="tlpList">
    {{if list.length == 0}}
    <div class="data-null">
        <img src="../public/images/ui/no-data.png" alt="">
    </div>
    {{/if}}
    {{each list as d i}}
    <div class="items-module list-item">
        <a href="#">

        </a>
    </div>
    {{/each}}
</script>
```

- JS 初始化

```
var _refresh = $('[data-scroll="pullUp"]')
            .refresh({
                url: './data/list.json',
                data: {
                    sort: 4
                },
                template: 'tlpList',
                isFirstLoad: true,
                formatted: function(res) {
                    return res.result || [];
                }
            })
```

## Options

参数名称        |                   作用
:---------- | -------------------:
template    |                 模板id
url         |                服务器地址
isFirstLoad |   是否在页面加载时直接渲染，默认不渲染
formatData  | 返回特殊处理后的list数据，默认空函数
pageSize    |            每次获取数据的条数
pageNum     |        加载第几页默认从第二页开始

## Methods

`.refresh(options)` 刷新数据

`.refresh('toString')` 获取版本号

## Events

- `relatedTarget` null
- `ajax` 服务器返回的数据
- `formatted` formatted函数处理后的渲染数据

事件类型              |                 描述
:---------------- | -----------------:
pullup.bs.refresh | 页面scroll 90% 时自动触发
