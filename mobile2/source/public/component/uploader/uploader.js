+function ($) {
    'use strict';

    var Uploader = function (element, options) {
        this.$element = $(element);

        this.options = null;
        this.init(element, options);
    }

    Uploader.VERSION = '1.0.1';

    Uploader.DEFAULTS = {
        showRemoveBtn: true,                       // 是否显示删除按钮, 如果不显示再次上传图片则覆盖原来图片
        add: '[data-role="add"]',                  // 添加按钮
        file: '[data-role="file"]',                // input[type=file]对象
        tip: '[data-role="tip"]',
        remove: '[data-role="remove"]',            // 删除按钮
        hidden: '[data-role="hidden"]',
        placeholder: '[data-role="placeholder"]',
        progress: '[data-role="progress"]',
        ctrl: '[data-role="ctrl"]',                // 操作按钮container
        className: {
            close: 'uricon-close'
        },
        extensions: 'jpg,jpeg,png', // 文件格式
        name: 'pic',                // hidden 的参数
        require: false,             // hidden项是否必填
        imgPX: '150x150',
        pxLimit: false,             // 是否限制图片宽高， 默认false
        ratioLimit: false,          // 是否检查像素比，只提示不阻断， 默认false
        maxSize: 20,                // 文件最大限制，单位M，默认20M
        url: '',                    // 图片上传地址
        method: 'POST',             // POST 或者 GET
        data: {},                   // 后台所需参数
        formatted: null,            // 处理上传成功返回的结果
        success: null,              // 上传成功后的回调函数
        error: null                 // 上传失败后的回调函数
    }

    Uploader.prototype.getOptionsByElementAttr = function (attrs) {
        if (attrs && attrs.options && typeof attrs.options == 'string') {
            attrs = attrs.options;
            attrs = '{' + attrs + '}';
            attrs = eval('(' + unescape(attrs) + ')');
        }
        return attrs;
    }

    Uploader.prototype.getOptions = function (options) {
        return $.extend(true, {}, Uploader.DEFAULTS,
            this.getOptionsByElementAttr(this.$element.data()),
            options && this.getOptionsByElementAttr(options))
    }

    Uploader.prototype.init = function (element, options) {
        this.$element = $(element);
        this.options = this.getOptions(options);

        if (!this.$element.length) {
            alert('ERROR');
            return false;
        }

        this.$add = this.$element.find(this.options.add);
        this.$file = this.$element.find(this.options.file);
        this.$hidden = this.$element.find(this.options.hidden);
        this.$tip = this.$element.find(this.options.tip);
        this.$placeholder = this.$element.find(this.options.placeholder);
        this.placeHtml = this.$placeholder.clone().html();
        this.$progress = this.$element.find(this.options.progress);
        ;
        this.$ctrl = this.$element.find(this.options.ctrl);
        this.$remove = null;

        this.xhr = null;

        this.$file.attr({accept: 'image/*'});

        this.thumbnailW = this.$placeholder.width();
        this.thumbnailH = this.$placeholder.height();


        this.$element
            .on('change.bs.uploader', this.options.file, $.proxy(this.changeFile, this))
            .on('click.bs.uploader', this.options.file, $.proxy(this.start, this))
            .on('click.bs.uploader', this.options.remove, $.proxy(this.cancel, this));

        if (this.options.imgSrc) {
            this.setParam({
                url: this.options.serverSrc || this.options.imgSrc,
                src: this.options.imgSrc
            })
        }


        return this;
    }

    Uploader.prototype.start = function (evt) {
        console.log(evt.target.tagName, evt.currentTarget.tagName);
        // if (evt.target.tagName !== 'LABEL') {
        //     this.$file = this.$element.find(this.options.file);
        //     this.$file.val('').off('click.bs.uploader');
        //     this.$file[0].click();
        // }
    }

    Uploader.prototype.cancel = function (evt) {
        this.status('cancel');
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    Uploader.prototype.toString = function () {
        console.log("uploader-%s.js", Uploader.VERSION);

        return this;
    }

    Uploader.prototype.baseCheck = function (file, checkedFn) {
        // 检验格式开始
        var arr = this.options.extensions.split(',');
        var interrupt = true;
        for (var i = arr.length - 1; i >= 0; i--) {
            var rule = arr[i];
            if (new RegExp(rule + '$', 'gi').test(file.name)) {
                interrupt = false;
                break;
            }
        }

        if (interrupt) {
            return '仅支持' + this.options.extensions + '格式的图片';
        }
        // 检验格式结束


        // 检验大小开始
        if (file.size == 0) {
            return '图片不能为空';
        }
        if (file.size > this.options.maxSize * 1024 * 1024) {
            return '图片不能超过' + this.options.maxSize + 'MB';
        }
        // 检验大小结束


        // 检验像素开始
        // 读取图片的base64
        var interrupt = false,
            interruptMsg = null;

        var imgPX = this.options.imgPX.split(/x/gi),
            pxLimit = this.options.pxLimit,
            ratioLimit = this.options.ratioLimit;

        if (pxLimit || ratioLimit) {
            var reader = new FileReader();
            reader.onload = function () {
                var url = reader.result;

                var image = new Image();
                image.src = url;

                if (pxLimit && (image.width != imgPX[0] || image.height != imgPX[1])) {
                    interrupt = true;
                    interruptMsg = '上传图片规格不符';
                }

                if (ratioLimit && (imgPX[0] / imgPX[1] != image.width / image.height)) {
                    interrupt = false;
                    interruptMsg = '上传图片比例不符';
                }

                checkedFn(interrupt, interruptMsg)
            }
            reader.readAsDataURL(file);
        }
        // 检验像素结束


        return null;
    }

    Uploader.prototype.changeFile = function (event) {
        event.preventDefault();

        var self = this;
        var file = event.target.files[0];
        // 调用检验开始
        var baseCheckInterruptMsg;
        if (this.options.pxLimit || this.options.ratioLimit) {
            baseCheckInterruptMsg = this.baseCheck(file, function (interrupt, interruptMsg) {
                self.checked(file, interrupt, interruptMsg);
            });
        } else {
            baseCheckInterruptMsg = this.baseCheck(file);
        }
        self.checked(file, !!baseCheckInterruptMsg, baseCheckInterruptMsg);
        // 调用检验结束
    }

    Uploader.prototype.checked = function (file, isInterrupt, interruptMsg) {
        this.options.data[this.$file.attr('name') || 'file'] = file;
        if (interruptMsg) {
            if (this.$tip.length) {
                this.$tip.text(interruptMsg);
            } else if (typeof UR != 'undefined' && UR && UR.msg) {
                UR.msg(interruptMsg);
            } else {
                alert(interruptMsg);
            }

        }

        if (isInterrupt) return false;

        this.status('start');
        this.save();
    }

    Uploader.prototype.save = function () {
        var formData = new FormData();
        for (var key in this.options.data) {
            if (this.options.data.hasOwnProperty(key)) {
                formData.append(key, this.options.data[key]);
            }
        }
        var self = this;
        this.xhr = $.ajax({
            url: this.options.url,
            type: this.options.method,
            data: formData,
            context: document.body,
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                self.status('uploading');
                var _xhr = new window.XMLHttpRequest();
                _xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.round(evt.loaded * 100 / evt.total);

                        self.$progress.find('.bar').css({width: percentComplete + '%'})
                    }
                }, false);
                return _xhr;
            }
        });

        this.xhr.done(function (data) {
            if (data.code && data.code != 200) {
                self.status('error', data);
                return false;
            }

            self.options.success && self.options.success(data, self.$element);
            if (self.options.formatted) {
                data = self.options.formatted(data, self.$element);
            }

            self.status('success', data);

            var successEvent = $.Event('success.bs.uploader', {
                relatedTarget: self.$element[0],
                ajax: data
            });
            self.$element.trigger(successEvent)
            if (successEvent.isDefaultPrevented()) return
        });

        this.xhr.fail(function (XHR) {
            self.status('error');
            self.options.error && (self.options.error(self.$element));

            var errorEvent = $.Event('error.bs.uploader', {
                relatedTarget: self.$element[0],
            });
            self.$element.trigger(errorEvent)
            if (errorEvent.isDefaultPrevented()) return
        });

        this.xhr.always(function () {
            this.xhr = null;
        });
    }

    Uploader.prototype.status = function (status, data) {
        switch (status) {
            case 'start':
                this.$tip.length && (this.$tip.text(""));
                break;

            case 'cancel':
                this.$ctrl.length && (this.$ctrl.remove());
                this.$progress.length && (this.$progress.remove());
                break;

            case 'uploading':
                this.$progress = this.$element.find(this.options.progress);
                if (this.$progress.length == 0) {
                    this.$progress = $('<div data-role="progress"><div class="bar"></div></div>').appendTo(this.$element);
                }
                this.$progress.addClass('active');
                break;

            case 'success':
                this.$progress.length && (this.$progress.remove());
                if (!this.options.showRemoveBtn) break;
                this.$ctrl = this.$element.find(this.options.ctrl);
                if (this.$ctrl.length == 0) {
                    this.$ctrl = $('<div data-role="ctrl"></div>').appendTo(this.$element);
                }

                this.$remove = this.$ctrl.find(this.options.remove);
                if (this.$remove.length == 0) {
                    this.$remove = $('<a data-role="remove" class="remove"><i class="' + this.options.className.close + '"></i></a>').appendTo(this.$ctrl);
                }
                break;

            case 'error':
                this.$progress.length && (this.$progress.remove());
                var errorMsg = data && data.message ? data.message : '图片上传失败!';

                break;

            default:
        }

        if (status.match(/success|error|cancel/gi)) {
            this.$file.val('');

            // 创建hidden开始
            this.$hidden = this.$element.find(this.options.hidden);
            if (this.$hidden.length == 0) {
                this.$hidden = $('<input type="hidden" data-role="hidden" name="' + this.options.name + '"/>').appendTo(this.$element);
            }
            // 创建hidden结束

            if (!this.options.require) {
                this.$hidden.addClass('ignore');
            }

            if (!data || data.length == 0) {
                this.$hidden.val('');
                this.$placeholder.empty().append(this.placeHtml);
                this.$placeholder.removeClass('has-value');
            } else {
                this.$hidden.val(data.url || '');
                if (this.options.showRemoveBtn) {
                    this.$placeholder.empty()
                }
                this.$placeholder.addClass('has-value');
                this.$placeholder.find('img').remove();
                this.$placeholder.append('<img src="' + (data.src || data.url) + '?imageMogr2/thumbnail/!' + this.thumbnailW + 'x' + this.thumbnailH + 'r/gravity/Center/crop/' + this.thumbnailW + 'x' + this.thumbnailH + '"/>');
            }
        }
    }

    Uploader.prototype.reset = function () {
        this.cancel();

        return this;
    }

    Uploader.prototype.setParam = function (params) {
        if (params.src) {
            params.url = params.url != undefined ? params.url : params.src;
            this.status('success', params);
        }

        return this;
    }


    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.uploader');
            var options = typeof option == 'object' && option;

            if (!data && /destroy|hide/.test(option)) return;
            if (!data) {
                $this.data('bs.uploader', (data = new Uploader(this, options)));
            }
            if (typeof option == 'string') data[option]();

            if (typeof option == 'object') data.setParam(options);
        })
    }

    var old = $.fn.uploader;

    $.fn.uploader = Plugin;
    $.fn.uploader.Constructor = Uploader;

    $.fn.uploader.noConflict = function () {
        $.fn.uploader = old;
        return this;
    }

    $(window).on('load', function () {
        $('[data-role="uploader"]').each(function () {
            var $uploader = $(this)
            if ($uploader.data('bs.uploader')) return false;

            Plugin.call($uploader, $uploader.data());
        })
    })
}(jQuery);
