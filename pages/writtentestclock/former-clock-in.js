import React from 'react';
import {Button} from 'react-weui';
import FormerClockIn from '../../src/page/writtentestclock/former-clock-in';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

// import UserAction from '../../src/action/writtentestclock/user';

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
    );
  }
}
