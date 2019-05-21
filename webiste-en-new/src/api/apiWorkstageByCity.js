import ajax from '@/utils/ajax'

export default function (data) {
  return ajax(`/api/workstage/listByCity`, {
    data,
    catchRes: false
  })
}
