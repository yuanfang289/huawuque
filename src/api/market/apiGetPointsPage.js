/**
 * Created by admin on 2019/3/13.
 */
import {requestUrl} from 'config/config';
import {httpapi3} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${httpapi3}/company-account/v1/getPointsPage`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true,
    xhrFields:{withCredentials: true},
    crossDomain: true
  },0,1)
}
