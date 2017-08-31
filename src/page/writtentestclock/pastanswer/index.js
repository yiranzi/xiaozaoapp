import React from 'react';
import classNames from 'classnames';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';

export default class AnswerPage extends React.Component {
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
            currentIndex: currentObjectIndex, //当前题目在数组中的编号
            questionItem: questionItem, //题目数组
            selectAnswer: answerList[questionItem.id],//已选答案
        })
        return (
            <div className='subject-item'>
                <SubjectComponent
                    subjectItem={subjectItem}
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
        if (nextObjectIndex >= questions.length - 1) {
            this.setState({
                currentObjectIndex: nextObjectIndex,
                finish: true
            });
        } else {
            this.setState({
                currentObjectIndex: nextObjectIndex
            });
        }
    }

    renderAnswerAnalysis(currentObjectIndex, questions) {
        const questionItem = questions[currentObjectIndex];
        const {answer, analysis} = questionItem;

        return (
            <div className="analysis">
                <div className="show-analysis">
                    <div className="wrapper">
                        <div className="analysis-header">
                            <div className="answer">答案：{answer}</div>
                        </div>
                        <div className="analysis-content">{analysis}</div>
                        <style jsx>{`
                            .analysis-header {
                                display: flex;
                                justify-content: space-between;
                            }
                        `}</style>
                    </div>
                </div>
            </div>
        );
    }

    renderActionButton(currentObjectIndex, questions) {
        return (
            <div className='action'>
                <div onClick={() => {
                    this.prevAnswer(currentObjectIndex);
                }}><img src='/static/prev.png'/></div>
                <div onClick={() => {
                    this.nextAnswer(currentObjectIndex, questions);
                }}><img src='/static/next.png'/></div>
            </div>
        );
    }

    renderFinishButton() {
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
        const {currentObjectIndex, finish} = this.state;//当前题目在数组中的序号
        const {questions} = this.props;
        return (
            <div className='written-test-clock-answer'>
                {this.renderAnswer(currentObjectIndex, questions)}
                {this.renderAnswerAnalysis(currentObjectIndex, questions)}
                {finish ? this.renderFinishButton() : this.renderActionButton(currentObjectIndex, questions)}
                {this.renderCss()}
            </div>
        );
    }
}