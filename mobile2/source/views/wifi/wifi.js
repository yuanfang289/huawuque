/**
 * Created by litingfeng on 16/11/10.
 * vip.js
 */


var Wifi = {
    init: function init() {
        this.duration();
    },
    duration: function duration() {
        $('body')
            .on('tap', '.vip-duration li,.pay-way li', function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                $("input[name=payType]").val($(this).attr("data-way"));
            })
            //     .on('touchstart', '.pay-privilege li', function () {
            //     var $this = $(this);
            //     var flag = parseInt($this.attr('data-flag'));
            //     if (!flag) {
            //         $this.addClass('selected');
            //         $this.attr('data-flag', '1');
            //     } else {
            //         $this.removeClass('selected');
            //         $this.attr('data-flag', '0');
            //     }
            // })
            .on('tap', '.vip-duration li', function () {
                var payWay = $(".pay-way .selected").attr("data-way");
                var month = $(this).attr("vip-month");
                $("input[name=month]").val(month);
                $.ajax({
                    url: "/member/a_order",
                    data: { payType: payWay, month: month },
                    type: "post",
                    success: function success(json) {
                        if (json == null || json == "") {
                            location.href = "/member/error";
                        }
                        $("#amount").html("&yen;" + json.amount + "元");
                        $("input[name=month]").val(json.month);
                        $("input[name=rate]").val(json.rate);
                        $("input[name=payType]").val(json.payType);
                        $("input[name=amount]").val(json.amount);
                    }
                });
            })
            .on("tap", "#vipCommit", function () {
                $('#loader').addClass('in');
                var requestParams = $("#memberForm").serializeArray();
                console.log($("#channel").val());
                $.ajax({
                    url: "/member/payment",
                    data: requestParams,
                    type: "post",
                    success: function (json) {
                        var status = json.retMsg, payRequest, paymentNo, payWay,paymentType;
                        payRequest = json.data.payRequest;
                        paymentNo = json.data.paymentNo;
                        payWay = json.data.payWay;
                        paymentType  = json.data.paymentType;

                        if ('success' == status) {
                            $("#loader").removeClass('in');
                            UR.setUrl('urwork://payment?' +
                                'paymentInfo=' + encodeURIComponent(payRequest) +
                                '&paymentNum=' + encodeURIComponent(paymentNo) +
                                '&payWay=' + encodeURIComponent(payWay) +
                                '&paymentType=' + encodeURIComponent(paymentType));
                        } else {
                            UR.msg("信息获取失败，请重试");
                        }
                    }
                });
        });
    }
};

jQuery(document).ready(function () {
    Wifi.init();
});
