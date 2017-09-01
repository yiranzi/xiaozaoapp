const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    //获取试题
    getEvaluation: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getEvaluation'
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
    //提交做题记录
    complete: function (data) {
        return AxiosUtil({
            method: 'get',
            url: `/api/clock/complete?info=${data}`,
        });
    }
};

module.exports = AnswerAction;