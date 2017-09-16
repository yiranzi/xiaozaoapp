import React from 'react'
import NavLayout from '../../src/components/school/schoolNavLayout'
import SchoolNavigationPage from '../../src/page/navigation/index'

export default class extends React.Component {
  render () {
    return (
      <NavLayout>
        <SchoolNavigationPage />
      </NavLayout>
    )
  }
}
