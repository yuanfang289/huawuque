/**
 * Created by zhanggy on 16/09/21.
 * index.js
 */

//= include ../../public/component/utils/transition.js
//= include ../../public/component/modal/modal.js
//= include ../../public/component/input/input.js

var BaseForm = {
    select: function() {
        function fn(elem, type) {
            var $elem = $(elem);

            var $modal   = $elem.closest('.modal'),
                $text    = $(`[data-target="#${$modal[0].id}"]`),
                $name    = $(`[name="${$text[0].id.replace(/_dummy/, '')}"]`),
                $lis     = $modal.find('li');

            var target2  = $text.attr('data-id'),
                targetParent = $text.attr('data-parent'),
                targetName   = $text.attr('data-servername'),
                targetParentName = $text.attr('data-serverparentname');


            if (!$text.attr('data-text')) {
                $text.attr('data-text', $text.text());
            }

            var _global_ = $modal.attr('data-select') == 'global',
                $all     = $modal.find('li[data-select="all"]'),
                isAll    = $all.hasClass('active');

            if (type == 'reset') {
                $lis.removeClass('active');
                return false;
            }

            if (type == 'select') {
                var $li    = $elem,
                    mulity = $elem.closest('ul').attr('data-mulity') == 'true';

                if ($li.attr('data-select') == 'all') { // 全部
                    if ($li.hasClass('active')) {
                        $lis.removeClass('active');
                    } else {
                        $lis.addClass('active');
                    }
                } else { // 单个
                    if (mulity) { // 多选
                        if ($li.hasClass('active')) {
                            $li.removeClass('active');
                        } else {
                            $li.addClass('active');
                        }
                    } else { // 单选
                        $lis.removeClass('active');
                        $li.addClass('active');
                    }

                    if (_global_) {
                        var $actives  = $modal.find('li.active'),
                            length    = $lis.length,
                            activeLen = $actives.length;

                        if ($all.hasClass('active')) {
                            isAll = length == activeLen;
                        } else {
                            isAll = length - 1 == activeLen;
                        }
                        if (isAll) {
                            $all.addClass('active');
                        } else {
                            $all.removeClass('active');
                        }
                    }
                }
            }

            if (type == 'confirm') {
                $elem = $modal.find('li.active');
                var ID, text, parentID = [], parentText = [];

                $elem.each(function() {
                    var $ul    = $(this).closest('ul'),
                        mulity = $ul.attr('data-mulity') == 'true',
                        pID    = $(this).attr('data-parent');

                    if (!ID) {
                        ID   = [];
                        text = [];
                    }
                    var $li = $(this);
                    ID.push($li.attr('data-id'));
                    text.push($li.text());
                    pID && parentID.push(pID);
                    targetParentName && parentText.push($li.closest('dl').find('dt').text())
                });

                ID = ID ? ID.join(',') : '';
                text = text ? text.join(',') : '';
                text = isAll ? '全部社区' : text;

                $name.val(ID);
                $name.trigger('storage', ID);
                $text.trigger('storage', text);
                if (text) {
                    $text.text(text).addClass('writed');
                } else {
                    $text.text($text.attr('data-text')).removeClass('writed');
                }

                if (target2) {
                    var $target2 = $('[name="' + target2 + '"]');
                    if ($target2.length) {
                        var _value = isAll ? '1' : '0';
                        $target2.val(_value).trigger('storage', _value);
                    }
                }

                if (targetParent) {
                    var $targetParent = $('[name=' + targetParent + ']');
                    if ($targetParent.length) {
                        $targetParent.val(parentID);
                    }
                }

                if (targetName) {
                    var $targetName = $('[name=' + targetName + ']');
                    if ($targetName.length) {
                        $targetName.val(text);
                    }
                }

                if (targetParentName) {
                    var $targetParentName = $('[name=' + targetParentName + ']');
                    if ($targetParentName.length) {
                        $targetParentName.val(parentText.join(','));
                    }
                }


                setTimeout(function () {
                    $modal.modal('hide');
                }, 200)
            }
        }

        $(document).off(UR.click, '.modal [data-id]').on(UR.click, '.modal [data-id]', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            fn(this, 'select');
        }).off(UR.click, '.modal .reset').on(UR.click, '.modal .reset', function(evt) {
            evt.preventDefault();

            fn(this, 'reset');
        }).off(UR.click, '.modal .confirm').on(UR.click, '.modal .confirm', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            fn(this, 'confirm');
        });

    },
    inputContent: function(element, options) {
        var $el       = $(element),
            $target   = $($el.data('target')),
            $close    = $target.find('[role=close]'),
            $save     = $target.find('[role=save]'),
            $result   = $target.find('[role=result]'),
            $resInner = $result.children('[role=result-inner]'),
            $resItem  = $target.find('[role=result-item]'),
            $form     = $target.find('form'),
            $input, $searchInput, $hidden,
            pullUpEl, pullUpLabel, iscroll, timeout,
            isLoading = false, nodata = false,
            currentPageNo = 1, oldHash, currentHash;

        var opts = $.extend(true, options, UR.getAttrOptions($el.data('options')));

        // 显示输入框前如果返回false，则中断执行
        if (opts.onBefore && (opts.onBefore() === false)) return false;

        if (!opts.void) {
            $hidden = $el.siblings('[name='+ opts.name +']');
            opts.value       = $hidden.val();
            opts.placeholder = $hidden.attr('placeholder') || '';
        } else {
            opts.value = opts.getValue && opts.getValue();
        }

        opts.pageSize    = opts.pageSize || 20;
        opts.validator   = getValidator(opts);

        var hideNavigationBar = opts.hideNavigationBar === undefined ? true : opts.hideNavigationBar;
        var mode = opts.mode;

        if (mode == 'input' || mode == 'textarea') {
            var $textfield = $target.find('[role=textfield]');

            if (mode == 'input') {
                setInput($textfield);
                $('[has-clear]').input();
            }

            if (mode == 'textarea') {
                var maxlength = opts.rules.maxlength || 200;
                setTextarea($textfield);
                $('[has-clear]').input();
                $textfield.next('.form-counter').remove();
                $textfield.after('<div class="form-counter"><span>0</span>/' + maxlength + '</div>');
                UR.inputCounter($textfield, maxlength);
                $textfield.trigger('input');

                $target.on('click', '.clear-input-btn', function() {
                    setTimeout(function() {
                        $textfield.trigger('input');
                    }, 0);
                });
            }

            // 获取输入框
            $input = $target.find('[data-name=' + opts.name + ']');
        }

        if (mode == 'search') {
            $searchInput = $target.find('[role=search-input]');
            setSearch($searchInput);
            $('[has-clear]').input();

            iscroll = new IScroll($result[0], {
                probeType: 3,
                mouseWheel: true,
                click: true,
                disablePointer: true,
                disableTouch: false
            });
            loaded();    // 初始化
        }

        // show
        show();

        $(document)
            .off('click' , $close.selector)
            .on('click'  , $close.selector, closeHandler)
            .off('click' , $save.selector)
            .on('click'  , $save.selector, save)
            // .off('click' , $resItem.selector)
            // .on('click'  , $resItem.selector, save)
            .off('submit', $form.selector)
            .on('submit' , $form.selector, function(e) {
                if (mode == 'search') {
                    searchHandler(this, e);
                    return;
                }
                save(e);
            });

        window.onhashchange = function(e) {
            if ((currentHash === '#inputContent' && oldHash === undefined) || oldHash === '#inputContent') {
                close();
                oldHash = undefined;
            } else {
                oldHash = location.hash;
            }
        };

        function show() {
            currentHash = location.hash;
            location.hash = 'inputContent';

            if (hideNavigationBar) {
                // 隐藏APP原生navigationBar
                UR.nativeShowNavigationBar(false);
            }

            $('body').addClass('input-layer-show').css('overflow', 'hidden');
            $target.addClass('is-show');
            UR.androidRefresh(false); // 阻止客户端下拉刷新

            // $(document).on('touchmove', function (e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            // });
        }

        function save(e) {
            if (e && e.preventDefault) e.preventDefault();
            var val, elem;

            if (mode == 'input' || mode == 'textarea') {
                val  = $.trim($input.val());
                elem = $input[0];

                if (opts.validator) {
                    if (!UR.validate({[opts.name]: val}, opts.validator)) return;
                }

                if (!opts.void) {
                    if (val) {
                        $el.addClass('writed').text(val);
                    } else {
                        $el.removeClass('writed').text(opts.placeholder);
                    }
                }
            }

            if (mode == 'search') {
                val  = this.getAttribute('data-id');
                elem = this;

                if (val) {
                    $el.addClass('writed').text($.trim(this.getAttribute('data-text')));
                } else {
                    $el.removeClass('writed').text(opts.placeholder);
                }
            }

            if (!opts.void) {
                $hidden.val(val);
            }

            // 保存时的处理函数
            opts.onEnter && opts.onEnter(val, elem);

            history.back();
        }

        function closeHandler(e) {
            e.preventDefault();
            history.back();
        }

        function close() {
            if (mode == 'input' || mode == 'textarea') {
                $target.find('[role=textfield]').val('');
                $target.find('.clear-input-btn').remove();
            }

            if (mode == 'search') {
                $searchInput.val('').trigger('input').trigger('blur');
                $resInner.empty();
                $result.removeClass('nodata');

                // 销毁iscroll实例
                if (iscroll) {
                    iscroll.destroy();
                    iscroll = null;
                }
            }

            $('body').removeClass('input-layer-show').css('overflow', 'auto');
            $target.removeClass('is-show');

            // $(document).off('touchmove');
            UR.androidRefresh(true); // 开启下拉刷新
            if (hideNavigationBar) {
                // 隐藏APP原生navigationBar
                UR.nativeShowNavigationBar(true);
            }

            // 关闭时的处理函数
            opts.onClose && opts.onClose();
        }

        function getValidator() {
            if (!opts.rules || !opts.messages) return;
            var retVal = {
                rules: {
                    [opts.name]: opts.rules
                },
                messages: {
                    [opts.name]: opts.messages
                }
            };

            return retVal;
        }

        function setInput(el) {
            if (!opts.type) console.warn('"type" is not defined');
            if (!opts.name) console.warn('"name" is not defined');
            el.attr({
                'data-name': opts.name,
                'has-clear': '',
                type: opts.type,
                placeholder: opts.label,
            }).val(opts.value);
        }

        function setSearch(el) {
            el.attr({
                'has-clear': '',
                type: 'search',
                placeholder: opts.label,
                name: opts.searchName,
            })
        }

        function setTextarea(el) {
            setInput(el)
        }

        function fetch(reload) {
            if (isLoading) return false;
            isLoading = true;
            nodata    = false;

            var val = $.trim($searchInput.val());
            if (!val) {
                UR.msg('请输入查询关键词');
                isLoading = false;
                return;
            }

            if (reload) {
                clearResult();
                pullUpEl.classList.remove('stop');
                pullUpEl.classList.add('reload');
                currentPageNo = 1;
            } else {
                if (pullUpEl.classList.contains('stop')) {
                    isLoading = false;
                    return false;
                }
                currentPageNo++;
            }

            pullUpEl.classList.add('pull-loading');
            pullUpEl.classList.remove('hide');
            resetPullUpStatus(pullUpEl, pullUpLabel);

            var data = $.extend({
                pageSize: opts.pageSize,
                currentPageNo: currentPageNo
            }, opts.data());

            data[opts.key] = val;

            var sets = {
                url: opts.url,
                type: opts.method || 'GET',
                data: data,
                // cache: false,
                dataType: opts.dataType || 'json',
                contentType: opts.contentType || 'application/x-www-form-urlencoded',
                error: function() {
                    isLoading = false;
                    opts.error && opts.error();
                },
                success: function(data) {
                    var res = opts.formatted ? opts.formatted(data) : data;

                    if (!res.length || res.length < opts.pageSize) {
                        pullUpEl.classList.add('stop');
                    }

                    if (reload) {
                        if (res.length) {
                            $searchInput.trigger('blur');
                        } else {
                            nodata = true;
                            $result.addClass('nodata');
                        }

                        var templateHtml = template(opts.template, {
                            list: res
                        });
                        if (res.length < opts.pageSize) {
                            pullUpEl.classList.add('hide');
                        }
                        $resInner.prepend(templateHtml);
                    } else {
                        if(res && res.length > 0) {
                            var templateHtml = template(opts.template, {
                                list: res
                            });
                            $resInner.children('[role=result-data]:last').before(templateHtml);
                        }
                    }

                    pullUpEl.classList.remove('pull-loading');
                    pullUpEl.classList.remove('reload');

                    clearTimeout(timeout);

                    timeout = setTimeout(function() {
                        isLoading = false;
                        resetPullUpStatus(pullUpEl, pullUpLabel);
                        iscroll.refresh();
                        $($resItem.selector).off('click', save).on('click', save);
                    }, 0);
                }
            };

            opts.beforeSend && (sets.beforeSend = opts.beforeSend);

            $.ajax(sets);
        }
        function loaded() {
            var wrapH, innerH;

            pullUpEl = document.getElementById('pullUp');
            if (!pullUpEl) {
                var pullUpHtml  = '<div id="pullUp" role="pullUp" class="text-center hide">';
                    pullUpHtml += '    <span class="pullUpIcon"></span>';
                    pullUpHtml += '    <span class="pullUpLabel">上拉加载更多</span>';
                    pullUpHtml += '</div>';

                $resInner.html(pullUpHtml);
                pullUpEl = $("#pullUp")[0];
            }

            pullUpLabel = pullUpEl.querySelector('.pullUpLabel');

            iscroll.on('scrollStart', function() {
                wrapH  = $result.height();
            });
            iscroll.on('scroll', function() {
                if (nodata) return;
                if (isLoading) return;
                var innerH = $resInner.height();
                if (Math.abs(this.y >> 0) / (innerH - wrapH) > 0.7) {
                    fetchHandler();
                }
            });
        }
        function resetPullUpStatus(pullUpEl, pullUpLabel) {
            if (pullUpEl.classList.contains('stop')) {
                pullUpLabel.innerText = "没有更多了";
            } else if (pullUpEl.classList.contains('pull-loading')){
                pullUpLabel.innerText = "加载中...";
            } else {
                pullUpLabel.innerText = "上拉加载更多";
            }
        }
        function clearResult() {
            $result.removeClass('nodata');
            $resInner.children('[role=result-data]').remove();
            iscroll.scrollTo(0,0);
        }

        function searchHandler(el, event) {
            event.preventDefault();
            fetch(true);
        }
        function fetchHandler() {
            if (nodata) return false;
            fetch();
        }

        return {
            close: close
        }
    },
    initReadonlyText: function(selector) {
        var $el = $(selector || '.readonly-text');
        $el.each(function(i, item) {
            var $this   = $(this),
                $hidden = $this.siblings('[type=hidden]');

            var value       = $hidden.val(),
                placeholder = $hidden.attr('placeholder');

            if (value) {
                $this.addClass('writed').text(value);
            } else {
                $this.removeClass('writed').text(placeholder);
            }
        })
    },
    backOrClose: function() {
        $(document)
            .off(UR.click, '#backOrClose', backOrClose)
            .on(UR.click, '#backOrClose', backOrClose);

        function backOrClose() {
            if (UR.isApp()) {
                UR.nativeWebFinish();
            } else {
                history.back();
            }
        }
    },
    post: function(options) {
        $(document).off(UR.click, '#submit').on(UR.click, '#submit', function(evt) {
            evt.preventDefault();
            var $this = $(this);
            var $form = $this.closest('form');
            var post;
            if (!options.data || (options.data && typeof options.data == 'object')) {
                post = UR.serializeObject($form);
            }
            if (options.data) {
                if (typeof options.data == 'object') {
                    post = $.extend(true, {}, post, options.data);
                }
                if (typeof options.data == 'function') {
                    post = options.data();
                }
            }


            $.ajaxPost({
                url: options.postUrl,
                data: options.postFormatted ? options.postFormatted(post) : post,
                contentType: options.contentType || 'application/json',
                submit: this,
                beforeSend: function () {
                    if (options.validator && $.isFunction(options.validator)) {
                        var validator = options.validator();
                        return UR.validate(post, filterRules($form, validator));
                    }
                    if (options.validator) {
                        var validator = options.validator;
                        return UR.validate(post, filterRules($form, validator));
                    }
                },
                success: function(res) {
                    options.success && options.success(res);
                },
                complete: function(res) {
                    options.complete && options.complete(res);
                },
                error: function(err) {
                    options.error && options.error(err);
                }
            });
        });
        function filterRules($form, validator) {
            var _validator = $.extend(true, {}, validator);
            $form.find('input, select, textarea').each(function() {
                var _this = $(this),
                    name = _this.attr('name');

                if (_this.prop('disabled')) {
                    delete _validator.rules[name]
                }
            });
            return _validator;
        }
    },
};
