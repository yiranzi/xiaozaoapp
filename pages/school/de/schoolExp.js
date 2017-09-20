import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import SchoolProcessExpPage from '../../../containers/school/de/schoolprocessExp/index'

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='de'>
        <SchoolProcessExpPage />
      </Layout>
    )
  }
}
