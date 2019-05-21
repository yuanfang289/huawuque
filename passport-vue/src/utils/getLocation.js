export default function getLocation() {
  let location  = window.location,
    protocol  = location.protocol + '//',
    origin    = protocol + location.host;

  const {
    hostname,
    href,
    port,
    pathname
  } = location;

  return {
    href,
    protocol,
    hostname,
    pathname,
    port,
    origin
  }
}
