import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../page/ford/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='ford'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
