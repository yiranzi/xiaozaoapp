import AxiosUtil from '../util/axios'

let payStatus = 'UnKnow'

let courseInfo = {}

courseInfo.getList = async () => {
  console.log(payStatus)
  return new Promise((resolve, reject) => {
    AxiosUtil({method: 'get', url: '/api/interview/getList'}).then((res) => {
      payStatus = 'pay'
      resolve(res)
    }).catch((e) => {
      if (e.status === 10001) {
        payStatus = 'UnPay'
      }
      reject(e)
    })
  })
}

courseInfo.getPayStatus = function () {
  return payStatus
}


module.exports = courseInfo
