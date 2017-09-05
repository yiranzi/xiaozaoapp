import React from 'react';
import {Button} from 'react-weui';
import DailyClockIn from '../../src/page/writtentestclock/daily-clock-in';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
// import UserAction from '../../src/action/writtentestclock/user';

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
    );
  }
}
