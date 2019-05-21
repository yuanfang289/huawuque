/**
 * Created by litingfeng on 16/09/21.
 * helpclub.js
 */

var Helpclub = {
    init: function() {
        // this.carouselSlide();
        this.tab();
    },
    // 横向滚动列表
    // carouselSlide: function() {
    //     var hotSubW = $(window).width() - 32 + 'px';
    //     $('.swiper-fixed-ratio .swiper-slide').css('width', hotSubW);
    //     new Swiper(".swiper-fixed-ratio .swiper-workstage", {
    //         slidesPerView: "auto",
    //         setWrapperSize: !0,
    //         simulateTouch: !1,
    //         lazyLoading: !0,
    //         lazyLoadingInPrevNext: !0
    //     });
    // },
    tab: function() {
        $('body')
            .off('touchend', '.tab-box li')
            .on('touchend', '.tab-box li', function() {
                var $this = $(this);
                var i = $this.index();
                $this.addClass('selected').siblings().removeClass('selected');
                $('.tab-con fieldset').eq(i).css('display', 'block').siblings().css('display', 'none');
            });
    }
};
$(function() {
    Helpclub.init();
});
