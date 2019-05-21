import {requestUrl} from 'config/config';
import {ajax} from 'utils';
export default function(option) {
  return ajax(`${requestUrl}/booking/saveEnter`, {
    data:option,
    type:'post',
    dataType:'json',
    contentType:"json",
    processData:true
  },1)
}
