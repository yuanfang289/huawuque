/**
 * Created by zhangguoying on 2016/12/21.
 */


var formatted = function (data, pageType) {
    // 转换日期
    if (data.startDate) {
        data.startDate = $.dateFormat(data.startDate, 'yy/MM/dd');
    }

    if (data.endDate) {
        data.endDate = $.dateFormat(data.endDate, 'yy/MM/dd');
    }

    // 状态控制
    data.className = {
        n3: 'status-expired',
        n1: 'status-used',
        n2: 'status-canceled',
    }["n" + data.status];

    // 使用限制
    data.stageName = '';
    if (data.couponBatch.isAllWorkstage == 1) {
        data.stageName = '全部社区可用';
    } else {
        var stages = [];
        (data.workStageList || []).map(function(node) {
            stages.push(node.workstage.stageName);
        });
        data.stageName = stages.join(' | ');

        if (pageType == 'detail') {
            data.stageName = "仅支持（" + stages.join('，') + "）" + stages.length + "个场区使用";
        }
    }

    return data;
}
