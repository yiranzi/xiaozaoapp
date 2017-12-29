import Router from "next/router";
import {Alert} from '../xz-components/alert'
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

ToolsUtil.goRouter = function (pathUrl) {
  if (window.__wxjs_environment === 'miniprogram') {
    // 判断链接是否对小程序有效
    let result = pathUrl.search(/xiaozao.org/)
    if (result && result !== '-1') {
      Router.push(pathUrl)
    } else {
      Alert({ content: '课程正在报名中！获取课程详情、报名课程请联系小助手Harry ( xiaozao906 )' })
    }
  } else {
    location.href = pathUrl
  }
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

// 是否空字符串
ToolsUtil.strIsEmpty = function (str) {
  return str === null || (str !== null && str.trim() === '')
}

// 是否手机号
ToolsUtil.isPhone = function (str) {
  return /^1\d{10}$/.test(str)
}

// 是否邮箱
ToolsUtil.isMail = function (str) {
  // eslint-disable-next-line max-len
  return /^\b(^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b$/.test(str)
}

module.exports = ToolsUtil
