const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    //获取历史
    getHistory: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getHistory'
        });
    }
};

module.exports = AnswerAction;