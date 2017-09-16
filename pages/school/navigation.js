import React from 'react'
import NavLayout from '../../components/school/schoolNavLayout'
import SchoolNavigationPage from '../../containers/navigation/index'

export default class extends React.Component {
  render () {
    return (
      <NavLayout>
        <SchoolNavigationPage />
      </NavLayout>
    )
  }
}
