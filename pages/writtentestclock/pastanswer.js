import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import PastAnswerPage from '../../src/page/writtentestclock/pastanswer';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questionList, error;
        try {
            questionList = await AnswerAction.getYesterday();
        } catch (err) {
            error = err;
        }
        return {
            questionList,
            error
        }
    }

    render() {
        const {questions, error} = this.props;
        return (
            <WrittenTestClock error={error}>
                {/*<PastAnswerPage questions={questions.topicDTOList}/>*/}
            </WrittenTestClock>
        );
    }
}