<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
<<<<<<< 151815eb1135c264f1e54fb6f09acc1f82b0fb1a
import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/yiqi/schoolprocess/index'
=======
import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessPage from '../../../src/page/yiqi/schoolprocess/index';
>>>>>>> udpate:add company
=======
import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessPage from '../../../src/page/yiqi/schoolprocess/index'
>>>>>>> update: eslinit code style
=======
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../page/yiqi/schoolprocess/index'
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
      <Layout fromType='yiqi'>
        <SchoolProcessPage />
      </Layout>
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
<<<<<<< 151815eb1135c264f1e54fb6f09acc1f82b0fb1a
    )
=======
    );
>>>>>>> udpate:add company
=======
    )
>>>>>>> update: eslinit code style
  }
}
