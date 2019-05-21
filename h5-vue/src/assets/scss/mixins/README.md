# Mixins (混合)

## clearfix
> 清除浮动

## arrow
> 箭头混合

* 基本样式
* 箭头类别 [solid | hollow]
* 箭头皮肤
* 箭头方向

示例

``` scss
.arrow {
    @include arrow();    // 基础样式

    // solid
    @include arrow-type( solid ) {
        @include arrow-skins( $arrow-base-color );    // 箭头皮肤
        @include arrow-size( $arrow-base-size );      // 箭头尺寸
    };
}

// 箭头方向
.arrow[class*="top-"] {
    @include arrow-dir( top );
}
```

## control
> 控件混合

### Button
* 按钮基础样式
* 按钮不可用样式
* 按钮主题
* 按钮宽度
* 按钮高度

示例

``` scss
// 参考 control.scss 实际运用
```

### Text
* 文本框主题
* 文本框尺寸(同时设置宽高)
* 文本框宽度
* 文本框高度
* urcontrol 文本框高度

示例

``` scss
// 参考 control.scss 实际运用
```

## util
> 实用混合

``` scss
@include text-overflow;    // 单行文本溢出添加省略号
@include selection($bg-color, $color);    // 文本被选中后的样式
@include text-break($space: null);        // 文本断行
@include box-center;        // 水平居中
@include margin-h(1px);     // 定义左右 margin
@include margin-v(1px);     // 定义上下 margin
@include padding-h(1px);    // 定义左右 padding
@include padding-v(1px);    // 定义上下 padding
@include img-full;          // img 宽高 100%
@include overflow($value, $key);    // overflow

// 创建遮罩样式, $isfixed参数等于 false 可设置 @content
@include mask($zindex, $bgcolor, $opacity, $isfixed);

@include user-select-none;   // 禁用用户选择文本
@include gray;	             // 创建灰度样式
@include not-allowed;        // 禁用时鼠标指针样式
@include rem(10px);          // px 转换 rem
@include toscale($scale);	 // 基于12列栅格的百分比计算，参数[1-12]
// 固定比例盒子
@include fixed-ratio-box($ratio)     // 父级
@include fixed-ratio-inner   // 子级用
// 绝对居中
@include position-center  // 整体绝对居中
@include position-center-x// 横向绝对居中
@include position-center-y// 纵向绝对居中
```
