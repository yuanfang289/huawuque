/**
 * Created by zhangguoying on 2016/12/22.
 */

UR.tplTimer = 1500;

UR.setNull = (msg, render, timeout) => { // timeout >> boolean/number
    if (!render) {
        render = $('[data-render="template"]');
    }

    if (typeof timeout == "boolean" || typeof timeout == "number") {
        timeout = typeof timeout == "boolean" ? UR.tplTimer : timeout;   //1500 | true
    } else {
        timeout = null;
    }

    let nullHtml = '<div class="data-null">'
        + '<img src="/assets/public/images/NODATA.png" alt="">'
        + '<p class="msg-null">' + msg + '</p>'
        + '</div>';


    render.addClass("rendered");

    if (timeout) {
        setTimeout(() => {
            render.html(nullHtml);
        }, timeout);
    } else {
        render.html(nullHtml);
    }
}

UR.template = ({
    data = {},
    templateId = 'pageTpl',
    renderEl = $('[data-render="template"]'),
    url = "",
    callback = null,
    renderRedis = null,
    ignoreCode = false, // 是否忽略设定 > 返回正确数据时retCode === 0
    delay = UR.tplTimer
} = {}) => {
    if (!template) return false;

    !url && (url = renderEl.attr('data-url'));

    if (url) {
        $.ajaxGet({
            url,
            data,
            success: (res) => {
                // 未登录
                if (res.retCode === -2) {
                    UR.toLogin();
                    return
                }

                if (!ignoreCode && res.retCode != 0) {          //获取不到数据时的页面提示
                    UR.setNull(res.retMsg, renderEl, true);

                    return false;
                }

                let redis   = renderRedis ? renderRedis(res) : res;
                let tplHtml = template(templateId, redis);

                setTimeout(() => {
                    renderEl.html(tplHtml).addClass("rendered");

                    callback && callback(res, redis);
                }, UR.tplTimer);
            }
        });
    } else {
        if (!renderRedis) return false;

        let redis   = typeof renderRedis == 'function' ? renderRedis(): renderRedis;
        let tplHtml = template(templateId, redis);

        if (!delay) {
            renderEl.html(tplHtml).addClass("rendered");

            callback && callback(redis);

            return false;
        }

        setTimeout(() => {
            renderEl.html(tplHtml).addClass("rendered");

            callback && callback(redis);
        }, UR.tplTimer);
    }

}

