import React from 'react';
import TestResultPage from '../../src/page/writtentestclock/test-result';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <TestResultPage/>
            </WrittenTestClock>
        );
    }
}