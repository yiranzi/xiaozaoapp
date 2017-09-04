import React from 'react';
import classNames from 'classnames';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';
import Radio from '../../../components/radio';
import AnswerAction from '../../../../src/action/writtentestclock/answer';
import CommonUtil from '../../../../src/util/common';

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObjectIndex: 0,
            finish: false,
            questionList: {}
        };
    }

    componentDidMount() {
        const _this = this;
        const day = CommonUtil.getQueryString('day');
        if (day) {
            AnswerAction.getByToday(day).then((res) => {
                _this.setState({questionList: res});
            });
        } else {
            AnswerAction.getYesterday().then((res) => {
                _this.setState({questionList: res});
            });
        }
    }

    renderAnswer(currentObjectIndex, questionList, answerDTOList) {
        const questionItem = questionList[currentObjectIndex];//题目详情
        const subjectItem = Object.assign({}, {
            total: questionList.length,//当前试卷总共多少题
            currentIndex: currentObjectIndex, //当前题目在数组中的编号
            questionItem: questionItem, //题目数组
            selectAnswer: answerDTOList ? answerDTOList[currentObjectIndex].answer : '',//已选答案,
            disabled: true
        });
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
                }}><img src='/static/writtentestclock/prev.png'/></div>
                <div onClick={() => {
                    this.nextAnswer(currentObjectIndex, questions);
                }}><img src='/static/writtentestclock/next.png'/></div>
            </div>
        );
    }

    renderFinishButton() {
        return (
            <div className="finish">
                <div><img src="/static/writtentestclock/complete-test.png"/></div>
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
        const {currentObjectIndex, finish, questionList} = this.state;//当前题目在数组中的序号
        const {writtenTestTopicDTOList, answerDTOList} = questionList;
        if (writtenTestTopicDTOList) {
            return (
                <div className='written-test-clock-answer'>
                    {this.renderAnswer(currentObjectIndex, writtenTestTopicDTOList, answerDTOList)}
                    {this.renderAnswerAnalysis(currentObjectIndex, writtenTestTopicDTOList)}
                    {this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
                    {this.renderCss()}
                </div>
            );
        } else {
            return (
                <div className='written-test-clock-answer'>
                </div>
            )
        }

    }
}