<<<<<<< 151815eb1135c264f1e54fb6f09acc1f82b0fb1a
import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/tianzhi/schoolprocess/index'
=======
import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessPage from '../../../src/page/tianzhi/schoolprocess/index';
>>>>>>> udpate:add company

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
      <Layout fromType='tianzhi'>
        <SchoolProcessPage />
      </Layout>
<<<<<<< 151815eb1135c264f1e54fb6f09acc1f82b0fb1a
    )
=======
    );
>>>>>>> udpate:add company
  }
}
