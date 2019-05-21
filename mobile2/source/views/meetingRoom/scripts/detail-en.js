'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by zhangguoying on 2016/12/21.
 */
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] };
            }
        }

        return false; // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false;
        var $el = this;
        $(this).one('bsTransitionEnd', function () {
            called = true;
        });
        var callback = function callback() {
            if (!called) $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    };

    $(function () {
        $.support.transition = transitionEnd();

        if (!$.support.transition) return;

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function handle(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        };
    });
}(jQuery);

/* ========================================================================
* Bootstrap: modal.js v3.3.7
* http://getbootstrap.com/javascript/#modals
* ========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
* ======================================================================== */

+function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================

    var Modal = function Modal(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.modal-dialog');
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;

        if (this.options.remote) {
            this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
                this.$element.trigger('loaded.bs.modal');
            }, this));
        }
    };

    Modal.VERSION = '3.3.7';

    Modal.TRANSITION_DURATION = 300;
    Modal.BACKDROP_TRANSITION_DURATION = 150;

    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };

    Modal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    };

    Modal.prototype.show = function (_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

        $(document).on('mousemove touchmove', function (evt) {
            evt.preventDefault();
            UR.androidRefresh(false); // 阻止客户端下拉刷新关闭
        });

        if (IScroll) {
            if (!this.options.iscroll) {
                this.options.iscroll = '.modal-body';
            }
            new IScroll(this.options.iscroll, {
                click: true,
                disablePointer: true,
                disableTouch: false
            });
        }

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('modal-open');

        this.escape();
        this.resize();

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.bs.modal', function () {
            that.$element.one('mouseup.dismiss.bs.modal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            });
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body); // don't move modals dom position
            }

            that.$element.show().scrollTop(0);

            that.adjustDialog();

            if (transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');

            that.enforceFocus();

            var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

            transition ? that.$dialog // wait for modal to slide in
            .one('bsTransitionEnd', function () {
                that.$element.trigger('focus').trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
        });
    };

    Modal.prototype.hide = function (e) {
        if (e) e.preventDefault();

        $(document).off('mousemove touchmove');
        UR.androidRefresh(true); // 阻止客户端下拉开启

        e = $.Event('hide.bs.modal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented()) return;

        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.bs.modal');

        this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

        this.$dialog.off('mousedown.dismiss.bs.modal');

        $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
    };

    Modal.prototype.enforceFocus = function () {
        $(document).off('focusin.bs.modal') // guard against infinite focus loop
        .on('focusin.bs.modal', $.proxy(function (e) {
            if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger('focus');
            }
        }, this));
    };

    Modal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal');
        }
    };

    Modal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.bs.modal');
        }
    };

    Modal.prototype.hideModal = function () {
        var that = this;
        // this.$element.hide()
        this.backdrop(function () {
            that.$body.removeClass('modal-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger('hidden.bs.modal');
        });
    };

    Modal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    Modal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

            this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
            }, this));

            if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

            this.$backdrop.addClass('in');

            if (!callback) return;

            doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function callbackRemove() {
                that.removeBackdrop();
                callback && callback();
            };
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else if (callback) {
            callback();
        }
    };

    // these following methods are used to handle overflowing modals

    Modal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    Modal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
    };

    Modal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        });
    };

    Modal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    Modal.prototype.setScrollbar = function () {
        var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    };

    Modal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    };

    Modal.prototype.measureScrollbar = function () {
        // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

            if (!data) $this.data('bs.modal', data = new Modal(this, options));
            if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
        });
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;

    // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    };

    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });
        Plugin.call($target, option, this);
    });
}(jQuery);

var Page = {
    init: function init() {
        this.$render = $('[data-render="template"]');

        this.browser = {
            id: UR.getBrowserParamByName('id')
        };

        this.ajaxCancelData = {
            orderId: this.browser.id
        };

        this.ajaxPayData = {
            orderNo: this.browser.id,
            paychannel: ''
        };

        this.ajaxSaveUsers = {
            orderid: this.browser.id,
            meetingUserName: '',
            meetingUserMobile: ''
        };

        this.render(function (res) {
            res = res.data || {};

            this.totalNum = res.peopleNum;
            this.modal(res);
        }.bind(this));
    },
    modal: function modal(res) {
        var _this = this;

        // 弹窗参数变化

        var that = this;

        $(document).off('shown.bs.modal', '.modal').on('shown.bs.modal', '.modal', function (e) {
            that.meetingInfos(res);
        }).off('hidden.bs.modal', '.modal').on('hidden.bs.modal', function (evt) {
            UR.localStorage({
                name: 'ur.mobile.meetinginfo.edit',
                type: 'set',
                values: _this.sourceInfo
            });
        });
    },
    checkAndFormat: function checkAndFormat() {
        var canSave = true,
            canSaveMsg = void 0;

        this.formattedUsers = {
            mobile: [],
            name: []
        };

        var names = [],
            tels = [];
        for (var key in this.info) {
            if (!this.info.hasOwnProperty(key)) continue;
            var node = this.info[key];

            var titleEl = $('.layout-item[data-id="' + node.id + '"]').find('h2').text();
            if (!node.name) {
                canSave = false;
                canSaveMsg = '\u8BF7\u586B\u5199' + titleEl + '\u59D3\u540D';
                UR.msg(canSaveMsg);
                return false;
            }
            if (!node.tel) {
                canSave = false;
                canSaveMsg = '\u8BF7\u586B\u5199' + titleEl + '\u624B\u673A\u53F7';
                UR.msg(canSaveMsg);
                return false;
            }
            if (node.tel && !/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/.test(node.tel)) {
                canSave = false;
                canSaveMsg = '\u8BF7\u586B\u5199\u6B63\u786E\u7684' + titleEl + '\u7684\u624B\u673A\u53F7';
                UR.msg(canSaveMsg);
                return false;
            }

            names.push(node.name);
            tels.push(node.tel);
        }

        this.formattedUsers.mobile = tels;
        this.formattedUsers.name = names;

        this.ajaxSaveUsers.meetingUserMobile = tels.join(',');
        this.ajaxSaveUsers.meetingUserName = names.join(',');

        if (!canSave) {
            return canSave;
        }
    },
    meetingInfos: function meetingInfos(res) {
        var _this2 = this;

        this.$meetingInfo = $('#meetingContainer');
        this.meetingScroll = null;

        var updateIndex = function updateIndex(info) {
            var index = 0;
            for (var key in info) {
                if (!info.hasOwnProperty(key)) continue;
                index += 1;
                info[key].index = index;
            }
            return info;
        };
        var renderInfo = function renderInfo(info, index) {
            _this2.$meetingInfo.html(template('meetingTpl', {
                info: info,
                visible: index < _this2.totalNum
            }));
            UR.localStorage({
                name: 'ur.mobile.meetinginfo.edit',
                type: 'set',
                values: info
            });
            if (!_this2.meetingScroll && IScroll) {
                _this2.meetingScroll = new IScroll(_this2.$meetingInfo.parent()[0], {
                    disablePointer: true,
                    disableTouch: false
                });
            }
            if (_this2.meetingScroll) {
                _this2.meetingScroll.refresh();
            }
        };
        var newInfo = function newInfo(info, index, tel, name) {
            if (!info) info = {};

            var id = 'info' + (Date.now() || new Date().getTime());
            info[id] = {
                id: id,
                index: index,
                tel: tel || '',
                name: name || ''
            };

            renderInfo(info, index);
            return info;
        };

        var index = 0;

        if ($.isEmptyObject(this.info)) {
            if (res.name) {
                res.name.map(function (value, k) {
                    index += 1;
                    this.info = newInfo(this.info, index, res.mobile[k], value);
                }.bind(this));
            } else {
                this.info = UR.localStorage({ name: 'ur.mobile.meetinginfo.edit', dataType: 'json' });
            }
        }

        if ($.isEmptyObject(this.info)) {
            index += 1;
            this.info = newInfo(this.info, index);
        } else {
            for (var key in this.info) {
                index = Math.max(index, this.info[key].index);
            }

            renderInfo(this.info, index);
        }

        this.sourceInfo = $.extend(true, {}, this.info);

        this.$meetingInfo.off(UR.click, '.btn-container .new').on(UR.click, '.btn-container .new', function (evt) {
            evt.preventDefault();
            index += 1;
            _this2.info = newInfo(_this2.info, index);
        }).off(UR.click, '.delete').on(UR.click, '.delete', function (evt) {
            evt.preventDefault();
            index -= 1;
            delete _this2.info[$(evt.target).closest('.layout-item').attr('data-id')];

            _this2.info = updateIndex(_this2.info);
            renderInfo(_this2.info, index);
        }).off('input', '[data-name]').on('input', '[data-name]', function (evt) {
            evt.preventDefault();

            var $this = $(evt.target);
            var id = $this.closest('.layout-item').attr('data-id');

            var value = $.trim($this.val()),
                key = $this.attr('data-name');

            UR.inputClear({
                parent: $this.closest('.info-cont'),
                value: value,
                clearFn: function clearFn() {
                    _this2.info[id][key] = "";
                }
            });

            _this2.info[id][key] = value;
        }).off('focus', '[data-name]').on('focus', '[data-name]', function (evt) {
            evt.preventDefault();

            var $this = $(evt.target);
            var id = $this.closest('.layout-item').attr('data-id'),
                key = $this.attr('data-name');

            UR.inputClear({
                parent: $this.closest('.info-cont'),
                clearFn: function clearFn() {
                    _this2.info[id][key] = "";
                }
            });
        });
    },
    getStatusText: function getStatusText(orderStatus) {
        return {
            s0: 'Wait for payment',
            s1: 'To be used',
            s2: 'In use',
            s3: 'Completed',
            s4: 'Canceled',
            s5: 'Canceled',
            s6: 'Canceled',
            s7: 'Canceled',
            s8: 'Canceled',
            s9: 'Canceled',
            s10: 'Canceled',
            s11: 'Canceled',
            s12: 'Canceled',
            s13: 'Canceled'
        }['s' + orderStatus];
    },
    getPayType: function getPayType(payType) {
        return {
            "2": 'Company pay',
            "1": 'Person pay'
        }[payType];
    },
    getTime: function getTime(date, format) {
        if (date) {
            date = $.dateFormat(date, format);
        }

        if (format == 'h:mm' && /^0[1-9]/g.test(date)) {
            date = date.substr(1);
        }
        return date;
    },
    formatted: function formatted(data) {
        // 服务器数据转化
        var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        data = data.data || {};

        this.ajaxPayData.paychannel = data.payWay;

        data._orderStatus = this.getStatusText(data.orderStatus);

        data._day = data.startTime && data.startTime.substr(0, 10);
        data._day = $.dateFormat(data._day, 'yyyy/MM/dd');

        data._week = data._day && week[$.dateFormat(data._day, 'date').getDay()];

        data._startTime = this.getTime(data.startTime, 'h:mm');
        data._endTime = this.getTime(data.endTime, 'h:mm');

        data._openStarttime = this.getTime(data.openStarttime, 'h:mm');
        data._openEndtime = this.getTime(data.openEndtime, 'h:mm');

        data._createTime = $.dateFormat(data.createTime, 'yyyy/MM/dd hh:mm:ss');

        data.mobile = data.mobile ? data.mobile.split(',') : [];
        data.name = data.name ? data.name.split(',') : [];

        this.formattedRestful = data;
        data._payType = this.getPayType(data.payType);

        return data;
    },
    render: function render(fn) {
        // 渲染页面
        var that = this;

        UR.template({
            data: {
                orderId: this.browser.id
            },
            renderRedis: function renderRedis(res) {
                return that.formatted(res);
            },
            callback: function callback(res) {
                fn && fn(res);
            }
        });
    },

    submit: function submit(options) {
        var that = this;

        $(document).off(UR.click, options.submit).on(UR.click, options.submit, function (evt) {

            evt.preventDefault();

            if (this.id) {
                options.data = this.id == 'cancel' ? that.ajaxCancelData : that.ajaxPayData;
            } else {
                options.data = that.ajaxSaveUsers;

                var $modal = $(this).closest('.modal');

                that.sourceInfo = $.extend(true, {}, that.info);
                UR.localStorage({
                    name: 'ur.mobile.meetinginfo.edit',
                    type: 'set',
                    values: that.info
                });

                var canSave = that.checkAndFormat();
                if (canSave === false) {
                    return false;
                }

                $modal.modal('hide');

                var success = options.success;
                options.success = function () {
                    success && success();

                    that.formattedRestful.mobile = that.formattedUsers.mobile;
                    that.formattedRestful.name = that.formattedUsers.name;
                    that.$render.html(template('pageTpl', that.formattedRestful));
                };

                // options.success();
            }

            $.ajaxGet(options);
        });
    }
};

$(function () {
    Page.init();
});