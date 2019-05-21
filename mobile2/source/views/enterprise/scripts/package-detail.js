var Page = {
    init: function () {
        this.calc();
    },
    calc: function () {
        var self = this;

        this.$sub = $('.btn-sub');
        this.$add = $('.btn-add');
        this.$num = $('.btn-num');

        if ($('#status').val() != 2) {
            this.$sub.prop('disabled', true);
            this.$add.prop('disabled', true);
            return false;
        }

        this.$rest = $('#restNum');
        this.$total = $('#total');

        this.limit = $('#limitCount').val();
        this.limit = this.limit ? +this.limit : 0;

        this.price = $('#price').text();

        $('.package-sell-info-item')
            .on(UR.click, '.btn-add', function (evt) {
                self.setState('add');
            })
            .on(UR.click, '.btn-sub', function (evt) {
                self.setState('sub');
            })
    },
    setState: function (type) {
        var num = +this.$num.text(),
            rest = parseInt(this.$rest.text());

        if (type == 'add') {
            if (this.$add.prop('disabled') || rest <= 0 || num == this.limit) {
                return false;
            }

            rest -= 1;
            num += 1;
            this.$rest.text(rest);
            this.$num.text(num);
            if (this.$sub.prop('disabled')) {
                this.$sub.prop('disabled', false);
            }

            if (rest <= 0 || num == this.limit) {
                this.$add.prop('disabled', true);
            }

        }

        if (type == 'sub') {
            if (this.$sub.prop('disabled') || num <= 1) {
                return false;
            }

            num -= 1;
            this.$rest.text(rest + 1);
            this.$num.text(num);
            if (this.$add.prop('disabled')) {
                this.$add.prop('disabled', false);
            }

            if (num <= 1) {
                this.$sub.prop('disabled', true);
            }
        }

        this.$total.text((this.price * num).toFixed(2));
    },
    submit: function (options) {
        $(document).on(UR.click, '#go', (evt) => {

            $.ajaxGet(options);
        });
    }
}

$(function () {
    Page.init();
})
