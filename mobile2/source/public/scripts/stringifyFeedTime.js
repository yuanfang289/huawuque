// 将动态信息流的创建时间转换为相应文本
/**
 *
 * @param createTime
 * @param opts.useDash
 * @returns {string}
 */
UR.stringifyFeedTime = function(createTime, opts) {
    opts = $.extend(true, {
        useDash: true
    }, opts);
    if (!createTime && !(createTime instanceof Date) && typeof createTime !== 'number') {
        throw new Error('参数类型必需, 且为Date对象或时间戳')
    }

    var nowDate    = UR.getDateObj(),
        createDate = UR.getDateObj(createTime);

    // if (createDate.inst.getTime() >= nowDate.inst.getTime()) {
    //     throw new Error('参数时间不能大于当前时间')
    // }

    // 跨年
    if (createDate.year < nowDate.year) {
        return $.dateFormat(createDate.inst, opts.useDash ? 'yyyy-MM-dd hh:mm' : 'yyyy年MM月dd日 hh:mm')
    }

    // // 2天以前
    // if (createDate.month < nowDate.month || nowDate.date - createDate.date > 2) {
    //     return $.dateFormat(createDate.inst, opts.useDash ? 'MM-dd' : 'MM月dd日')
    // }
    //
    // // 前天
    // if (nowDate.date - createDate.date === 2) {
    //     return '前天'
    // }
    //
    // // 昨天
    // if (nowDate.date - createDate.date === 1) {
    //     return '昨天'
    // }
    //
    // // N小时前
    // var hours = nowDate.hours - createDate.hours;
    // if (hours) {
    //     return hours + '小时前'
    // }
    //
    // // N分钟前
    // var minutes = nowDate.minutes - createDate.minutes;
    // if (minutes) {
    //     return minutes + '分钟前'
    // }
    //
    // return '刚刚'

    return $.dateFormat(createDate.inst, opts.useDash ? 'MM-dd hh:mm' : 'MM月dd日 hh:mm')
};
