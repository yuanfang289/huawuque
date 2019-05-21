/**
 *
 * 将16进制色值转换成RGB类型
 *
 * @param hex
 * @return {{R: *, G: *, B: *, RGB: string}}
 */
export default function hexToRGB(hex) {
  function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
  }
  function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
  }
  function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
  }
  function cutHex(h) {
    return h.charAt(0) === "#" ? h.substring(1, 7) : h
  }

  const R = hexToR(hex), G = hexToG(hex), B = hexToB(hex);

  return {
    R,
    G,
    B,
    RGB: `${R},${G},${B}`
  }
}
