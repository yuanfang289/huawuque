# Mobile 筛选 JS

`所有class都可清除`

## 引入文件说明

```
<link rel="stylesheet" href="/assets/list/styles/list.css">

<script src="/assets/list/scripts/list.js"></script>
```

## 源文件

```
- JS  - source/public/component/filter/filter.js
      -
  CSS - source/public/component/filter/_filter.scss
      -
```

## DOM 结构

- Html

```
<!-- select start -->
<div id="filterContainer" class="filter-container" data-filter="query">
    <div class="select-group-wrapper" data-col="4" Wrapper>
        <div class="select-group">
            <div class="select-group-title" data-title="#1" data-parent-param="cityCode" data-param="workstageId">
                <span Text>社区</span>
                <i class="arrow uricon-arrow-bottom" Icon></i>
            </div>
        </div>
        <div class="select-group">
            <div class="select-group-title" data-title="#2" data-param="type">
                <span Text>类别</span>
                <i class="uricon-arrow-bottom" Icon></i>
            </div>
        </div>
        <div class="select-group">
            <div class="select-group-title" data-title="#3" data-param="sort">
                <span Text>价格</span>
                <i class="uricon-arrow-dropdown text-primary" Icon></i>
            </div>
        </div>
        <div class="select-group">
            <div class="select-group-title" data-title="#4" data-param="sort">
                <span Text>时间</span>
                <i class="uricon-arrow-dropdown text-primary" Icon></i>
            </div>
        </div>
    </div>
</div>
<!-- select end -->
```

- AutoInit html

```
<div id="filterContainer" class="filter-container" data-role="filter" data-options="
                 template: 'tlpFilter',
                 url: './data/filter.json',
                 query: {sort: 4, type: 1},
                 isFixed: true
                 ">
                 ..........................................
                 ..........................................
                 ..........................................
</div>
```

- Template

```
<script type="text/html" id="tlpFilter">
    <div class="select-group-body {{data.currentIndex ? 'active': ''}}" Body>
        <div class="select-content {{data.currentIndex == '#1' ? 'active' : ''}}" data-content="#1">
            <article class="select-menu" data-scroll="verticle" Menu>
                <div class="scroller">
                    <ul>
                        <li class="{{!data.cityCode ? 'active' : ''}}" data-parent="">全部</li>
                        {{each data as item i}}
                            {{if item.cityCode}}
                            <li class="{{data.cityCode == item.cityCode ? 'active' : ''}}" data-parent="{{item.cityCode}}">{{item.cityName}}</li>
                            {{/if}}
                        {{/each}}
                    </ul>
                </div>
            </article>
            <article class="select-sub-menu" data-scroll="verticle" Menu>
                <div class="scroller">
                    <ul>
                        {{if !data.cityCode }}
                        <li class="{{ !data.cityCode && !data.workstageId ? 'active': '' }}" data-child="">全部社区</li>
                        {{else}}
                            {{each data[data.cityCode].list as stage j}}
                                {{if !stage.id}}
                                <li class="{{ data.workstageId == data[data.cityCode].cityCode ? 'active': '' }}" data-child="{{data[data.cityCode].cityCode}}">全部</li>
                                {{else}}
                                <li class="{{stage.id === data.workstageId ? 'active' : '' }}" data-child="{{stage.id}}">{{stage.stageName}}</li>
                                {{/if}}
                            {{/each}}
                        {{/if}}
                    </ul>
                </div>
            </article>
        </div>
        <div class="select-content {{data.currentIndex == '#2' ? 'active' : ''}}" data-content="#2">
            <div class="select-sub-menu">
                <ul Menu>
                    <li class="{{!data.type ? 'active': ''}}" data-child="">全部类别</li>
                    <li class="{{data.type == 1 ? 'active': ''}}" data-child="1">优客优选</li>
                    <li class="{{data.type == 2 ? 'active': ''}}" data-child="2">虚拟商品</li>
                    <li class="{{data.type == 3 ? 'active': ''}}" data-child="3">其他</li>
                </ul>
            </div>

        </div>
        <div class="select-content {{data.currentIndex == '#3' ? 'active' : ''}}" data-content="#3">
            <div class="select-sub-menu">
                <ul Menu>
                    <li class="{{data.sort == 2 ? 'active': ''}}" data-child="2">按价格从高到低</li>
                    <li class="{{data.sort == 1 ? 'active': ''}}" data-child="1">按价格从低到高</li>
                </ul>
            </div>
        </div>
        <div class="select-content {{data.currentIndex == '#4' ? 'active' : ''}}" data-content="#4">
            <div class="select-sub-menu">
                <ul Menu>
                    <li class="{{data.sort == 3 ? 'active': ''}}" data-child="3">按上架时间从远到近</li>
                    <li class="{{data.sort == 4 ? 'active': ''}}" data-child="4">按上架时间从近到远</li>
                </ul>
            </div>
        </div>
    </div>
</script>
```

- 自定义结构说明

序号 | 自定义结构                            |                                表现
:: | :------------------------------- | --------------------------------:
1  | data-role="filter"               |                             最外层元素
2  | [Wrapper]                        |                           wrapper
3  | data-title="#1"                  |  title父元素 #1 -> 当前显示content的index
4  | data-param="PARAM"               |           筛选条件子级后台需要的参数（可能包含父级参数）
5  | data-parent-param="PARENT_PARAM" |                          筛选条件父级参数
6  | [Text]                           |                              标题文本
7  | [Icon]                           |                            标题iCON
8  | [Body]                           |                        content父元素
9  | data-content="#1"                | content元素 #1 -> 当前显示content的index
10 | data-parent="PARENTID"           |   一级筛选项通过它获取data-parent 作为5的value
11 | data-child="CHILDID"             |    二级筛选项通过它获取data-child 作为4的value
12 | data-clear                       |                             清空所选项
13 | Query                            |                            确定开始查询
14 | data-scroll="verticle"           |                      init iScroll

- JS 初始化

```
$('#filterContainer').filter({
    template: 'tlpFilter',
    url: './data/filter.json',
    query: {
        sort: 4
    },
    isFixed: true,
}).on('change.bs.filter', function(evt) {
    console.log(evt.query);
    refresh.setParams(evt.query);
})
```

## Options

Name      | type     | default     |         description
:-------- | :------- | :---------- | ------------------:
template  | string   | tlpFilter   |                模板id
url       | string   | filter.json |             获取数据的地址
data      | json     | {}          |                请求参数
query     | json     | {}          |             初始的查询参数
isFixed   | boolean  | true        | 页面scroll时是否置顶，默认不置顶
formatted | function | null        |        转换服务器返回数据的函数

## Methods

`.filter(options)` 设置参数

```
$('[data-role="filter"]').filter({url: 'Your url'});
```

`.filter('toString')` 返回版本号

## Events

both events have the following additional properties:

- `query` 筛选条件.
- `relatedTarget` The DOM element that is being clicked.

Event Type       |                                       description
:--------------- | ------------------------------------------------:
change.bs.filter | This event is fired when the filter child clicked
