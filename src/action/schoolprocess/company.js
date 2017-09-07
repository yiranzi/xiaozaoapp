import AxiosUtil from '../../../src/util/axios';

const CompanyAction = {
  // 获取试题
  getCompany: function (companyId) {
    let url = `/static/school/jsonData/company-${companyId}.json`;
    return AxiosUtil({
      method: 'get',
      url: url
    });
  }
};

export default CompanyAction;
