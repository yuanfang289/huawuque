'use strict';

/**
 * Created by Administrator on 2018/6/5.
 */
var listHeight = [];
var bannerH = $('.banners').outerHeight(); //获取banner高度
var topH = $('#titlebar').outerHeight(); //获取头部导航栏高度
var topAllh=bannerH+topH;
// var topAllx=topAllh + 43;
var topHeight = bannerH - 45; //总高度
var bodyH = $(document).outerHeight(); //获取容器的高度
var contentH = bodyH - 45 - 49;
//获得所有list高度
function culateHeight() {
    var height = null;
    for (var i = 0; i < $('#goods-list ul li').size(); i++) {
        var _cliHeight = $('#goods-list ul li').eq(i)[0];
        height += _cliHeight.clientHeight;
        listHeight.push(height);
    }
    // console.log(listHeight)
};

function scrollTo(obj, index) {
    if (!index && index !== 0) {
        return;
    }
    if (index < 0) {
        index = 0;
    } else if (index > listHeight.length - 2) {
        index = listHeight.length - 2;
    }
    obj.scrollToElement($('#goods-list ul li').eq(index)[0], 100);
}

function scrollY(newY,scroll) {
    for (var i = 0; i < listHeight.length - 1; i++) {
        var height1 = listHeight[i];
        var height2 = listHeight[i + 1];
        // console.log(height1,height2,newY)
        if (-newY >= height1 && -newY < height2) {
            addActive(i + 1,scroll);
            return;
        } else if (-newY < height1) {
            addActive(0,scroll);
            return
        }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限

    addActive(listHeight.length - 2,scroll);
    //currentIndex = listHeight.length - 2;
}
//添加删除class名
function addActive(index,conterntScroll) {
    if(!conterntScroll.wrapperHeight - conterntScroll.scrollerHeight == conterntScroll.y){
        $('#left-menu ul li a').removeClass('active');
        $('#left-menu ul li').eq(index).find('a').addClass('active');
    }

}
//商品列表操作
function init() {
    var $uGiftModel = $('#uGiftModel');
    window.moda = {}; //购物车渲染列表
    // $('.content').css('height', contentH);
    $('.content').css('top', topAllh);
    // if($('.wrapper ').is('.iphone-x')){
    //     $('.content').css('top', topAllx);
    // }
    var modalHeight = $('.modal').outerHeight();
    var scrollEnd = false;

    var $conterntScroll = $('#goods-list');

    var leftMenu = new IScroll('#left-menu', {
        probeType: 3,
        hScrollbar: false,
        vScrollbar: false,
        disableTouch: false,
        disablePointer: true,
        preventDefault: false,
        mouseWheel: true,
        click: true
    });
    var conterntScroll = new IScroll('#goods-list', {
        probeType: 3,
        hScrollbar: false,
        vScrollbar: false,
        disableTouch: false,
        disablePointer: true,
        preventDefault: false,
        mouseWheel: true
    });
    conterntScroll.on('scroll', bindPrevent);
    conterntScroll.on('scrollEnd', bindPrevent);
    culateHeight();

    //页面滑动
    // $(window).scroll(function () {
    //     var s = $(window).scrollTop();
    // //判断如果不是在app里面 内容区据顶部一个导航栏的高度  否则是0（在app里没有title导航栏）
    //     if (!UR.isApp()) {
    //         $('.content').css('top', topH);
    //         if (s >= bannerH) {
    //             $('.content').css({ position: 'fixed' });
    //
    //             // $('.content').css('height',bodyH);
    //             conterntScroll.refresh();
    //             leftMenu.refresh();
    //         }
    //     } else {
    //         $('.content').css('top', 0);
    //         if (s >= topHeight) {
    //             $('.content').css({ position: 'fixed' });
    //             // $('.content').css('height',contentH);
    //             conterntScroll.refresh();
    //             leftMenu.refresh();
    //         }
    //     }
    // });

    function prevent(e) {
        e.preventDefault();
    }
    function bindPrevent() {
        var y = this.y;
        scrollY(y,conterntScroll);

//判断页面iscroll大于0  内容区回原位  刷新iscroll
//         if (y > 0) {
//             if (!UR.isApp()) {
//                 $('.content').css({ position: 'static', top: topH });
//             } else {
//                 $('.content').css({ position: 'static', top: 0 });
//             }
//             conterntScroll.refresh();
//             leftMenu.refresh();
//         }
        document.addEventListener('touchmove', prevent, false);
    }
    function unbindPrevent() {
        document.removeEventListener('touchmove', prevent);
    }
    //banner
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 200,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        simulateTouch: false,
        pagination: '.swiper-pagination',
        touchMoveStopPropagation: false
    });
    //加
    $('.cart-add').click(function () {
        var n = $(this).prev().text();
        var name = $(this).parent().parent().find('h3').text();
        var price = $(this).parent().parent().find('.sum').attr('data-price');
        var id = $(this).parent().parent().find('.cart-count').attr('data-id');
        var skuId = $(this).parent().parent().find('h3').attr('data-id');
        $(this).parent().find('.cart-count').css('opacity', 1);
        var num = parseInt(n) + 1;
        if (num == 0) {
            delete moda[id];
            return;
        }
        if(num < 0){
            num = 0;
        }
        moda[id] = {
            skuId: skuId,
            num: num,
            name: name,
            price: price,
            id: id
        };
        $(this).prev().text(num);
        $(this).parent().find('.cart-decrease').removeClass('rotateIn');
        $(this).parent().find('.cart-decrease').addClass('rotateOut');
        setTotal();
    });
    //减
    $('.cart-decrease').click(function () {
        var n = $(this).next().text();
        var name = $(this).parent().parent().find('h3').text();
        var price = $(this).parent().parent().find('.sum').attr('data-price');
        var id = $(this).parent().parent().find('.cart-count').attr('data-id');
        var skuId = $(this).parent().parent().find('h3').attr('data-id');
        var num = parseInt(n) - 1;
        if (num == 0) {
            $(this).parent().find('.cart-count').css('opacity', 0);
            $(this).parent().find('.cart-decrease').removeClass('rotateOut');
            $(this).parent().find('.cart-decrease').addClass('rotateIn');
            delete moda[id];
        } else {
            moda[id] = {
                skuId: skuId,
                num: num,
                name: name,
                price: price,
                id: id
            };
        }
        if(num < 0){
            num = 0;
        }
        $(this).next().text(num);
        setTotal();
    });

    //点击购物车
    $('.shoppingTap').click(function () {
        $('.modal').toggleClass('in');
        $('.sharebg').toggleClass('sharebg-active');
        $('html,body').toggleClass('ovfHiden');
        cartShop();
        setTotal();
        totalScroll.refresh();
    });
    $('.sharebg').click(function () {
        $('.modal').removeClass('in');
        $('.sharebg').removeClass('sharebg-active');
        $('html,body').removeClass('ovfHiden');
    });
    setTotal();

    //初始化
    var totalScroll = new IScroll('#modalBody', {
        hScrollbar: false,
        vScrollbar: false,
        disableTouch: false,
        disablePointer: true,
        preventDefault: false,
        mouseWheel: true
    });
    var $leftMenu = $('#left-menu'),
        $menuItem = $leftMenu.find('a');

    $menuItem.on('click', function (e) {
        e.preventDefault();
        var index = $(this).parent().index();
        var menuId = $.trim($(this).attr('data-id'));
        scrollTo(conterntScroll, index);
        $(this).addClass('active').parents('li').siblings('li').children('a').removeClass('active');

    });
}
