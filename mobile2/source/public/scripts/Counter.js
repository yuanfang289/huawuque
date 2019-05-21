// 计数器
UR.Counter = function(args) {
    var defs = {
        number   : 60,
        increase : false,
        start    : null,
        active   : null,
        end      : null
    };
    var opts = Object.assign({}, defs, args);

    this.opts    = opts,
    this.paused  = false,
    this.current = opts.increase ? 1 : opts.number - 1;
    this.numberLength  = this.opts.number.toString().length;

    // 计数开始
    opts.start && opts.start({
        current: this.current,
        string: this.toString()
    });

    this.timer = setInterval(function() {
        if (this.paused) return;
        opts.increase ? this.current++ : this.current--;
        // 计数执行中
        opts.active && opts.active({
            current: this.current,
            string: this.toString()
        });

        if (opts.increase ? this.current == opts.number : this.current == 0) {
            this.stop();
        }
    }.bind(this), 1000);
};

UR.Counter.prototype = {
    constructor: UR.Counter,
    pause: function() {
        this.paused = true;
    },
    restart: function() {
        this.paused = false;
    },
    stop: function() {
        clearInterval(this.timer);
        this.paused = false;
        // 停止计数
        this.opts.end && this.opts.end({
            current: this.current,
            string: this.toString()
        });
    },
    toString: function() {
        var zeroLength = this.numberLength - this.current.toString().length;
        return addZero(zeroLength) + this.current;

        function addZero(number) {
            var tmp = '';
            for (var i = number; i; i--) {
                tmp += '0';
            }
            return tmp;
        }
    },
};
