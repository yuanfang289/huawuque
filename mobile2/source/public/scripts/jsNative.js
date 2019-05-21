// js 原生方法的封装
UR.toJson = function(jsonString) {
    return JSON.parse(jsonString);
};

UR.strJson = function(json) {
    return JSON.stringify(json);
};
