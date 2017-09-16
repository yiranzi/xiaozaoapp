import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../page/mars/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='mars'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
