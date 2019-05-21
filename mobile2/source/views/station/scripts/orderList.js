//= include ../../../public/component/refresh/refresh.js

var List = {
    init: function () {
        this.$pull   = $('[data-scroll="pullUp"]');
        this.$filter = $('.tabs');

        this.lazy();
        this.search();
    },
    lazy: function () {
        this.$pull.on('pullup.bs.refresh', function (evt) {
            setTimeout(function () {
                $('.lazy').lazy({
                    // domain: ['pic.90sjimg.com', 'static.urwork.cn']
                });
            }, 0)
        });
    },
    search: function () {
        var that    = this;
        var param   = $.trim(this.$filter.attr('data-param'));

        $(document)
            .off(UR.click, '.tabs li')
            .on(UR.click, '.tabs li', function (evt) {
                evt.preventDefault();

                var $this   = $(this);

                $this.addClass('active').siblings().removeClass('active');

                var id  = $.trim($this.attr('data-id'));

                that.$pull.refresh({[param]: id});
            });
    },
}
$(function () {
    List.init();
})
