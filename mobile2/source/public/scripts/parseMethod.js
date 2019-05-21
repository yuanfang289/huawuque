
UR.parseAt = function (atText) {
    var isMatch = false;
    var textArr = atText.split('|||');
    var atReg = /urwork:\/\/atUser(.*?)/ig;
    for (var i = 0; i < textArr.length; i++) {
        if (atReg.test(textArr[i])) {
            isMatch = true;
            if (textArr[i].indexOf('userName') !== -1) {
                var infoArr = textArr[i].split('&');
                for (var j = 0; j < infoArr.length; j++) {
                    if (infoArr[j].indexOf('userName') !== -1) {
                        var name = infoArr[j].split('=')[1]
                        textArr[i] = ' <em class="at"> @' + name + '</em> ';
                    }
                }
            }
        }
    }
    if (isMatch) {
        return textArr.join('');
    }
    return atText;
};

UR.parseReply = function (replyText) {
    var isMatch = false;
    var textArr = replyText.split('|||');
    var replyReg = /urwork:\/\/replyUser(.*?)/ig;
    var atReg = /urwork:\/\/atUser(.*?)/ig;
    for (var i = 0; i < textArr.length; i++) {
        if (replyReg.test(textArr[i])) {
            isMatch = true;
            if (textArr[i].indexOf('userName') !== -1) {
                var infoArr = textArr[i].split('&');
                for (var j = 0; j < infoArr.length; j++) {
                    if (infoArr[j].indexOf('userName') !== -1) {
                        var replyName = infoArr[j].split('=')[1];
                        textArr[i] = ' 回复 <em class="at">' + replyName + '</em>： ';
                    }
                }
            }
        }
        if (atReg.test(textArr[i])) {
            if (textArr[i].indexOf('userName') !== -1) {
                var atArr = textArr[i].split('&');
                for (var j = 0; j < atArr.length; j++) {
                    if (atArr[j].indexOf('userName') !== -1) {
                        var atName = atArr[j].split('=')[1];
                        textArr[i] = ' <em class="at"> @' + atName + '</em> ';
                    }
                }
            }
        }
    }

    if (isMatch) {
        return textArr.join('');
    }
    return replyText;
};
