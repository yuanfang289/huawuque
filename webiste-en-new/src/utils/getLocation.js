/**
 * 包装location数据
 * @return {{href, protocol: string, hostname, pathname, port, origin: string}}
 */
export default function getLocation () {
  let location = window.location
  let protocol = location.protocol + '//'
  let origin = protocol + location.host

  const {
    hostname,
    href,
    port,
    pathname
  } = location

  return {
    href,
    protocol,
    hostname,
    pathname,
    port,
    origin
  }
}
