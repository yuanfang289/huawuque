//= include ../../../public/plugins/template.js
//= include ../../../public/component/refresh/refresh.js


var List = {
    init: function () {
        this.lazy();
    },
    lazy: function () {
        $('[data-scroll="pullUp"]').on('pullup.bs.refresh', (evt) => {
            setTimeout(() => {
                $('.lazy').lazy();
            }, 0);
        })
    }
}
$(function () {
    List.init();
})
