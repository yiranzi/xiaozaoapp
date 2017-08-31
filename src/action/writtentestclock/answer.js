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
    }
};

module.exports = AnswerAction;