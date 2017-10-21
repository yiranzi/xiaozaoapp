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

dataUtil.imgFormat = function (base64, type) {
  let text = window.atob(base64.split(',')[1])
  let buffer = new Uint8Array(text.length)
  for (let i = 0; i < text.length; i++) {
    buffer[i] = text.charCodeAt(i)
  }
  let blob = getBlob([buffer], type)
  let formdata = new FormData()
  formdata.append('file', blob, `blob.${type.split('/')[1]}`)
  return formdata

  function getBlob (buffer, format) {
    try {
      return new Blob(buffer, {type: format})
    } catch (e) {
      let bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)()
      buffer.forEach(function (buf) {
        bb.append(buf)
      })
      return bb.getBlob(format)
    }
  }
}

module.exports = dataUtil
