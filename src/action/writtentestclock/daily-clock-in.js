const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    getInfo: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getInfo'
        });
    }
};

module.exports = AnswerAction;