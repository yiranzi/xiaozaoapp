import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import AnswerPage from '../../src/page/writtentestclock/answer';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questions, error;
        try {
            questions = await AnswerAction.getToday();
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
        return (
            <WrittenTestClock error={error}>
                {/*<AnswerPage questions={questions.topicDTOList}/>*/}
            </WrittenTestClock>
        );
    }
}