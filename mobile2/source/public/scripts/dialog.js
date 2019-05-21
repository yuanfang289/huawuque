UR.dialog = {
    create: function(options) {
        var index = $('.ur-dialog').length + 1;
        var html  = '';
        html += '<section class="ur-dialog" id="_dialog_' + index + '_">';
        html += '  <div class="ur-mask ' + (options.mask ? "active" : "") + '"></div>';
        html += '  <div class="ur-container">';
        if (options.title) {
            html += '<div class="ur-title">' + options.title + '</div>';
        }
        html += '    <div class="ur-content">';
        html += options.message;
        html += '    </div>';
        html += '    <div class="ur-tools">';
        if ($.isEmptyObject(options.buttons.ok)) {
            html += '<a href="javascript:;" class="ur-no">' + options.buttons.no.label + '</a>';
            html += '<a href="javascript:;" class="ur-yes">' + options.buttons.yes.label + '</a>';
        } else {
            html += '<a href="javascript:;" class="ur-ok">' + options.buttons.ok.label + '</a>';
        }
        html += '    </div>';
        html += '  </div>';
        html += '</section>';
        var $dialog = $(html).appendTo('body');
        $dialog.addClass('active');

        return $dialog;
    },
    alert: function(options) {
        var self     = this;
        var defaults = {
            mask: true,
            title: '',
            message: '',
            autoClose: false,
            timeout: 2500,
            buttons: {
                ok: {
                    label: '确定',
                    fn: function() {

                    }
                }
            }
        }
        var opts    = $.extend(true, {}, defaults, options);

        var $dialog = this.create(opts);
        var timer   = null;
        if (timer) {
            clearTimeout(timer);
        }
        if (opts.autoClose) {
            timer = setTimeout(function () {
                self.close($dialog, opts);
            }, opts.timeout);
        }

        $dialog
            .off('click', '.ur-ok')
            .on('click', '.ur-ok', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                self.close($dialog, opts);
            });

    },
    confirm: function(options) {
        var self     = this;
        var defaults = {
            mask: true,
            title: '',
            message: '',
            buttons: {
                no: {
                    label: '放弃',
                    fn: function() {

                    }
                },
                yes: {
                    label: '确定',
                    fn: function() {

                    }
                }
            }
        }
        var opts    = $.extend(true, {}, defaults, options);

        var $dialog = this.create(opts);
        $dialog
            .off('click', '.ur-no')
            .on('click', '.ur-no', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                self.close($dialog, opts);
            })
            .off('click', '.ur-yes')
            .on('click', '.ur-yes', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                self.yes($dialog, opts);
            })
            .off('click', '.ur-dialog')
            .on('click', '.ur-dialog', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
            });
    },
    close: function(dialog, options) {
        options.buttons.ok && options.buttons.ok.fn(dialog);
        options.buttons.no && options.buttons.no.fn(dialog);
        dialog.length && (dialog.removeClass('active').remove());
    },
    yes: function(dialog, options) {
        options.buttons.yes.fn(dialog);
        dialog.length && (dialog.removeClass('active').remove());
    }
}
