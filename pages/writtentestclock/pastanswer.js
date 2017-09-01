import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import PastAnswerPage from '../../src/page/writtentestclock/pastanswer';
import AnswerAction from '../../src/action/writtentestclock/answer';

export default class extends React.Component {
    static async getInitialProps({req}) {
        let questionList, error;
        let {day} = req.query;
        try {
            if(day){
                questionList = await AnswerAction.getByToday(day);
            }else{
                questionList = await AnswerAction.getYesterday();
            }
        } catch (err) {
            error = err;
        }
        return {
            questionList,
            error
        }
    }

    render() {
        const {questionList, error} = this.props;
        return (
            <WrittenTestClock error={error}>
                <PastAnswerPage questionList={questionList}/>
            </WrittenTestClock>
        );
    }
}