import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../containers/mars/schoolprocessExp/index'
=======
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessExpPage from '../../../src/page/mars/schoolprocessExp/index'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='mars'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
