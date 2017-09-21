let dataUtil = {}

dataUtil.isObject = function (obj) {
  let type = typeof obj
  return type === 'object'
}

dataUtil.isEmpty = function (data) {
  if (data == null) return true
  if (dataUtil.isObject(data)) {
    return Object.keys(data).length === 0
  }
  return data.length === 0
}

module.exports = dataUtil
