UR.searchbar = function(options) {
    var defs = {
        id: 'searchbar',
        enterHandler : null,
        clearHandler : null,
        cancelHandler: null,
        inputHandler : null,
        focusHandler : null,
        isPopLayer   : false,
        cancelReset  : false,
    };
    var sets = $.extend({}, defs, options);

    var oldVal = '', isFocus = false, cpLock = false;

    var $searchBar = $('#' + sets.id),
        $form      = $searchBar.find('form'),
        $clearText = $searchBar.find('.clear-text'),
        $search    = $searchBar.find('input[type=search]'),
        $cancel    = $searchBar.find('.cancel-btn');

    $('body')
        .off('input click',  $search.selector)
        .on('input click',   $search.selector, inputHandler)
        .off('keyup',  $search.selector)
        .on('keyup',   $search.selector,    searchHandler)
        .off('click',  $clearText.selector)
        .on('click',   $clearText.selector, clearHandler)
        .off('click',  $cancel.selector)
        .on('click',   $cancel.selector,    cancelHandler)
        .off('submit', $form.selector)
        .on('submit',  $form.selector, function(e) {e.preventDefault()})
        .off('compositionstart', $search.selector, compositionstart)
        .on('compositionstart' , $search.selector, compositionstart)
        .off('compositionend'  , $search.selector, compositionend)
        .on('compositionend'   , $search.selector, compositionend);

    function compositionstart() {
        cpLock = true;
    }
    function compositionend() {
        cpLock = false;
        var val = $.trim(this.value);
        sets.inputHandler && sets.inputHandler(val, $search);
    }

    function inputHandler(e) {
        e.preventDefault();
        var val = $.trim(this.value);
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            if (val) {
                renderClearButton($search);
            } else {
                removeClearButton($search);
            }
        }, 200);

        isFocus = true;

        if (!e.originalEvent) {
            sets.focusHandler && sets.focusHandler(val, $search);
            return;
        }

        if (e.originalEvent.type === 'focus' || e.originalEvent.type === 'click') {
            if (e.relatedTarget) return;
            sets.focusHandler && sets.focusHandler(val, $search);
        } else {
            if (cpLock) return;
            sets.inputHandler && sets.inputHandler(val, $search);
        }
    }

    function searchHandler(e) {
        e.preventDefault();
        if (e.keyCode !== 13) return;
        var val = $.trim(this.value);
        oldVal = val;
        isFocus = false;
        sets.enterHandler && sets.enterHandler(val, $search);
    }

    function clearHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!isFocus) oldVal = '';
        $search.val('').focus();
        removeClearButton($search);
        sets.clearHandler && sets.clearHandler($search);
    }

    function cancelHandler(e) {
        e.preventDefault();
        var val = $.trim($search.val());
        if (!sets.isPopLayer) {
            if (UR.isApp() && UR.clientTest.isAndroid) {
                UR.androidWebFinish();
                return;
            }
            history.back();
        }

        if (sets.cancelReset) {
            $search.val(oldVal);
            if (!oldVal.length) removeClearButton($search);
        }

        isFocus = false;

        sets.cancelHandler && sets.cancelHandler(val, oldVal, $search);
    }

    function renderClearButton(searchNode) {
        if (searchNode.siblings('.clear-text').length) return;
        searchNode.after('<button type="button" class="clear-text"><i class="uricon-clear"></i></button>');
    }

    function removeClearButton(searchNode) {
        var clearBtn = searchNode.siblings('.clear-text');
        if (!clearBtn.length) return;

        clearBtn.remove();
    }

    return {
        search: function(content) {
            $search.val(content);
            sets.enterHandler && sets.enterHandler(content, $search);
        },
        setVal: function(val) {
            oldVal = val;
        }
    }
};
