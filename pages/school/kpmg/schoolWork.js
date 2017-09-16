import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../page/kpmg/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='kpmg'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
