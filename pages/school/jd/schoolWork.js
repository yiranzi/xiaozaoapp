import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../containers/jd/schoolprocessWork/index'
=======
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../src/page/jd/schoolprocessWork/index'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='jd'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
