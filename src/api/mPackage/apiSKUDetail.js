import {ajax} from 'utils';
/**
 * Created by 87402 on 2019/3/20.
 */
export default function(option) {
  return ajax(`https://gateway.urwork.cn/member-gift/product/spuAndSkuDetail`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1,1)
}
