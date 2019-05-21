/**
 * Created by Administrator on 2018/10/8.
 */
/**
 * Created by XieZy on 2018/9/30.
 */
import {requestUrl} from 'config/config';
import {ajax} from 'utils';

export default function(option) {
  return ajax(`${requestUrl}/gateway/task/task/v1/event`, {
    data:option.data,
    type:'post',
    dataType:'json',
    processData:true
  })
}
