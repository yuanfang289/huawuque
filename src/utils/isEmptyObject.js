/**
 * 判断一个对象是不是空对象
 *
 * @param obj
 * @return {boolean}
 */
export default function isEmptyObject(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
