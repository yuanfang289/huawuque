/**
 * 获取链接的查询参数，生成对象格式
 */
export default function getQueryParams(search) {
  let ret = {};
  let _search = window.location.search;
  if (search) _search = '?' + search;

  decodeURIComponent(_search).substr(1).replace(/(\w+)=([^&]*)(&|$)/ig, function(a, b, c) {
    ret[b] = c;
  });
  return ret;
}
