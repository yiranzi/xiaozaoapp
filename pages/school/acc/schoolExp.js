import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../page/acc/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='acc'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
