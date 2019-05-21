UR.isApp = function() {
    // return window.location.href.indexOf('source=app') !== -1 || $('input[name=appSource]').val() == 'app';
    return navigator.userAgent.match(/URWork/i);
}
