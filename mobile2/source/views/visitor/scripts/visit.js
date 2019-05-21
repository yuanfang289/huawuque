//= include ../../../public/component/uploader/uploader.js
//= include ../../../public/plugins/mobiscroll/scripts/mobiscroll.js
//= include ../../../public/plugins/template.js
//= include _form-base.js
var Form = {
    init: function() {
        BaseForm.select();
        BaseForm.backOrClose();
        this.counter();
        this.initUserInfo();
        this.initWorkstage();
        this.initVisitWorkstage();
        this.initVisitedDate();
        this.initRenderState();
        UR.nativeShowShareButton(false);
    },
    ajaxPost: function(options) {
        BaseForm.post(options);
        Form.options = options;
    },
    counter: function() { // 初始化当前页面所有的富文本输入长度计算函数
        $('textarea').each(function() {
                if ($(this).attr('maxlength'))
                    UR.inputCounter(this);
            }
        );
    },
    initUserInfo:function () {
        $.ajax({
            url: '/workstageVisit/userInfo',
            // url: '/assets/views/visitor/data/userinfo.json',
            type: 'GET',
            dataType: 'json',
            error: function(xhr) {
                UR.msg('数据获取失败请刷新重试', {
                    delay: 2000
                })
            },
            success: function(res) {
                if (res.retCode != 0) {
                    // UR.msg(res.retMsg);
                    UR.setPassportUrl('login');
                    return;
                }
                if(res.data){
                    var name = res.data.realname;
                    var mobile = res.data.mobile;
                    var nationalCode = res.data.nationalCode;
                    var $name = $('[name="name"]');
                    var $mobile = $('[name="mobile"]');

                    $name.val(name);
                    $name.next().addClass('writed').html(name);
                    $mobile.val(mobile);
                    $mobile.next().removeClass('input-editor').addClass('writed').html('+' + nationalCode +  ' ' +  mobile);
                    $mobile.prev().addClass('hidden');
                }
            }
        })
    },
    initWorkstage: function() {
        $.ajax({
            url: '/workstageVisit/workstageList',
            // url: '/assets/views/visitor/data/workstageList.json',
            type: 'GET',
            dataType: 'json',
            error: function(xhr) {
                UR.msg('数据获取失败请刷新重试', {
                    delay: 2000
                })
            },
            success: function(res) {
                if (res.retCode != 0) {
                    UR.msg(res.retMsg);
                    return;
                }
                $('#workstageList').html(template('workstageTpl', res));
            }
        })
    },
    initVisitWorkstage: function() {
        var stageId = UR.getBrowserParam().workstageId;
        if(stageId){
            $.ajax({
                url: '/workstageVisit/workstageList',
                // url: '/assets/views/visitor/data/workstageList.json',
                type: 'GET',
                dataType: 'json',
                error: function(xhr) {
                    UR.msg('数据获取失败请刷新重试', {
                        delay: 2000
                    })
                },
                success: function(res) {
                    if (res.retCode != 0) {
                        UR.msg(res.retMsg);
                        return;
                    }
                    var data = res.data || [];
                    for(var i in data){
                        var insideDate = data[i];
                        for(var item in insideDate){
                            if(insideDate[item].id == stageId){
                                var stageName = insideDate[item].stageName;
                                break;
                            }
                        }
                    }
                    if(stageName){
                        $('#workstageId').val(stageId);
                        $('#workstageId_dummy').addClass('writed').html(stageName);
                    }
                }
            })
        }
    },
    initVisitedDate: function() {
        var $el     = $('#visitedDate'),
            target  = $el.attr('data-target'),
            $target = target ? $(`[name=${target}]`) : null;

        var date   = new Date();
        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            startYear: date.getFullYear(),
            endYear: date.getFullYear() + 1,
            minDate: date,
            buttons: [
                'cancel', 'set'
            ],
            preset: 'date',
            dateFormat: 'yy/mm/dd',
            onBeforeShow: function() {
                UR.androidRefresh(false)
            },
            onCancel: function() {
                UR.androidRefresh(true)
            },
            onSelect: function(event, inst) {
                UR.androidRefresh(true)
                $target && $target.val(new Date(event).getTime());
            }
        }

        $el.mobiscroll().date(option);
    },
    initRenderState:function () {
        var nationalCode = $('[name="nationalCode"]').val()
        var $smsvocode   = $('[smsvocode]');
        if (nationalCode == 86 || nationalCode == '86') {
            $smsvocode.show();
        } else {
            $smsvocode.hide();
        }

        $.ajax({
            url: '/workstageVisit/nationalCode',
            // url: '/assets/views/visitor/data/getNationalCodes.json',
            type: 'GET',
            dataType: 'json',
            error: function() {
                $('[national] i').remove();
            },
            success: function(res) {
                if (res.retCode !== 0) {
                    $('[national] i').remove();
                    return
                };
                var $body = $('body');
                var data, html = '';
                data = res.data || [];
                data.forEach(function(item) {
                    html += '<div class="state-items">';
                    html += renderSorted(item.sorted.toUpperCase());
                    html += '<ul>';
                    item.nationalCodeList.forEach(function(item) {
                        html += renderStateItem(item.region, item.nationalCode);
                    })
                    html += '</ul></div>';
                })

                $body.append(render(html));

                var layerIscroll = new IScroll('#nationalBody', {
                    mouseWheel: true,
                    scrollbars: true,
                    scrollY: true,
                    scrollX: false,
                    fadeScrollbars: true
                });
                layerIscroll.on('beforeScrollStart', bindPrevent)
                layerIscroll.on('scrollEnd', unbindPrevent)
                layerIscroll.on('IScrollTap', unbindPrevent)

                $body
                // 显示国家弹层
                    .on(UR.click, '[national]', function(e) {
                        e.preventDefault();
                        if (!$('#nationalLayer').length) return;

                        $('#nationalLayer').addClass('is-show');
                        $('html').addClass('full-screen');
                    })
                    // 关闭弹层
                    .on(UR.click, '#nationalLayer .close-layer', function(e) {
                        e.preventDefault();
                        closeLayer();
                    })
                    // 选国家
                    .on(UR.click, '.state-item', function(e) {
                        e.preventDefault();
                        var $this = $(this);
                        var code  = $this.attr('data-code');
                        var $smsvocode = $('[smsvocode]');

                        // $('.state-items .active').removeClass('active');
                        // $this.addClass('active');

                        $('[national] em').text(code);
                        $('[name=nationalCode]').val(code);

                        $('[has-sms-check]').trigger('input');

                        if (code == '86' || code == 86) {
                            $smsvocode.show();
                        } else {
                            $smsvocode.hide();
                        }
                        closeLayer();
                    })
            }
        });

        function prevent(e) {
            e.preventDefault();
        }
        function bindPrevent() {
            document.addEventListener('touchmove', prevent, false);
        }
        function unbindPrevent() {
            document.removeEventListener('touchmove', prevent);
        }

        function closeLayer() {
            $('#nationalLayer').removeClass('is-show');
            $('html').removeClass('full-screen');
        }

        function render(states) {
            var html  = '<section class="national-layer" id="nationalLayer">';
            html += '    <div class="layer-inner">';
            html += '        <header class="national-header">';
            html += '            <i class="nav-switch uricon-arrow-left close-layer"></i>';
            html += '            <span class="title">选择国家或地区</span>';
            html += '            <i class="icon-close close-layer"></i>';
            html += '        </header>';
            html += '        <div class="layer-body" id="nationalBody">';
            html += '            <div>';

            html += states;

            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
            html += '</section>';

            return html;
        }

        function renderStateItem(state, code) {
            var html  = '<li class="state-item" data-code="'+ code + '">';
            html += '    <div class="inner">';
            html += '        <span class="state">' + state + '</span>';
            html += '        <span class="code">+'+ code + '</span>';
            html += '    </div>';
            html += '</li>';

            return html;
        }

        function renderSorted(sorted) {
            return '<h2 class="sorted-symbol">' + sorted + '</h2>';
        }
    }
};

$(function() {
    Form.init();
});


