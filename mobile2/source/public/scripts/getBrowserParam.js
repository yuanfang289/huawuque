UR.getBrowserParam = function () {
    var ret = {}; //定义数组
    decodeURIComponent(window.location.search).substr(1).replace(/(\w+)=([^&]*)(&|$)/ig, function (a, b, c) {
        ret[b] = c;
    });
    return ret;
};

UR.getBrowserParamByName = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r   = window.location.search.substr(1).match(reg);
    if (r  != null)
        return decodeURIComponent(r[2]);

    return null;
};

UR.toParam = function (param, key) {
    var paramStr = "";

    if (typeof param == "string" || typeof param == "number" || typeof param == "boolean") {
        paramStr += "&" + key + "=" + encodeURIComponent(param);
    } else {
        $.each(param, function (k) {
            var _key = !key ? k : key + (param instanceof Array ? "[" + k + "]" : "." + k);

            paramStr += "&" + UR.toParam(this, _key);
        });
    }
    return paramStr.substr(1);
}

UR.serializeObject = function (elem) {
    if (typeof elem == 'string' || (typeof elem == 'object' && !elem[0])) {
        elem = $(elem);
    }

    var serialize = elem.serializeArray();
    var ret = {}; //定义数组

    serialize.map(node => {
        let {name, value = ""} = node;
        if (ret[name] != undefined) {
            if (!ret[name].push) {
                ret[name] = [ret[name]];
            }
            ret[name].push(value);
        } else {
            ret[name] = value;
        }
    });
    return ret;
}
