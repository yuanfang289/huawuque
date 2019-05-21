+function($) {
    'use strict';

    function bodyScroll(e){
        e.preventDefault();
    }

    var CityPicker = function(element, options) {
        if (typeof IScroll !== 'function') throw new Error('本插件依赖IScroll');

        this.$body        = $('body');
        this.$element     = $(element);
        this.options      = options;
        this.title        = this.options.lang === 'zh-cn' ? this.options.title : this.options.titleEn;
        this.ajaxUrl      = this.options.ajaxUrl;
        this.tagIsInput   = this.$element[0].tagName === 'INPUT';
        this.isShown      = false;
        this.pid          = CityPicker.pid++;
        this.pickerNode   = null;
        this.iscroll      = null;
        this.cityItem     = null;
        this.cityItemWrap = null;
        this.cityIndex    = null;
        this.storageName  = this.options.storageName || null;

        this.state = {
            cityCode: null,
            cityName: null
        };

        this.data = {
            cityCode: options.cityCode || null,
            cityName: options.cityName || null
        };

        if (this.tagIsInput) {
            this.$element.attr('readonly', 'readonly');
            this.$element.on('focus', function(e) {
                e.preventDefault();
                $(this).trigger('blur');
            });
        }
        this.initSetState();
        this.onShow();
    };

    CityPicker.pid = 0;

    CityPicker.VERSION = '1.0.0';

    CityPicker.DEFAULTS = {
        scroller:'.modal-body',
        noStatusBar: false,
        lang       : 'zh-cn',
        title      : '选择城市',
        titleEn    : '',
        ajaxUrl    : '/market/workStageCity',
        useStorage : true,
        format     : function(obj) {return obj.text}
    };

    CityPicker.prototype.show = function(relatedTarget) {
        // beforeShow Event
        var beforeShowEvent = $.Event('citypicker:beforeshow', {
            relatedTarget: relatedTarget
        });
        this.$element.trigger(beforeShowEvent);
        if (this.isShown || beforeShowEvent.isDefaultPrevented()) return;
        this.isShown = true;

        this.ajaxLoading(relatedTarget);
        // this.unbindEvent();
    };

    CityPicker.prototype.hide = function(relatedTarget) {
        var that = this;
        this.pickerNode.removeClass('in');

        this.pickerNode.off('touchmove', bodyScroll);
        // 恢复安卓下拉刷新
        if (window.DANativeApi) {
            DANativeApi.setIsRefresh({
                isRefresh: true
            })
        }

        clearTimeout(this.pickerNode[0].timer);
        this.pickerNode[0].timer = setTimeout(function() {
            that.pickerNode.remove();
            that.$body.css('overflow', 'auto');
            if (that.options.noStatusBar) {
                that.$body.removeClass('no-statusbar');
            }
            that.isShown = false;

            var hiddenEvent = $.Event('citypicker:hidden', {
                relatedTarget: relatedTarget
            });
            that.$element.trigger(hiddenEvent);
        }, 300);
    };

    CityPicker.prototype.ajaxLoading = function (relatedTarget) {
        var that = this;
        $.ajax({
            url: that.ajaxUrl,
            type: 'GET',
            dataType: 'json',
            error: function(xhr) {
                UR.msg('数据获取失败请刷新重试', {
                    delay: 2000
                })
            },
            success: function(res) {
                if (res.retCode != 0) {
                    UR.msg(res.retMsg);
                    return;
                }
                that.render(relatedTarget,res.data);
            }
        })
    };

    CityPicker.prototype.render = function(relatedTarget,data) {
        var that = this;
        
        var renderHtml =
            '<div class="modal no-bar-modal" id="cityModel">'+
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="close" data-role="close"><i class="uricon-close" style="font-size: 18px;"></i></button>'+
                            '<h2>' + this.title + '</h2>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<div class="scroller">'+
                                '<div class="hot-city">'+
                                    '<h3>热门城市</h3>'+
                                    '<ul class="citySelect-wrap">'+
                                        '<li data-cityCode="110000" data-cityName="北京">'+
                                            '<a href="javascript:;">北京</a>'+
                                        '</li>'+
                                        '<li data-cityCode="310000" data-cityName="上海">'+
                                            '<a href="javascript:;">上海</a>'+
                                        '</li>'+
                                        '<li data-cityCode="440300" data-cityName="深圳">'+
                                            '<a href="javascript:;">深圳</a>'+
                                        '</li>'+
                                        '<li data-cityCode="510100" data-cityName="成都">'+
                                            '<a href="javascript:;">成都</a>'+
                                        '</li>'+
                                        '<li data-cityCode="610100" data-cityName="西安">'+
                                            '<a href="javascript:;">西安</a>'+
                                        '</li>'+
                                        '<li data-cityCode="990100" data-cityName="新加坡">'+
                                            '<a href="javascript:;">新加坡</a>'+
                                        '</li>'+
                                    '</ul>'+
                                '</div>'+
                                '<div class="all-city" id="allCity"> ' + this.renderAllCity(data) + '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="city-index-bar" id="cityIndex">' + this.renderCityIndex(data) + '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';

        this.pickerNode = $(renderHtml);
        this.$body.append(this.pickerNode).css('overflow', 'hidden');

        if (!UR.isApp()) {
            $('#cityModel').removeClass('no-bar-modal');
        }
        this.pickerNode.on('touchmove', bodyScroll);
        // 阻止安卓下拉刷新
        if (window.DANativeApi) {
            DANativeApi.setIsRefresh({
                isRefresh: false
            })
        }

        this.getDom();
        this.renderActive();
        this.bindEvent();

        var pickerNode = this.pickerNode[0];
        clearTimeout(pickerNode.showTimer);
        pickerNode.showTimer = setTimeout(function() {
            that.pickerNode.addClass('in');

            clearTimeout(pickerNode.shownTimer);
            pickerNode.shownTimer = setTimeout(function() {
                // shown Event
                var shownEvent = $.Event('citypicker:shown', {
                    relatedTarget: relatedTarget
                });
                that.$element.trigger(shownEvent);
            }, 300);
        }, 0);
    };

    CityPicker.prototype.renderAllCity = function (data) {
        console.log(data)
        var html = ''
        for(var i in data){
            html +=
                '<ul class="citySelect-wrap">'+
                    '<li><p data-code="'+ i + '">' + i + '</p></li>'+
                    this.renderCityList(data[i])+
                '</ul>';
        }
       return html;
    };

    CityPicker.prototype.renderCityList = function (data) {
        var html = ''
        for(var i in data){
            html +=
                '<li data-cityCode="' + data[i].geoCode + '" data-cityName="' + data[i].geoName + '" data-geoNameEn="' + data[i].geoNameEn + '">'+
                    '<a href="javascript:;">' + data[i].geoName + '</a>'+
                '</li>';
        }
        return html;
    };

    CityPicker.prototype.renderCityIndex = function (data) {
        var html = '<span>#</span><span>热</span>';
        for(var i in data){
            html += '<span>' + i + '</span>';
        }
        return html;
    };

    CityPicker.prototype.renderActive = function () {
        var $uls = this.cityItemWrap;
        for(var j = 0; j < $uls.length; j ++){
            var $lis = $uls.eq(j).find('li');
            $lis.removeClass('active');
            for(var i = 0; i < $lis.length; i ++){
                if($lis.eq(i).attr('data-citycode') == this.state.cityCode){
                    $lis.eq(i).addClass('active');
                    break;
                }
            }
        }
    };

    CityPicker.prototype.getDom = function () {
        var $pickerNode = this.pickerNode;
        this.cityItem = $pickerNode.find('.citySelect-wrap a');
        this.cityItemWrap = $pickerNode.find('.citySelect-wrap');
        this.cityIndex = $pickerNode.find('#cityIndex span');
    };

    CityPicker.prototype.initSetState = function() {
        var data = this.data,
            state =  this.state;
        if(data.cityCode && data.cityName){
            state.cityCode = data.cityCode;
            state.cityName = data.cityName;
            this.setTagDate();
        }
    };

    CityPicker.prototype.setState = function ($item) {
        var state = this.state;
        if($item.length){
            state.cityCode = $item.attr('data-cityCode');
            state.cityName = $item.attr('data-cityName');
        }
    };

    CityPicker.prototype.setTagDate = function (placeholder) {
        var state = this.state;
        if(state.cityCode && state.cityName){
            this.$element
                .attr('data-citycode',state.cityCode)
                .attr('data-cityname',state.cityName);
            this.tagIsInput ? this.$element.val(state.cityName) : this.$element.text(state.cityName);
        }else {
            this.tagIsInput ? this.$element.val(placeholder) : this.$element.text(placeholder);
        }
    };

    CityPicker.prototype.bindEvent = function() {
        this.onSelectCity();
        this.onCityIndex();
        this.onHide();
        this.onIscroll();
    };

    CityPicker.prototype.onSelectCity = function() {
        var that = this;
        this.cityItem.on('click',function () {
            selectFn($(this));
        });
        function selectFn(elem) {
            var $parent = elem.parent();
            var $lis = that.pickerNode.find('.citySelect-wrap li');
            $lis.removeClass('active');
            $parent.addClass('active');

            that.setState($parent);
            that.setTagDate();
            if(that.options.useStorage){
                UR.storage(that.storageName,that.state);       //本地存储
            }

            var selectedEvent = $.Event('citypicker:selected', {
                relatedTarget: elem,
                cityInfo: that.state
            });
            that.$element.trigger(selectedEvent);

            if (selectedEvent.isDefaultPrevented()) return;

            that.hide();
        }
    };

    CityPicker.prototype.onCityIndex = function () {
        var that = this;
        this.cityIndex.on(UR.click,function () {
            cityIndexFn($(this));
        });
        function cityIndexFn(index) {
            var text = index.text();
            var $hot = $('.hot-city').find('h3')[0];
            var $selector = $('[data-code="'+ text +'"]')[0];
            if(text == '热' || text == '#'){
                that.iscroll.scrollToElement($hot);
            }else {
                that.iscroll.scrollToElement($selector);
            }
        }
    };

    CityPicker.prototype.onIscroll = function () {
        if(this.pickerNode.find(this.options.scroller).length){
            this.iscroll = new IScroll(this.options.scroller, {
                disablePointer: true,
                disableTouch: false,
                click: true,
                probeType: 3,
            });
        }
    };

    CityPicker.prototype.onShow = function() {
        var that = this;
        this.$element.on('click', function(e) {
            e.preventDefault();
            that.show($(this));
        })
    };

    CityPicker.prototype.onHide = function() {
        var that = this;
        this.pickerNode.on('click', '[data-role=close]', function(e) {
            e.preventDefault();
            that.hide($(this));
        })
    };

    CityPicker.prototype.reset = function (placeholder) {
        var state = this.state;
        state.cityCode = null;
        state.cityName = null;

        this.setTagDate(placeholder);
    };

    // PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('xy.citypicker');
            var options = $.extend(true, {}, CityPicker.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('xy.citypicker', (data = new CityPicker(this, options)));
            if (typeof option === 'string') data[option]();
        })
    }

    var old = $.fn.citypicker;

    $.fn.citypicker             = Plugin;
    $.fn.citypicker.Constructor = CityPicker;


    // NO CONFLICT
    // ===============

    $.fn.citypicker.noConflict = function () {
        $.fn.citypicker = old;
        return this
    };

}(jQuery);
