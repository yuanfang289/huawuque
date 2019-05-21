# BaseForm 文档

## inputContent 方法

- 初始化

```js
$(document).on('click', '.input-editor', function() {
    inputContentInst = BaseForm.inputContent(this);
})
```

- data- 参数说明

```html
// 控件目标 ID (弹层)
// data-target=""
<a href="javascript:;" class="readonly-text input-editor" data-target="#editor"></a>

// 调用参数 
// data-options=""

```


- 单行输入控件

```html
<!-- 单行文本表单结构 -->
<div class="form-item">
    <label class="form-label">姓名</label>
    <div class="form-cont">
        <i class="uricon-arrow-right ricon"></i>
        <input type="hidden" name="name" value="" placeholder="必填" />
        <a href="javascript:;" class="readonly-text input-editor" data-target="#editor" data-options="
            mode: 'input',
            name: 'name',
            label: '姓名',
            type: 'text',
            rules: {
                maxlength: 20
            },
            messages: {
                maxlength: '最多20个字'
            }
        "></a>
    </div>
</div>
```

```html
<!-- 单行文本输入控件结构 -->
<section class="input-content" id="editor" role="parent">
    <header class="layer-header">
        <a href="javascript:;" class="edit-btn" role="close">取消</a>
        <a href="javascript:;" class="edit-btn input-content-save" role="save">保存</a>
    </header>
    <div class="layer-body">
        <form action class="form form-input-content">
            <div class="form-item">
                <input type="text" class="text" role="textfield">
            </div>
        </form>
    </div>
</section>
```

```js

```

- 搜索控件

```html

```

```js

```
