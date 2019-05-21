//= include ../../../public/component/refresh/refresh.js
//= include ./_formatted.js

var List = {
    init: function () {
        this.search();
        this.lazy();
    },
    lazy: function () {
        $('[data-scroll="pullUp"]').on('pullup.bs.refresh', function (evt) {
            setTimeout(function () {
                $('.lazy').lazy({
                    // domain: ['pic.90sjimg.com', 'static.urwork.cn']
                });
            }, 0)
        });
    },
    search: function () {
        $(document)
            .off(UR.click, 'li')
            .on(UR.click, 'li', function (evt) {
                evt.preventDefault();

                var $this = $(this);
                var id    = $.trim($this.attr('data-id')),
                    param = $.trim($this.closest('ul').attr('data-param'));

                $this.addClass('active').siblings().removeClass('active');

                $('[data-scroll="pullUp"]').refresh({[param]: id});
            });
    }
}
$(function () {
    List.init();
})
