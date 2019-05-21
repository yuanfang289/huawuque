/**
 * Created by zhangguoying on 2016/12/21.
 */

var Page = {
    init: function () {
        this.$render = $('[data-render="template"]');

        this.browser = UR.getBrowserParam();

        this.render();

        this.redis = null;

        this.select(function (ids, money) {

            this.browser.couponIds   = ids;
            this.browser.couponMoney = money;

            this.redirect();

        }.bind(this));
    },
    redirect: function () {
        window.location.href = this.redirectUrl + "?" + UR.toParam(this.browser);
    },
    getCouponName: function (strType) {
        return ["长租工位优惠券",
            "时租工位优惠券",
            "长租会议室优惠券",
            "时租会议室优惠券",
            "电商优惠券"][strType - 1];
    },
    formatted: function (data) { // 服务器数据转化
        var that = this;

        this.redis = data.data || {};

        var list = data.data.list || [];

        var couponIdArray = [];
        if (this.browser.couponIds) {
            couponIdArray = this.browser.couponIds.split(',');
        }

        list.map(function (node) {
            if (node.startDate) {
                node.startDate = $.dateFormat(node.startDate, 'yy/MM/dd');
            }
            if (node.endDate) {
                node.endDate = $.dateFormat(node.endDate, 'yy/MM/dd');
            }

            node.checked = $.inArray(node.couponCode, couponIdArray) != -1;

            node.strType = that.getCouponName(node.strType);
        });

        return list;
    },
    render: function () { // 渲染页面
        var that = this;

        UR.template({
            data: {
                stationId: this.browser.id,
                date: this.browser.date,
                source: 4
            },
            renderRedis: function (res) {
                return {list: that.formatted(res)};
            },
        });
    },
    select: function (callback) {
        var that     = this;


        var ids      = [],
            moneySum = 0;

        if (this.browser.couponMoney) {
            moneySum = +this.browser.couponMoney;
            if (this.browser.couponIds.indexOf(",") != -1) {
                ids = ids.concat(this.browser.couponIds.split(","));
            } else {
                ids.push(this.browser.couponIds);
            }
        }


        $(document)
            .off(UR.click, '.coupon-item')
            .on(UR.click, '.coupon-item', function (evt) {
                evt.preventDefault();

                var $this = $(this);

                var id    = $.trim($this.attr('data-id')),
                    money = +$.trim($this.attr('data-num')),
                    pos   = $.inArray(id, ids)

                $this.removeAttr("checked");

                if (pos != -1) {
                    ids.splice(pos, 1);
                    moneySum -= money;
                } else {
                    if (moneySum < that.redis.price) {
                        ids.push(id);
                        moneySum += money;
                        $this.attr('checked', true);
                    } else {
                        UR.msg("您选择的优惠券已超出实付金额");
                    }
                }
            })
            .off(UR.click, '.btn')
            .on(UR.click, '.btn', function (evt) {
                evt.preventDefault();

                callback && callback(ids.join(','), moneySum);

            });
    }
}

$(function () {
    Page.init();
})
