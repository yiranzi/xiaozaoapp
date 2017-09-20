const AxiosUtil = require('../../util/axios')

const WrittenTestClockSecondAction = {
  // 获取测评
  getEvaluation: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getEvaluation'
    })
  },
  // 获取测试题目
  getTest: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getTest'
    })
  },
  // 获取今日推送题目
  getToday: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getToday'
    })
  },
  // 获取昨日推送
  getYesterday: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getYesterday'
    })
  },
  // 获取指定做题记录
  getByDay: function (day) {
    return AxiosUtil({
      method: 'get',
      url: `/api/written-test-clock/getByDay/${day}`
    })
  },

  // 提交做题记录
  complete: function (data) {
    return AxiosUtil({
      method: 'post',
      url: '/api/written-test-clock/complete',
      data: data
    })
  },

  // 获取历史
  getHistory: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getHistory'
    })
  },
  // 获取用户信息
  getInfo: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getInfo'
    })
  },
  // 选择班级
  selectGroups: function (info) {
    return AxiosUtil({
      method: 'get',
      url: `/api/written-test-clock/selectGroup/${info.group}`
    })
  }
}

module.exports = WrittenTestClockSecondAction
