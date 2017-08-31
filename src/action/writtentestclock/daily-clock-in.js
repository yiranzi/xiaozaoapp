const AxiosUtil = require('../../../src/util/axios');

const AnswerAction = {
    //获取用户信息
    getInfo: function () {
        return AxiosUtil({
            method: 'get',
            url: '/api/clock/getInfo'
        });
    }
};

module.exports = AnswerAction;