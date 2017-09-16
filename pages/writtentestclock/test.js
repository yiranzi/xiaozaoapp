import React from 'react'
import WrittenTestClock from '../../page/writtentestclock/components/layout'
import TestAnswerPage from '../../page/writtentestclock/test/index'
// import AnswerAction from '../../action/writtentestclock/answer';

export default class extends React.Component {
  // static async getInitialProps({req}) {
  //     let questionList, error;
  //     let {category} = req.query;
  //     try {
  //         if (category === 'first') {
  //             questionList = await AnswerAction.getEvaluation();
  //         } else if (category === 'end') {
  //             questionList = await AnswerAction.getTest();
  //         }
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
        <TestAnswerPage />
      </WrittenTestClock>
    )
  }
}
