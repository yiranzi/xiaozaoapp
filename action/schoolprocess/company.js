<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:action/schoolprocess/company.js
import AxiosUtil from '../../util/axios'
=======
import AxiosUtil from '../../../src/util/axios'
>>>>>>> update: eslinit code style:src/action/schoolprocess/company.js

const CompanyAction = {
  // 获取试题
  getCompany: function (companyId) {
    let url = `/static/school/jsonData/company-${companyId}.json`
    return AxiosUtil({
      method: 'get',
      url: url
    })
  }
}

export default CompanyAction
