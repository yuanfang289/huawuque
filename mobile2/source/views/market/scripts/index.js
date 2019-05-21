//= include ../../../public/plugins/template.js
//= include ../../../public/component/refresh/refresh.js
//= include ../../../public/component/tab/tab.js

var Index = {
    init: function() {
        this.carouselSlide();
        this.bindEvent();
        this.notice();
        this.filter('#uCompanyTabs');
        UR.mainSlide('.index-slide');
        UR.mainSlide('.ad-swiper');
        $('#newCompany').tab();
        $('#uCompany').tab();
        $('#productList').tab();

        $('#tabUwu').tab({
            onAfter: function(e) {
                new Swiper(".swiper-fixed-ratio .swiper-uwu", {
                    slidesPerView: "auto",
                    setWrapperSize: true,
                    lazyLoading: true,
                    lazyLoadingInPrevNext: true
                });
            }
        });
    },
    // 横向滚动列表
    carouselSlide: function() {
        UR.carouselSlide('#newCompanyList', {
            cols: 2,
            marginRight: 36
        });
        UR.carouselSlide('#ushowList', {
            cols: 1,
            marginRight: 45
        });
        UR.carouselSlide('.swiper-helpclub', {
            cols: 2,
            marginRight: 32
        });
        UR.carouselSlide('.swiper-uwu', {
            cols: 2,
            marginRight: 32
        });
        UR.carouselSlide('.swiper-class', {
            cols: 2,
            marginRight: 32
        });
    },
    bindEvent:function() {
        $('body')
            .off('click','.filter-wrap a')
            .on('click','.filter-wrap a',function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $li = $(this).parent();
                var index = $li.index();
                var groups = $li.closest('.tab-box').find('.tab-group');
                $li.siblings().removeClass('active');
                $li.addClass('active');
                groups.hide();
                groups.eq(index).show();
            })
            .off('click','.create-btn')
            .on('click','.create-btn',function (e) {
                e.stopPropagation();
                e.preventDefault();
                DANativeApi.redirectTo({
                    url: "urwork://company/create?source=2"
                });
            })
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
    },
    filter:function (box) {
        var $li = $(box).find('li');
        var width = 1;
        for(var i = 0; i <= $li.length - 1; i++){
            width += Math.ceil($li.eq(i).outerWidth());
        }
        $(box).find('ul').css('width', width);
        new IScroll(box,{
            scrollX: true,
            scrollY: false,
            hScrollbar:false,
            vScrollbar : false,
            vScroll:false,
            disablePointer: true,   // 因谷歌升级需加以下两行
            disableTouch: false,
            click: true,
        })

    },
};

$(function() {
    Index.init();
});
