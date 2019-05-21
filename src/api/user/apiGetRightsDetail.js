/**
 * Created by admin on 2019/3/12.
 */
import {httpgateway} from 'config/config';
import {ajax} from 'utils';
export default function(option,userid) {
  return ajax(`${httpgateway}/member-rights/rights/detail`, {
    data:option,
    async:false,
    type:'get',
    dataType:'json',
    processData:true,
    headers: {userId: userid},
    xhrFields:{withCredentials: true},
    crossDomain: true
  },1,1)
}
