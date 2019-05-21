if (typeof jQuery === 'undefined') {
    throw new Error('Filter\'s JavaScript requires jQuery')
}

+function ($) {
    'use strict';
    if ($.support.transition && !$.support.transition.end) {
        throw new Error('Filter\'s JavaScript requires transition')
    }
}(jQuery);

+function($){
    'use strict';

    // FILTER CLASS DEFINITION
    // =======================

    var Filter = function(element, options) {
        this._body            = $('body');
        this.$element         = $(element);

        this.selector         = {};
        this.selector.id      = element.id && '#' + element.id
        this.selector.wrapper = '[Wrapper]';                // 筛选条件container
        this.selector.title   = '[data-title]';             // 标题container
        this.selector.text    = '[Text]';                   // 标题文本
        this.selector.icon    = '[Icon]';                   // 标题 Icon
        this.selector.mask    = '[Mask]';                   // 遮罩层
        this.selector.body    = '[Body]';                   // 筛选数据父级容器
        this.selector.content = '[data-content]';           // 筛选数据container
        this.selector.menu    = '[Menu]';                   // 如果需要计算高度则使用
        this.selector.scroll  = '[data-scroll="verticle"]'; // scroll
        this.selector.parent  = '[data-parent]';            // 一级
        this.selector.child   = '[data-child]';             // 二级
        this.selector.clear   = '[data-clear]';             // 清空按钮
        this.selector.query   = '[Query]';                  // 完成按钮

        this.zIndex           = 1000;                       // 遮罩层z-index

        this.$wrapper         = this.$element.find(this.selector.wrapper); // 筛选条件container
        this.$titles          = this.$element.find(this.selector.title);   // 标题container

        this.offsetTop        = this.$wrapper.offset().top;                // wrapper offsetTop
        this.offsetBottom     = this.offsetTop + this.$wrapper.height();

        this.$mask            = null;
        this.$body            = null;
        this.$contents        = null;
        this.$activeContent   = null;
        this.$activeTitle     = null;
        this.$clear           = null;
        this.$query           = null;

        this.textHint         = {};                            // 标题placeholder
        this.sameParamTitle   = { query: false };              // 相同param的元素
        this.redis            = null;                          // 缓存数据
        this.maskTop          = null;                          // 遮罩层 top 值
        this.elemZIndex       = +this.$element.css('z-index'); // filter index
        this.tempRedis        = {};                            // 临时redis
        this.parentParamName  = null;                          // 父级参数
        this.paramName        = null;                          // 子级参数，可以同时传递多个参数 ，参数之间以|分隔
        this.paramArr         = null;                          // 子级参数数组
        this.autoClose        = true;                          // 条件改变后是否自动关闭选项层

        this.scroller         = {};                            // IScroll实例化对象

        this.options          = options;
        this.dataKeys         = [];                            // 存储筛选分类键名，用于重置数据，清除之外其他数据


        if(this.options.isFixed) {                             // 页面滚动时是否需要置顶
            //获取初始值
            this.scrollTop    = null;
        }

        $(window).on('scroll.bs.filter', $.proxy(this.scroll, this));
    }

    Filter.VERSION = '1.0.2';

    Filter.TRANSITION_DURATION = 300;

    Filter.DEFAULTS = {
        template : 'tlpFilter',   // template 模板id
        url      : '',            // url 获取数据的地址
        data     : {},            // data 请求参数
        query    : {},            // query 初始的查询参数
        isFixed  : true,          // isFixed 页面scroll时是否置顶，默认不置顶
        formatted: null,          // 转换服务器返回数据的函数
        change   : null           // 回调，如果不传递则trigger change.bs.filter
    }

    Filter.prototype.toString = function() {
        console.log('filter-%s.js', Filter.VERSION);
        return this
    }

    Filter.prototype.scroll = function(e) {

        var scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;

        this.scrollTop === undefined && (this.scrollTop = scrollTop);

        if (scrollTop >= this.offsetBottom) { //是否吸顶
            this.$wrapper.addClass('filter-fixed');
        } else if (scrollTop < this.offsetTop) {
            this.$wrapper.removeClass('filter-fixed');
        }

        var _top     = this.$wrapper.hasClass('filter-fixed') ? parseInt(this.$wrapper.css('top'))
            : this.$wrapper.offset().top;
        this.maskTop = _top + this.$wrapper.height();
        this.$body.css({top: this.maskTop + 'px'});

        if (!this.$wrapper.hasClass('filter-fixed') && this.$body && this.$body.length ) {
            this.maskTop = this.offsetBottom - scrollTop
            this.$body.css({top: this.maskTop + 'px'});
        }

        // var className = typeof this.options.isFixed === 'string' ? this.options.isFixed : 'swingInX';
        //
        // if (scrollTop - this.scrollTop < 0) {
        //     this.$wrapper.addClass(className);
        // } else {
        //     this.$wrapper.removeClass(className);
        // }
        // this.scrollTop = scrollTop;

        e.preventDefault();

        return this
    }

    Filter.prototype.androidRefresh = function(isRefresh) { // 客户端fn ==== jsInterface
        // true 可以使用下拉刷新。false 不可以使用下拉刷新
        window.jsInterface && window.jsInterface.setIsRefresh && window.jsInterface.setIsRefresh(isRefresh);
        return this
    }

    Filter.prototype.addEvent = function() {
        $(window).on('wheel', function(evt) {
            evt.preventDefault();
        })
        this.androidRefresh(false);
        return this
    }

    Filter.prototype.removeEvent = function() {
        $(window).off('wheel');
        this.androidRefresh(true);
        return this
    }

    Filter.prototype.iScroll = function() {
        var self = this;

        // 销毁iscrol实例
        for (var prop in self.scroller) {
            if (!self.scroller.hasOwnProperty(prop)) continue;
            var item = self.scroller[prop];
            item.destroy();
            item = null;
        }

        IScroll && this.$activeContent.find(this.selector.scroll).each(function(index) {
            var elem = $('.active', this);
            index = $(this).closest(self.selector.content).attr('data-content') + '' + index;

            if(self.scroller[index] && elem.length) {
                var toelement = elem.closest('.select-sub-menu').data('toelement');
                if (toelement !== false) {
                    setTimeout(function() {
                        self.scroller[index].scrollToElement(elem[0], 0, false,true);
                    }.bind(this), 0)
                }
            }

            self.scroller[index] = new IScroll(this, {click: true});
        });

        return this
    }


    Filter.prototype.newTapEvent = function() {
        this.$body.find(this.selector.parent + ' , ' + this.selector.child).each(function() {
            var self = this;
            var point = {
                start_y : 0,
                end_y   : 0,
            }
            self.addEventListener('touchstart', function(evt) {
                point.start_y = evt.touches[0].pageY;
                evt.preventDefault();
            })
            self.addEventListener('touchend', function(evt) {
                evt.preventDefault();
                point.end_y = evt.changedTouches[0].pageY;
                if (Math.abs(point.end_y - point.start_y) > 50) {
                    return false;
                }
                $(this).trigger('_tap_');
            })
        })

        return this

    }

    Filter.prototype.toggle = function(isShow, callfn) {
        if (isShow) {
            this.addEvent();
            this.$body.addClass('active');
            this.$mask.addClass('active');
            this.$element.css({
                zIndex: this.zIndex + 3
            });
        } else {
            this.removeEvent();
            this.$body
                .removeClass('active')
                .removeClass(function(index, Class) {
                    var result = Class.match(/active\d+/);
                    if (!result) return '';
                    return result[0];
                })
                .one('bsTransitionEnd', function () {
                    this.$activeContent.removeClass('active')
                }.bind(this))
                .emulateTransitionEnd(Filter.TRANSITION_DURATION)

            this.$mask.removeClass('active');
            this.$element.css({
                zIndex: this.elemZIndex
            });
        }
        this.$menu = this.$activeContent.find(this.selector.menu);
        if(this.$menu.length) {
            var height = isShow ? this.$menu.height(): 0;
            this.$body.height(height);
        }
    }

    Filter.prototype.setActive = function(triTagName, index) {
        var self = this;

        if (typeof index === "undefined") {
            if (triTagName == 'title') {
                self.$activeTitle.removeClass('active');
                self.$activeTitle.find(self.selector.text).removeClass('active');
                self.$activeTitle.find(self.selector.icon).removeClass('active rotate');
                self.toggle(false);
            }
            if (triTagName == 'child') {
                self.$activeContent.find(self.selector.child + '.active').removeClass('active');
            }
            self._body.css('overflow', '');
            return false;
        }
        self._body.css('overflow', 'hidden');
        if (triTagName == 'title') {
            self.toggle(true);
            self.$titles.each(function() {
                var $this = $(this);
                if ($this.attr('data-title') == index) {
                    self.$activeTitle    = $this;
                    self.parentParamName = $.trim($this.attr('data-parent-param'));
                    self.paramName       = $.trim($this.attr('data-param'));
                    self.paramArr        = self.paramName.indexOf('|') !== -1 ? self.paramName.split('|') : [];

                    $this.addClass('active');
                    $(self.selector.text, this).addClass('active');
                    $(self.selector.icon, this).addClass('active rotate');
                } else {
                    $this.removeClass('active');
                    $(self.selector.text, this).removeClass('active');
                    $(self.selector.icon, this).removeClass('active rotate');
                }
            });
            // this.$contents.each(function() {
            //     var that = this;
            //     var $this = $(this);
            //     if ($this.attr('data-content') == index) {
            //         $this.addClass('active');
            //         self.$activeContent = $this;
            //         self.redis["currentIndex"] = $this.attr('data-content');
            //         // 如果有[data-role="f_menu"],则重新计算[data-role="f_body"]的高度 start --------
            //         var height = 0;
            //         $(self.selector.menu, this).each(function() {
            //             height = Math.max($(this).height(), height);
            //         });
            //         if (height) {
            //             self.$body.height(height);
            //         }
            //         // ------------------------------- end ----------------------------------------
            //         self.iScroll();
            //     } else {
            //         $this.removeClass('active');
            //     }
            // });

            self.$activeContent = self.$body.find(self.selector.content + '[data-content="' + index + '"]');
            self.$activeContent.addClass('active');
            self.redis["currentIndex"] = index;

            // 如果有[data-role="f_menu"],则重新计算[data-role="f_body"]的高度 start --------
            var height = 0;
            $(self.selector.menu, self.$activeContent).each(function() {
                height = Math.max($(this).height(), height);
            });
            if (height) {
                self.$body.height(height);
            }
            // ------------------------------- end ----------------------------------------

            self.iScroll();

            self.$activeContent.siblings().removeClass('active');
        }
        if (triTagName == 'child') {
            self.$activeContent.find(self.selector.child).each(function() {
                var $this = $(this);
                if ($this.attr('data-child') == index) {
                    $this.addClass('active selected');
                } else {
                    $this.removeClass('active selected');
                }
            });
        }

        return this
    }

    Filter.prototype.compile = function(isInit) {
        if (isInit) {
            this.maskTop = this.$wrapper.offset().top + this.$wrapper.height();
        } else {
            this.$body.remove();
        }

        var templateHtml = template(this.options.template, {
            data: this.redis
        });

        this.$body = $(templateHtml)
            .attr('id', '_f_body_' + (Date.now() || new Date().getTime()) + '_')
            .css({
                zIndex: this.zIndex + 4,
                top: this.maskTop + 'px'
            })
            .appendTo('body');

        this.selector.id && this.$body.attr('data-target', this.selector.id);


        this.$contents      = this.$body.find(this.selector.content);
        this.$activeContent = this.$body.find(this.selector.content + '.active');

        this.newTapEvent();

        return this
    };

    Filter.prototype.reset = function() {
        var newRedis = {};
        var redis = this.redis;
        var textHint = this.textHint;
        this.options.query = {};
        // 重置数据
        for (var prop in redis) {
            if (!redis.hasOwnProperty(prop)) continue;
            this.dataKeys.forEach(function(item) {
                if (prop === item) newRedis[item] = redis[prop];
            });
        }
        // 重置标题
        for (var prop in textHint) {
            if (!textHint.hasOwnProperty(prop)) continue;
            var item = textHint[prop];
            var name = prop.split('#')[0];

            this.$wrapper.find('[data-param=' + name + '] ' + this.selector.text).text(item);
        }

        this.redis = newRedis;
        this.tempRedis = {};
        this.compile();
    };

    Filter.prototype.hide = function() {
        if (this.$activeTitle) {
            this.setActive('title');
        }
    };

    Filter.prototype.getDataKeys = function() {
        for (var prop in this.redis) {
            if (!this.redis.hasOwnProperty(prop)) continue;
            this.dataKeys.push(prop);
        }
    };

    Filter.prototype.init = function() {
        var createMask = function() {
            var mask = $('<a href="#" Mask style="z-index: 1000;"></a>').appendTo('body');
            return mask;
        };

        var self = this;
        switch (self.$element.length) {
            case 0:
                alert('请检查结构！');
                return false;
                break;
            case 1:
                $.get(self.options.url, self.options.data, function(res) {
                    if (self.options.formatted) {
                        res = self.options.formatted(res);
                    }
                    self.redis = res;
                    self.compile(true);
                    self.$mask = createMask();
                    if (!$.isEmptyObject(self.options.query)) {
                        self.redis = $.extend({}, self.redis, self.options.query);
                        self.compile();
                    }
                    self.getDataKeys();
                    var paramTemp = {};
                    self.$titles.each(function(k) {
                        var that = this;
                        // 1.检测是否有同名参数，如果有存储相应的dom
                        var tempParamName = $(this).attr('data-param');
                        var tempParamArr = [];
                        if (tempParamName.indexOf('|') !== -1) {
                            tempParamArr = tempParamName.split('|');
                        }
                        if (!self.sameParamTitle.query) {
                            if (!paramTemp[tempParamName]) {
                                paramTemp[tempParamName] = true;
                            } else {
                                self.sameParamTitle[tempParamName] = self.$element.find(self.selector.title + '[data-param="' + tempParamName + '"]');
                            }
                        }
                        // -------------------- end -------------------------------------
                        // 有初始值时，初始化对应的文本显示 start ----------------------------
                        function setTitleText(paramName) {
                            if (paramName in self.options.query && self.options.query[paramName]) {
                                var flag     = $(that).attr('data-title');
                                var $content = self.$body.find('[data-content="' + flag + '"]');
                                var $child   = $content.find('[data-child="' + self.options.query[paramName] + '"]');
                                var text = $.trim($child.text());
                                text && ($(self.selector.text, that).text(text));
                            }
                        }
                        // 2.缓存placeholder
                        var text = $.trim($(self.selector.text, that).text());
                        if (tempParamArr.length) { // 一个content里边有两种类型
                            for (var i = tempParamArr.length - 1; i >= 0; i--) {
                                setTitleText(tempParamArr[i]);
                                self.textHint[tempParamName + '#' + (k + 1)] =  text;
                            }
                        } else {
                            self.textHint[tempParamName + '#' + (k + 1)] =  text;
                            setTitleText(tempParamName);
                        }
                        // -----------------------------end------------------------------------
                    });
                    self.sameParamTitle.query = true;
                });
                break;
            default:
        }

        $(document)
            .off('click', this.selector.mask)
            .on('click', this.selector.mask, function(evt) { //点击遮罩层关闭
                self.setActive('title');

                evt.preventDefault();
                evt.stopPropagation();
            })
            .off('click', this.selector.parent)
            .on('click', this.selector.parent, function(evt) { //切换title的选中状态
                evt.preventDefault();
                var $this = $(this);
                var id = $.trim($this.attr('data-parent'));
                self.redis[self.parentParamName] = id;
                self.compile();
                self.iScroll();
            })
            .off('click', this.selector.child)
            .on('click', this.selector.child, function(evt) { //切换title的选中状态
                self.selectHandler(this);
                evt.preventDefault();
            })
            .off('click', this.selector.clear)
            .on('click', this.selector.clear, function(evt) {
                evt.preventDefault();

                if (!self.autoClose) {
                    self.$activeContent.find(self.selector.child + '.active').each(function() {
                        $(this).removeClass('active selected');
                    })
                } else {
                    self.setActive('child');
                }
                if (self.paramArr.length) {
                    for (var i = self.paramArr.length - 1; i >= 0; i--) {
                        var p = self.paramArr[i];
                        self.redis[p] = !self.autoClose ? [] : '';
                    }
                } else {
                    self.redis[self.paramName] = !self.autoClose ? [] : '';
                }
            })
            .off('click', this.selector.query)
            .on('click', this.selector.query, function(evt) {
                evt.preventDefault();

                function setQuery(paramName) {
                    if (typeof redis[paramName] === 'string') {
                        self.options.query[paramName] = self.redis[paramName];
                    } else if (typeof redis[paramName] === 'object') {
                        self.options.query[paramName] = self.redis[paramName].join(',');
                    }
                }
                if (self.paramArr.length) {
                    for (var i = self.paramArr.length - 1; i >= 0; i--) {
                        setQuery(self.paramArr[i]);
                    }
                } else {
                    setQuery(self.paramName);
                }
                self.options.change && self.options.change(self.options.query);

                var relatedTarget = this;
                var changeEvent = $.Event('change.bs.filter', {
                    relatedTarget: relatedTarget,
                    query: self.options.query
                })
                self.$element.trigger(changeEvent)
                if(changeEvent.isDefaultPrevented()) return

                self.setActive('title');
            });

        this.$element
            .off('click', self.selector.title)
            .on('click', self.selector.title, function(evt) { //切换title的选中状态
                evt.preventDefault();
                evt.stopPropagation();
                var $this = $(this);
                var index = $this.attr('data-title');
                if (self.parentParamName && self.tempRedis[self.parentParamName] && self.tempRedis[self.parentParamName] != self.redis[self.parentParamName]) {
                    self.redis[self.parentParamName] = self.tempRedis[self.parentParamName];
                    self.compile();
                    self.iScroll();
                }
                // 去除未查询的选项
                if (!self.autoClose) {
                    var clearActive = function clearActive(href, param, multiParamIndex) {
                        var $content = this.$body.find('[data-content="' + href + '"]');
                        var $parent  = $content;
                        if (multiParamIndex !== undefined) {
                            $parent  = $content.find('[data-param-index="' + multiParamIndex + '"]');
                        }
                        $parent.find(self.selector.child).each(function() {
                            var id = $.trim($(this).attr('data-child'));
                            if (!self.options.query[param] || self.options.query[param].indexOf(id) == -1) {
                                $(this).removeClass('active selected');
                            }
                            if (self.options.query[param] && $.inArray(id, self.redis[param]) !== -1) {
                                $(this).addClass('active selected');
                            }
                        });
                    }
                    self.$titles.each(function() {
                        var $title = $(this);
                        var href = $.trim($title.attr('data-title'));
                        var tempParamName = $.trim($title.attr('data-param'));
                        var tempParamArr = [];
                        if (tempParamName.indexOf('|') !== -1) {
                            tempParamArr = tempParamName.split('|');
                            for (var i = tempParamArr.length - 1; i >= 0; i--) {
                                clearActive(href, tempParamArr[i], i + 1);
                            }
                        } else {
                            clearActive(href, tempParamName);
                        }
                    });
                }
                if ($this.hasClass('active')) { //如果当前active，则关闭筛选
                    self.setActive('title');
                    self.$body.removeClass(function(index, Class) {
                        var result = Class.match(/active\d+/);
                        if (!result) return '';
                        return result[0];
                    });
                    return false;
                }
                self.setActive('title', index);

                self.$body.removeClass(function(index, Class) {
                    var result = Class.match(/active\d+/);
                    if (!result) return '';
                    return result[0];
                });
                self.$body.addClass('active' + index.substr(1));
            })


        return this
    }

    Filter.prototype.selectHandler = function(elem) {
        var self = this;

        self.parentParamName && (self.tempRedis[self.parentParamName] = self.redis[self.parentParamName]);
        var $this = $(elem);
        var id = $.trim($this.attr('data-child'));
        var text = $.trim($this.text());
        var multi = $.trim(self.$activeTitle.attr('data-multi'));
        var multiArr = [];
        if (multi.indexOf('|') !== -1) {
            multiArr = multi.split('|');
        }
        var paramIndex = $this.closest('[data-param-index]').attr('data-param-index');
        if (paramIndex) {
            paramIndex -= 1;
            multi = multiArr[paramIndex] === 'true';
        } else {
            multi = multi === "true";
        }
        self.autoClose = !multi;
        self.$activeContent = $this.closest(self.selector.content)
        if (multi) { // 多选 --------------------------------------------------------
            var tempParamName = self.paramName;
            if (paramArr.length) {
                tempParamName = self.paramArr[paramIndex];
            }
            if (!self.redis[tempParamName]) {
                self.redis[tempParamName] = [];
            }
            if ($this.hasClass('active') || $this.hasClass('selected')) {
                $this.removeClass('active selected');
                var pos = $.inArray(id, self.redis[tempParamName]);
                if ($.inArray(id, self.redis[tempParamName]) !== -1) {
                    self.redis[tempParamName].splice(pos, 1);
                }
            } else {
                $this.addClass('active selected');
                if ($.inArray(id, self.redis[tempParamName]) === -1) {
                    self.redis[tempParamName].push(id);
                }
            }
            // -------------------------------- 多选结束 -------------------------------
        } else {
            //  ------------------------------- 单选开始 -------------------------------
            self.setActive('child', id);
            self.redis[self.paramName] = id;
            // 处理显示文本 和 传递的参数 start --------------------------------------------
            if (self.parentParamName && id == self.redis[self.parentParamName]) {
                self.options.query[self.parentParamName] = id;
                self.options.query[self.paramName] = '';
                text += $.trim(self.$activeContent.find(self.selector.parent + '.active').text());
            } else {
                if (self.parentParamName) {
                    self.options.query[self.parentParamName] = '';
                }
                self.options.query[self.paramName] = id;
            }
            if (!id) {
                var index = self.$activeTitle.attr('data-title');
                text = self.textHint[self.paramName + index];
            }
            self.$activeTitle.find(self.selector.text).text(text);
            var tempParamName = $.trim(self.$activeTitle.attr('data-param'));
            if (self.sameParamTitle[tempParamName] && self.sameParamTitle[tempParamName].length > 0) {
                $(self.sameParamTitle[tempParamName]).each(function() {
                    var tempParamArr = [];
                    if (tempParamName.indexOf('|') !== -1) {
                        tempParamArr = tempParamName.split('|');
                    }
                    var href = $(this).attr('data-title');
                    if (href != self.$activeTitle.attr('data-title')) {
                        if (tempParamArr.length) {
                            $(self.selector.text, this).text(self.textHint[tempParamArr[0] + href]);
                        } else {
                            $(self.selector.text, this).text(self.textHint[tempParamName + href]);
                        }
                        self.$body
                            .find('[data-content="' + href + '"]')
                            .find(self.selector.child).removeClass('active');
                    }
                });
            }
            // ------------------------------- end ----------------------------
            self.setActive('title');
            self.options.change && self.options.change(self.options.query);

            var relatedTarget = elem;
            var changeEvent = $.Event('change.bs.filter', {
                relatedTarget: relatedTarget,
                query: self.options.query
            })
            self.$element.trigger(changeEvent)
            if(changeEvent.isDefaultPrevented()) return

            if (self.$activeContent.find(self.selector.menu).length) {
                self.$body.height(0);
            }
            // ------------------------ 单选结束 --------------------------------------
        }
    }



    // Filter PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        var getOptions = function(metas) {
            if(metas.options  && typeof metas.options === 'string' ) {
                metas = metas.options;
                // metas = metas.replace(/[\s]/g, '');
                metas = '{' + metas + '}';
                metas = eval('(' + unescape(metas) + ')');
            }
            return metas
        }

        return this.each(function() {
            var $this    = $(this);
            var data     = $this.data('bs.filter');

            // var options = $.extend({}, Filter.DEFAULTS, $this.data(), typeof option == 'object' && option)

            var options = $.extend(
                {}, Filter.DEFAULTS,
                getOptions($this.data()),
                typeof option === 'object' && option && getOptions(option))

            if(!data) $this.data('bs.filter', (data = new Filter(this, options)))

            if(data && option && typeof option === 'string' && option.match(/\btostring\b/gi)) {
                data.toString();
            }

            if (typeof option === 'string') {
                data[option]()
            } else {
                data.init();
            }
        })
    }

    var old = $.fn.filter

    $.fn.filter             = Plugin;
    $.fn.filter.Constructor = Filter;


    // FILTER NO CONFLICT
    // ====================

    $.fn.filter.noConflict = function() {
        $.fn.filter = old;
        return this
    }

    // Filter DATA-API
    // =================

    $(window).on('load', function () {
        $('[data-role="filter"]').each(function () {
            var $filter = $(this)
            if($filter.data('bs.filter')) return false;

            Plugin.call($filter, $filter.data())
        })
    })

}(window.Zepto||jQuery);
