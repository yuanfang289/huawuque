/**
 * Created by zhangguoying on 2016/12/30.
 */

const equal = function (a, b) {
    typeof a == 'undefined' && (a = {});
    typeof b == 'undefined' && (b = {});


    if (typeof a == 'object' && a instanceof Array && typeof b == 'object' && b instanceof Array) {
        return (a.join(',') == b.join(','));
    }

    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) return false;

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (typeof a[propName] == 'object' && typeof b[propName] == 'object') {
            return equal(a[propName], b[propName]);
        } else if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}
Object.defineProperty(Object, 'equal', {
    value: function (a, b) {
        console.log("a:::", a, "b:::", b)
        // console.log("isEqual: ", equal(a, b))
        return equal(a, b);
    },
    configurable: true,
    enumerable: false,
    writable: true
});
