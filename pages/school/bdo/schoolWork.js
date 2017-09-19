import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../containers/school/bdo/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='bdo'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
