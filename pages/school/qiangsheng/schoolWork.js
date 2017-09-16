import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../containers/qiangsheng/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='zhaoshang'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
