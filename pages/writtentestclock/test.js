import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import TestAnswerPage from '../../src/page/writtentestclock/test/index';
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
                <TestAnswerPage questions={questions.topicDTOList}/>
            </WrittenTestClock>
        );
    }
}