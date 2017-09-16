import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../page/un/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='un'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
