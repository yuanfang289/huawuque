//= include ../../../public/component/refresh/refresh.js

//= include ../../../public/plugins/mobiscroll/scripts/mobiscroll.js

//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/modal/modal.js



var List = {
    init: function () {
        this.urlParams = UR.getBrowserParam();
        this.cityCode  = this.urlParams.cityCode;
        this.cityName  = this.urlParams.cityName;
        this.$pull     = $('[data-scroll="pullUp"]');
        this.$filter   = $('.search-wrapper');
        this.format    = this.$filter.attr('data-type');
        this.current   = $.dateFormat(new Date(), this.format);
        this.$cityCodeModal = $('#cityCodeModal');

        this.initFilter(() => {
            this.search();

            this.$date   = $('.input-text');
            this.date();
        });
        this.lazy();
        this.modal();
    },
    redirect: function (url) {
        var that = this;

        $(document)
            .off(UR.click, '.booking')
            .on(UR.click, '.booking', function (evt) {
                evt.preventDefault();

                if ($(this).attr('disabled')) return false;
                location.replace(url + "?id=" + $(this).attr('data-id') + "&date=" + that.current);
            });
    },
    lazy: function () {
        var self = this;
        this.$pull.on('pullup.bs.refresh', (evt) => {
            setTimeout(() => {
                $('.lazy').lazy({
                    // domain: ['pic.90sjimg.com', 'static.urwork.cn']
                });

                let _date = new Date();
                if (this.current == $.dateFormat(_date) && _date.getHours() >= 15) {
                    $('.booking').each(function () {
                        $(this).attr('disabled', true);
                    });
                }

                if (!self._init) {
                    self._init = true;
                    if (self.cityName) {
                        $('[data-target="#cityCodeModal"] span').text(self.cityName);
                    }
                }
            }, 0);
        })
    },

    modal: function () { // 弹窗参数变化
        let that    = this;
        let _paramName = "";
        let _paramVal  = "";
        let _paramText = "";

        if (this.cityCode) {
            this.$cityCodeModal.attr('data-val', this.cityCode);
            _paramName = this.$cityCodeModal.data('param');
            _paramVal = this.cityCode;
            _paramText = this.cityName;
        }

        $(document)
            .off('shown.bs.modal', '.modal')
            .on('shown.bs.modal', '.modal', function (e) {
                let $modal = $(this);

                let value = $modal.attr('data-val');
                $modal.find('.city-list li').each(function () {
                    var $li = $(this);
                    $li.toggleClass("active", $li.attr('data-id') == value);
                });
            })
            .off(UR.click, '.modal .save')
            .on(UR.click, '.modal .save', function (evt) {
                evt.preventDefault();

                let $modal  = $(this).closest('.modal'),
                    modalId = $modal.attr('id');

                that.$pull.refresh({[_paramName]: _paramVal});

                $modal
                    .attr('data-val', _paramVal)
                    .modal('hide');

                var $target = $(`[data-target="#${modalId}"]`);
                $target.toggleClass('val-empty', !_paramText);
                $target.find('span').text(_paramText ? _paramText : ($target.attr('data-text') || ""));

                that.urlParams.cityName = _paramText;
                that.urlParams.cityCode = _paramVal;

                var search = [];
                for (var prop in that.urlParams) {
                    search.push(UR.toParam(that.urlParams[prop], prop));
                }
                //TODO 修改查询条件，刷新页面 location.search = search.join('&');
            })
            .off(UR.click, '.modal li')
            .on(UR.click, '.modal li', function (evt) {
                evt.preventDefault();

                var $this = $(this);

                $this.addClass('active')
                    .siblings().removeClass('active');

                _paramName = $this.closest('.modal').attr('data-param');
                _paramVal  = $.trim($this.attr('data-id'));
                _paramText = $.trim($this.text());
            });
    },
    initFilter: function (callback) {
        var self = this;
        $.ajaxGet({
            url: this.$filter.attr('data-url'),
            success: (res) => {
                let list = res.data || [];

                $('#cityCodeContainer').html(template('cityCodeTpl', {
                    data: list,
                    cityCode: self.cityCode
                }));

                var date    = new Date();
                var html    = template("tlpFilter", {data: {
                    today: $.dateFormat(date, this.format),
                    tomorrow: $.dateFormat(date.setDate(date.getDate() + 1), this.format),
                }});

                this.$filter.html(html);

                callback && callback(res);
            }
        });
    },
    search: function () {
        var that    = this;
        var param   = $.trim(this.$filter.find('ul').attr('data-param'));

        $(document)
            .off(UR.click, '.search-wrapper li')
            .on(UR.click, '.search-wrapper li', function (evt) {
                evt.preventDefault();

                var $this   = $(this);

                $this.addClass('active').siblings().removeClass('active');

                that.$date.val('');

                if ($this.hasClass('last')) {
                    return false;
                }

                var id  = $.trim($this.attr('data-id'));

                that.current = id;
                that.$pull.refresh({[param]: id});
            })
            .on('change.bs.date', function (evt, date) {
                if (date) {
                    date = $.dateFormat(date, that.format);
                    that.current = date;
                    that.$pull.refresh({[param]: date});
                }
            });
    },
    date: function () {
        var date   = new Date();

        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            startYear: date.getFullYear(),
            endYear: date.getFullYear() + 1,
            minDate: date,
            buttons: [
                'cancel', 'set'
            ],
            preset: 'date',
            onBeforeShow: function (inst) {
                UR.androidRefresh(false)
            },
            onCancel: function (inst) {
                UR.androidRefresh(true)
            },
            onShow: function (event, inst) {
            },
            onSelect: function (inst, event) {
                UR.androidRefresh(true)
                $(document).trigger('change.bs.date', inst);
            }
        }

        this.$date.mobiscroll().date(option);
    }
}
$(function () {
    List.init();
})
