import React from 'react';
import {Button} from 'react-weui';
import ChooseClass from '../../src/page/writtentestclock/choose-class';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
// import UserAction from '../../src/action/writtentestclock/user';

export default class extends React.Component {
  // static async getInitialProps() {
  //     let info;
  //     try {
  //         info = await UserAction.getInfo();
  //     } catch (error) {
  //         info = {
  //             error: true,
  //             ...error
  //         }
  //     }
  //     return {
  //         info
  //     }
  // }
  render () {
    return (
      <WrittenTestClock>
        <ChooseClass {...this.props} />
      </WrittenTestClock>
    );
  }
}
