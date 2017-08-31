import React from 'react';
import {Button} from 'react-weui';
import IndexClockIn from '../../src/page/writtentestclock/index-clock-in'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import UserAction from '../../src/action/writtentestclock/user';

export default class extends React.Component {
    static async getInitialProps() {
        let info;
        try {
            info = await UserAction.getYesterday();
        } catch (error) {
            info = error
        }
        return {
            info
        }
    }
    render() {
        return (
            <WrittenTestClock>
                <IndexClockIn {...this.props}/>
            </WrittenTestClock>
        );
    }
}