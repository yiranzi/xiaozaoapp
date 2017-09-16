import React from 'react'
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
import AnswerPage from '../../containers/writtentestclock/answer'
// import AnswerAction from '../../action/writtentestclock/answer';

export default class extends React.Component {
  // static async getInitialProps({req}) {
  //     let questionList, error;
  //     try {
  //         questionList = await AnswerAction.getToday();
  //     } catch (err) {
  //         error = err;
  //     }
  //     return {
  //         questionList,
  //         error
  //     }
  // }

  render () {
    // const {questionList, error} = this.props;
    return (
      <WrittenTestClock>
        <AnswerPage />
      </WrittenTestClock>
    )
  }
}
