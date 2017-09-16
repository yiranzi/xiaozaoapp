import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/un/schoolprocess/index'
=======
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessPage from '../../../src/page/un/schoolprocess/index'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  // static async getInitialProps({req}) {
  //     let error, companyDetail;
  //     let {companyId} = req.params;
  //     companyId = parseInt(companyId);
  //     try {
  //         const setJson = await CompanyAction.getCompany(companyId);
  //         companyDetail = setJson.response;
  //         console.log(companyDetail);
  //     } catch (err) {
  //
  //     }
  //     return {
  //         companyDetail
  //     }
  // }

  render () {
    return (
      <Layout fromType='un'>
        <SchoolProcessPage />
      </Layout>
    )
  }
}
