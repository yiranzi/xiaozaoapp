const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    getHistory: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getHistory'
        });
    }
};

module.exports = AnswerAction;