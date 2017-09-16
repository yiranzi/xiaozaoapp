import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import TestEntry from '../../containers/writtentestclock/test-entry'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
=======
import TestEntry from '../../src/page/writtentestclock/test-entry'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
>>>>>>> update: eslinit code style
=======
import TestEntry from '../../page/writtentestclock/test-entry'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
>>>>>>> update: project constructor

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <TestEntry />
      </WrittenTestClock>
    )
  }
}
