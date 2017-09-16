import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../page/didi/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='didi'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
