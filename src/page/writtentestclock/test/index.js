import React from 'react';
import classNames from 'classnames';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';

export default class TestAnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObjectIndex: 0,
            answerList: {},
            finish: false
        };
    }

    renderAnswer(currentObjectIndex, questions) {
        const {answerList} = this.state;

        const questionItem = questions[currentObjectIndex];//题目详情
        const subjectItem = Object.assign({}, {
            total: questions.length,//当前试卷总共多少题
            questionItem: questionItem, //题目数组
            selectAnswer: answerList[questionItem.id],//已选答案
        })
        return (
            <div className='subject-item'>
                <SubjectComponent
                    subjectItem={subjectItem}
                    onChange={(value) => {
                        this.answerCheck(questionItem.id, value);
                    }}
                />
            </div>
        );
    }

    answerCheck(id, value) {
        const {answerList} = this.state;
        answerList[id] = value;
    }

    prevAnswer(currentObjectIndex) {
        this.setState({
            currentObjectIndex: currentObjectIndex - 1
        });
    }

    nextAnswer(currentObjectIndex, questions) {
        let nextObjectIndex = currentObjectIndex + 1;
        if(nextObjectIndex >= questions.length - 1){
            this.setState({
                finish: true,
                currentObjectIndex: nextObjectIndex
            });
        }else{
            this.setState({
                currentObjectIndex: nextObjectIndex
            });
        }
    }

    renderActionButton(currentObjectIndex, questions){
        return (
            <div className='action'>
                <div onClick={() => {this.prevAnswer(currentObjectIndex);}}><img src='/static/prev.png'/></div>
                <div onClick={() => {this.nextAnswer(currentObjectIndex, questions);}}><img src='/static/next.png'/></div>
            </div>
        );
    }
    renderFinishButton(){
        return (
            <div className="finish">
                <div><img src="/static/complete-test.png"/></div>
            </div>
        );
    }

    renderCss() {
        return (
            <style>{`
                .triangle-up {
                    width: 0;
                    height: 0;
                    border-left: 0.5rem solid transparent;
                    border-right: 0.5rem solid transparent;
                    border-bottom: 1rem solid ${ThemeConfig.color.writtentestclockmain};
                    margin-left: -0.75rem;
                }
                .triangle-up + div {
                    margin-left: -1rem;
                }
                .action {
                    display: flex;
                    justify-content: space-between;
                }
                .action img {
                    width: 100%;
                }
                .finish {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        );
    }

    render() {
        const {currentObjectIndex,finish} = this.state;//当前题目在数组中的序号
        const {questionList} = this.props;
        return (
            <div className='written-test-clock-answer'>
                {this.renderAnswer(currentObjectIndex, questionList)}
                {finish ? this.renderFinishButton() : this.renderActionButton(currentObjectIndex, questionList)}
                {this.renderCss()}
            </div>
        );
    }
}