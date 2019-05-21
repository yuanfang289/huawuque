/**
 * @author  zhanghaibin
 */

//= include ../../../public/component/tab/tab.js

var WorkshopDetail = {
    init: function() {
        this.popupWorkshopDeviceList();
        this.mainSlide();
        UR.moreText('#workshopResume');
        $('.comment-tab').tab();
    },
    popupWorkshopDeviceList: function() {
        $('body').on(UR.click, '#MoreDevice', function() {
            UR.popup('#workshopDeviceList', {
                closeHandler: function() {
                    document.removeEventListener('touchmove', prevent);
                }
            });
            var myScroll = new IScroll('#popupWorkshopDeviceList', {
                click: true,
                disablePointer: true,
                disableTouch: false
            });

            document.addEventListener('touchmove', prevent, false);
        }.bind(this));
        function prevent (e) { e.preventDefault(); }
    },
    mainSlide: function() {
        var $mainSlide = $('.main-slide'),
            $slideItem = $mainSlide.find('.swiper-slide');

        if ($slideItem.length > 1) {
            UR.mainSlide('.main-slide');
        }


        // team slide
        var $teamSlide = $('.team-slide'),
            $teamSlideItem = $teamSlide.find('.swiper-slide'),
            $imgs = $teamSlide.find('img');

        if ($teamSlideItem.length > 1) {
            new Swiper('.team-slide', {
                lazyLoading: true,
                pagination: '.swiper-pagination',
            });
        } else {
            $imgs.attr('src', $imgs.attr('data-src')).removeAttr('data-src');
        }


        var hotSubW = $(window).width() - 90 + 'px';
        $('.swiper-fixed-ratio .swiper-slide').css('width', hotSubW);
        // activity
        new Swiper('#activitySwiper', {
            slidesPerView: "auto",
            setWrapperSize: true,
            lazyLoading: true,
            lazyLoadingInPrevNext: true
        });
    },
};

$(function() {
    WorkshopDetail.init();
});
