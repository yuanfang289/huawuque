/**
 * Created by 87402 on 2019/2/26.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`https://attendance.urwork.cn/userCompany/isAdmin`, {
    data:{companyId:option.companyId},
    headers:{userId:option.userId},
    type:'get',
    //dataType:'json',
    processData:true
  })
}
