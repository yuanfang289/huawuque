### styles 目录结构
```
- styles
	- core
	- control             // 表单控件样式文件目录
	- mixins              // 混合目录
	- plugins             // 插件 scss 目录
	- _variable.scss
	- _mixins.scss
	- _arrow.scss
	- _control.scss
	- _core.scss
	- _form.scss
	- _module.scss
	- _slide.scss
	- _table.scss
	- _*.scss             // 其他组件样式
	- public.scss
```

### core 目录
> 核心样式

```
_variable.scss         // core 相关变量
_normalize.scss        // 跨浏览器样式统一
_init.scss             // 基础样式初始化
_color.scss            // UI 色值类定义
_icon.scss             
_header.scss           
_footer.scss
_structure.scss        // 网站布局结构定义
```

### _variable.scss
> 全局变量文件

### _mixins.scss
> 包括所有混合

### _arrow.scss
> 箭头样式

* 基本样式
* 箭头方向

### _control.scss
> 表单控件样式，包括所有 control 目录中的样式

### _core.scss
> 包括所有 core 目录中的样式

### _form.scss
> 表单样式

### _module.scss
> 部分公用组件样式，减少public.scss的代码长度 (如果复用率不高，则不应该写在这里)

### _slide.scss
> 轮播图样式

### _table.scss
> 表格样式

### public.scss
> 公共样式表

## 实用类

``` scss
// 类名
.user-select-none    // 禁止选中文本
.clear               // 清除前后浮动
.float-left          // 靠左浮动
.float-right         // 靠右浮动
.float-none          // 不浮动
.block               // display: block
.hide                // display: none
.hidden              // visibility: hidden
.full-block          // 宽100% 的块元素
.text-left           // 文本居左
.text-right          // 文本居右
.text-center         // 文本居中
.text-nowrap         // 文本强制不换行
.text-break          // 文本强制断行
.static              // position: static
.absolute            // position: absolute
.fixed               // position: fixed

// css 实现
.user-select-none {
    @include user-select-none;
}
.clear {
    clear: both !important;
}
.float-left {
    float: left !important;
}
.float-right {
    float: right !important;
}
.float-none {
    float: none !important;
}
.block {
    display: block !important;
}
.hide {
    display: none !important;
}
.hidden {
    visibility: hidden !important;
}
.full-block {
    display: block !important;
    width: 100% !important;
}

/* text align */
.text-left {
    text-align: left !important;
}
.text-right {
    text-align: right !important;
}
.text-center {
    text-align: center !important;
}
.text-nowrap {
    white-space: nowrap !important;
}
.text-break {
    @include text-break;
}

/* position */
.static {
    position: static !important;
}
.absolute {
    position: absolute !important;
}
.fixed {
    position: fixed !important;
}

```
