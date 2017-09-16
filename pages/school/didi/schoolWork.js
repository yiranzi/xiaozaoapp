import React from 'react'
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../src/page/didi/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='didi'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
