import React from 'react';
import {Button} from 'react-weui';
import ClockInIntro from '../../src/page/writtentestclock/clock-in-intro'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <ClockInIntro/>
            </WrittenTestClock>
        );
    }
}