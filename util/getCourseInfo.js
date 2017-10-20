const fs = require('fs')
const path = require('path')
// import AxiosUtil from '../../util/axios'

let ToolsUtil = {}

// 笔试打卡正确率
ToolsUtil.exceeds = [
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  2, 3, 4, 4, 4, 5, 5, 5, 6, 6,
  6, 6, 7, 7, 7, 8, 8, 8, 9, 9,
  9, 9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 18, 20, 22, 24, 26, 28, 30,
  32, 34, 36, 38, 39, 42, 44, 46, 48,
  51, 54, 57, 60, 63, 65, 67, 69, 72,
  75, 77, 80, 82, 84, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 96, 96, 96,
  96, 97, 97, 97, 97, 97, 98, 98, 98,
  98, 98, 99, 99, 99, 99, 99, 100
]

// qq群号
ToolsUtil.qqGroupNum = {
  H1: '671189317',
  H2: '654059046',
  H3: '563500464',
  N1: '653401771',
  N2: '671178421',
  N3: '659427669'
}

// 获取url参数
ToolsUtil.getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

// 遍历文件夹
ToolsUtil.walkDir = function (dir, files) {
  files = files || []
  fs.readdirSync(dir).forEach((file) => {
    let filePath = `${dir}/${file}`
    let stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      ToolsUtil.walkDir(filePath, files)
    } else {
      files.push(filePath)
    }
  })
}
// next.config.js exportPathMap
ToolsUtil.exportPathMap = function () {
  const dir = path.join(__dirname, '../pages')

  let files = []
  ToolsUtil.walkDir(dir, files)
  let pathMap = {}
  files.forEach((file) => {
    let filePath = file.replace(dir, '').replace('.js', '')
    pathMap[filePath] = {page: filePath}
  })
  return pathMap
}

ToolsUtil.isImg = function (str) {
  return str.match(/.*png$/) || str.match(/.*jpg/) || str.match(/.*jpeg/)
}

ToolsUtil.isMp3 = function (str) {
  return str.match(/.*mp3/)
}

module.exports = ToolsUtil
