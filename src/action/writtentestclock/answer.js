const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
  // 获取测评
  getEvaluation: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getEvaluation'
    });
  },
  // 获取测试题目
  getTest: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getTest'
    });
  },
  // 获取今日推送题目
  getToday: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getToday'
    });
  },
  // 获取昨日推送
  getYesterday: function () {
    return AxiosUtil({
      method: 'get',
      url: '/api/written-test-clock/getYesterday'
    });
  },
  // 获取指定做题记录
  getByToday: function (day) {
    return AxiosUtil({
      method: 'get',
      url: `/api/written-test-clock/getByDay/${day}`
    });
  },

  // 提交做题记录
  complete: function (data) {
    return AxiosUtil({
      method: 'post',
      url: '/api/written-test-clock/complete',
      data: data
    });
  }
};

module.exports = AnswerAction;
