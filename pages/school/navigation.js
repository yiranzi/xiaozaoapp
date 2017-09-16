import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import NavLayout from '../../components/school/schoolNavLayout'
import SchoolNavigationPage from '../../containers/navigation/index'
=======
import NavLayout from '../../src/components/school/schoolNavLayout'
import SchoolNavigationPage from '../../src/page/navigation/index'
>>>>>>> update: eslinit code style

export default class extends React.Component {
  render () {
    return (
      <NavLayout>
        <SchoolNavigationPage />
      </NavLayout>
    )
  }
}
