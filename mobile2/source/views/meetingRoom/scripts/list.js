//= include ../../../public/plugins/mobiscroll/scripts/mobiscroll.js

//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/modal/modal.js


var List = {
    //-
    init: function () {
        this.$pull   = $('[data-scroll="pullUp"]');
        this.$filter = $('.search-wrapper');
        this.format  = this.$filter.attr('data-type');
        this.query   = {
            meetingRoomDate: $.dateFormat(new Date(), this.format),
            plantId: "",
        }

        this.initFilter(() => {
            this.search();

            this.$date   = $('.input-text');
            this.date();

            this.render();

        });
        this.modal();
        this.selectTime();
    },
    redirect: function (url, ajaxUrl, fn) {
        var that = this;
        $(document)
            .off(UR.click, '.booking')
            .on(UR.click, '.booking', function(evt) {
                evt.preventDefault();
                var _this = $(this);
                console.log
                if(_this.hasClass('disabled')){
                    console.log(1)
                }else{
                    console.log(2)

                    let $this = $(evt.target);

    //                    if ($this.attr('disabled')) return false;

                    let $toolbar = $this.closest('.tool-action'),
                        id       = $toolbar.attr('data-id'),
                        range    = $toolbar.find('[data-set="timeRange"]').text().split('-'),
                        type     = $toolbar.attr('data-type');

                    let href     = url + "?meetingRoomId=" + id
                        + "&startTime=" + range[0]
                        + "&endTime=" + range[1]
                        + "&plantId=" + that.query.plantId
                        + "&selectDate=" + that.query.meetingRoomDate
                        + "&meetingType=" + type;

                    if (type == 0) {
                        $.ajaxGet({
                            url: ajaxUrl,
                            data: {
                                meetingRoomId: id,
                                startTime: that.query.meetingRoomDate,
                                orderTimeLength: $toolbar.find('[data-set="hour"]').text(),
                            },
                            success: (ref) => {
                                if (ref.retCode != 0) {
                                    UR.msg(ref.retMsg);
                                    return;
                                }
                                if (ref.retCode == 0) {
                                    fn && fn(ref.retCode);
                                    location.replace(href);
                                }
                            }
                        });
                    } else {
                        location.replace(href);
                    }
                }
            });
    },
    render: function (isNotInit) {
        if (isNotInit) {
            $('[data-render="template"]')
                .html('<div class="rendering"><div class="img-box"><div class="img"></div></div><p>正在加载 . . .</p></div>')
                .removeClass('rendered');
        }
        let that = this;

        var _stage = UR.localStorage({
            name: 'ur.mobile.meetingStage',
            dataType: 'json'
        });

        if (_stage.id) {
            that.query.plantId = _stage.id;

            $('[data-set="plantId"]')
                .find('span').text(_stage.name);

            $('#plantIdModal').attr('data-val', _stage.id);
        }

        UR.template({
            data: that.query,
            templateId: 'tlpList',
            renderRedis: function (res) {
                var num = function(d) {
                    d = '0' + d;
                    return d.substr(d.length - 2);
                }
                var list = res.data || [];
                list.map(function(node) {
                    node.timeline = [];
                    var reserveTime = node.reserveTime ? node.reserveTime.split(',') : [];
                    var reserveOrderMap = node.reserveOrderMap ? node.reserveOrderMap : {};
//                        reserveTime = JSON.stringify(reserveTime);
                    for (var i = node.openStarttime; i < node.openEndtime; i ++) {
                        node.timeline.push({
                            className: $.inArray(i+'', reserveTime) != -1 ? 'disabled' : '',
                            label: i % 2 == 0 ? i / 2 +'时' : '',
                            id: i,
                        });
                    }
                    if(reserveOrderMap){
                        for(var j in reserveOrderMap){
                            for(var k in node.timeline){
                                if(node.timeline[k].id == j){
                                    node.timeline[k].reserveUsername = reserveOrderMap[j].reserveUsername || '';
                                    node.timeline[k].reserveCompany = reserveOrderMap[j].reserveCompany || '';
                                    node.timeline[k].meetingTheme = reserveOrderMap[j].meetingTheme || '';
                                }
                            }
                        }
                        // console.log(node.timeline);
                    }
                    node.width = (node.openEndtime - node.openStarttime) * 42;
                });
                that.ajaxList = list;
                return {list: list};
            },
            callback: function (res) {

                var data = res.data ? res.data[0] : null;
                if ((!_stage || !_stage.id) && data) {
                    UR.localStorage({
                        type: 'set',
                        name: 'ur.mobile.meetingStage',
                        values: {
                            id: data.rentPlantId,
                            name: data.rentPlantName
                        },
                        dataType: 'json',
                    });

                    $('[data-set="plantId"]')
                        .find('span').text(data.rentPlantName);

                    $('#plantIdModal').attr('data-val', data.rentPlantId);


                }


                that.initSelectTime();
                that.info = {};
                $('.lazy').lazy({
                    // domain: ['pic.90sjimg.com', 'static.urwork.cn']
                });
            }
        });
    },
    initSelectTime: function () {
        if (this.query.meetingRoomDate != $.dateFormat(new Date(), this.format)) return false;

        let d      = new Date(),
            hour   = d.getHours(),
            minute = d.getMinutes();

        let current = hour * 2 ;
        if (minute < 30 ) {
            current += 1;
        } else {
            current += 2;
        }


        $('.bar-list').each(function () {
            let $ul = $(this).find('ul');
            let width = $ul.width(),
                vWidth = $(this).width(),
                left,
                startId = $ul.find('li').eq(0).attr('data-id');

            if(current < startId) {
                return false;
            }


            left = (current - startId) * 42 + vWidth > width ? vWidth - width : -(current- startId) * 42;
            $ul.animate({
                marginLeft: left + 'px'
            }, 0).attr('data-left', left);

            let currentIndex = Math.abs(left) /  42;

            $ul.find('li').each(function (index, el) {
                if (index < currentIndex) $(el).addClass('disabled');
            })
        })
    },
    selectTime: function () {
        var getTimeText = function(time, flag) {
            if (flag == 'end') {
                return time % 2 == 0 ? parseInt(time / 2) + ':30': parseInt(time / 2) + 1 + ':00';
            }

            return parseInt(time / 2) + ":" + (time % 2 == 0 ? '00' : '30');
        }
        var toolbar = function(elem, info) {
            let $toolbar = elem.closest('.bigpictext-item').find('.tool-action');

            if (elem.find('li.selected').length && info.end) {
                $toolbar.show();
                let text;
                if (info.right) {
                    text = getTimeText(info.start) + '-' + getTimeText(info.end, 'end');
                } else {
                    text = getTimeText(info.end) + '-' + getTimeText(info.start, 'end');
                }
                $toolbar.find('[data-set="timeRange"]').text(text);
                $toolbar.find('[data-set="hour"]').text((Math.abs(info.end - info.start) + 1)/2);
            } else {
                $toolbar.hide();
            }
        }

        var changeItemStatus = function(elem, info) {

            elem.find('li').each(function (i, el) {
                let toggle = false;

                var index = $(el).attr('data-id');

                if (info.start && info.end) {
                    toggle = info.right ? index - info.start >= 0 && index - info.end <= 0 : index - info.end >= 0 && index - info.start <= 0;
                }

                if (info.start && !info.end) {
                    toggle = index - info.start == 0;
                }

                $(el).toggleClass('selected', toggle);
            })
        }

        this.info = {};
        let that = this,
            currentPid;

        $(document)
            .off(UR.click, '.bigpictext-bar li')
            .on (UR.click, '.bigpictext-bar li', function (evt) {
                evt.preventDefault();

                var $this    = $(this),
                    $ul      = $this.closest('ul'),
                    $item    = $ul.closest('.bigpictext-item'),
                    $toolbar = $item.find('.tool-action');

                // if ($this.hasClass('disabled')) return false;

                var pId  = $toolbar.attr('data-id'),
                    id   = $this.attr('data-id'),
                    time = $this.attr('data-time');

//                    console.log('111',that.ajaxList);
                if (!that.info[pId]) {
                    that.info[pId] = {
                        start: undefined,
                        end: undefined,
                        right: undefined,
                    };
                }

                if (currentPid !== pId) {
                    $item.siblings().each(function (index, el) {
                        let $tool = $(el).find('.tool-action');
                        $tool.hide();
                        that.info[pId] = {};
                        $(el).find('li').removeClass('selected');
                    });
                    currentPid = pId;
                }



                $this.toggleClass('selected', !$this.hasClass('selected'));

                let _thisInfo = that.info[pId];


                if($this.hasClass('selected')) {
                    if (!_thisInfo.start) {
                        _thisInfo.start = id;
                        _thisInfo.end   = id;
                    } else {
                        let isToRight   = id - _thisInfo.start > 0;

//                            let hasDisabled = false;
//
                        if (isToRight) {
                            for(let i = _thisInfo.start; i <= id; i++) {
//                                     if ( $ul.find('[data-id="' + i + '"]').hasClass('disabled')) {
//                                            _thisInfo.start = id;
//                                            _thisInfo.end   = id;
//                                            _thisInfo.right = isToRight;
//                                     }else{
                                _thisInfo.right = isToRight;
                                _thisInfo.end   = id;
//                                     }
                            }
                        } else {
                            for(let i = _thisInfo.start; i >= id; i--) {
//                                     if ( $ul.find('[data-id="' + i + '"]').hasClass('disabled')) {
//                                            _thisInfo.start = id;
//                                            _thisInfo.end   = id;
//                                            _thisInfo.right = isToRight;
//                                     }else{
                                _thisInfo.right = isToRight;
                                _thisInfo.end   = id;
//                                     }
                            }
                        }

//                            if (hasDisabled) {
//
//                            } else  {
//                                _thisInfo.right = isToRight;
//                                _thisInfo.end   = id;
//                            }

                        changeItemStatus($ul, _thisInfo);
                    }
                } else {

                    _thisInfo.end = _thisInfo.right ? id - 1: parseInt(id) + 1;
//
                    if ((_thisInfo.right && _thisInfo.start - _thisInfo.end > 0) || (!_thisInfo.right && _thisInfo.end - _thisInfo.start > 0)) {
                        _thisInfo.start = _thisInfo.end = _thisInfo.right = undefined;
                    }
//
                    changeItemStatus($ul, _thisInfo);

                }
                var reserveInfo = $this.closest('.bigpictext-item').find('.reserveInfo');
                toolbar($ul, _thisInfo);
                if($('.bigpictext-bar li.selected').hasClass('disabled')){
                    $('.bigpictext-bar li').removeClass('hasDisable');
                    $('.bigpictext-bar li.selected').addClass('hasDisable');
//                        $('.tool-action').hide();
                    reserveInfo.show();
                    $item.find('.booking').attr('disabled','');
                    $item.find('.booking').addClass('disabled');
                }else if(!$('.bigpictext-bar li').hasClass('selected')){
                    $('.bigpictext-bar li').removeClass('hasDisable');
                    $item.find('.booking').removeAttr('disabled');
                    $item.find('.booking').removeClass('disabled');
                    reserveInfo.hide();
                }else if(!$('.bigpictext-bar li.selected').hasClass('disabled')){
                    $('.bigpictext-bar li').removeClass('hasDisable');
                    $item.find('.tool-action').show();
                    $item.find('.booking').removeAttr('disabled');
                    $item.find('.booking').removeClass('disabled');
                    reserveInfo.hide();
                }
                $('.disabled.selected.hasDisable').each(function(){
                    var $this = $(this);
                    // var reserveInfo = $this.closest('.bigpictext-item').find('.reserveInfo');
                    var reserveUsername = $this.attr('data-reserveUsername');
                    var reserveCompany = $this.attr('data-reserveCompany');
                    var meetingTheme = $this.attr('data-meetingTheme');
                    var reserveInfoHtml = '';
                    if(reserveUsername || reserveCompany || meetingTheme){
                        if(reserveUsername){
                            reserveInfoHtml += '<em>'+ reserveUsername +'</em>';
                        }
                        if(reserveCompany){
                            reserveInfoHtml += '<em>'+ reserveCompany +'</em>';
                        }
                        if(meetingTheme){
                            reserveInfoHtml += '<em>'+ meetingTheme +'</em>';
                        }
                        reserveInfo.show();
                        reserveInfo.html(reserveInfoHtml);
                        return false;
                    }else{
                        reserveInfo.hide();
                    }
                });

            })
            .off(UR.click, '.btn-prev')
            .on (UR.click, '.btn-prev', function(evt){
                evt.preventDefault();

                let $this    = $(this),
                    $ul      = $this.closest('.bigpictext-bar').find('ul');

                let moveWidth  = 42 * $ul.attr('data-move'),
                    left       = +$ul.attr('data-left') || 0;

                let _left = left + moveWidth;
                if (_left > 0) {
                    _left = 0;
                }
                $ul.animate({
                    marginLeft: _left + 'px',
                }, 800, 'linear', () => {
                    $ul.attr('data-left', _left);
                });

//                    if ($this.hasClass('disabled')) return false;

            })
            .off(UR.click, '.btn-next')
            .on (UR.click, '.btn-next', function(evt) {
                evt.preventDefault();

                let $this    = $(this),
                    $ul      = $this.closest('.bigpictext-bar').find('ul');

                let viewWidth  = $ul.parent().width(),
                    totalWidth = $ul.width(),
                    moveWidth  = 42 * $ul.attr('data-move'),
                    left       = $ul.attr('data-left') || 0;

                let _left = left - moveWidth;
                if (0 - _left + viewWidth >= totalWidth) {
                    _left = viewWidth - totalWidth;
                }
                $ul.animate({
                    marginLeft: _left + 'px',
                }, 800, 'linear', () => {
                    $ul.attr('data-left', _left);
                });

//                    if ($this.hasClass('disabled')) return false;

            })
    },
    modal: function () { // 弹窗参数变化
        let that    = this;
        let _paramName = "";
        let _paramVal  = "";
        let _paramText = "";

        $(document)
            .off('shown.bs.modal', '.modal')
            .on('shown.bs.modal', '.modal', function (e) {
                let $modal = $(this);

                let value = $modal.attr('data-val');
                $modal.find('.stage-list li').each(function () {
                    var $li = $(this);
                    $li.toggleClass("active", $li.attr('data-id') == value);

                });
            })
            .off(UR.click, '.modal .save')
            .on(UR.click, '.modal .save', function (evt) {
                evt.preventDefault();

                let $modal  = $(this).closest('.modal'),
                    modalId = $modal.attr('id');

//                    that.$pull.refresh({[_paramName]: _paramVal});


                UR.localStorage({
                    type: 'set',
                    name: 'ur.mobile.meetingStage',
                    values: {
                        id: _paramVal,
                        name: _paramText
                    },
                    dataType: 'json',
                });

                that.query[_paramName] = _paramVal;
                that.render(true);

                $modal
                    .attr('data-val', _paramVal)
                    .modal('hide');



                var $target = $('[data-target="#' + modalId + '"]');
//                    $target
//                        .toggleClass('val-empty', !_paramText)
                $target.find('span').text(_paramText ? _paramText : ($target.attr('data-text') || ""));

            })
            .off(UR.click, '.modal [data-id]')
            .on(UR.click, '.modal [data-id]', function (evt) {
                evt.preventDefault();

                var $this = $(this);

                $this
                    .toggleClass('active', !$this.hasClass('active'))
                    .siblings().removeClass('active');

                _paramName = $this.closest('.modal').attr('data-param');
                if ($this.hasClass('active')) {
                    _paramVal  = $.trim($this.attr('data-id'));
                    _paramText = $.trim($this.text());
                } else {
                    _paramVal = _paramText = '';
                }

            });
    },
    initFilter: function (callback) {
        $.ajaxGet({
            url: this.$filter.attr('data-url'),
            success: (res) => {
                let list = res.data || [];

                $('#plantIdContainer').html(template('plantIdTpl', {
                    list
                }));

                var date    = new Date();
                var html    = template("tlpFilter", {data: {
                    today: $.dateFormat(date, this.format),
                    tomorrow: $.dateFormat(date.setDate(date.getDate() + 1), this.format),
                }});

                this.$filter.html(html);

                callback && callback(res);
            }
        });
    },
    search: function () {
        var that    = this;
        var param   = $.trim(this.$filter.find('ul').attr('data-param'));

        $(document)
            .off(UR.click, '.search-wrapper li')
            .on(UR.click, '.search-wrapper li', function (evt) {
                evt.preventDefault();

                var $this   = $(this);

                $this.addClass('active').siblings().removeClass('active');

                that.$date.val('');

                if ($this.hasClass('last')) {
                    return false;
                }

                var id  = $.trim($this.attr('data-id'));

                that.query.meetingRoomDate = id;
//                    that.$pull.refresh({[param]: id});
                that.render(true);
            })
            .on('change.bs.date', function (evt, date) {
                if (date) {
                    date = $.dateFormat(date, that.format);
                    that.query.meetingRoomDate = date;

                    that.render(true);
//                        that.$pull.refresh({[param]: date});
                }
            });
    },
    date: function () {
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
            onBeforeShow: function (inst) {
                UR.androidRefresh(false)
            },
            onCancel: function (inst) {
                UR.androidRefresh(true)
            },
            onShow: function (event, inst) {
            },
            onSelect: function (inst, event) {
                UR.androidRefresh(true)
                $(document).trigger('change.bs.date', inst);
            }
        }

        this.$date.mobiscroll().date(option);
    }
}
$(function () {
    List.init();
})
