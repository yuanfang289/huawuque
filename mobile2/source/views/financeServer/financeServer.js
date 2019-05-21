/**
 * Created by litingfeng on 16/09/21.
 * financeServer.js
 */

var FinanceServer = {
    init: function() {
        UR.mainSlide('.main-slide');
        this.carouselSlide();
    },
    // 横向滚动列表
    carouselSlide: function() {
        var swiperParams = function() {
            return {
                slidesPerView: "auto",
                setWrapperSize: true,
                simulateTouch: false,
                lazyLoading: true,
                lazyLoadingInPrevNext: true
            }
        };
        var itemWidth = ($(window).width() - 40);
        $('.swiper-fixed-ratio .swiper-slide').css('width', itemWidth + 'px');
        new Swiper(".swiper-fixed-ratio .circle-list", swiperParams());
    },
};

$(function() {
    FinanceServer.init();
});
