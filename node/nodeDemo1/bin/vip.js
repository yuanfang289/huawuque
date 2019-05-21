"use strict";
var Vip = {
    init: function() {
        this.duration()
    },
    duration: function() {
        $("body").on("tap", ".vip-duration li,.pay-way li", function() {
            $(this).addClass("selected").siblings().removeClass("selected"), $("input[name=payType]").val($(this).attr("data-way"))
        }).on("tap", ".vip-duration li", function() {
            var a = $(".pay-way .selected").attr("data-way"),
                t = $(this).attr("vip-month");
            $("input[name=month]").val(t), $.ajax({
                url: "/member/a_order",
                data: {
                    payType: a,
                    month: t
                },
                type: "post",
                success: function(a) {
                    null != a && "" != a || (location.href = "/member/error"), $("#amount").html("&yen;" + a.amount + "鍏�"), $("input[name=month]").val(a.month), $("input[name=rate]").val(a.rate), $("input[name=payType]").val(a.payType), $("input[name=amount]").val(a.amount)
                }
            })
        }).on("tap", "#vipCommit", function() {
            $("#loader").addClass("in");
            var a = $("#memberForm").serializeArray();
            console.log($("#channel").val()), $.ajax({
                url: "/member/payment",
                data: a,
                type: "post",
                success: function(a) {
                    var t, e, n, o, p = a.retMsg;
                    t = a.data.payRequest, e = a.data.paymentNo, n = a.data.payWay, o = a.data.paymentType, "success" == p ? ($("#loader").removeClass("in"), UR.setUrl("urwork://payment?paymentInfo=" + encodeURIComponent(t) + "&paymentNum=" + encodeURIComponent(e) + "&payWay=" + encodeURIComponent(n) + "&paymentType=" + encodeURIComponent(o))) : UR.msg("淇℃伅鑾峰彇澶辫触锛岃閲嶈瘯")
                }
            })
        })
    }
};
jQuery(document).ready(function() {
    Vip.init()
});