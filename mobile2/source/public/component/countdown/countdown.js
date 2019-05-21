// 倒计时
// TODO 未完成 zhanghaibin
UR.Countdown = function() {
    this.timer = [];
};
UR.Countdown.prototype = {
    clearTimer: function(val) {
        clearTimeout(val);
        var index = this.timer.indexOf(val);
        if (index == -1) return;
        this.timer.splice(index, 1);
    },
    clearAllTimer: function() {
        this.timer.forEach(function(v) {
            clearTimeout(v);
        })
        this.timer = [];
    }
};
