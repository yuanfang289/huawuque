0/**
 * Created by zhangguoying on 2016/12/30.
 */

UR.localStorage = ({
    type = "get",
    name = "",
    values,
    expires = 5, // 单位天
    dataType,
} = {}) => {

    !name && (name = 'ur.mobile.meetinginfo');

    let storage    = window.localStorage;

    switch (type) {
        case 'get':
            if (!!storage) {
                let getItems = storage.getItem(name);
                if (dataType == 'json') {
                    getItems = getItems ? JSON.parse(getItems) : {};
                }
                return getItems;
            } else {
                let arrStr = document.cookie.split('; ');
                for (let i = 0; i < arrStr.length; i++) {
                    let temp = arrStr[i].split('=');
                    if (temp[0] == name) {
                        let ret = unescape(temp[1]);
                        if (dataType == 'json') {
                            ret = ret ? JSON.parse(ret) : {};
                        }
                        return ret;
                    }
                }
            }
            break;

        case 'set':
            if ((dataType == 'json' && values) || (values && typeof values == 'object' && !(values instanceof Array))) {
                values = JSON.stringify(values);
            }
            if (!!storage) {
                storage.setItem(name, values);
            } else {
                let str = name + '=' + escape(values);
                if (expires && expires > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
                    let date = new Date();
                    date = date.setDate(date.getDate() + expires);

                    str += "; expires=" + date.toGMTString();
                }
                document.cookie = str;
            }

            break;

        case "remove":
            if (!!storage) {
                storage.removeItem(name);
            } else {
                var date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = name + '=; expires=' + date.toGMTString();
            }
            break;
    }
}
