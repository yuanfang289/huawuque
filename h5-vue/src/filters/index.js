import Vue from 'vue';

// @某人
Vue.filter('parseAt', (atText) => {
  let isMatch = false;
  let textArr = atText.split('|||');
  let atReg = /urwork:\/\/atUser(.*?)/ig;
  for (let i = 0; i < textArr.length; i++) {
    if (atReg.test(textArr[i])) {
      isMatch = true;
      if (textArr[i].indexOf('userName') !== -1) {
        let infoArr = textArr[i].split('&');
        for (let j = 0; j < infoArr.length; j++) {
          if (infoArr[j].indexOf('userName') !== -1) {
            let name = infoArr[j].split('=')[1];
            textArr[i] = ' <em class="at" style="color: #2c67b2"> @' + name + '</em> ';
          }
        }
      }
    }
  }
  if (isMatch) {
    return textArr.join('');
  }
  return atText;
});

// 回复某人
Vue.filter('parseReply', (replyText) => {
  let isMatch = false;
  let textArr = replyText.split('|||');
  let replyReg = /urwork:\/\/replyUser(.*?)/ig;
  let atReg = /urwork:\/\/atUser(.*?)/ig;
  for (let i = 0; i < textArr.length; i++) {
    if (replyReg.test(textArr[i])) {
      isMatch = true;
      if (textArr[i].indexOf('userName') !== -1) {
        let infoArr = textArr[i].split('&');
        for (let j = 0; j < infoArr.length; j++) {
          if (infoArr[j].indexOf('userName') !== -1) {
            let replyName = infoArr[j].split('=')[1];
            textArr[i] = ' 回复 <em class="at" style="color: #2c67b2">' + replyName + '</em>： ';
          }
        }
      }
    }
    if (atReg.test(textArr[i])) {
      if (textArr[i].indexOf('userName') !== -1) {
        let atArr = textArr[i].split('&');
        for (let j = 0; j < atArr.length; j++) {
          if (atArr[j].indexOf('userName') !== -1) {
            let atName = atArr[j].split('=')[1];
            textArr[i] = ' <em class="at" style="color: #2c67b2"> @' + atName + '</em> ';
          }
        }
      }
    }
  }

  if (isMatch) {
    return textArr.join('');
  }
  return replyText;
});

// 回复某人
Vue.filter('numberComputed', (number) => {
  if(number <= 1000) {
    return number;
  }
  else if(number > 1000 && number < 10000) {
    return (number / 1000).toFixed(1) + 'k'
  } else {
    return (number / 10000).toFixed(1) + 'w'
  }

});

// 找出最后连续的数字
Vue.filter('finallyNum', (str) => {
 return str.replace(/[^0-9]/g,'|').split('|').filter((s)=>{return s && s.trim();}).pop();
});

// "常** 购买U礼123包订单赠送U点 赚1取21U点".replace(/[0-9]*([^0-9]*)$/,'|$1')   输出字符串最后出现的连续的数字
Vue.filter('delFinallyNumArry0', (str) => {
  return str.replace(/[0-9]*([^0-9]*)$/,'|$1').split('|')[0];
});
Vue.filter('delFinallyNumArry1', (str) => {
  return str.replace(/[0-9]*([^0-9]*)$/,'|$1').split('|')[1];
});
