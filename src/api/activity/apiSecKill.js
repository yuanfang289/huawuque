/**
 * Created by xiezy on 2018/12/12.
 */
import {requestUrl} from 'config/config';
import {httpapi3} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${httpapi3}/seckill/goods/v1/getpagedata`, {
    data
  })
}
