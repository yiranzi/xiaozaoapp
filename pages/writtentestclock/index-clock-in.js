import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import IndexClockIn from '../../containers/writtentestclock/index-clock-in'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
=======
import IndexClockIn from '../../src/page/writtentestclock/index-clock-in'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
>>>>>>> update: eslinit code style
=======
import IndexClockIn from '../../page/writtentestclock/index-clock-in'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
>>>>>>> update: project constructor

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <IndexClockIn />
      </WrittenTestClock>
    )
  }
}
