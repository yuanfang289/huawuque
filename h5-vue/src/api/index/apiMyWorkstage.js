import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function() {
  return ajax(`${requestUrl}/user/getMyWorkstage`, {
    type:'get',
    dataType:'json',
    processData:true
  })
}
