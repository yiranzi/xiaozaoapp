const next = require('next')
const express = require('express')
const proxy = require('http-proxy-middleware')

const server = express()
const app = next({dev: true})
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  // 处理静态数据
  // server.use('/static', proxy({
  //   target: 'http://wx.xiaozao.org',
  //   changeOrigin: true
  // }))
  server.use('/upload', proxy({
    target: 'https://www.xiaozao.org',
    changeOrigin: true
  }))

  server.use('/api', proxy({
    target: 'https://rcwx.review.xiaozao.org',
    changeOrigin: true
  }))

  // 路由使用next约定处理
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Server ready on http://localhost:${port}`)
  })
})
