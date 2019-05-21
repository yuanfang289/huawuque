/**
 * Created by xiezy on 2018/10/23.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(data) {
  return ajax(`${requestUrl}/pay/redirect?retUrl=`+encodeURIComponent('http://www.baidu.com'), {
    data
  })
}

// export default function(option) {
//   return ajax(`${requestUrl}/pay/redirect`, {
//     data:option.data,
//     type:'get',
//     dataType:'json',
//     processData:true
//   })
// }
