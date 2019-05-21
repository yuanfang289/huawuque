//= include ../../../public/plugins/template.js
//= include ../../../public/component/refresh/refresh.js

var WorkshopList = {
    initCityCode: null,
    init: function() {
        this.initHasCityCode();
        this.carouselSlide();
        this.cityMenu();
        this.relocation();
    },
    initHasCityCode: function () {
        var cityCode = UR.getBrowserParam().cityCode;
        var $a = $('#cityNavScroll').find('li a');
        if(cityCode) {
            this.initCityCode = cityCode;
            $a.removeClass('active');
            for(var i = 0;i < $a.length;i ++) {
                if($a.eq(i).attr('data-id') == cityCode) {
                    $a.eq(i).addClass('active');
                }
            }
        }
    },
    carouselSlide: function() {
        var hotSubW = $(window).width() - 32 + 'px';

        $('#citySwiper .swiper-slide').css('width', '115px');
        $('#citySwiper').show();

        new Swiper("#citySwiper", {
            slidesPerView: "auto",
            setWrapperSize: true,
            lazyLoading: true,
            lazyLoadingInPrevNext: true
        });
    },
    cityMenu: function() {
        var $body = $('body'),
            $win = $(window);

        // 横向导航
        var $cityNavScroll = $('#cityNavScroll');
        var cityNavScroll = new IScroll('#cityNavScroll', {
            disablePointer: true,
            disableTouch: false,
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            tap: 'IScrollTap'
        });
        cityNavScroll.on('beforeScrollStart', bindPrevent)
        cityNavScroll.on('scrollEnd', unbindPrevent)
        $cityNavScroll.on('IScrollTap', unbindPrevent)

        // 弹层导航
        var cityMenu = new IScroll('#cityMenu',  {
            disablePointer: true,
            disableTouch: false,
            click: true,
            tap: 'IScrollTap'
        });
        cityMenu.on('beforeScrollStart', bindPrevent)
        cityMenu.on('scrollEnd', unbindPrevent)
        cityMenu.on('IScrollTap', unbindPrevent)

        function prevent(e) {
            e.preventDefault();
        }
        function bindPrevent() {
            document.addEventListener('touchmove', prevent, false);
        }
        function unbindPrevent() {
            document.removeEventListener('touchmove', prevent);
        }

        // 城市swiper触发筛选
       var $citySwiper = $('#citySwiper'),
           $cityItem = $citySwiper.find('a');

       $cityItem.on('click', function (e) {
           e.preventDefault();
           var cityId = $.trim($(this).attr('data-id'));
           if (cityId == 'all') {
               $cityNavScroll.find('.all [data-id]').trigger('tap');
               cityNavScroll.scrollToElement('#cityNavScroll .all', 500);
               return;
           }
           $cityNavScroll.find('[data-id=' + cityId + ']').trigger('tap');
           cityNavScroll.scrollToElement('#cityNavScroll .city' + cityId, 500);
       });

        // 导航吸附
        var $cityNavLayout = $('#cityNavLayout'),
            $cityNav = $('#cityNav'),
            $header  = $('#header');

        var pullShow,
            isFixed = false;

        $win.on('scroll', cityNavFixed);

        function cityNavFixed(e) {
            var cityNavTop = $cityNavLayout.offset().top,
                scrollY    = this.scrollY,
                headerH    = $header.height();

            if (scrollY >= cityNavTop - headerH) {
                $cityNav.addClass('fixed');
            } else {
                $cityNav.removeClass('fixed');
            }
        }

        // 城市弹层
        var $cityMenuLayer = $('#cityMenuLayer');

        $body
            .on(UR.click, '#menuBtn', showLayerHandler)
            .on(UR.click, '#cityMenuLayer .close-btn', hideLayerHandler)

        function showLayerHandler(e) {
            $cityMenuLayer.addClass('active');
            UR.androidRefresh(false);
        }
        function hideLayerHandler(e) {
            $cityMenuLayer.removeClass('active');
            UR.androidRefresh(true);
        }

        var initData = this.initCityCode ? {
            cityCode: this.initCityCode
        } : {};
        // 更新社区列表
        var fetchWorkstage = $('#workshopList').refresh({
            url: '/workstage/list',
            url: '/assets/views/workshop/data/list.json',
            template: 'tplList',
            isFirstLoad: true,
            pageSize: 5,
            data: initData,
            formatted: function(res) {
                var data = res.data || {};
                var list = data.result || [];
                list.map(function(item) {
                    item.averageScore = item.averageScore * 20;
                })
                return list;
            }
        });

        fetchWorkstage.on('pullup.bs.refresh', function(evt) {
            setTimeout(function() {
                $('.lazy').lazy();
            }, 0)
        });

        $('body').on(UR.click, '#cityNavScroll a, #cityMenu a', function(e) {
            var $this = $(this),
                dataId = $.trim($this.attr('data-id')),
                $cityMenu = $this.closest('#cityMenu'),
                $cityNavScroll = $this.closest('#cityNavScroll');

            if ($cityMenu.length) {
                var $cityNav  = $('#cityNavScroll'),
                    $active   = $cityNav.find('[data-id=' + dataId + ']');

                WorkshopList.closeCityMenuLayer();
                $cityNav.find('.active').removeClass('active');
                $active.addClass('active');
                cityNavScroll.scrollToElement('#cityNavScroll .city' + dataId, 500);
            }

            if ($cityNavScroll.length) {
                $cityNavScroll.find('.active').removeClass('active');
                $this.addClass('active');
            }

            fetchWorkstage.refresh({
                cityCode: dataId
            })
        })
    },
    closeCityMenuLayer: function() {
        $('#cityMenuLayer').removeClass('active');
    },
    geolocation: function(handler, errorHandler) {
        if (!navigator.geolocation) return;

        function success(position) {
            handler && handler(position.coords.longitude.toFixed(5), position.coords.latitude.toFixed(5));
        }
        function error(e) {
            console.log(e.message)
            errorHandler && errorHandler(e.message);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    },
    onLocationChanged: function (lon, lat) {
        // alert(lon+ '， '+ lat);
        WorkshopList.fetchNearbyWorkshop(lon, lat);
    },
    // nearbyWorkshop: function(opts) {
    //     var $nearby = $('#nearbyWorkshop'),
    //         $link   = $nearby.find('a'),
    //         $name   = $nearby.find('.workshop-name'),
    //         $desk   = $nearby.find('.booking-desk');
    //
    //     var deskMsg     = $desk.attr('data-msg'),
    //         deskText    = opts.rentStationNum + deskMsg;
    //
    //     $link.attr('href', opts.href);
    //     $name.text(opts.stageName);
    //     $desk.text(deskText);
    //     $nearby.show();
    // },
    nearbyWorkshop: function(opts) {
        typeof opts == 'undefined' && (opts = {});

        var $nearby = $('#nearbyWorkshop');
        $nearby.html(template('tplNearby', opts)).show();
        $nearby.parent().show();
    },
    getPrefix: function () {
        var styles = window.getComputedStyle(document.documentElement, '');
        var core   = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
        return core;
    },
    relocation: function () {

        $('body')
            .off('click', '#relocation')
            .on ('click', '#relocation', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                if (UR.isApp()) {
                    UR.dialog.confirm({
                        title: '<p class="text-center">打开“定位服务”来允许“优客工场”获取您的位置</p>',
                        message: '<p>在“设置→隐私→定位服务”中开启定位服务。</p>',
                        buttons: {
                            no: {
                                label: '取消',
                                fn: function(dialog) {
                                }
                            },
                            yes: {
                                label: '设置',
                                fn: function(dialog) {
                                    // window.jsInterface && window.jsInterface.startLocation && window.jsInterface.startLocation();
                                    window.location.href = "urwork://systemSettings";
                                }
                            }
                        }
                    });
                } else {
                    UR.dialog.alert({
                        title: '<p class="text-center">您未开启手机的定位服务</p>',
                        message: '<p>在系统设置中打开定位服务允许浏览器获取您的位置</p>',
                        buttons: {
                            ok: {
                                label: '确定',
                                fn: function() {

                                }
                            },
                        }
                    });
                }


            })
    },
};

$(function() {
    WorkshopList.init();
})
