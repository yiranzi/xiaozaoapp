const fs = require('fs');
const path = require('path');

let ToolsUtil = {};

// 获取url参数
ToolsUtil.getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

// 遍历文件夹
ToolsUtil.walkDir = function (dir, files) {
  files = files || [];
  fs.readdirSync(dir).forEach((file) => {
    let filePath = `${dir}/${file}`;
    let stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      ToolsUtil.walkDir(filePath, files);
    } else {
      files.push(filePath);
    }
  });
};
// next.config.js exportPathMap
ToolsUtil.exportPathMap = function () {
  const dir = path.join(__dirname, '../pages');

  let files = [];
  ToolsUtil.walkDir(dir, files);
  let pathMap = {};
  files.forEach((file) => {
    let filePath = file.replace(dir, '').replace('.js', '');
    pathMap[filePath] = {page: filePath};
  });
  return pathMap;
};

module.exports = ToolsUtil;
