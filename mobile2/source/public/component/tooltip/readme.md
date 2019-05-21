# Tooltip DOC


## 源文件

```
- JS  - source/public/component/tooltip/tooltip.js
      -
  CSS - source/public/component/tooltip/_tooltip.scss
      -
```


## DOM 结构


* Html

```
<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</button>

<hr>

<!-- HTML to write -->
<a href="#" data-toggle="tooltip" title="Some tooltip text!">Hover over me</a>

<!-- Generated markup by the plugin -->
<div class="tooltip top" role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">
        Some tooltip text!
    </div>
</div>

<hr>
```



* JS 手动初始化
```
$('[data-toggle="tooltip"]').tooltip()
```


## options
```
`Name` => Type => Default
Description
```

* `animation` => boolean => true
 Apply a CSS fade transition to the tooltip

* `container` => string | false =>	false
Appends the tooltip to a specific element. Example: `container: 'body'`. This option is particularly useful in that it allows you to position the tooltip in the flow of the document near the triggering element - which will prevent the tooltip from floating away from the triggering element during a window resize.

* `delay` => number | object	 => 0
Delay showing and hiding the tooltip (ms) - does not apply to manual trigger type
If a number is supplied, delay is applied to both hide/show
Object structure is: `delay: { "show": 500, "hide": 100 }`

* `html` => boolean	=> false
Insert HTML into the tooltip. If false, jQuery's `text` method will be used to insert content into the DOM. Use text if you're worried about XSS attacks.

* `placement` => string | function => 'top'
How to position the tooltip - top | bottom | left | right | auto.
When "auto" is specified, it will dynamically reorient the tooltip. For example, if placement is "auto left", the tooltip will display to the left when possible, otherwise it will display right.
When a function is used to determine the placement, it is called with the tooltip DOM node as its first argument and the triggering element DOM node as its second. The `this` context is set to the tooltip instance.

* `selector` => string =>	false
If a selector is provided, tooltip objects will be delegated to the specified targets. In practice, this is used to enable dynamic HTML content to have tooltips added.

* `template` => string	=> `'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'`
Base HTML to use when creating the tooltip.
The tooltip's `title` will be injected into the `.tooltip-inner`.
`.tooltip-arrow` will become the tooltip's arrow.
The outermost wrapper element should have the `.tooltip` class.

* `title` => 	string | function	=> ''
Default title value if `title` attribute isn't present.
If a function is given, it will be called with its `this` reference set to the element that the tooltip is attached to.

* `trigger` =>  string	=>  'hover focus'
How tooltip is triggered - click | hover | focus | manual. You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.

* `viewport` =>	string | object | function	 => { selector: 'body', padding: 0 }
Keeps the tooltip within the bounds of this element. Example: `viewport: '#viewport' or { "selector": "#viewport", "padding": 0 } `
If a function is given, it is called with the triggering element DOM node as its only argument. The `this` context is set to the tooltip instance.



## methods

`$().tooltip(options)`  
Attaches a tooltip handler to an element collection.

`.tooltip('show')`
Reveals an element's tooltip. Returns to the caller before the tooltip has actually been shown (i.e. before the `shown.bs.tooltip` event occurs). This is considered a "manual" triggering of the tooltip. Tooltips with zero-length titles are never displayed.
```
$('#element').tooltip('show')
```

`.tooltip('hide')`
Hides an element's tooltip. Returns to the caller before the tooltip has actually been hidden (i.e. before the `hidden.bs.tooltip` event occurs). This is considered a "manual" triggering of the tooltip.
```
$('#element').tooltip('hide')
```

`.tooltip('toggle')`
Toggles an element's tooltip. Returns to the caller before the tooltip has actually been shown or hidden (i.e. before the `shown.bs.tooltip` or `hidden.bs.tooltip` event occurs). This is considered a "manual" triggering of the tooltip.
```
$('#element').tooltip('toggle')
```

`.tooltip('destroy')`
Hides and destroys an element's tooltip. Tooltips that use delegation (which are created using the selector option) cannot be individually destroyed on descendant trigger elements.
```
$('#element').tooltip('destroy')
```

## events

1. `show.bs.tooltip`
This event fires immediately when the `show` instance method is called.
2.  `shown.bs.tooltip`
This event is fired when the tooltip has been made visible to the user (will wait for CSS transitions to complete).
3.  `hide.bs.tooltip`
This event is fired immediately when the `hide` instance method has been called. |
4.  `hidden.bs.tooltip`
This event is fired when the tooltip has finished being hidden from the user (will wait for CSS transitions to complete).
5.  `inserted.bs.tooltip`
This event is fired after the `show.bs.tooltip` event when the tooltip template has been added to the DOM.
