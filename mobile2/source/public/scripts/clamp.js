UR.clamp = function () {
    $('[data-toggle=clamp]').each(function () {
        var $this = $(this);
        var clamp = $this.data('clamp');

        $this.attr('data-text', $this.text());

        CLAMP($this[0], {
            clamp: clamp,
            useNativeClamp: false,
            truncationHTML: '<a href="#" class="read-more"> 展开</a>'
        });
    });

    $(document).on('click', '[data-toggle=clamp] .read-more', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $article = $this.parent();
        var text = $article.attr('data-text');
        $article.text(text);
    });
};
