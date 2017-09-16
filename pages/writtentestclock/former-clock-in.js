import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import FormerClockIn from '../../containers/writtentestclock/former-clock-in'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
=======
import FormerClockIn from '../../src/page/writtentestclock/former-clock-in'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
>>>>>>> update: eslinit code style

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
