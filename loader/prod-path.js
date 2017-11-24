module.exports = function (source, map) {
  return source.replace(/http:\/\/rcwx.review.xiaozao.org/g, `$1https://wx.xiaozao.org$2?v=${Date.now()}$3`)
}
