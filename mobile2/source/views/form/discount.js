+ (function ($) {
   'use strict';

   var Discount = function (element, options) {
       this.options  = options;
       this.$element = $(element);

       this.$newbtn  = this.$element.find(this.options.newbtn);
       if (!this.$newbtn.length) this.$newbtn = $(this.options.newbtn);

       this.$newbtn  = this.$newbtn.parent();
       this.$delbtn  = this.$element.find(this.options.delbtn);

       this.discountList = window.localStorage.getItem(this.options.storageName);
       this.discountList = JSON.parse(this.discountList) || [];

       this.zh_CN        = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

       setTimeout(function () {
           this.render(0);
       }.bind(this), 0);

       $(document)
           .on (UR.click, this.options.newbtn, $.proxy(this.new, this))
           .on (UR.click, this.options.delbtn, $.proxy(this.delete, this));


        this.$element
            .on ('storage', '[data-toggle="modal"]', $.proxy(this.setStorage, this))
            .on ('storage', ':input', $.proxy(this.setStorage, this))
            .on ('change',  ':input', $.proxy(this.setStorage, this));
   };

   Discount.VERSION = '1.0.0';

   Discount.DEFAULTS = {
       target: '.form-discount',              // 内容容器
       template: 'discountListTpl',           // 内容模板ID
       newbtn: '[data-new="discount"]',       // 新建按钮
       delbtn: '[data-dismiss="discount"]',   // 删除单个条目的按钮
       maxnum: 10,                            // 最多动态追加10条
       storageName: 'UR.service.discountList' // 优惠localstorage key值
   }

   Discount.prototype.setStorage = function (evt, val) {
       var target = evt.target,
           index  = $(target).closest(this.options.target).attr('data-index');

       if (!this.discountList[index]) {
           this.discountList[index] = {};
       }
       this.discountList[index][target.name || target.id] = typeof val != 'undefined' ? val : target.value;

       window.localStorage.setItem(this.options.storageName, JSON.stringify(this.discountList));
   }

   Discount.prototype.toggleNewbtn = function (isShow) {
       if (isShow) {
           this.$newbtn.show();
       } else {
           this.$newbtn.hide();
       }
   }

   Discount.prototype.render = function (index) {
       var rerender = !((index == 0 && this.discountList.length == 0) || (index > 0));
       if (!rerender) {
           this.discountList.push({zhIndex: this.zh_CN[index]});
       }

       window.localStorage.setItem(this.options.storageName, JSON.stringify(this.discountList));
       var __html  = template(this.options.template, {discountList: this.discountList});
       this.$element.html(__html);

       this.toggleNewbtn(this.$element.find(this.options.target).length < this.options.maxnum);

       var ev = $.Event('new.bs.discount', {
         index: index,
         length: rerender ? this.discountList.length : 1,
         source: this.discountList
       });
       this.$element.trigger(ev);
       if (ev.isDefaultPrevented()) return;

   }

   Discount.prototype.new = function () {
      var length = this.$element.find(this.options.target).length;
      this.toggleNewbtn(length + 1 < this.options.maxnum);
      this.render(length);
   }

   Discount.prototype.delete = function (evt) {
       var $targets = this.$element.find(this.options.target),
           $target  = $(evt.target).closest(this.options.target);
       var length   = $targets.length;

       var curIndex = $targets.index($target);
       if (!confirm("确定要删除“优惠服务"+this.zh_CN[curIndex]+"”吗？")) {
           return false;
       }

       this.toggleNewbtn(length - 1 <= this.options.maxnum);

       this.discountList.splice(curIndex, 1);
       this.discountList.map((node, index) => {
          node.zhIndex = this.zh_CN[index];
          for (var key in node) {
              var _key = key.replace(/\d+/g, index);
              node[_key] = node[key];
          }
       });
       window.localStorage.setItem(this.options.storageName, JSON.stringify(this.discountList));
       this.render(0);

       var ev = $.Event('del.bs.discount', {
           delIndex: curIndex,
           index: length - 1
       });
       this.$element.trigger(ev);
       if (ev.isDefaultPrevented()) return;

       $target.remove();
   }

   function Plugin (option) {
       return this.each(function () {
           var $this   = $(this);
           var data    = $this.data('bs.discount');
           var options = $.extend(true, {}, Discount.DEFAULTS, $this.data(), typeof option == 'object' && option);

           if (!data) {
               $this.data('bs.discount', (data = new Discount(this, options)));
           }
           if (typeof option == 'string') data[option];
       });
   }

   var old = $.fn.discount;

   $.fn.discount             = Plugin;
   $.fn.discount.Constructor = Discount;

   $.fn.discount.noConflict  = function () {
       $.fn.discount = old ;
       return this;
   }
}(jQuery));
