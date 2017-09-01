import React from 'react';
import TestResultPage from '../../src/page/writtentestclock/test-result';
import TestResultAction from '../../src/action/writtentestclock/answer';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    static async getInitialProps() {
        let testInfo;
        try {
            testInfo = await TestResultAction.getTest();
            testInfo = {
                setId: 1,
                totalScore: 2,
                answerTime: new Date(),
                answerDTOList: [],
                writtenTestTopicDTOList: [{a: '1'}, {a: '2'}, {a: '3'}, {a: '4'}]
        }
        } catch (error) {
            testInfo = error
        }
        return {
            testInfo
        }
    }
    render() {
        return (
            <WrittenTestClock>
                <TestResultPage {...this.props}/>
            </WrittenTestClock>
        );
    }
}