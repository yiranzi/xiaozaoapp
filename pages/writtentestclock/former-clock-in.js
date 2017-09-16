import React from 'react'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import FormerClockIn from '../../containers/writtentestclock/former-clock-in'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
=======
import FormerClockIn from '../../src/page/writtentestclock/former-clock-in'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
>>>>>>> update: eslinit code style
=======
import FormerClockIn from '../../page/writtentestclock/former-clock-in'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
>>>>>>> update: project constructor

// import UserAction from '../../action/writtentestclock/user';

export default class extends React.Component {
  // static async getInitialProps() {
  //     let info;
  //     try {
  //         info = await UserAction.getHistory();
  //     } catch (error) {

  //     }
  //     return {
  //         info
  //     }
  // }
  render () {
    return (
      <WrittenTestClock>
        <FormerClockIn {...this.props} />
      </WrittenTestClock>
    )
  }
}
