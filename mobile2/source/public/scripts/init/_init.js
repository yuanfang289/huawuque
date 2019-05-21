UR.init = {
    init: function() {
        this.$dom = $(document);
        this.$html = $('html');
        this.$body = $('body');

        this.deviceType();
        this.imgClip();
        this.lazy();
        this.mainNav();
        this.goto();
        this.appDownloadVisible();
        this.iosWebViewScrollTop();
        this.pageBack();
        this.logout();
        this.surpriseLayer();
        this.companyLayer();
        this.loginFix();
    },
    deviceType: function() {
        var $body = this.$body,
            $html = this.$html;

        var clientTest = UR.clientTest;

        if (clientTest.isMobile) {
            $body.addClass('mobile');
        } else {
            $body.addClass('desktop');
        }

        if (clientTest.isAndroid) {
            $body.addClass('android-device');
        } else
        if (clientTest.isIos) {
            $body.addClass('ios-device');
        }

        if (clientTest.isQQ || clientTest.isWechat || clientTest.isQQBrowser) {
            $html.addClass('tencent-browser');
        }
        if (clientTest.isIphoneX) {
            $html.addClass('iphone-x');
        }

        if (window.webkit || window.androidJsInterface) {
            $html.addClass('is-app');
        }
    },
    // 懒加载
    lazy: function() {
        $(".lazy").lazy();
    },
    appDownloadVisible: function() {
        var $body = this.$body;
        var event = UR.click;
        var mainFooterHtml = [
            '<ul id="main-footer">',
            '    <li><a href="javascript:;" class="close"><i class="uricon-close"></i></a></li>',
            '    <li><img src="/public/images/ui/logo-download.png" class="logo"></li>',
            '    <li class="title"><h3>优客工场</h3><p>让平行世界的人相互遇见</p></li>',
            '    <li class="right">',
            '        <a href="/appDownload" class="btn btn-primary">立即下载</a>',
            '    </li>',
            '</ul>',
        ].join("");

        var isVisible = true;
        if (window.localStorage) {

            // 如果body存在no-downloadbar， 则不渲染下载条
            if ($body.attr('no-downloadbar') !== undefined) return;

            if (!localStorage.getItem('isVisibleDownload')) {
                var $appSource = $('[name=appSource]');
                if (!UR.isApp()) {
                    $body.addClass('has-download-bar').append(mainFooterHtml);
                }
            }
        }

        $body
            .off(event, '#main-footer .close')
            .on(event, '#main-footer .close', function(evt) {
                evt.preventDefault();
                $(this).closest('#main-footer').remove();
                $body.removeClass('has-download-bar');
                localStorage.setItem('isVisibleDownload', Date.now())
            });
    },
    //导航展示
    mainNav: function() {
        if (!$('#navItems').length) return;
        var myScroll = new IScroll('#navItems', {
            disablePointer: true,
            disableTouch: false,
            click: true
        });
        var $body = this.$body;
        var event = UR.click;

        var $navTab = $('.nav-tab');
        if ($navTab.length) {
            $body.addClass('has-nav-tab');
        }

        $body
            .off(event, '#mainNavShow')
            .on(event, '#mainNavShow', function(e) {
                e.preventDefault();
                $('#mainNavMask').addClass('main-nav-show');
                $('#main-nav').addClass('main-nav-show');
                $body.css('overflow', 'hidden');
                myScroll.refresh();
            })
            .off(event, '#mainNavHide, #mainNavMask')
            .on(event, '#mainNavHide, #mainNavMask', function(e) {
                e.preventDefault();
                $('#mainNavMask').removeClass('main-nav-show');
                $('#main-nav').removeClass('main-nav-show');
                $body.css('overflow', 'visible');
            })
            .off('touchmove', '#mainNavMask, #main-nav')
            .on('touchmove', '#mainNavMask, #main-nav', function(e) {
                e.preventDefault();
            });

        var oldScrollTop = 0, timer;
        function showHeader() {
            if ($body.attr('hold-header') !== undefined) return;
            clearTimeout(timer);
            timer = setTimeout(function() {
                var $win  = $(window);
                var winH  = $win.height();
                var scrollTop = $win.scrollTop();

                if (scrollTop > winH / 2) {
                    var subtr = scrollTop - oldScrollTop;
                    if (subtr >= 0) {
                        $body.addClass('hide-header');
                        oldScrollTop = scrollTop;
                    } else {
                        if (subtr < -60) {
                            $body.removeClass('hide-header');
                            oldScrollTop = scrollTop;
                        }
                    }
                } else {
                    $body.removeClass('hide-header');
                }
            }, 10);
        }
        $(window).scroll(showHeader);
    },
    //回到顶部
    goto: function() {
        var $body = this.$body;
        var event = UR.click;
        var goTop = function() {
            var $win = $(window);
            var winH = $win.height();
            var scrollTop = $win.scrollTop();
            if (scrollTop > winH) {
                $('#goto').addClass('show-gotop');
            } else {
                $('#goto').removeClass('show-gotop');
            }
        };
        $body.on(event, '.goback', function() {
            window.history.back();
        });
        $body.on(event, '.gotop', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'fast');
        });
        goTop();
        $(window).scroll(goTop);
    },
    iosWebViewScrollTop: function() {
        if (UR.clientTest.isIos && UR.isApp()) {
            window.setTimeout(function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
            }, 0);
        }
    },
    pageBack: function() {
        this.$body.on(UR.click, '#pageBack, .js-pageback', function(e) {
            e.preventDefault();
            var $this = $(this);
            if (UR.clientTest.isWechat && history.length === 1) {
                location.replace(UR.getHost().origin.origin);
                return;
            }

            if ($this.attr('native') !== undefined && UR.isApp()) {
                if (DANativeApi && DANativeApi.isNewApi) {
                    DANativeApi.navigateBack();
                } else {
                    UR.nativeWebFinish();
                }
                return;
            }

            if ($this.attr('blank') !== undefined && history.length === 1 && !UR.isApp()) {
                location.replace(UR.getHost().origin.origin);
                return;
            }

            history.back();
        })
    },
    logout: function() {
        this.$body.on(UR.click, '.logout', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/logout',
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    if (res.retCode == 0) {
                        UR.msg(res.retMsg, {
                            handler: function() {
                                location.reload();
                            }
                        });
                    } else {
                        UR.msg(res.retMsg);
                    }
                },
                error: UR.ajaxError
            })
        })
    },
    imgClip: function() {
        // 一般用在swiper上
        var t;
        setSrc();

        function setSrc() {
            $('[require-clip]').each(function() {
                var $wrap = $(this);
                var wrapWidth  = $wrap.innerWidth() * 2,
                    wrapHeight = $wrap.innerHeight() * 2;

                wrapWidth  = wrapWidth  > 1000 ? 1000 : wrapWidth;
                wrapHeight = wrapHeight > 1000 ? 1000 : wrapHeight;

                var clipRule = '?imageMogr2/thumbnail/!' + wrapWidth + 'x' + wrapHeight + 'r/gravity/Center/crop/' + wrapWidth + 'x' + wrapHeight;

                var style = $wrap.attr('style') || '';
                var isBackgroundImage = style && style.indexOf('background-image') != -1;
                var isDataSrc = $wrap.attr('data-src');

                if (isBackgroundImage || isDataSrc) {    // 采用背景图方式
                    var bgSrc   = style.split(/(background-image:[\s]*url\(['"]*)/)[2] || '';
                        bgSrc   = bgSrc.split(/['"]*\)/)[0];

                    var dataSrc = $wrap.attr('data-src'),
                        imgSrc  = parseUrl(dataSrc || bgSrc) + clipRule;

                    var reg = /http[s]*:\/\//;
                    if ((dataSrc && !reg.test(dataSrc)) || (bgSrc && !reg.test(bgSrc))) return;

                    if (dataSrc) {
                        $wrap.css("background-image", 'url(' + imgSrc + ')').removeAttr('data-src');
                        // $wrap.attr('data-src', imgSrc);
                    } else {
                        $wrap.css("background-image", 'url(' + imgSrc + ')');
                    }

                } else {    // 采用Img图片方式
                    var $img    = $wrap.children('img'),
                        dataSrc = $img.attr('data-src'),
                        src     = $img.attr('src'),
                        imgSrc  = parseUrl(dataSrc || src) + clipRule;

                    var reg = /http[s]*:\/\//;
                    if ((dataSrc && !reg.test(dataSrc)) || (src && !reg.test(src))) return;

                    if (dataSrc) {
                        $img.attr('data-src', imgSrc);
                    } else {
                        $img.attr('src', imgSrc);
                    }
                }
            });
        }

        window.addEventListener('resize', function() {
            clearTimeout(t);
            t = setTimeout(setSrc, 1000);
        }, false);

        function parseUrl(url) {
            return (url || '').split('?imageMogr2')[0];
        }
    },
    surpriseLayer: function() {
        var $dom = this.$dom;
        $dom.on('click', '.surprise-layer .layer-close', function() {
            var $this = $(this), $wrap = $this.closest('.surprise-layer');
            $wrap.removeClass('in');
            UR.androidRefresh(true);

            var hideEvent  = $.Event('ur.layer.hide', {
                relatedTarget: $wrap[0],
            });
            $dom.trigger(hideEvent);
        })
    },
    companyLayer: function() {
        var $body = this.$body;
        $body.on('click', '[data-toggle=more-info]', function(e) {
            e.preventDefault();
            UR.companyLayer(this);
            $body.css('overflow', 'hidden');
        })
    },
    loginFix: function() {
        this.$body.on('click', '[data-toggle=loginHold]', function(e) {
            e.preventDefault();
            var href = this.dataset.href;
            UR.isLogin(function() {
                if (UR.isApp()) {
                    DANativeApi.navigateTo({
                        url: UR.host + href
                    })
                } else {
                    UR.setUrl(href);
                }
            }, function() {
                UR.toLogin()
            })
        })
    }
};

$(function() {
    UR.init.init();
});
