var Form = {
    companyPortrait:{
        isLoad:false
    },
    init: function() {
        BaseForm.select();
        BaseForm.backOrClose();
        this.initDate();
        this.enterDate();
        this.setupPlace();
        this.selectAjax();
        UR.nativeShowShareButton(false);
    },
    ajaxPost: function(options) {
        BaseForm.post(options);
        Form.options = options;
    },
    initDate: function() {//初始化成立时间
        var date   = new Date();
        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            // startYear: date.getFullYear(),
            // endYear: date.getFullYear(),
            maxDate: date,
            dateFormat: 'yy-mm',
            buttons: [
                'cancel', 'set'
            ],
            preset: 'date',
            onBeforeShow: function(inst) {
                UR.androidRefresh(false)
            },
            onCancel: function(inst) {
                UR.androidRefresh(true)
            }
        };

        var $dates = $('[data-toggle="mdate"]');
        $dates.each(function() {
            var $this   = $(this),
                target  = $this.attr('data-target'),
                $target = target ? $(`[name=${target}]`) : null;
            $this.mobiscroll().date($.extend(true, {}, option, {
                onShow: function(event, inst) {
                    $(document).trigger('init.bs.date', [$this, inst]);
                },
                onSelect: function(inst, event) {
                    UR.androidRefresh(true)
                    $('[name=establishYear]').val($.dateFormat(inst, 'yyyy'));
                    $('[name=establishMonth]').val($.dateFormat(inst, 'MM'));
                }
            }));
        });
    },
    enterDate: function() {
        // 入驻时间
        var date   = new Date();
        var option = {
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            // startYear: date.getFullYear(),
            endYear: date.getFullYear()+10,
            // minDate: date,
            dateFormat: 'yy-mm-dd',
            buttons: [
                'cancel', 'set'
            ],
            preset: 'date',
            onBeforeShow: function(inst) {
                UR.androidRefresh(false);
                $('body').addClass('show-day');
            },
            onCancel: function(inst) {
                UR.androidRefresh(true);
                $('body').removeClass('show-day');
            }
        };

        $('#enterTime_dummy').mobiscroll().date($.extend(true, {}, option, {
            onShow: function(event, inst) {
                $(document).trigger('enter.bs.date', [$this, inst]);
            },
            onSelect: function(inst, event) {
                UR.androidRefresh(true);
                $('[name=enterTime]').val(inst);
                $('body').removeClass('show-day');
            }
        }));
    },
    //注册地
    setupPlace: function(){
        var setUpPlaceBox;

        function iscroll() {
            return new IScroll('#setUpPlaceBox', {
                click: true,
                disablePointer: true,
                disableTouch: false,
            });
        }
        $('body')
            .off(UR.click, '#chinaBtn')
            .on(UR.click, '#chinaBtn', function(evt) {
                evt.preventDefault();
                $.ajax({
                    // url: './data/sheng.json',
                    url: '/companyPortrait/getProvinces',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                    }
                })
                .done(function(res) {
                    res = res.data ||[];
                    $('#provinceBox').html(template('provinceList', {list:res}));
                    if(!Form.companyPortrait.isLoad && Form.companyPortrait.registerProvinceCode){
                        $('#provinceBox [data-geo-id='+Form.companyPortrait.registerProvinceCode+']').trigger(UR.click);
                    }

                    setTimeout(function(){
                        setUpPlaceBox = iscroll();
                    },0);
                    console.log(setUpPlaceBox);
                    return res;
                });

            })
            .off(UR.click,'#provinceBox li')
            .on(UR.click,'#provinceBox li',function(evt){
                var provinceCode = $(this).attr('data-geo-id');
                evt.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');

                $.ajax({
                    // url: './data/city.json',
                    url: '/uwBooking/cities',
                    type: 'GET',
                    dataType: 'json',
                    data: {province: provinceCode}
                })
                .done(function(res) {
                    res = res ||[];
                    $('#cityBox').html(template('cityList', {list:res}));
                    if(!Form.companyPortrait.isLoad && Form.companyPortrait.registerCityCode){
                        $('#cityBox [data-geo-id='+Form.companyPortrait.registerCityCode+']').trigger(UR.click);
                        Form.companyPortrait.isLoad=true;
                    }
                    setTimeout(function(){
                        setUpPlaceBox.refresh();
                    },0);
                    return res;
                });
            })
            .off(UR.click,'#cityBox li')
            .on(UR.click,'#cityBox li',function(evt){
                var cityCode = $(this).attr('data-geo-id');
                evt.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');
                // Form.companyPortrait.isLoad = true;


            })
            .off(UR.click,'#setUpReset,#otherBtn')
            .on(UR.click,'#setUpReset,#otherBtn',function(evt){
                evt.preventDefault();
                $('#provinceBox').html('');
                $('#cityBox').html('');
                setTimeout(function(){
                    // setUpPlaceBox.refresh();
                    setUpPlaceBox = iscroll();

                },0);
            })
            .off(UR.click,'#setUpConfirm')
            .on(UR.click,'#setUpConfirm',function(evt){
                evt.preventDefault();
                var countryCode = $('#countryBox li.active').attr('countrycode');
                var countryName = $('#countryBox li.active span').html();
                var ProvinceCode = $('#provinceBox li.active').attr('data-geo-id');
                var ProvinceName = $('#provinceBox li.active span').html();
                var registerCityCode = $('#cityBox li.active').attr('data-geo-id');
                var registerCityName = $('#cityBox li.active span').html();
                $('[name=registerCountryCode]').val(countryCode);
                $('[name=registerCountryName]').val(countryName);
                $('[name=registerProvinceCode]').val(ProvinceCode);
                $('[name=registerProvinceName]').val(ProvinceName);
                $('[name=registerCityCode]').val(registerCityCode);
                $('[name=registerCityName]').val(registerCityName);
                if($('#setUpPlaceBox li.active').attr('countrycode') == 'OTH'){
                    $('[name=registerAddress]').css('display','block');
                }else{
                    $('[name=registerAddress]').css('display','none');
                    $('[name=registerAddress]').val('');
                }
            });
    },
    selectAjax: function(){
        // var num = $('#needServiceIdModal li.active');
        // console.log('num:',num);
        $('[data-select="option"]').each(function(i,evt) {
            // console.log(evt,i)
            var $this = $(this);
            var target = $this.attr('data-target');
            var template = $this.attr('data-template');
            var url = $this.attr('data-url');
            var scroll = $this.attr('data-scroll');
            var selectScroll = new IScroll(scroll, {
                click: true,
                disablePointer: true,
                disableTouch: false
            });
            var idName = $this.attr('id').replace('_dummy','');
            // console.log(1)
            UR.template({
                templateId: template,
                renderEl: $(target+' .scroller'),
                url: url,
                renderRedis: (res) => {
                    res = res.data || [];
                    // console.log(2)
                    if(idName == 'needServiceId'){
                        var num = 0;
                        if (Form.companyPortrait[idName]) {
                            var needServiceId = Form.companyPortrait[idName].split(',');
                            for(var i=0;i<needServiceId.length;i++){
                                for(var prop in res){
                                    if(res[prop].id != (+needServiceId[i])) continue;
                                    res[prop].checkedStatus = true;
                                }
                            }
                            num = Form.needServiceIdLength = needServiceId.length;
                        }

                        $('body')
                        //需要服务类型的最大不能超过5个
                        .off(UR.click, '#needServiceScroll li')
                        .on(UR.click, '#needServiceScroll li',function(evt){
                            evt.preventDefault();
                            var $this = $(this);

                            if($this.hasClass('active')){
                                num--;
                            }else{
                                if(num == 5){
                                    UR.msg('最多选择五项服务');
                                    setTimeout(function(){
                                        $this.removeClass('active');
                                    },0)
                                }else{
                                    num++;
                                }
                            }
                        });
                        // console.log(Form.needServiceIdLength);
                        // console.log(needServiceId);
                    }else{
                        for(var prop in res){
                            if(res[prop].id != Form.companyPortrait[idName]) continue;
                            res[prop].checkedStatus = true;
                        }
                    }
                    return {list: res};
                },
                callback: function(){
                    selectScroll.refresh();
                    // num = 0;
                }
            });
        });
        // console.log(Form.needServiceIdLength);
        $('body')
            // .off(UR.click, '[data-select="option"]')
            // .on(UR.click, '[data-select="option"]', function(evt) {
            //     evt.preventDefault();
            //     var $this = $(this);
            //     var target = $this.attr('data-target');
            //     var template = $this.attr('data-template');
            //     var url = $this.attr('data-url');
            //     var scroll = $this.attr('data-scroll');
            //     var selectScroll = new IScroll(scroll, {
            //         click: true,
            //         disablePointer: true,
            //         disableTouch: false
            //     });
            //     var idName = $this.attr('id').replace('_dummy','');
            //     // console.log(1)
            //     UR.template({
            //         templateId: template,
            //         renderEl: $(target+' .scroller'),
            //         url: url,
            //         renderRedis: (res) => {
            //             res = res.data || [];
            //             // console.log(2)
            //             if(idName == 'needServiceId'){
            //                 var needServiceId = Form.companyPortrait[idName].split(',');
            //                 for(var i=0;i<needServiceId.length;i++){
            //                     for(var prop in res){
            //                         if(res[prop].id != (+needServiceId[i])) continue;
            //                         res[prop].checkedStatus = true;
            //                     }
            //                 }
            //
            //                 // console.log(needServiceId);
            //             }else{
            //                 for(var prop in res){
            //                     if(res[prop].id != Form.companyPortrait[idName]) continue;
            //                     res[prop].checkedStatus = true;
            //                 }
            //             }
            //             return {list: res};
            //         },
            //         callback: function(){
            //             selectScroll.refresh();
            //             num = 0;
            //         }
            //     });
            // })
            //需要服务类型的最大不能超过5个
            .off(UR.click, '#needServiceScroll li')
            .on(UR.click, '#needServiceScroll li',function(evt){
                evt.preventDefault();
                var $this = $(this);

                if($this.hasClass('active')){
                    num--;
                }else{
                    if(num == 5){
                        UR.msg('最多选择五项服务');
                        setTimeout(function(){
                            $this.removeClass('active');
                        },0)

                    }else{
                        num++;
                    }
                }
            })
            //单选是否
            .off(UR.click, '.radio-control label')
            .on(UR.click, '.radio-control label',function(evt){
                evt.preventDefault();
                var $this = $(this);
                var $input = $this.children('input');
                var $parent = $this.closest('.form-select-enter');
                var $showInput = $parent.find('[data-select=show]');
                // console.log($input)
                console.log(typeof $input.attr('value'));

                if($this.children('input[checked]') && $input.attr('value') == '1' || $input.attr('value') == 'true'){
                    $showInput.css('display', 'block');
                    // $showInput.css('display', 'block').prop('disabled', false);
                }else if($this.children('input[checked]') && $input.attr('value') == '0' || $input.attr('value') == 'false'){
                    $showInput.css('display', 'none');
                    // $showInput.css('display', 'none').prop('disabled', true).val(null);
                    $parent.find('[data-select-clear=clear]').val('');
                    $parent.find('[data-select-clear=clear]').text('');
                }
            })
    }
};
