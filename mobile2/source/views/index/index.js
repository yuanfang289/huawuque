/**
 * Created by litingfeng on 16/09/21.
 * index.js
 */

//= include ../../public/component/tab/tab.js

var Index = {
    init: function() {
        UR.mainSlide('.index-slide');
        // UR.mainSlide('.info-slide');
        this.carouselSlide();
        this.notice();

        $(".lazy").lazy({
            domain: 'static.urwork.cn'
        });
        $('.tab').tab({
            onAfter: function(e) {
                new Swiper(".swiper-fixed-ratio .swiper-uwu", {
                    slidesPerView: "auto",
                    setWrapperSize: true,
                    lazyLoading: true,
                    lazyLoadingInPrevNext: true});
                }
        });
    },
    // 横向滚动列表
    carouselSlide: function() {
        var oneSubW = $(window).width() - 32 + 'px';
        var twoSubW = $(window).width()/2 - 16 + 'px';
        var swiperParams = function() {
            return {
                slidesPerView: "auto",
                setWrapperSize: true,
                lazyLoading: true,
                lazyLoadingInPrevNext: true
            }
        };

        $('.swiper-fixed-ratio .swiper-slide').css('width', oneSubW);
        $('.swiper-fixed-ratio .swiper-helpclub .swiper-slide').css('width', twoSubW);
        $('.swiper-fixed-ratio .swiper-uwu .swiper-slide').css('width', twoSubW);
        new Swiper(".swiper-fixed-ratio .swiper-workstage", swiperParams());
        new Swiper(".swiper-fixed-ratio .swiper-activity", swiperParams());
        new Swiper(".swiper-fixed-ratio .swiper-recommend", swiperParams());
        new Swiper(".swiper-fixed-ratio .swiper-helpclub", swiperParams());
        new Swiper(".swiper-fixed-ratio .swiper-uwu", swiperParams());
        new Swiper(".info-slide", {
             pagination: '.swiper-pagination',
        });
    },
    notice: function() {
        if ($('#notice .swiper-slide').length == 1) return;
        new Swiper('#notice', {
            loop: true,
            speed: 200,
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            direction: 'vertical',
            simulateTouch: false,
            onlyExternal: true
        })
    }
};
$(function() {
    Index.init();
});
