import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import PastAnswerPage from '../../src/page/writtentestclock/pastanswer';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questions;
        try {
            questions = AnswerAction.getEntryTest();
        } catch (error) {

        }
        return {
            questions
        }
    }

    render() {
        const {questions} = this.props;
        return (
            <WrittenTestClock>
                <PastAnswerPage questions={questions.topicDTOList}/>
            </WrittenTestClock>
        );
    }
}