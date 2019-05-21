var Index = {
    init: function () {
        this.carouselSlide();

        $(".lazy").lazy({
            domain: 'static.urwork.cn'
        });
    },
    // 横向滚动列表
    carouselSlide: function () {
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
    },

};
$(function () {
    Index.init();
});
