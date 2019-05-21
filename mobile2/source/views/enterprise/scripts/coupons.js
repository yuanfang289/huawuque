//= include ../../../public/component/refresh/refresh.js
//= include ./_formatted.js

var Page = {
    init: function () {
        //this.carouselSlide();
        this.lazy();
    },
    // 横向滚动列表
    /*carouselSlide: function () {
        var swiperParams = function () {
            return {
                slidesPerView: "auto",
                setWrapperSize: true,
                lazyLoading: true,
                lazyLoadingInPrevNext: true
            }
        };

        $('.swiper-fixed-ratio .swiper-packages .swiper-slide').css('width', '160px');
        new Swiper(".swiper-fixed-ratio .swiper-packages", swiperParams());
    },*/
    lazy: function () {
        $(".lazy").lazy({
            domain: 'static.urwork.cn'
        });


        $('[data-scroll="pullUp"]').on('pullup.bs.refresh', function (evt) {
            setTimeout(function () {
                $('.lazy').lazy({
                    // domain: ['pic.90sjimg.com', 'static.urwork.cn']
                });
            }, 0)
        }).on('renderdom.bs.refresh',function(){
                var $list = $('.coupon-list');
                //alert('代金券的高度：' + $list.height() + '屏幕的高度：' + $(window).height() + '头的高度：' + $('#header').height());
                //console.log($(window).height());
                //console.log($('#header').height());
                if($list.height() < ($(window).height() - 45)) {
                    $('.crosswise-full-btn').addClass('bottom-fixed');
                }     
        })
    }
};
$(function () {
    Page.init();
});


