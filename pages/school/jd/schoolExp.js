import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../containers/jd/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='jd'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
