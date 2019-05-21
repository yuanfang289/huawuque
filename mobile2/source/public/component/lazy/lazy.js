/* ========================================================================
 * lazy.js v1.0.0
 * ========================================================================
 * Copyright 2016.09
 * 图片懒加载+裁剪
 * ======================================================================== */

+(function($) {
    'use strict';

    var Lazy = function(element, options) {
        this.$element = $(element);
        this.options  = options;

        this.cache    = [];

        //重组
        var data = {
            obj: this.$element,
            tag: element.nodeName.toLowerCase(),
            url: this.$element.attr(this.options.dataAttr)
        };
        this.cache.push(data);

        this.loading();
        this.options.container.bind('scroll', $.proxy(this.loading, this));
    }

    Lazy.VERSION  = '1.0.0';

    Lazy.DEFAULTS = {
        dataAttr   : 'data-src',      // 获取元素加载地址的属性名
        placeholder: null,            // 占位图
        container  : $(window),       // 滚动的容器。默认为$(window)，也就是默认的网页滚动。
        callback   : $.noop,          // 回调。元素动态加载完毕后执行的回调函数。其中回调函数的上下文this就是当前DOM元素。注意：如果无法获取元素加载地址，则不执行动态加载，但是会触发回调。在某些需求下，您可以缺省url值，仅仅触发回调。
        rule       : '?imageMogr2/thumbnail/!{{width}}x{{height}}r/gravity/Center/crop/{{width}}x{{height}}',
                                         // 图片处理规则，其中{{width}}为图片宽，触发resize事件时也需改变。
        domain    : ['urwork.cn', 'clouddn.com'], // 地址域名
        // effect    : 'show',          // 显现效果，默认'show'
        threshold : 200              // 距离200px开始加载
    }

    Lazy.prototype.callback = function (call) {
        if ($.isFunction(this.options.callback)) {
            this.options.callback.call(call.get(0));
        }
    }

    Lazy.prototype.toString = function () {
        console.log('lazy-%s.js', Lazy.VERSION)

        return this;
    }

    Lazy.prototype.loading = function () { //动态显示数据
        var self = this;

        var containerHeight = this.options.container.height(),
            containerTop;

        if (this.options.container.get(0) === window) {
            containerTop = $(window).scrollTop();
        } else {
            containerTop = this.options.container.offset().top ;
        }

        $.each (this.cache, function (i, data) {
            var o   = data.obj,
                tag = data.tag,
                url = data.url,
                posTop, posBottom;

            if (o) {
                posTop = o.offset().top - containerTop, posTop + o.height() - self.options.threshold;

                if (o.is(':visible') && (posTop >= -self.options.threshold && posTop < containerHeight) || (posBottom > 0 && posBottom <= containerHeight)) {
                    if (url) {
                        var W, H ;
                        if (tag == 'img') {
                            // 获取图片父级的宽高
                            W = o.parent().width(),
                            H = o.parent().height();
                        } else {
                            // 获取自身的宽高
                            W = o.width(),
                            H = o.height();
                        }


                        if (window.devicePixelRatio) {
                            W *= window.devicePixelRatio;
                            H *= window.devicePixelRatio;
                        }

                        var useRule = false;
                        if (self.options.domain) {
                            for (var n = self.options.domain.length - 1; n >= 0; n--) {
                                if (url.indexOf(self.options.domain[n]) != -1) {
                                    useRule = true;
                                    break;
                                }
                            }
                        }
                        // 只有在指定的域名下才使用裁剪规则
                        if (useRule) {
                            var hasRule, types = ['imageView2', 'imageMogr2'];
                            for (var i = 0; i < types.length; i++) {
                                var item = types[i];
                                if (url.indexOf(item) > -1) {
                                    hasRule = true;
                                    break;
                                }
                            }
                            // 如果自身没有裁剪规则，则使用默认裁剪规则
                            if (!hasRule) {
                                url = url + self.options.rule.replace(/{{width}}/g, W).replace(/{{height}}/g, H);
                            }
                        }
                        // 在浏览器窗口内
                        if (tag === 'img') { // 图片， 改变src
                            self.callback(o.attr('src', url));
                        } else {
                            self.callback(o.css('background-image', 'url(' + url + ')'));
                            // o.load(url, {}, function () {
                            //     self.callback(o);
                            // })
                        }
                    } else {
                        // 无地址，直接触发回调
                        self.callback(o);
                    }
                    data.obj = null;
                }
            }
        });

    }

    function Plugin (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.lazy');
            var options = $.extend(true, {}, Lazy.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('bs.lazy', (data = new Lazy(this, options)));
        });
    }

    var old = $.fn.lazy;

    $.fn.lazy             = Plugin;
    $.fn.lazy.Constructor = Lazy;


    $.fn.lazy.noConflict = function () {
        $.fn.lazy = old;

        return this;
    }

})(jQuery);
