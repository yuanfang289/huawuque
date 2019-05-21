(function($) {
    var init = function() {

        var VERSION = '1.0';

        var def = {
            activeIndex:    0,         // 当前活动状态，索引从 0 开始
            activeClass:    'active',  // 当前活动状态 class
            onBefore:       null,      // 切换 tab 前触发
            onAfter:        null       // 切换 tab 后触发
        };

        var args = arguments;
        var sets = $.extend({}, def, args[0]);
        var activeClass = $.trim(sets.activeClass);

        return this.each(function() {
            var $this       = $(this),
                $tabs       = $this.find('[data-tab-role=tabs]'),
                $tabItem    = $tabs.find('[data-tab-role=tab]'),
                $active     = $tabs.find('.' + activeClass),
                $tabbed     = $this.find('[data-tab-role=tabbed]'),
                $group      = $tabbed.find('[data-tab-role=group]');

            var activeIndex = $active.length ? $active.index() : sets.activeIndex;

            // init
            $tabItem.removeClass(activeClass).eq(activeIndex).addClass(activeClass);
            $group.hide().removeClass(activeClass).eq(activeIndex).addClass(activeClass).show();
            $this[0].preIndex = activeIndex;

            function handler(event) {
                event.preventDefault();
                var _this        = $(this),
                    index        = _this.index(),
                    isActive     = _this.hasClass(activeClass) ? true : false;

                // 如果当前已被选中，则返回
                if (isActive) return;

                var _tab         = _this.closest('[data-role=tab]'),
                    _tabs        = _tab.find('[data-tab-role=tabs]'),
                    _tabItem     = _tabs.find('[data-tab-role=tab]'),
                    _tabbed      = _tab.find('[data-tab-role=tabbed]'),
                    _group       = _tabbed.find('[data-tab-role=group]'),
                    _activeGroup = _group.eq(index);

                var preIndex     = _tab[0].preIndex;
                var returnValue  = {
                    "activeIndex"  : index,         // 当前活动 tab 索引
                    "preIndex"     : preIndex,      // 前一个活动 tab 索引
                    "activeTab"    : _this,         // 当前活动 tab 元素
                    "activeGroup"  : _activeGroup,  // 当前活动 group 元素
                    "elemTab"      : _tab           // tab 元素
                };

                if (sets.onBefore) sets.onBefore(returnValue);

                _tabItem.removeClass(activeClass);
                _this.addClass(activeClass);
                _group.hide().removeClass(activeClass).eq(index).addClass(activeClass).show(0,function() {
                    if (sets.onAfter) sets.onAfter(returnValue);
                    _tab[0].preIndex  = index;
                });
            }
            if (/Mobile/i.test(navigator.userAgent)) {
                $this.off('tap', $tabItem.selector).on('tap', $tabItem.selector, handler);
            } else {
                $this.off('click', $tabItem.selector).on('click', $tabItem.selector, handler);
            }
        });
    };

    $.fn.tab = function(options) {
        return init.apply(this, arguments);
    };
})(jQuery);
