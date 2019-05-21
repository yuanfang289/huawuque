//= include ../../../public/component/tooltip/tooltip.js
//= include ../../../public/component/utils/utils.js
// ../../../public/component/utils/touch.js

$(function() {
    $('[data-toggle="tooltip"]').tooltip().tooltip('toString')

    $('.container').append('<hr />');
    $('.container').append('<h3>时间日期格式化</h3>');
    $('.container').append('<hr />');
    $('.container').append('<p>' + $.dateFormat(new Date(), 'yyyy/M/d hh:mm:ss') + '</p>');
    $('.container').append('<p>' + $.dateFormat('2016-08-12', 'date') + '</p>');
    $('.container').append('<p>' + $.dateFormat('2016-08-12', 'Date') + '</p>');
    $('.container').append('<p>' + $.dateFormat('2016-08-12', 'number') + '</p>');
    $('.container').append('<p>' + $.dateFormat('2016-08-12', 'DateTime') + '</p>');
    $('.container').append('<p>' + ($.dateFormat('2016-08-12', 'DateTime') === new Date(2016, 7, 11).getTime()) + '</p>');
    $('.container').append('<p>' + ($.dateFormat(1470931200000)) + '</p>');
    $('.container').append('<p>' + ($.dateFormat('2016/8/30', 'yyyy-MM-dd hh:mm:ss')) + '</p>');
    $('.container').append('<hr />');

    $(document).off('click', '#get').on('click', '#get', function(evt) {
        evt.preventDefault();
        $.ajaxGet({
            url: "data/server.json",
            success: function(res) {
                console.log(res);
            }
        })
    }).off('click', '#post').on('click', '#post', function(evt) {
        $.ajaxPost({
            url: "data/server.json",
            data: {
                a: 1
            },
            success: function(res) {
                console.log(res);
            },
            error: function(res) {
                console.log('error...');
            },
            once: true
        })
        evt.preventDefault();
    })

    $('#div1').on('tap', function(evt) {
        console.log(evt);
        console.log('tap....');
    }).on('swipe', function(evt) {
        console.log(evt);
        console.log('swipe....');
    }).on('swipeLeft', function(evt) {
        console.log(evt);
        console.log('swipeLeft....');
    }).on('swipeRight', function(evt) {
        console.log(evt);
        console.log('swipeRight....');
    }).on('swipeUp', function(evt) {
        console.log(evt);
        console.log('swipeUp....');
    }).on('swipeDown', function(evt) {
        console.log(evt);
        console.log('swipeDown....');
    }).on('doubleTap', function(evt) {
        console.log(evt);
        console.log('doubleTap....');
    }).on('singleTap', function(evt) {
        console.log(evt);
        console.log('singleTap....');
    }).on('longTap', function(evt) {
        console.log(evt);
        console.log('longTap....');
    })

    // $('.test').rhuiSwipe('swipeLeft', function(event){
    //     console.log(event);
    //     console.log('swipeLeft');
    // }, {
    //     // 可选参数
    //     isStopPropagation: true,
    //     isPreventDefault: true,
    //     triggerOnMove: false
    // });
})
