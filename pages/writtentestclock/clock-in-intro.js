import React from 'react';
import {Button} from 'react-weui';
import ClockInIntro from '../../src/page/writtentestclock/clock-in-intro'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import DailyClockInAction from '../../src/action/writtentestclock/daily-clock-in';

export default class extends React.Component {
    static async getInitialProps() {
        let info;
        try {
            info = await DailyClockInAction.getInfo();
        } catch (error) {

        }
        return {
            info
        }
    }
    render() {
        return (
            <WrittenTestClock>
                <ClockInIntro {...this.props}/>
            </WrittenTestClock>
        );
    }
}