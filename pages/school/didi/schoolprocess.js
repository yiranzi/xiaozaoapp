<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
<<<<<<< 3004cee318ef336f39b8393311f4e6c51b43cdba
import React from 'react'
import Layout from '../../../components/school/schoolLayout'
<<<<<<< b804211441c4503475c314425b207580923bc267
import SchoolProcessPage from '../../../containers/didi/schoolprocess/index'
=======
import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessPage from '../../../src/page/didi/schoolprocess/index';
>>>>>>> update:add company and refactor the code
=======
import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessPage from '../../../src/page/didi/schoolprocess/index'
>>>>>>> update: eslinit code style
=======
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../page/didi/schoolprocess/index'
>>>>>>> update: project constructor
=======
import SchoolProcessPage from '../../../containers/school/didi/schoolprocess/index'
>>>>>>> update: 调整目录结构

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
      <Layout fromType='didi'>
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
