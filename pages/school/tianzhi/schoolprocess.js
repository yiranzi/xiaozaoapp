import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/school/tianzhi/schoolprocess/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='tianzhi'>
        <SchoolProcessPage />
      </Layout>
    )
  }
}
