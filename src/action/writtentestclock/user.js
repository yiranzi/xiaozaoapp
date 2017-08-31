const AxiosUtil = require('../../../src/util/axios');

const Action = {
    //获取历史
    getHistory: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getHistory'
        });
    },
    //获取用户信息
    getInfo: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getInfo'
        });
    },
    //获取昨天信息
    getYesterday: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getYesterday'
        });
    }
};

module.exports = Action;