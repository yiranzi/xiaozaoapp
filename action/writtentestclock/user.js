<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324:action/writtentestclock/user.js
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:action/writtentestclock/user.js
const AxiosUtil = require('../../util/axios')
=======
const AxiosUtil = require('../../../src/util/axios')
>>>>>>> update: eslinit code style:src/action/writtentestclock/user.js
=======
const AxiosUtil = require('../../util/axios')
>>>>>>> update: project constructor:action/writtentestclock/user.js

const Action = {
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

module.exports = Action
