const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    //获取测评
    getEvaluation: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getEvaluation'
        });
    },
    //获取测试题目
    getTest: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getTest'
        });
    },
    //获取今日推送题目
    getToday: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getToday'
        });
    },
    //获取昨日推送
    getYesterday: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getYesterday'
        });
    },
    //获取指定做题记录
    getByToday: function (day) {
        return AxiosUtil({
            method: 'get',
            url: `/api/clock/getByDay?day=${day}`
        });
    },

    //提交做题记录
    complete: function (data) {
        return AxiosUtil({
            method: 'get',
            url: `/api/clock/complete?info=${data}`,
        });
    }
};

module.exports = AnswerAction;