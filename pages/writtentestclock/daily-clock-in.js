import React from 'react'
import DailyClockIn from '../../containers/writtentestclock/daily-clock-in'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
// import UserAction from '../../action/writtentestclock/user';

export default class extends React.Component {
  // static async getInitialProps() {
  //     let info;
  //     try {
  //         info = await UserAction.getInfo();
  //     } catch (error) {

  //     }
  //     return {
  //         info
  //     }
  // }
  render () {
    return (
      <WrittenTestClock>
        <DailyClockIn {...this.props} />
      </WrittenTestClock>
    )
  }
}
