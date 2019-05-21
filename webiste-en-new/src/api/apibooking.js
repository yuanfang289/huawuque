import ajax from '@/utils/ajax'

export default function (data) {
  return ajax(`/api/booking/create`, {
    data,
    catchRes: false
  })
}
