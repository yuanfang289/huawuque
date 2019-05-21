/**
 * @author  zhanghaibin
 */
 //= include ../../../public/plugins/template.js
 //= include ../../../public/component/refresh/refresh.js
//= include ../../../public/component/tab/tab.js
//= include ../../../public/plugins/mobiscroll/scripts/mobiscroll.js

var WorkshopDetail = {
    init: function() {
        this.lazy();
        this.popupWorkshopDeviceList();
        this.mainSlide();
        this.selectInitDate();
        $('.comment-tab').tab();
        $('.tab-flex').tab({
            onAfter: function(e) {
                if (e.activeIndex == 1 && $('#workshopResume').attr('data-flag') == '0') {
                    UR.moreText('#workshopResume');
                    $('#workshopResume').attr('data-flag','1');
                }
            },
        });
    },
    lazy: function() {
        $('[data-scroll="pullUp"]').on('pullup.bs.refresh', (evt) => {
            setTimeout(() => {
                $('.lazy').lazy();
            }, 0);
        });
    },
    selectInitDate: function() {
        var that = this;

        $('body')
            .off('touchstart', '#startDate')
            .on('touchstart', '#startDate', function(evt) {
                evt.preventDefault();
                var _this = $(this);
                var flag = $('#startDate').attr('data-flag');
                // $(this).mobiscroll('option',{
                //      maxDate: new Date($('#endDate').val()),
                // })
                var $el = $('#startDate'),
                    target = $el.attr('data-target'),
                    $target = target ? $(`[name=${target}]`) : null;
                var date = new Date();
                // if (flag == '0') {
                    var optionEnterStart = {
                        startInput: true,
                        theme: 'android-holo-light',
                        mode: 'scroller',
                        display: 'modal',
                        lang: 'zh',
                        startYear: date.getFullYear(),
                        endYear: date.getFullYear() + 5,
                        // minDate: new Date($.dateFormat($('[name=endDate]').val()-(86400000*6), 'yyyy-MM-dd')),
                        minDate: date,
                        buttons: [
                            'cancel', 'set'
                        ],
                        preset: 'date',
                        dateFormat: 'yy-mm-dd',
                        onBeforeShow: function() {
                            UR.androidRefresh(false);
                        },
                        onCancel: function() {
                            UR.androidRefresh(true);
                        },
                        onSelect: function(event, inst) {
                            // console.log(new Date($('#endDate').val()));
                            UR.androidRefresh(true);
                            $target && $target.val(new Date(event).getTime());

                            var startYear = $.dateFormat($('[name=startDate]').val(), 'yyyy');
                            var startDay = $.dateFormat($('[name=startDate]').val(), 'yyyy-MM-dd');
                            $('[name=endDate]').val($('[name=startDate]').val());
                            var dayNum = ($('[name=endDate]').val() - $('[name=startDate]').val()) / 86400000 + 1;
                            if (dayNum > 0) {
                                $('#dayNum').show();
                                $('#dayNum').html('共' + dayNum + '天');
                            } else {
                                $('#dayNum').hide();
                            }
                            $('#dayNum').attr('data-total',dayNum);
                            $('#totalPrice').html('&yen;'+'0');
                            $('#endDate').val($('#startDate').val());
                            $.ajax({
                                url: '/leaseWorkStage/workStageLeaseInfos',
                                type: 'GET',
                                dataType: 'json',
                                data: {
                                    workStageId: UR.getBrowserParam().workStageId,
                                    start:$('#startDate').val(),
                                    end:$('#endDate').val(),
                                }
                            })
                            .done(function(res) {
                                var imgUrl = res.data.baseImgUrl;
                                var totalNum= $('#dayNum').attr('data-total');
                                var list = res.data && res.data.leaseInfo || [];
                                list.map(function(item){
                                    item.total = totalNum;
                                    item.imgSrc = imgUrl
                                });
                                $('#rentList').html(template('rentTplList', {list:list}));
                                return list;
                            });
                            // _this.attr('data-flag', '1');
                            //清空弹层信息
                            $('.fixed-box').html('');
                            $('.fixed-box').css('bottom','-50px');
                            $('#commodityNum').hide();
                            $('.uricon-bgw').attr('data-show-flag','0');
                        }
                    }
                    $el.mobiscroll().date(optionEnterStart);
                // }
                // else {
                //     var optionEnterStart = {
                //         startInput: true,
                //         theme: 'android-holo-light',
                //         mode: 'scroller',
                //         display: 'modal',
                //         lang: 'zh',
                //         startYear: date.getFullYear(),
                //         endYear: date.getFullYear() + 5,
                //         // minDate: new Date($.dateFormat($('[name=endDate]').val()-(86400000*6), 'yyyy-MM-dd')),
                //         minDate: date,
                //         buttons: [
                //             'cancel', 'set'
                //         ],
                //         preset: 'date',
                //         dateFormat: 'yy-mm-dd',
                //         onBeforeShow: function() {
                //             UR.androidRefresh(false);
                //         },
                //         onCancel: function() {
                //             UR.androidRefresh(true);
                //         },
                //         onSelect: function(event, inst) {
                //             UR.androidRefresh(true);
                //             $target && $target.val(new Date(event).getTime());

                //             var startYear = $.dateFormat($('[name=startDate]').val(), 'yyyy');
                //             var startDay = $.dateFormat($('[name=startDate]').val(), 'yyyy-MM-dd');

                //             var dayNum = ($('[name=endDate]').val() - $('[name=startDate]').val()) / 86400000 + 1;
                //             if (dayNum > 0) {
                //                 $('#dayNum').show();
                //                 $('#dayNum').html('共' + dayNum + '天');
                //             } else {
                //                 $('#dayNum').hide();
                //             }
                //             $('#rentList').refresh({
                //                 start: $('#startDate').val(),
                //                 end: $('#endDate').val()
                //             });
                //             //清空弹层信息
                //             $('.fixed-box').html('');
                //             $('.fixed-box').css('bottom','-50px');
                //             $('#commodityNum').hide();
                //             $('.uricon-bgw').attr('data-show-flag','0');
                //         }
                //     }

                //     $el.mobiscroll().date(optionEnterStart);
                // }
            })
            .off('touchstart', '#endDate')
            .on('touchstart', '#endDate', function(evt) {
                evt.preventDefault();
                // $(this).mobiscroll('option',{
                //      minDate: new Date($('#startDate').val()),
                // })
                var $el = $('#endDate'),
                    target = $el.attr('data-target'),
                    $target = target ? $(`[name=${target}]`) : null;
                var date = new Date();
                var optionEnterEnd = {
                    endInput: true,
                    theme: 'android-holo-light',
                    mode: 'scroller',
                    display: 'modal',
                    lang: 'zh',
                    startYear: $.dateFormat($('[name=startDate]').val(), 'yyyy'),
                    endYear: date.getFullYear() + 5,
                    minDate: new Date($('#startDate').val()),
                    // maxDate: new Date(date.getFullYear()),
                    buttons: [
                        'cancel', 'set'
                    ],
                    preset: 'date',
                    dateFormat: 'yy-mm-dd',
                    onBeforeShow: function() {
                        UR.androidRefresh(false);
                    },
                    onCancel: function() {
                        UR.androidRefresh(true);
                    },
                    onSelect: function(event, inst) {
                        $target && $target.val(new Date(event).getTime());
                        var endYear = $.dateFormat($('[name=endDate]').val(), 'yyyy');
                        var endDay = $.dateFormat($('[name=endDate]').val(), 'yyyy-MM-dd');

                        var dayNum = ($('[name=endDate]').val() - $('[name=startDate]').val()) / 86400000 + 1;
                        if (dayNum > 0) {
                            $('#dayNum').show();
                            $('#dayNum').html('共' + dayNum + '天');
                        } else {
                            $('#dayNum').hide();
                        }
                        $('#dayNum').attr('data-total',dayNum);
                        $('#totalPrice').html('&yen;'+'0');
                         $.ajax({
                            url: '/leaseWorkStage/workStageLeaseInfos',
                            type: 'GET',
                            dataType: 'json',
                            data: {
                                workStageId: UR.getBrowserParam().workStageId,
                                start:$('#startDate').val(),
                                end:$('#endDate').val(),
                            }
                        })
                        .done(function(res) {
                            var imgUrl = res.data.baseImgUrl;
                            var totalNum= $('#dayNum').attr('data-total');
                            var list = res.data && res.data.leaseInfo || [];
                            list.map(function(item){
                                item.total = totalNum;
                                item.imgSrc = imgUrl
                            });
                            $('#rentList').html(template('rentTplList', {list:list}));
                            return list;
                        });
                        //清空弹层信息
                        $('.fixed-box').html('');
                        $('.fixed-box').css('bottom','-50px');
                        $('#commodityNum').hide();
                        $('.uricon-bgw').attr('data-show-flag','0');
                    }
                }

                $el.mobiscroll().date(optionEnterEnd);
                $('#startDate').attr('data-flag', '1')

            })
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

        function prevent(e) {
            e.preventDefault();
        }
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
