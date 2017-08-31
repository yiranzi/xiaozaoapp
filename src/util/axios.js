const axios = require('axios');

function AxiosUtil(param) {
    let {method, data, url} = param;

    if(process.env.NODE_ENV === "development"){
        url = `http://192.168.200.183:8082${url}`;
    }

    const axios_params = Object.assign({}, {
        method: method,
        url: url
    });
    if (data) {
        axios_params.data = data;
    }
    return new Promise((resolve, reject) => {
        axios(axios_params).then((res) => {
            if (res.status == 200 && res.data.status == 200) {
                resolve(res.data.response);
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
            reject(error.response.status);
        });
    });
}

module.exports = AxiosUtil;