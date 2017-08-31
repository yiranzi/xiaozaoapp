import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import TestAnswerPage from '../../src/page/writtentestclock/test/index';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questions, error;
        try {
            questions = await AnswerAction.getEvaluation();
        } catch (err) {
            error = err;
        }
        return {
            questions,
            error
        }
    }

    render() {
        const {questions, error} = this.props;
        console.log(questions)
        return (
            <WrittenTestClock error={error}>
                {/*<TestAnswerPage questions={questions.topicDTOList}/>*/}
            </WrittenTestClock>
        );
    }
}