UR.getAttrOptions = function(options) {
    if (options && typeof options == 'string') {
        options = '{' + options + '}';
        options = eval('(' + decodeURIComponent(options) + ')');
    }
    return options;
}
