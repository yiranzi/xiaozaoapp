import React from 'react';
import {Button} from 'react-weui';
import DailyClockIn from '../../src/page/writtentestclock/daily-clock-in';
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
                <DailyClockIn {...this.props}/>
            </WrittenTestClock>
        );
    }
}