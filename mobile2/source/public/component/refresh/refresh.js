/* ========================================
 * pull.js v1.0.1
 * ========================================
 * 上拉自动刷新数据 H5
 * ======================================== */


+function($){
    'use strict';

    // REFRESH CLASS DEFINITION
    // ========================

    var Refresh = function (element, options) {
        this.$element     = $(element)  // list container 追加代码片段的容器对象
        this.isLoading    = false       // 是否正在加载中
        this.pullUpEl     = null        // 上拉DOM
        this.pullUpLabel  = null        // 上拉状态文本DOM

        this.options      = options
    }

    Refresh.VERSION = '1.0.1';

    Refresh.DEFAULTS = {
        url        : '',            // 数据URL
        data       : {},            // 请求参数
        pageSize   : 10,            // 每页n条数据
        pageNum    : 2,             // 加载第几页,默认从第二页开始
        template   : '',            // 列表ITEM模板id
        isFirstLoad: false,         // 首次是否为Ajax渲染
        scrollTop  : true,          // 初次加载数据后回到页面顶部
        formatted  : null           // 转换后台返回数据格式为所需list格式
    }


    Refresh.prototype.ajax = function(reload) {

        var resetPullUpStatus = function(pullUpEl, pullUpLabel) {
            if (pullUpEl.classList.contains('stop')) {
                pullUpLabel.innerText = "没有更多了";
            } else if (pullUpEl.classList.contains('pull-loading')){
                pullUpLabel.innerText = "加载中...";
            } else {
                pullUpLabel.innerText = "上拉加载更多";
            }
        }

        if (this.isLoading || this.pullUpEl.classList.contains('stop')) return false;
        this.pullUpEl.classList.add('pull-loading');
        this.pullUpEl.classList.remove('hide');
        resetPullUpStatus(this.pullUpEl, this.pullUpLabel);


        var getDataFromServer = function(res) {
            // $('body').append('<div style="position: fixed; z-index: 9999; top: 60px; left: 0;; width: 100%; background: green; padding: 10px;">' + JSON.stringify(this.options.data) + '</div>')
            this.options.data.currentPageNo ++ ;
            var redis = this.options.formatted ? this.options.formatted(res) : res;

            var relatedTarget = null
            var refreshEvent  = $.Event('pullup.bs.refresh', {
                relatedTarget: relatedTarget,
                ajax         : res,
                formatted    : redis
            })
            this.$element.trigger(refreshEvent);
            if(refreshEvent.isDefaultPrevented()) return

            if (redis.length === 0 || redis.length < this.options.pageSize) {
                this.pullUpEl.classList.add('stop');
            }
            var renderEvent = $.Event('renderdom.bs.refresh')

            if (reload) { //如果是重加载则清空列表的所有子元素
                this.$element.empty();
                if (this.options.scrollTop) {
                    $("html,body").animate({scrollTop:"0px"}, 200);
                }

                var templateHtml = template(this.options.template, {
                    list: redis
                });
                if (!redis.length) {
                    this.pullUpEl.classList.add('hide');
                }
                // if (redis.length < this.options.pageSize) {
                //     this.pullUpEl.classList.add('hide');
                // }
                this.$element.append(templateHtml); //追加元素
                setTimeout(function(){
                    this.$element.trigger(renderEvent);         
                }.bind(this), 0)
            } else {
                if(redis && redis.length > 0) {
                    var templateHtml = template(this.options.template, {
                        list: redis
                    });
                    this.$element.append(templateHtml); //追加元素
                    setTimeout(function(){
                        this.$element.trigger(renderEvent);         
                    }.bind(this), 0)
                }
            }
            this.pullUpEl.classList.remove('pull-loading');

            if(this.timeout) clearTimeout(this.timeout);

            this.timeout = setTimeout(function() {
                resetPullUpStatus(this.pullUpEl, this.pullUpLabel);
                this.isLoading = false;
            }.bind(this), 50)
        }

        $.get(this.options.url, this.options.data, $.proxy(getDataFromServer, this));
    }

    Refresh.prototype.pullDownAction = function() {
        this.ajax(true);
    }

    Refresh.prototype.pullUpAction = function() {
        this.ajax();
    }

    Refresh.prototype.setParams = function(params) { //重置参数
        this.options.data = $.extend(true, {}, this.options.data, params);

        if(this.options.data.pageNum) {
            this.options.data.currentPageNo = this.options.data.pageNum;
            delete this.options.data.pageNum;
        }

        for (var key in this.options.data) {
            if(this.options.data.hasOwnProperty(key) && this.options.data[key] == ''){
                delete this.options.data[key];
            }
        }

        this.options.data.currentPageNo = 1;
        this.pullUpEl.classList.contains('stop') && (this.pullUpEl.classList.remove('stop'));

        this.isLoading = false;
        this.pullDownAction();
    }

    Refresh.prototype.toString = function() { // 输出版本号
        console.log('refresh-%s.js', Refresh.VERSION);
        return this
    }

    Refresh.prototype.loaded = function() { // 加载数据初始化
        var self = this;

        this.pullUpEl = document.getElementById('pullUp');
        if (!this.pullUpEl) {
            var pullUpHtml = '';
            pullUpHtml += '<div id="pullUp" class="text-center hide">';
            pullUpHtml += '  <span class="pullUpIcon"></span>';
            pullUpHtml += '  <span class="pullUpLabel">上拉加载更多</span>';
            pullUpHtml += '</div>';

            this.$element.after(pullUpHtml);
            this.pullUpEl = $("#pullUp")[0];
        }

        this.pullUpLabel = this.pullUpEl.querySelector('.pullUpLabel');

        !this.options.data.pageSize && (this.options.data.pageSize = this.options.pageSize);

        if(this.options.isFirstLoad) {
            this.options.data.currentPageNo = 1;
            this.pullDownAction();
            this.isLoading = true;
        }


        $(window)
            .on('scroll.bs.refresh', function(evt) {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var container = document.documentElement || document.body;
                var scrollHeight = container.scrollHeight;
                var clientHeight = container.clientHeight;

                if (scrollTop / (scrollHeight - clientHeight) > 0.9) {
                    self.pullUpAction();
                    self.isLoading = true;
                }
            });
    }

    // REFRESH PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        var getOptions = function(metas) {
            if(metas.options  && typeof metas.options === 'string' ) {
                metas = metas.options;
                metas = '{' + metas + '}';
                metas = eval('(' + unescape(metas) + ')');
            }
            return metas
        }

        return this.each(function() {
            var $this   = $(this)
            var data    = $this.data('bs.refresh')

            // var options = $.extend({}, Refresh.DEFAULTS, $this.data(), typeof option == 'object' && option)

            var options = $.extend(
                true, {},
                Refresh.DEFAULTS, getOptions($this.data()),
                typeof option == 'object' && option && (option = getOptions(option)))

            if(data && option && typeof option == 'object') {
                data.setParams(option);
                return false;
            }

            if(!data) $this.data('bs.refresh', (data = new Refresh(this, options)))

            if(data && option && typeof option == 'string' && option.match(/\btoString\b/gi)) {
                data.toString();
            }

            setTimeout($.proxy(data.loaded, data), 200);
        })
    }

    var old = $.fn.refresh

    $.fn.refresh             = Plugin;
    $.fn.refresh.Constructor = Refresh;


    // REFRESH NO CONFLICT
    // ====================

    $.fn.refresh.noConflict = function() {
        $.fn.refresh = old
        return this
    }


    // REFRESH DATA-API
    // =================
    $(window).on('load', function() {
        $('[data-scroll="pullUp"]').each(function() {
            var $refresh = $(this)

            if($refresh.data('bs.refresh')) return false;

            Plugin.call($refresh, $refresh.data())
        })
    })

}(window.Zepto || jQuery);
