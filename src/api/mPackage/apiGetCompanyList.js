import {ajax} from 'utils';
import {requestUrl} from 'config/config';
export default function(option) {
  return ajax(`${requestUrl}/user/getCompanyListByUserId`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1,1)
}
