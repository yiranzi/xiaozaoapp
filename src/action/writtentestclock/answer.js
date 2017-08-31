const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    //获取试题
    getEvaluation: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getEvaluation'
        });
    }
};

module.exports = AnswerAction;