var Page = {
    init: function(resArr) {
        this.userInfo = resArr[0];
        this.typeData = resArr[1];
        this.$body    = $('body');

        this.getElem();
        this.initContactData();
        this.renderCompanyType();
        this.searchCompany();
        this.companyModal();
        this.contactModal();
        this.companyTypeModal();
    },
    getElem: function() {
        this.$phone              = $('#phone');
        this.$email              = $('#email');
        this.$userName           = $('#userName');
        this.$userNameDummy      = $('#contact_dummy');

        this.$contactName        = $('#contactName');
        this.$contactMobile      = $('#contactMobile');
        this.$contactEmail       = $('#contactEmail');

        this.$searchCompanyName  = $('#searchCompanyName');
        this.$companyName        = $('#companyName');
        this.$companyNameDummy   = $('#companyName_dummy');
        this.$companyType        = $('#companyType');
        this.$companyTypeIds     = $('#companyTypeIds');
        this.$companyTypeDummy   = $('#companyType_dummy');
        this.$saveComapnyType    = $('#saveComapnyType');

        this.$contactModal       = $('#contactModal');
        this.$companyModal       = $('#companyNameModal');
        this.$companyTypeModal   = $('#companyTypeModal');
    },
    initContactData: function() {
        if (UR.getBrowserParam().id) return;

        var userInfo = this.userInfo;
        var realname = userInfo.realname;
        var mobile   = userInfo.mobile;
        var email    = userInfo.email;

        this.$contactName.val(realname);
        this.$userName.val(realname);
        this.$contactMobile.val(mobile);
        this.$phone.val(mobile);
        this.$contactEmail.val(email);
        this.$email.val(email);

        if (realname) {
            this.$userNameDummy.text(realname).addClass('writed');
        }
    },
    searchCompany: function() {
        var self = this;
        UR.searchbar({
            id: 'searchComapny',
            clearHandler: function() {
                self.resetResult();
            },
            inputHandler: function(val, elem) {
                self.searchCompanyName(val);
            }
        });
    },
    resetResult: function() {
        $('#companyList .result-list-inner').html('');
        setTimeout(function() {
            this.$companyModal.data('myscroll').refresh();
        }.bind(this), 0);
    },
    searchCompanyName: function(val) {
        var self = this;
        clearTimeout(this.searchbarTimer);
        this.searchbarTimer = setTimeout(function() {
            if (!val) {
                this.resetResult();
                return
            }

            var data = {
                companyName: val
            };
            $.ajax({
                url: '/user/filterCompany',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(res) {
                    if (res.retCode === -2) {
                        UR.toLogin();
                        return
                    }
                    if (res.retCode !== 0) {
                        UR.msg(res.retMsg);
                        return
                    }

                    var result = res.data.result || [];
                    var html = template('companyItemTpl', {list: result});
                    $('#companyList .result-list-inner').html(html);
                    setTimeout(function() {
                        self.$companyModal.data('myscroll').refresh();
                    }, 0)
                }
            })

        }.bind(this), 200)
    },
    companyModal: function() {
        var self = this;
        var $save = $('#saveComapny');
        $save.on('click', function(e) {
            var data = {
                name: $.trim(self.$searchCompanyName.val())
            };
            var validate = UR.validate(data, {
                rules: {
                    name: {
                        required: true,
                        maxlength: 35
                    }
                },
                messages: {
                    name: {
                        required: '请填写公司名称',
                        maxlength: '公司名称最多35个字'
                    }
                }
            });
            if (!validate) return;

            self.$companyName.val(data.name);
            self.$companyNameDummy.text(data.name).addClass('writed');
            self.$companyModal.modal('hide');
        });

        this.$companyModal.find('[data-role=hide]').on('click', function() {
            self.$companyModal.modal('hide');
        });
        this.$companyModal.on('show.bs.modal', function() {
            var val = self.$companyName.val();
            self.$searchCompanyName.val(val);
            self.searchCompanyName(val);
            DANativeApi.setIsRefresh({
                isRefresh: false
            })
        });
        this.$companyModal.on('hide.bs.modal', function() {
            self.resetResult();
            DANativeApi.setIsRefresh({
                isRefresh: true
            })
        });
    },
    contactModal: function() {
        var self = this;
        var $save = $('#saveContact');
        $save.on('click', function() {
            var data = {
                userName: $.trim(self.$contactName.val()),
                phone: $.trim(self.$contactMobile.val()),
                email: $.trim(self.$contactEmail.val())
            };
            var validate = UR.validate(data, {
                rules: {
                    userName: {
                        required: true,
                        maxlength: 20
                    },
                    phone: {
                        required: true,
                        phone: true
                    },
                    email: {
                        email: true
                    }
                },
                messages: {
                    userName: {
                        required: '请填写姓名',
                        maxlength: '姓名最多20个字'
                    },
                    phone: {
                        required: '请填写手机号',
                        phone: '请填写正确的手机号'
                    },
                    email: {
                        email: '请填写正确的邮箱'
                    }
                }
            });
            if (!validate) return;

            self.$userName.val(data.userName);
            self.$phone.val(data.phone);
            self.$email.val(data.email);
            self.$userNameDummy.text(data.userName).addClass('writed');
            self.$contactModal.modal('hide');
        });

        this.$contactModal.find('[data-role=hide]').on('click', function() {
            self.$contactModal.modal('hide');
        });

        this.$contactModal.on('show.bs.modal', function() {
            self.$contactName.val(self.$userName.val());
            self.$contactMobile.val(self.$phone.val());
            self.$contactEmail.val(self.$email.val());
        })
    },
    companyTypeModal: function() {
        var self = this;
        this.$companyTypeModal.find('[data-role=hide]').on('click', function() {
            self.$companyTypeModal.modal('hide');
        });
        this.$companyTypeModal.on('show.bs.modal', function() {
            self.initCompanyTypeSelected();
            DANativeApi.setIsRefresh({
                isRefresh: false
            })
        });
        this.$companyTypeModal.on('hide.bs.modal', function() {
            DANativeApi.setIsRefresh({
                isRefresh: true
            })
        })
    },
    renderCompanyType: function() {
        this.activeTypeCount       = 0;
        this.activeParentTypeId    = null;
        this.companyTypeMax        = this.$companyTypeDummy.data('maxlength') || 5;
        this.disabledMultiClassify = this.$companyTypeDummy.data('multi-classify') || true;
        this.classifyLeftScroll    = null;
        this.classifyRightScroll   = null;
        this.classifyRightItemHeight = [];
        this.iconList = [
            {
                icon:'qiyefuwu',
                color:'#ffa200',
                name:'企业服务',
                id:10104
            },
            {
                icon:'jiaoyu',
                color:'#1bcf65',
                name:'教育',
                id:10183
            },
            {
                icon:'qita',
                color:'#1bcf65',
                name:'其他',
                id:10102
            },{
                icon:'shenghuofuwu',
                color:'#1bcf65',
                name:'生活服务',
                id:10103
            },{
                icon:'jinrong',
                color:'#219eff',
                name:'金融',
                id:10105
            },{
                icon:'wenyuchuanmei',
                color:'#ffa200',
                name:'文娱传媒',
                id:10106
            },{
                icon:'yingjian',
                color:'#1bcf65',
                name:'硬件',
                id:10107
            },{
                icon:'hulianwang',
                color:'#219eff',
                name:'互联网',
                id:10108
            },{
                icon:'fangchanfuwu',
                color:'#ffa200',
                name:'房产服务',
                id:10191
            },
            {
                icon:'jiankangyiliao',
                color:'#219eff',
                name:'健康医疗',
                id:10199
            }
        ];

        var data = this.typeData;
        this.iconList.forEach(function (value) {
            data.forEach(function (item) {
                if(value.id === item.id){
                    item.iconList = value;
                }
            })
        });
        $('.classify-wrap').html(template('classifyTpl', {list: data}));

        // 获取DOM元素
        this.$classifyLeft  = $('#classifyLeft');
        this.$classifyRight = $('#classifyRight');

        this.initCompanyTypeIScroll();
        this.$saveComapnyType[this.companyTypeMax !== 1 ? 'show' : 'hide']();
        this.$body
            .on('click', '#classifyLeft a',  this.companyTypeOneLvHandler)
            .on('click', '#classifyRight a', this.companyTypeSelectHandler);

        // 多选时使用保存按钮
        Page.$saveComapnyType.on('click', function() {
            var parentId = null, isEnter = true;
            var data = Page.getCompanyTypeData();
            if (Page.disabledMultiClassify) {
                data.forEach(function(item) {
                    if (parentId === null) parentId = item.parentId;
                    if (parentId !== item.parentId) isEnter = false;
                });

                if (!isEnter) {
                    UR.msg('不能跨类别选择标签哦');
                    return
                }
            }
            Page.$companyTypeModal.modal('hide');
            Page.setCompanyTypeData(data);
        });
    },
    initCompanyTypeIScroll: function () {
        var that = this;
        var $leftWrap = this.$classifyLeft;
        var $leftWrapHeight = $leftWrap.height();
        var $lis = Array.from(this.$classifyRight.find('li'));
        var num = 0;
        $lis.forEach(function (value,index) {
            num += $(value).height();
            that.classifyRightItemHeight.push(num);
        });
        this.classifyLeftScroll = new IScroll('#classifyLeft',{
            disablePointer: true,   // 因谷歌升级需加以下两行
            disableTouch: false,
            click: true
        });
        this.classifyRightScroll = new IScroll('#classifyRight',{
            disablePointer: true,   // 因谷歌升级需加以下两行
            disableTouch: false,
            click: true,
            probeType:2             //使用scroll事件时必须带有的参数
        });
        this.classifyRightScroll.on('scroll', function () {
            that.classifyRightItemHeight.forEach(function (item, index) {
                if (Math.abs(Math.round(this.y)) >= item) {
                    $leftWrap.find('li').removeClass('active');
                    $leftWrap.find('li').eq(index).addClass('active');
                    var activeLi = $leftWrap.find('ul .active')[0];
                    that.classifyLeftScroll.scrollToElement(activeLi, 800, 0, -($leftWrapHeight / 2 - 54));
                }
            })
        })
    },
    companyTypeOneLvHandler: function() {
        var $this = $(this);
        $this.parent().addClass('active').siblings().removeClass('active');
        var id = $this.parent().attr('data-id');
        var selector = $('[data-oneLevelId="' + id + '"]')[0];
        Page.classifyRightScroll.scrollToElement(selector, 500, 0, 0);
    },
    companyTypeSelectHandler: function() {
        var $this = $(this);
        var parentId = $this.closest('[data-onelevelid]').data('onelevelid');

        /**
         * @description 单选逻辑
         */
        if (Page.companyTypeMax === 1) {
            var id = $this.attr('data-twoLevelId'), type = $this.text();
            Page.$classifyRight.find('.active').removeClass('active');
            $this.addClass('active');
            Page.$companyTypeModal.modal('hide');
            Page.setCompanyTypeData([{
                id: id,
                type: type
            }]);
            return
        }

        /**
         * @description 多选逻辑
         */
        if (Page.companyTypeMax > 0 && Page.activeTypeCount >= Page.companyTypeMax && !$this.hasClass('active')) {
            UR.msg('最多只能选' + Page.companyTypeMax + '个哦');
            return
        }

        /**
         * @description 跨父级分类多选
         */
        if (Page.disabledMultiClassify && Page.activeParentTypeId !== null && Page.activeParentTypeId !== parentId) {
            UR.msg('不能跨类别选择标签哦');
            return
        }

        if ($this.hasClass('active')) {
            $this.removeClass('active');
            Page.activeTypeCount--;
        } else {
            $this.addClass('active');
            Page.activeTypeCount++;
        }

        // 是否禁用保存按钮
        if (Page.activeTypeCount > 0) {
            Page.$saveComapnyType.removeAttr('disabled');
            Page.activeParentTypeId = parentId;
        } else {
            Page.$saveComapnyType.attr('disabled', 'disabled');
            Page.activeParentTypeId = null;
        }
    },
    /**
     * @description 初始化选中的企业类型
     */
    initCompanyTypeSelected: function() {
        var self = this;
        var idArr = this.$companyTypeIds.val() ? this.$companyTypeIds.val().split(',') : [];
        self.activeTypeCount = idArr.length;

        // 是否禁用保存按钮
        if (self.activeTypeCount > 0) {
            self.$saveComapnyType.removeAttr('disabled')
        } else {
            self.$saveComapnyType.attr('disabled', 'disabled')
        }

        idArr.forEach(function(item) {
            self.$classifyRight.find('[data-twolevelid=' + item + ']').addClass('active');
        })
    },
    getCompanyTypeData: function() {
        var data = [];
        this.$classifyRight.find('a.active').each(function() {
            var parentId = $(this).closest('li[data-onelevelid]').data('onelevelid');
            data.push({
                id: this.dataset.twolevelid,
                type: $.trim(this.innerText),
                parentId: parentId
            })
        });
        return data
    },
    setCompanyTypeData: function(dataArr) {
        if (!dataArr || !dataArr.length) return;
        /**
         * @description 单选逻辑
         */
        if (dataArr.length === 1) {
            this.$companyType.val(dataArr[0].type);
            this.$companyTypeIds.val(dataArr[0].id);
            this.$companyTypeDummy.text(dataArr[0].type).addClass('writed');
            return
        }

        /**
         * @description 多选逻辑
         */
        var types = '', ids = '';
        dataArr.forEach(function(item) {
            types += ',' + item.type;
            ids   += ',' + item.id;
        });

        this.$companyType.val(types.substr(1));
        this.$companyTypeIds.val(ids.substr(1));
        this.$companyTypeDummy.text(dataArr[0].type + '等' + dataArr.length + '个类型').addClass('writed');
    },
    fetchUserInfo: function() {
        return $.ajax({
            url: '/user/ucenter'
        })
    },
    fetchCompanyType: function() {
        return $.ajax({
            url: '/market/companyType'
        })
    }
};
