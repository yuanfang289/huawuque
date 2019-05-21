/**
 * Created by admin on 2019/3/13.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/gateway/company-account/v1/getPointsPage`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  })
}
