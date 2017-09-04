import React from 'react';
import {Button} from 'react-weui';
import IndexClockIn from '../../src/page/writtentestclock/index-clock-in'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <IndexClockIn/>
            </WrittenTestClock>
        );
    }
}