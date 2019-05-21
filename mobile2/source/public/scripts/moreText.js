UR.moreText = function(selector, options) {
    var defs = {
        lineNum: 2.5
    };
    var sets  = $.extend({}, defs, options);
    var $elem = $(selector);

    // 支持show-line=[lineNumber]
    sets.lineNum = $elem.attr('show-line') ? Number($elem.attr('show-line')) : sets.lineNum;

    $elem.each(function() {
        var $this      = $(this),
            $text      = $this.find('.more-content'),
            $moreBtn   = $this.find('.btn-more'),
            $btnText   = $this.find('.btn-text');

        var mode       = $.trim($this.attr('show-mode'));

        var wrapWidth  = $text.innerWidth(),
            text       = $.trim($text.text()),
            textLength = text.length,
            fontSize   = parseInt($text.css('font-size')),
            onelineNum = Math.floor(wrapWidth / fontSize),
            showNum    = onelineNum * sets.lineNum;

        // 如果文本小于等于n行，则删除[展开|收起]
        if (textLength <= onelineNum * Math.ceil(sets.lineNum)) {
            $moreBtn.remove();
            $text.show();
            return;
        }

        var showText   = text.slice(0, showNum) + '...';
        // console.log($text.width());
        // console.log('fontSize',fontSize);
        // console.log('wrapWidth',wrapWidth);
        // console.log( 'text',text);
        // console.log('onelineNum',onelineNum);
        // console.log( 'sets.lineNum',sets.lineNum);
        $('<div>', {'text': showText, 'class': 'less-content'}).insertBefore($text);

        var $less = $this.find('.less-content');
        if (mode == 'less') {
            $text.hide();
            $less.show();
            $this.removeClass('is-show-more');
            $btnText.text($moreBtn.attr('data-more'));
        }
        if (mode == 'more') {
            $text.show();
            $less.hide();
            $this.addClass('is-show-more');
            $btnText.text($moreBtn.attr('data-less'));
        }
    })


    $('body')
        .off(UR.click, '.btn-more')
        .on(UR.click, '.btn-more', moreLess)

    function moreLess(e) {
        e.preventDefault();
        var $this      = $(this),
            $btnText   = $this.find('.btn-text'),
            $elem      = $this.closest(selector),
            $lessText  = $elem.find('.less-content'),
            $moreText  = $elem.find('.more-content');

        var isShowMore = $elem.hasClass('is-show-more');

        if (isShowMore) {
            $elem.removeClass('is-show-more');
            $lessText.show();
            $moreText.hide();
            $btnText.text($this.attr('data-more'));
        } else {
            $elem.addClass('is-show-more');
            $lessText.hide();
            $moreText.show();
            $btnText.text($this.attr('data-less'));
        }
    }
};
