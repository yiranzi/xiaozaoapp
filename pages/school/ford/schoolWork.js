import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessWorkPage from '../../../containers/ford/schoolprocessWork/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='ford'>
        <SchoolProcessWorkPage />
      </Layout>
    )
  }
}
