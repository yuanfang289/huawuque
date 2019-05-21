//= include ../../public/plugins/template.js
//= include ../../public/component/refresh/refresh.js

var List = {
    init: function() {    
        $('.place-list').on('pullup.bs.refresh', function(evt) {
            setTimeout(function() {
                $('.lazy').lazy({
                    // domain: ['pic.90sjimg.com', 'static.urwork.cn']
                });
            }, 0)
        })
    }
}
$(function() {
    List.init();
})
