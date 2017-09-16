import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../page/hsbc/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='hsbc'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
