import React from 'react'
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessExpPage from '../../../src/page/qiangsheng/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='qiangsheng'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
