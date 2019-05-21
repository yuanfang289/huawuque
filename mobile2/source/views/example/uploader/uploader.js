//= include ../../../public/component/uploader/uploader.js

$(function() {
    var uploader =
        $('.uploader')
            // .uploader({
            //     imgSrc: 'http://placehold.it/300x300',
            //     serverSrc: './data/a.jpg',
            //     url: 'data/upload.json',
            //     pxLimit: true,
            //     // ratioLimit: true,
            //     maxSize: 5,
            //     require: true,
            //     method: 'get',
            //     className: {
            //         close: 'uricon-close'
            //     },
            //     formatted: function(res) {
            //         return {url: res.url, src: res.url}
            //     },
            //     name: 'logo'
            // })
            .uploader('toString')
            .on('success.bs.uploader', function (evt) {
                console.log(evt);
            })
            .on('error.bs.uploader', function (evt) {
                console.log(evt);
            });

    $('body').off('click', '#reset').on('click', '#reset', function(evt) {
        evt.preventDefault();
        uploader.uploader('reset');

    }).off('click', '#setParam').on('click', '#setParam', function(evt) {
        evt.preventDefault();
        uploader.uploader({url: 'a.....', src: 'http://placehold.it/180x180'});
    });
});
