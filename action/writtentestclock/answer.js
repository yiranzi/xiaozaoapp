<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324:action/writtentestclock/answer.js
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:action/writtentestclock/answer.js
const AxiosUtil = require('../../util/axios')
=======
const AxiosUtil = require('../../../src/util/axios')
>>>>>>> update: eslinit code style:src/action/writtentestclock/answer.js
=======
const AxiosUtil = require('../../util/axios')
>>>>>>> update: project constructor:action/writtentestclock/answer.js

const AnswerAction = {
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
  getByToday: function (day) {
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
  }
}

module.exports = AnswerAction
