import React from 'react'
import Layout from '../../../src/components/school/schoolLayout'
import SchoolProcessPage from '../../../src/page/acc/schoolprocess/index'


export default class extends React.Component {
  render () {
    return (
      <Layout fromType='acc'>
        <SchoolProcessPage />
      </Layout>
    )
  }
}
