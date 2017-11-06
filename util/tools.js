const fs = require('fs')
const path = require('path')

let ToolsUtil = {}

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

// 图片路径
ToolsUtil.isImg = function (str) {
  return str.match(/.*png$/) || str.match(/.*jpg/) || str.match(/.*jpeg/)
}

// mp3文件
ToolsUtil.isMp3 = function (str) {
  return str.match(/.*mp3/)
}

// mp4文件
ToolsUtil.isMp4 = function (str) {
  return str.match(/.*mp4/)
}

// 是字符串
ToolsUtil.isString = function (str) {
  return typeof str === 'string'
}

// 单选题
ToolsUtil.isRadio = function (type) {
  return type === 1
}

// 多选题
ToolsUtil.isCheckBox = function (type) {
  return type === 2
}

// 上传图片
ToolsUtil.isUploader = function (type) {
  return type === 3
}

// 文本题
ToolsUtil.isTextarea = function (type) {
  return type === 4
}

// 上传音频
ToolsUtil.isRecord = function (type) {
  return type === 5
}

ToolsUtil.strIsEmpty = function (str) {
  return str === null || (str !== null && str.trim() === '')
}

module.exports = ToolsUtil
