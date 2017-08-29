import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import AnswerPage from '../../src/page/writtentestclock/answer';

export default class extends React.Component {
    render() {
        return (
            <WrittenTestClock>
                <AnswerPage/>
            </WrittenTestClock>
        );
    }
}