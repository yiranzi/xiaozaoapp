module.exports = function (source, map) {
  return source.replace(/http:\/\/rcwx.review.xiaozao.org/g, 'https://wx.xiaozao.org') && source.replace(/http:\/\/wx.xiaozao.org/g, 'https://wx.xiaozao.org')
}
