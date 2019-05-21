//= include ../../public/plugins/template.js
//= include ../../public/component/refresh/refresh.js

var List = {
    init: function() {
        var $pull = $('[data-scroll="pullUp"]').on('pullup.bs.refresh', function(evt) {
            setTimeout(function() {
                $('.lazy').lazy();
            }, 0)
        });
    }
}
$(function() {
    List.init();
})
