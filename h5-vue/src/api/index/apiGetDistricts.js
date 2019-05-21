import {requestUrl} from 'config/config';
import {ajax} from 'utils';
export default function(option) {
  return ajax(`${requestUrl}/uwBooking/districts`, {
    data:option,
    type:'get',
    dataType:'json',
    processData:true
  },1)
}
