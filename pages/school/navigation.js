import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import NavLayout from '../../components/school/schoolNavLayout'
<<<<<<< b804211441c4503475c314425b207580923bc267
import SchoolNavigationPage from '../../containers/navigation/index'
=======
import NavLayout from '../../src/components/school/schoolNavLayout'
import SchoolNavigationPage from '../../src/page/navigation/index'
>>>>>>> update: eslinit code style
=======
import NavLayout from '../../components/school/schoolNavLayout'
import SchoolNavigationPage from '../../page/navigation/index'
>>>>>>> update: project constructor
=======
import SchoolNavigationPage from '../../containers/school/navigation/index'
>>>>>>> update: 调整目录结构

export default class extends React.Component {
  render () {
    return (
      <NavLayout>
        <SchoolNavigationPage />
      </NavLayout>
    )
  }
}
