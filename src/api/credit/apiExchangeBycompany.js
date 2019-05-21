import {routePrehttp} from 'config/config';
import {ajax} from 'utils';

export default function(option,userid,companyId="") {
  return ajax(`${routePrehttp}/points/exchange/company?companyId=${companyId}`, {
    data:option,
    type:'post',
    contentType:'json',
    headers:{userId:userid}
  },1)
}