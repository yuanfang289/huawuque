UR.mainSlide = function(selector, options) {
    new Swiper(selector, $.extend({
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 300,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        setWrapperSize: true,
        longSwipesRatio: 0.1,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
    }, options));
}
