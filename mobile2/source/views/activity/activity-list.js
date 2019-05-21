//= include ../../public/plugins/template.js
//= include ../../public/component/utils/transition.js
//= include ../../public/component/filter/filter.js
//= include ../../public/component/refresh/refresh.js


var List = {
    init: function() {
        var $pull = $('[data-scroll="pullUp"]').on('pullup.bs.refresh', function(evt) {
            setTimeout(function() {
                $('.lazy').lazy();
            }, 0)
        });

        $('#filterContainer').on('change.bs.filter', function (evt) {
            // console.log(evt);
            $pull.refresh(evt.query);
        })
    }
}

$(function() {
    List.init();
})

