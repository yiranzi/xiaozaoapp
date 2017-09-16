import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import ChooseClass from '../../containers/writtentestclock/choose-class'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
// import UserAction from '../../action/writtentestclock/user';
=======
import ChooseClass from '../../src/page/writtentestclock/choose-class'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
// import UserAction from '../../src/action/writtentestclock/user';
>>>>>>> update: eslinit code style

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
