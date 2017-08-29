import React from 'react';
import {Button} from 'react-weui';
import FormerClockIn from '../../src/page/writtentestclock/former-clock-in'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <FormerClockIn/>
            </WrittenTestClock>
        );
    }
}