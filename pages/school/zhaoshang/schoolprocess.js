import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../page/zhaoshang/schoolprocess/index'

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
      <Layout fromType='zhaoshang'>
        <SchoolProcessPage />
      </Layout>
    )
  }
}
