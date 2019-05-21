# Tab 文档说明

HTML 结构

```html
<div class="tab tab-primary" data-role="tab">
    <div class="tabs" data-tab-role="tabs">
        <ul>
            <li data-tab-role="tab">A</li>
            <li data-tab-role="tab">B</li>
            <li data-tab-role="tab">C</li>
        </ul>
    </div>
    <div class="tabbed" data-tab-role="tabbed">
        <div class="tab-group" data-tab-role="group">
            A
        </div>
        <div class="tab-group" data-tab-role="group">
            B
        </div>
        <div class="tab-group" data-tab-role="group">
            C
        </div>
    </div>
</div>

```
调用方法

```js
// 基本调用
$('.tab').tab();	//给所有.tab调用 tab 方法
```

必要属性

* data-role="tab"
* data-tab-role="tabs"
* data-tab-role="tab"
* data-tab-role="tabbed"
* data-tab-role="group"

可选参数(Object)

 参数          | 说明                                         | 参数类型    | 默认值     | 返回值
:------------ | ------------------------------------------- | ---------- | --------- | ------
 activeIndex  | 初始化是默认活动 tab 索引，从 0 开始             | Number     | 0         | 
 activeClass  | 当前活动 tab 的 className                     | String     | "active"  | 
 onBefore     | 切换 tab 前触发                               | Function   |           | Object
 onAfter      | 切换 tab 后触发                               | Function   |           | Object


### 示例

全局初始化默认活动 tab 索引值
 
```js
$('.tab').tab({
	activeIndex: 2
});
```
单独初始化默认活动 tab 索引值

```html
<div class="tab tab-primary" data-role="tab">
    <div class="tabs" data-tab-role="tabs">
        <ul>
            <li data-tab-role="tab">A</li>
            <!-- 
            	通过给 tab 添加 class 来激活当前 tab
            	class 可以通过参数自定义，默认值为 active
            -->
            <li data-tab-role="tab" class="active">B</li>
            <li data-tab-role="tab">C</li>
        </ul>
    </div>
    <div class="tabbed" data-tab-role="tabbed">
        <div class="tab-group" data-tab-role="group">
            A
        </div>
        <div class="tab-group" data-tab-role="group">
            B
        </div>
        <div class="tab-group" data-tab-role="group">
            C
        </div>
    </div>
</div>
```
自定义当前活动 tab 的 className

```js
$('.tab').tab({
	activeClass: 'current'
});
```
onBefore & onAfter

```js
$('.tab').tab({
	onBefore: function(e) {
		
	},
	onAfter: function(e) {
	
	}
});

// 返回值
{
	"activeIndex"  : index,         // 当前活动 tab 索引
	"preIndex"     : preIndex,      // 前一个活动 tab 索引
	"activeTab"    : activeTab,     // 当前活动 tab 元素
	"activeGroup"  : activeGroup,   // 当前活动 group 元素
	"elemTab"      : elemTab        // tab 元素
}
```

