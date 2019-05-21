UR.scaleSlide = function (selector, options) {
    var dom = selector ? selector : '.transform-scale-slide';
    var slideWidth = $(window).width() - 40 + 'px';
    $(dom + ' .swiper-slide').css('width', slideWidth);
    new Swiper(dom, $.extend({
        slidesPerView: "auto",
        setWrapperSize: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        loop: true,
        pagination: '.swiper-pagination',
    },options))
}
