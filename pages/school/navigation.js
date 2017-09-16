import React from 'react'
import NavLayout from '../../components/school/schoolNavLayout'
import SchoolNavigationPage from '../../page/navigation/index'

export default class extends React.Component {
  render () {
    return (
      <NavLayout>
        <SchoolNavigationPage />
      </NavLayout>
    )
  }
}
