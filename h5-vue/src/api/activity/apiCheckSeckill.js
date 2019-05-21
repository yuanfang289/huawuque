/**
 * Created by xiezy on 2018/12/17.
 */
import {requestUrl} from 'config/config';
import {httpapi3} from 'config/config';
import {ajax} from 'utils';
export default function(option) {
  return ajax(`${httpapi3}/seckill/goods/v1/checkseckill`, {
    data:option,
    type:'get',
    dataType:'json',
    xhrFields:{withCredentials: true},
    crossDomain: true,
    processData:false,
  /*  headers: {'cookies' : document.cookie },*/
  },1)
}
