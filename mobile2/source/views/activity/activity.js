/**
 * Created by litingfeng on 16/11/21.
 * activity.js
 */

var Activity =function() {
    // init: function() {
    //     this.tabShow();
    //     this.praise();
    //     this.tab();
    //     this.deleteComment()
    // },
    var tabShow = function(){
        $('body')
            .on('click','.tabbed .more-btn',function(evt){
                var $box = $(this).next()
                if($box.hasClass('more-box-show')) {
                    $box.removeClass('more-box-show');
                    $('.shade').hide();

                }else if(!$box.hasClass('more-box-show')){
                    $box.addClass('more-box-show');
                    $('.shade').show();
                    $box.closest('.comment-item').siblings().find('.more-box').removeClass('more-box-show')
                }
                evt.preventDefault();
            })
            .on('touchmove',function(evt){
                $(this).find('.more-box').removeClass('more-box-show');
                $('.shade').hide();
            })
            .on('click','.shade',function(){
                $('.more-box').removeClass('more-box-show');
                $('.shade').hide();
            })
            .on('touchstart','#detail-more a',function(){
                $(this).closest('.activity-details').find('.detail-box').removeClass('detail-box-short');
            })
    };
    var praise = function(){
        $('.comment-item')
            .on("click",".praise-btn", function(){
                var $this = $(this);
                $parent = $this.closest('.comment-item');
                var $icon = $parent.find('.praise-btn span');
                var $num = $parent.find('.praise-btn em');
                var value = $num.text();

                var flag = $this.attr('data-flag');
                if(flag) flag =parseInt(flag);
                if(flag) {//-
                    value--;
                    $icon.removeClass('uricon-praise');
                    $icon.addClass('uricon-unpraise');
                    // $this.text('点赞');
                    praiseAnimate($icon);
                } else {//+
                    value++;
                    $icon.removeClass('uricon-unpraise');
                    $icon.addClass('uricon-praise');
                    // $this.text('取消');
                    praiseAnimate($icon);
                }
                $num.text(value);
                $this.attr('data-flag', flag?0:1);
                $this.closest('.comment-bottom').find('.more-box').removeClass('more-box-show');
            })
    };
    var praiseAnimate = function(obj){
        $(obj).addClass('bounceIn');
        var timer;
        timer = setTimeout(function(){
            $(obj).removeClass('bounceIn');
        },800);
    };
    var tab = function() {
        var $tab = $('.tab');
        var $tabsLi = $tab.find('.tabs li');
        var $tabGroup = $tab.find('.tab-group');
        $tabsLi.on('click', function() {
            var thisIndex = $(this).index();
            if ($(this).hasClass('active')) return;
            $(this).addClass('active').siblings().removeClass('active');
            $tabGroup.eq(thisIndex).show().siblings().hide();
        });
    };
    var deleteComment = function(){
        $('.comment-inner')
            .on('click','.delete-btn',function(){
                var $this = $(this);
                $this.closest('.comment-item').remove();
            });

    };
    var isCommon = window.location.pathname.indexOf('test')>=0;
    var isScollTop = function(){
        var $tab = $('.tab');
        var $tabsLi = $tab.find('.tabs li')[1];
        $($tabsLi).trigger('click');
        $('.activity-header').height();
    };
    return {
        init: function() {
            tabShow();
            praise();
            tab();
            deleteComment()
        }
    }
}();
jQuery(document).ready(function() {
    Activity.init();
});
// var detailHeight = parseInt($('.activity-details').height());
// // console.log(type of($('.detail-box').height()));
// if (detailHeight<600) {
//     $('.detail-box').removeClass('detail-box-short');
//     $('#detail-more').hide();
// }else{
//     $('.detail-box').addClass('detail-box-short');
//     $('#detail-more').show();
// }
