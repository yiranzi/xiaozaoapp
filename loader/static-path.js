module.exports = function (source, map) {
  return source.replace(/(['"(\\])(\/static\/[^'"()\s\\]+)(['")\\])/g, `$1https://wx.xiaozao.org$2?v=${Date.now()}$3`)
}
