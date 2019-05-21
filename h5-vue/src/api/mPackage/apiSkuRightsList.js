/**
 * Created by admin on 2019/3/26.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://gateway.urwork.cn/member-gift/product/getSkuRightsList`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },0,1)
}
