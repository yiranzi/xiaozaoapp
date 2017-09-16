module.exports = {
  load: function (server) {
    // 首页
    server.get('/course', (req, res) => {
      return res.redirect('https://www.baidu.com')
    })
  }
}
