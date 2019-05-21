import ajax from '@/utils/ajax'

export default function (data) {
  return ajax(`/api/workstage/mapList`, {
    data,
    catchRes: false
  })
}
