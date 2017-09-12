import React from 'react';
import ExamResult from '../../src/page/writtentestclock/exam-result';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
  render () {
    return (
      <WrittenTestClock>
        <ExamResult />
      </WrittenTestClock>
    );
  }
}
