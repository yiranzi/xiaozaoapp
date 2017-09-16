import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../page/pwccn/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='pwccn'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
