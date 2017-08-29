const axios = require('axios');

function AjaxUtil(param) {
    const {method, data, url} = param;

    const axios_params = Object.assign({}, {
        method: method,
        url: url
    });
    if (data) {
        axios_params.data = data;
    }
    return new Promise((resolve, reject) => {
        axios(axios_params).then((response) => {
            if (response.status == 200 && response.data.status == 200) {
                resolve(response.data);
            } else {
                // 接口返回错误
                const json = {
                    status: response.data.status,
                    message: response.data.message,
                    url: param.url,
                    param: data
                };
                reject(json);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports = AjaxUtil;