UR.carouselSlide = function(target, options) {
    var $target = $(target);
    var winWidth = $(window).width();
    var opts = $.extend({
        cols: 1,
        marginRight: 32
    }, options);
    var slideWidth = (winWidth - opts.marginRight) / opts.cols;

    $target.parent().css('overflow', 'hidden');
    $target.css('overflow', 'visible');
    $target.find('.swiper-slide').css({
        width: slideWidth
    });

    return new Swiper(target, {
        slidesPerView: "auto",
        setWrapperSize: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true
    })
};
