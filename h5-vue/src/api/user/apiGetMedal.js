/**
 * Created by admin on 2018/11/27.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/gateway3/task/task/medal/v1/getmedal`, {
  //  return ajax(`http://api2.test.urwork.cn/task/medal/v1/getmedal`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
