import React from 'react'
import FormerClockIn from '../../page/writtentestclock/former-clock-in'
import WrittenTestClock from '../../page/writtentestclock/components/layout'

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
