import AxiosUtil from '../util/axios'
import DataUtil from '../util/data'
import DateUtil from '../util/date'

// 付费信息
let canBuy = null
let canEnter = null

// 订单页
let priceInfo = {}

let payInfo = {}

payInfo.getCourseList = async (courseId) => {
  let originCourseList = await AxiosUtil.get('/api/learning/myCourse', true)
  if (DataUtil.isEmpty(originCourseList)) { return [] }
  let arr = originCourseList.map((item, index) => {
    return (formateAddStatus(item))
  })
  return arr
}

/**
 * 为原始数据，增加上课程状态。
 * over 结束
 * finish 已完成
 * doing 正在做
 * @param originCourseList
 * @returns {*}
 */
const formateAddStatus = (originCourse) => {
  if (originCourse) {
    let myCourse = JSON.parse(JSON.stringify(originCourse))
    // 1 add status
    const endDay = DateUtil.diffDay(myCourse.endDate)
    if (endDay <= 0) {
      // 已结束
      myCourse.status = 'over'
    } else {
      if (myCourse.overSection === myCourse.totalSection) {
        console.log(myCourse.overSection)
        myCourse.status = 'finish'
      } else {
        myCourse.status = 'doing'
      }
    }
    return (myCourse)
  } else {
    return (originCourse)
  }
}

/**
 * 从我的所有课程中遍历查找，判断是否购买该课程。
 */
payInfo.getPayInfo = async (courseId) => {
  let originCourseList = await AxiosUtil.get('/api/learning/myCourse', true)
  let result = originCourseList.find((course, index) => {
    return (course.courseId === courseId)
  })
  if (result) {
    return (formateAddStatus(result))
  } else {
    // 如果没有找到 返回unbuyed(因为调用前已经确定购买 不应该找不到)
    let courseInfo = {
      status: 'unbuyed'
    }
    return (courseInfo)
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
