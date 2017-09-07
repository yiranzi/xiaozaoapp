const AxiosUtil = require('../../../src/util/axios');

const Action = {
    //获取历史
    getHistory: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/written-test-clock/getHistory'
        });
    },
    //获取用户信息
    getInfo: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/written-test-clock/getInfo'
        });
    },
    //选择班级
    selectGroups: function (info) {
        return AxiosUtil({
            method: 'get',
            url: `/api/written-test-clock/selectGroup/${info.group}`
        });
    }
};

module.exports = Action;