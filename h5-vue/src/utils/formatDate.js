/**
 * 时间转换
 */
export default function formatDate(date, formatted) {
  !formatted && (formatted = 'yyyy-MM-dd'); // 设置默认格式

  if (typeof date === "number") { // date为时间戳转成Date
      date = new Date(date);
  }

  if (typeof date === "object" && /^\s*date\s*$/gi.test(formatted)) {
      return date;
  }

  if (typeof date === "object" && !/^\s*datetime\s*$/gi.test(formatted)) {
      var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S" : date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(formatted)) {
          formatted = formatted.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
          if (new RegExp("(" + k + ")").test(formatted)) {
              formatted = formatted.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
      }
      return formatted;
  }

  if (date && typeof date === "object" && /^\s*datetime\s*$/gi.test(formatted)) {
      return date.getTime();
  }

  if (typeof date === "string") {
      date = date.trim();

      if (formatted.match(/\bdate\b/gi)) { // string to Date
          return new Date(+date.replace(/(\d{4}).(\d{1,2}).?(\d{0,2})\s*(\d{0,2}).?(\d{0,2}).?(\d{0,2}).?/mg, function(it, y, M, d, h, m, s) {
              return new Date(y, M - 1, d, h, m, s).getTime();
          }));
      }
      if (formatted.match(/\b(number|DateTime)\b/gi)) { // string to DateTime
          return +date.replace(/(\d{4}).(\d{1,2}).?(\d{0,2})\s*(\d{0,2}).?(\d{0,2}).?(\d{0,2}).?/mg, function(it, y, M, d, h, m, s) {
              return new Date(y, M - 1, d, h, m, s).getTime();
          });
      }

      return date.replace(/(\d{4}).(\d{1,2}).?(\d{0,2})\s*(\d{0,2}).?(\d{0,2}).?(\d{0,2}).?/mg, function(it, y, M, d, h, m, s) {
          if (/(y+)/.test(formatted)) {
              formatted = formatted.replace(RegExp.$1, y);
          }
          var regArr = ['M+', 'd+', 'h+', 'm+', 's+'];
          for (var i = 0, length = regArr.length; i < length; i++) {
              if (new RegExp('(' + regArr[i] + ')').test(formatted)) {
                  var current = arguments[i + 2];
                  formatted = formatted.replace(RegExp.$1, (RegExp.$1.length == 1) ? current : (("00" + current).substr(("" + current).length)));
              }
          }

          return formatted;
      });
  }
}
