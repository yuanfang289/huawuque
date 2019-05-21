// TODO 只能初始化一次
// 如果需要单独传参数，
// 使用[data-onFocus | data-onInput | data-onClear]、autoBlur=true

!function($) {
    var Input = function() {
        var sets = $.extend({}, {
            onFocus : null,
            onInput : null,
            onClear : null,
            autoBlur: false
        }, arguments[0]);

        var selector = this.selector;

        $('body')
            .off('input.ur.input', selector)
            .on('input.ur.input' , selector, inputHandler)
            .off('focus.ur.input', selector)
            .on('focus.ur.input' , selector, inputHandler)
            .off('click.ur.input', '.clear-input-btn')
            .on('click.ur.input' , '.clear-input-btn', clearHandler)

        return this.each(function() {
            var $this = $(this);

            if (!getParent($this).length) {
                $this.wrap('<div class="input-clear-wrap"></div>');
            }
        })

        function inputHandler(e) {
            e.preventDefault();

            var type = e.type;
            var $this   = $(this),
                $parent = getParent($this),
                val     = $.trim(this.value);

            clearTimeout(this.timer);

            this.timer = setTimeout(function() {
                if (val) {
                    renderClearButton($parent);
                    $('.search-book').addClass('hidden');
                } else {
                    removeClearButton($parent, $this);
                    $('.search-book').removeClass('hidden');
                }
            }, 200);

            if (type == 'focus' || type == 'focusin') {
                if ($this.data('onfocus')) {
                    eval($this.data('onfocus'));
                } else {
                    sets.onFocus && sets.onFocus(this)
                }
            }
            if (type == 'input') {
                if ($this.data('oninput')) {
                    eval($this.data('oninput'));
                } else {
                    sets.onInput && sets.onInput(this)
                }
            }
        }

        function clearHandler() {
            var $parent = getParent($(this)),
                $input  = $parent.find(selector);

            var autoBlur = $input.attr('autoblur') || sets.autoBlur;
            var isBlur   = autoBlur == 'true' || autoBlur == true;

            if (isBlur) {
                removeClearButton($parent, $input);
                $input.val('');
                return;
            }

            if (!isBlur && $input.val()) {
                $input.val('').focus()
            }
        }

        function getParent(el) {
            return el.closest('.input-clear-wrap');
        }

        function renderClearButton(parent) {
            if (parent.find('.clear-input-btn').length) return;
            parent.append('<button type="button" class="clear-input-btn"><i class="uricon-clear"></i></button>');
        }

        function removeClearButton(parent, input) {
            var clearBtn = parent.find('.clear-input-btn');
            if (!clearBtn.length) return;

            clearBtn.remove();

            if (input.data('onclear')) {
                eval(input.data('onclear'));
            } else {
                sets.onClear && sets.onClear(input);
            }
        }
    };

    $.fn.input = function() {
        return Input.apply(this, arguments);
    };
}(jQuery)

