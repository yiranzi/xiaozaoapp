import React from 'react';
import dynamic from 'next/dynamic';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import PastAnswerPage from '../../src/page/writtentestclock/pastanswer';
// import AnswerAction from '../../src/action/writtentestclock/answer';

// const WrittenTestClock = dynamic(import('../../src/page/writtentestclock/components/layout'));
// const PastAnswerPage = dynamic(import('../../src/page/writtentestclock/pastanswer'));

export default class extends React.Component {
    // static async getInitialProps({req}) {
    //     let questionList, error;
    //     // let {day} = req.query;
    //     try {
    //         // if(day){
    //         //     questionList = await AnswerAction.getByToday(day);
    //         // }else{
    //             questionList = await AnswerAction.getYesterday();
    //         // }
    //     } catch (err) {
    //         error = err;
    //     }
    //     return {
    //         questionList,
    //         error
    //     }
    // }

    render() {
        // const {questionList, error} = this.props;
        return (
            <WrittenTestClock>
                <PastAnswerPage/>
            </WrittenTestClock>
        );
    }
}