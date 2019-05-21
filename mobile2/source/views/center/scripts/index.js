/**
 * Created by zhangguoying on 2016/12/21.
 */
var Page = {
    init: function () {
        this.render();
    },

    render: function () { // 渲染页面
        var $render = $('[data-render="template"]');
        var preUrl  = $render.attr('data-url-pre');

        if (preUrl) {
            $.ajaxGet({
                url: preUrl,
                success: (res) => {
                    if (res.retCode != 0) {
                        UR.setNull(res.retMsg, $render, true);
                        return false;
                    }

                    UR.template({
                        renderRedis: (res2) => {
                            res = $.extend(true, {}, res, res2);
                            return this.formatted(res);
                        }
                    })
                }
            })
        } else {
            UR.template({
                renderRedis: (res) => {
                    return this.formatted(res);
                }
            });
        }
    }
}

$(function () {
    Page.init();
})
