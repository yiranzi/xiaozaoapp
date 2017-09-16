import React from 'react'
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44
import WrittenTestClock from '../../containers/writtentestclock/components/layout'
import TestAnswerPage from '../../containers/writtentestclock/test/index'
// import AnswerAction from '../../action/writtentestclock/answer';
=======
import WrittenTestClock from '../../src/page/writtentestclock/components/layout'
import TestAnswerPage from '../../src/page/writtentestclock/test/index'
// import AnswerAction from '../../src/action/writtentestclock/answer';
>>>>>>> update: eslinit code style

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
