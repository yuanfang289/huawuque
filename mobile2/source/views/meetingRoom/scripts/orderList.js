//= include ../../../public/component/refresh/refresh.js

var Page = {
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
    submit: function (options) {
        var that = this;

        $(document)
            .off(UR.click, options.submit)
            .on(UR.click, options.submit, function (evt) {

                evt.preventDefault();

                var $this = $(this).closest('.pictext-operate');
                var id    = $.trim($this.attr('data-id'));

                if (options.submit == '.cancel') {
                    options.data = {
                        orderId: id,
                    };
                } else {
                    options.data = {
                        orderNo: id,
                        paychannel: $.trim($this.attr('data-way')),
                    };
                }

                $.ajaxGet(options);
            });
    }
}
$(function () {
    Page.init();
})
