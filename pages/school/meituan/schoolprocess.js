<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
<<<<<<< 3004cee318ef336f39b8393311f4e6c51b43cdba
import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/meituan/schoolprocess/index'
=======
import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessPage from '../../../src/page/meituan/schoolprocess/index';
>>>>>>> update:add company and refactor the code
=======
import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessPage from '../../../src/page/meituan/schoolprocess/index'
>>>>>>> update: eslinit code style
=======
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../page/meituan/schoolprocess/index'
>>>>>>> update: project constructor

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
      <Layout fromType='meituan'>
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
