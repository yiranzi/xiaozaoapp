import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/school/bdo/schoolprocess/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='bdo'>
        <SchoolProcessPage />
      </Layout>
    )
  }
}
