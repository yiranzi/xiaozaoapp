import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import Layout from '../../../components/school/schoolLayout'
<<<<<<< b804211441c4503475c314425b207580923bc267
import SchoolProcessExpPage from '../../../containers/mars/schoolprocessExp/index'
=======
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessExpPage from '../../../src/page/mars/schoolprocessExp/index'
>>>>>>> update: eslinit code style
=======
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../page/mars/schoolprocessExp/index'
>>>>>>> update: project constructor
=======
import SchoolProcessExpPage from '../../../containers/school/mars/schoolprocessExp/index'
>>>>>>> update: 调整目录结构

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='mars'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
