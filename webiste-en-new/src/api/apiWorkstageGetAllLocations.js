/**
 * Created by admin on 2018/12/4.
 */
import ajax from '@/utils/ajax'

export default function(data) {
  return ajax(`/api/workstage/getAllLocations`,{
    data,
    catchRes: false
  })
}
