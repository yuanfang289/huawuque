//= include ../../../public/plugins/template.js

//= include ../../../public/component/utils/transition.js
//= include ../../../public/component/filter/filter.js
//= include ../../../public/component/refresh/refresh.js


var getQueryJson = function() {
    var ret = {}; //定义数组
    window.location.search.substr(1).replace(/(\w+)=(\w+)/ig, function(a, b, c) {
        ret[b] = unescape(c);
    });
    return ret;
}

var $refresh =
    $('.list-container')
    // .refresh({
    //     url: 'data/list.json',
    //     data: {
    //         sort: 4
    //     },
    //     template: 'tlpList',
    //     isFirstLoad: true,
    //     formatted: function(res) {
    //         return res.result || [];
    //     }
    // })
    .refresh('toString')
    .on('pullup.bs.refresh', function(evt) {
        // console.log('refresh pullup ..... ');
        // console.log(evt);
    });

$('#filterContainer')
    // .filter({
    //     template: 'tlpFilter',
    //     url: 'data/filter.json',
    //     query: {
    //         sort: 4
    //     },
    //     isFixed: true,
    // })
    .filter('toString')
    .on('change.bs.filter', function(evt) {
        $refresh.refresh(evt.query)
            // refresh.setParams(evt.query);
    });
