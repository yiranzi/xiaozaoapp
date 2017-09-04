import React from 'react';
import TestResultPage from '../../src/page/writtentestclock/test-result';
import TestResultAction from '../../src/action/writtentestclock/answer';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    static async getInitialProps() {
        let testInfo;
        try {
            testInfo = await TestResultAction.getEvaluation();
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