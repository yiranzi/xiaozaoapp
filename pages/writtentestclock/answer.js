import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import AnswerPage from '../../src/page/writtentestclock/answer';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questionList, error;
        try {
            questionList = await AnswerAction.getToday();
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
                <AnswerPage questionList={questionList}/>
            </WrittenTestClock>
        );
    }
}