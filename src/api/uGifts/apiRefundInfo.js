import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/memberPackage/selMemberPackageRefund`,{
    data:option,
    type:'post',
    dataType:'json',
    processData:true
  })
}
