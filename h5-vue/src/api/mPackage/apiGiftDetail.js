/**
 * Created by admin on 2019/3/22.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://gateway.urwork.cn/member-gift/product/spuAndSkuDetail`, {
  // return ajax(`https://api3-test.urwork.cn/member-gift/product/spuAndSkuDetail`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1,1)
}
