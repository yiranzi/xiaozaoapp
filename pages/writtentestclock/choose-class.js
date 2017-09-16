import React from 'react'
import ChooseClass from '../../page/writtentestclock/choose-class'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
// import UserAction from '../../action/writtentestclock/user';

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
    )
  }
}
