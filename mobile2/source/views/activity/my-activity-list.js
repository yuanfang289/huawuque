/**
 * Created by yangf on 2017/5/9.
 */
    //= include ../../public/plugins/template.js
    //= include ../../public/component/refresh/refresh.js

var MyActivity={
        init:function () {

            $(".nav").on("click",this.navChange)
        },
        navChange:function  (e) {
            var Span=e.target;
            if(Span.tagName=="SPAN"){
                $(".nav li").hasClass("active")&&$(".nav li").removeClass("active");
                var $pull = $('[data-scroll="pullUp"]').on('pullup.bs.refresh', function(evt) {});
                var sign=$(Span).attr("sign");
                $pull.refresh({
                    searchStatus:sign
                });
                $(Span).parent().addClass("active");
            }
        }
    };
$(function () {
    MyActivity.init();
});
