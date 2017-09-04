import React from 'react';
import ClockInResult from '../../src/page/writtentestclock/clock-in-result';
import TestResultAction from '../../src/action/writtentestclock/answer';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    static async getInitialProps() {
        let todayInfo;
        try {
            todayInfo = await TestResultAction.getToday();
        } catch (error) {
            todayInfo = error
        }
        return {
            todayInfo
        }
    }
    render() {
        return (
            <WrittenTestClock>
                <ClockInResult {...this.props}/>
            </WrittenTestClock>
        );
    }
}