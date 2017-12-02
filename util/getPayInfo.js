import AxiosUtil from '../util/axios'
import DateUtil from '../util/date'

// 付费信息
let canBuy = null
let canEnter = null

// 订单页
let priceInfo = {}

let payInfo = {}

payInfo.getCourseList = async (courseId) => {
  let originCourseList = await AxiosUtil.get('/api/private/learning/myCourse')
  return (formate(originCourseList))
}

payInfo.getPayInfo = async (courseId) => {
  let myCourseList = await payInfo.getCourseList()
  let result = myCourseList.find((course, index) => {
    return (course.courseId === courseId)
  })
  if (result) {
    return (result)
  } else {
    let courseInfo = {
      status: 'unbuyed'
    }
    return (courseInfo)
  }
}

const formate = (originCourseList) => {
  if (originCourseList && originCourseList.length > 0) {
    let myCourseList = JSON.parse(JSON.stringify(originCourseList))
    // 1 add status
    myCourseList.forEach((item, index) => {
      const endDay = DateUtil.diffDay(item.endDate)
      if (endDay <= 0) {
        // 已结束
        item.status = 'over'
      } else {
        if (item.overSection === item.totalSection) {
          item.status = 'finish'
        } else {
          item.status = 'doing'
        }
      }
    })
    return (myCourseList)
  } else {
    return (originCourseList)
  }
}

/*
  获得基本付费信息
 */
payInfo.getPriceInfo = () => {
  return priceInfo
}

payInfo.getCanEnter = function () {
  return canEnter
}

payInfo.getCanBuy = function () {
  return canBuy
}

payInfo.getPayStatus = () => {
  let payStatus = localStorage.getItem('payStatus')
  if (payStatus === 'true') {
    payStatus = true
  } else {
    payStatus = false
  }
  return payStatus
}

module.exports = payInfo
