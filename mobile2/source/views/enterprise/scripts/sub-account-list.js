//= include ../../../public/component/refresh/refresh.js

var Page = {
    init: function () {
        this.lazy();
    },
    lazy: function () {
        $(".lazy").lazy({
            domain: 'static.urwork.cn'
        });


        $('[data-scroll="pullUp"]').on('pullup.bs.refresh', function (evt) {
            setTimeout(function () {
                $('.lazy').lazy();
            }, 0)
        });
    },

};
$(function () {
    Page.init();
});


