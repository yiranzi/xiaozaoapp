import React from 'react'
import ChooseClass from '../../containers/writtentestclock/choose-class'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'

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
