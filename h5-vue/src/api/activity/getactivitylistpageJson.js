/**
 * Created by admin on 2019/4/16.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/activity/getactivitylistpageJson`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1)
}
