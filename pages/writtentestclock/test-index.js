import React from 'react';
import TestIndex from '../../src/page/writtentestclock/test-index'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <TestIndex/>
            </WrittenTestClock>
        );
    }
}