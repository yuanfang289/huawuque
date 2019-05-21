/**
 * @某人
 *
 * @param atText          需要转换的文本
 */
export default function parseAt(atText) {
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
}
