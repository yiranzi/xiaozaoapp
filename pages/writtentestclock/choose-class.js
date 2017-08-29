import React from 'react';
import {Button} from 'react-weui';
import ChooseClass from '../../src/page/writtentestclock/choose-class'
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <ChooseClass/>
            </WrittenTestClock>
        );
    }
}