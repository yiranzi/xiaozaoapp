let DateUtil = {}

// 日期格式化
DateUtil.format = function (date, fmt) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  // yyyy-MM-dd hh:mm:ss
  // yyyy年MM月dd日 hh时mm分ss秒S毫秒
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

DateUtil.diffDay = function (endTime) {
  let d1 = DateUtil.format(new Date(endTime), 'yyyy-MM-dd')
  let d2 = DateUtil.format(new Date(), 'yyyy-MM-dd')
  d1 = new Date(d1)
  d2 = new Date(d2)
  var days = d1.getTime() - d2.getTime()
  var time = parseInt(days / (1000 * 60 * 60 * 24))
  return time
}

module.exports = DateUtil
