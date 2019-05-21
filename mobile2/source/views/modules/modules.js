/**
 * Created by litingfeng on 16/09/21.
 * index.js
 */

var Index = {
    init: function() {
        this.mainSlide();
        this.carouselSlide();
        this.goto();
    },
    // banner轮播初始化
    mainSlide: function() {
        var slide = new Swiper('.index-slide', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            speed: 200,
            autoplay: 2500,
            autoplayDisableOnInteraction: false,
            followFinger: false,
            setWrapperSize: true,
            longSwipesRatio: 0.1,
            simulateTouch: false,
            lazyLoading : true,
            lazyLoadingInPrevNext : true,
        });
    },
    // 横向滚动列表
    carouselSlide: function() {
        var hotSubW = $(window).width() - 32 + 'px';
        var swiperParams = function() {
            return {
                slidesPerView: "auto",
                setWrapperSize: true,
                simulateTouch: false,
                lazyLoading: true,
                lazyLoadingInPrevNext: true
            }
        };

        $('.swiper-fixed-ratio .swiper-slide').css('width', hotSubW);
        new Swiper(".swiper-fixed-ratio .swiper-workstage", swiperParams());
        new Swiper(".swiper-fixed-ratio .swiper-activity", swiperParams());
        new Swiper(".swiper-fixed-ratio .swiper-recommend", swiperParams());
    },
    goto: function() {
        var goTop = function() {
            var $win = $(window);
            var winH = $win.height();
            var scrollTop = $win.scrollTop();
            if (scrollTop > winH / 100) {
                $('#goto').addClass('show-gotop');
            } else {
                $('#goto').removeClass('show-gotop');
            }
        };
        $('body').on('click', '.goback', function() {
            window.history.back();
        });
        $('body').on('click', '.gotop', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
        });
        goTop();
        $(window).scroll(function() {
            goTop();
        });
    },
};
$(function() {
    Index.init();
});
