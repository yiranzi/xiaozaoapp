import React from 'react';
import {Button} from 'react-weui';
import DailyClockIn from '../../src/page/writtentestclock/daily-clock-in';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <DailyClockIn/>
            </WrittenTestClock>
        );
    }
}