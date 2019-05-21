var ProvinceCity = {
    init: function(res) {
        this.data = res || [];
        this.cityData = this.formatData(this.data);
        this.$body = $('body');

        this.getElem();
        this.renderModal();
        this.modal();
    },
    getElem: function() {
        this.$provinceCityModal    = $('#provinceCityModal');
        this.$provinceCityDummy    = $('#provinceCity_dummy');
        this.$provinceCityWrap     = $('#provinceCityWrap');

        this.$registerCountryCode  = $('[name=registerCountryCode]');
        this.$registerCountryName  = $('[name=registerCountryName]');
        this.$registerProvinceCode = $('[name=registerProvinceCode]');
        this.$registerProvinceName = $('[name=registerProvinceName]');
        this.$registerCityCode     = $('[name=registerCityCode]');
        this.$registerCityName     = $('[name=registerCityName]');
        this.$special              = $('[data-select=special]');
    },
    formatData: function(data) {
        var retData = {};
        data.forEach(function(item) {
            retData[item.geoCode] = item
        });
        return retData;
    },
    modal: function() {
        var self = this;
        this.$provinceCityModal.find('[data-role=hide]').on('click', function() {
            self.$provinceCityModal.modal('hide');
        });

        this.$provinceCityModal.on('show.bs.modal', function() {
            self.renderCity();
            DANativeApi.setIsRefresh({
                isRefresh: false
            })
        });
        this.$provinceCityModal.on('hide.bs.modal', function() {
            DANativeApi.setIsRefresh({
                isRefresh: true
            })
        });
    },
    renderModal: function() {
        this.provinceScroll  = {};
        this.cityScroll = {};
        this.cityItemHeight = [];
        var html = template('provinceCityTpl', {list: this.data});
        this.$provinceCityWrap.html(html);
        // 获取DOM元素
        this.$provinceCityLeft    = $('#provinceCityLeft');
        this.$provinceCityRight   = $('#provinceCityRight');
        this.$cityWrap            = $('#cityWrap');

        this.provinceScroll = new IScroll('#provinceCityLeft', {
            disablePointer: true,   // 因谷歌升级需加以下两行
            disableTouch: false,
            click: true
        });

        this.$body
            .on('click', '#provinceCityLeft a',  this.provinceSelectHandler)
            .on('click', '#provinceCityRight a', this.citySelectHandler)
    },
    renderCity: function() {
        var self = this;
        var provinceCode = this.$registerProvinceCode.val(),
            cityCode     = this.$registerCityCode.val() || '';

        if (!provinceCode) {
            provinceCode = this.$provinceCityLeft.find('li:first').data('provincecode');
        }

        this.$provinceCityLeft.find('.active').removeClass('active');
        this.$provinceCityLeft.find('[data-provinceCode=' + provinceCode + ']').addClass('active');

        // 滚动到选中省的位置
        var province = $('[data-provinceCode="' + provinceCode + '"]')[0];
        this.provinceScroll.scrollToElement(province, 0, 0, 0);

        this.$cityWrap.html(template('cityItemTpl', {list: this.cityData[provinceCode]}));
        this.$cityWrap.find('.active').removeClass('active');
        var city = this.$cityWrap.find('[data-cityCode="' + cityCode + '"]').addClass('active');

        // 滚动到选中市的位置
        if (city.length) {
            this.cityScroll.scrollToElement(city[0], 0, 0, 0);
        }
    },
    provinceSelectHandler: function() {
        var $this = $(this);
        var provinceCode = $this.parent().data('provincecode');
        ProvinceCity.$provinceCityLeft.find('.active').removeClass('active');
        $this.parent().addClass('active');
        ProvinceCity.$cityWrap.html(template('cityItemTpl', {list: ProvinceCity.cityData[provinceCode]}));
        ProvinceCity.cityScroll.destroy && ProvinceCity.cityScroll.destroy();
        ProvinceCity.cityScroll = null;
        ProvinceCity.cityScroll = new IScroll('#provinceCityRight', {
            disablePointer: true,   // 因谷歌升级需加以下两行
            disableTouch: false,
            click: true
        });
    },
    citySelectHandler: function() {
        var $this = $(this);
        var data = $this.parent().data();
        ProvinceCity.$cityWrap.find('.active').removeClass('active');
        $this.parent().addClass('active');
        ProvinceCity.setData(data);
        ProvinceCity.$provinceCityModal.modal('hide');
    },
    setData: function(data) {
        var cityText;
        var registerCountryCode  = 'CHN',
            registerCountryName  = '中国',
            registerProvinceCode = data.provincecode,
            registerProvinceName = data.provincename,
            registerCityCode     = data.citycode,
            registerCityName     = data.cityname;

        if (data.provincecode == 990000) {
            registerCountryCode = 'OTH';
            registerCountryName = '其他';
            cityText = registerCountryName;
            this.$special.show().removeAttr('disabled');
        } else {
            cityText = registerCountryName + ',' + registerProvinceName + ',' + registerCityName;
            this.$special.hide().attr('disabled', 'disabled');
        }

        this.$registerCountryCode.val(registerCountryCode);
        this.$registerCountryName.val(registerCountryName);
        this.$registerProvinceCode.val(registerProvinceCode);
        this.$registerProvinceName.val(registerProvinceName);
        this.$registerCityCode.val(registerCityCode);
        this.$registerCityName.val(registerCityName);
        this.$provinceCityDummy.text(cityText).addClass('writed');
    },
    fetchProvinceCity: function() {
        return $.ajax({
            url: '/company/provinceCity'
        })
    }
};
