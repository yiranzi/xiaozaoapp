import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import TestAnswerPage from '../../src/page/writtentestclock/test/index';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questionList, error;
        try {
            questionList = await AnswerAction.getEvaluation();
        } catch (err) {
            error = err;
        }
        return {
            questionList,
            error
        }
    }

    render() {
        const {questionList, error} = this.props;
        return (
            <WrittenTestClock error={error}>
                <TestAnswerPage questionList={questionList.writtenTestTopicDTOList}/>
            </WrittenTestClock>
        );
    }
}