import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessPage from '../../../containers/school/ali/schoolprocess/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='ali'>
        <SchoolProcessPage />
      </Layout>
    )
  }
}
