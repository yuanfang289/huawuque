/**
 *  回复某人
 *
 * @param replyText          需要转换的文本
 */
export default function parseReply(replyText) {
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
            textArr[i] = ' 回复 <em class="at">' + replyName + '</em>： ';
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
}
