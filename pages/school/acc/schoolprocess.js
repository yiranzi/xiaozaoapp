<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
<<<<<<< 3004cee318ef336f39b8393311f4e6c51b43cdba
import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/acc/schoolprocess/index'

export default class extends React.Component {
=======
import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessPage from '../../../src/page/acc/schoolprocess/index';
=======
import React from 'react'
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessPage from '../../../src/page/acc/schoolprocess/index'
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

>>>>>>> update:add company and refactor the code
  render () {
    return (
      <Layout fromType='acc'>
        <SchoolProcessPage />
      </Layout>
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
<<<<<<< 3004cee318ef336f39b8393311f4e6c51b43cdba
    )
=======
    );
>>>>>>> update:add company and refactor the code
=======
    )
>>>>>>> update: eslinit code style
  }
}
