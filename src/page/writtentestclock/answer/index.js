import React from 'react';
import classNames from 'classnames';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';
import AnswerAction from '../../../../src/action/writtentestclock/answer';

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObjectIndex: 0,
            answerList: [],
            finish: false,
            initTime: new Date(),
            isShowAnalysis: false
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
                    onChange={(value) => {
                        this.answerCheck(questionItem.id, value);
                    }}
                />
            </div>
        );
    }

    answerCheck(id, value) {
        const {answerList} = this.state;
        this.setState({
            answerList: answerList.concat({id: id, answer: value})
        })
    }

    prevAnswer(currentObjectIndex) {
        this.setState({
            currentObjectIndex: currentObjectIndex - 1,
            isShowAnalysis: false
        });
    }

    nextAnswer(currentObjectIndex, questions) {
        let nextObjectIndex = currentObjectIndex + 1;
        if (nextObjectIndex >= questions.length - 1) {
            this.setState({
                currentObjectIndex: nextObjectIndex,
                finish: true,
                isShowAnalysis: false
            });
        } else {
            this.setState({
                currentObjectIndex: nextObjectIndex,
                isShowAnalysis: false
            });
        }
    }

    renderAnswerAnalysis(currentObjectIndex, questions) {
        const {isShowAnalysis} = this.state;
        const questionItem = questions[currentObjectIndex];
        const {answer, analysis} = questionItem;

        const analysisContent = (
            <div className="wrapper">
                <div className="analysis-header">
                    <div className="answer">答案：{answer}</div>
                    <div className="line"></div>
                    <div className="hide-analysis">查看解析</div>
                </div>
                <div className="analysis-content">{analysis}</div>
                <style jsx>{`
                    .analysis-header {
                        display: flex;
                        justify-content: space-between;
                    }
                    .hide-analysis {
                        display: inline-block;
                        border: 1px solid ${ThemeConfig.color.writtentestclockmain};
                        font-size: ${ThemeConfig.size.normal};
                        font-weight: bold;
                        border-radius: 1rem;
                        padding: 0.1rem 0.5rem;
                    }
                `}</style>
            </div>
        )

        return (
            <div className="analysis">
                {isShowAnalysis ? analysisContent : <div onClick={() => {
                    this.showAnalysis(isShowAnalysis);
                }} className="show-analysis">查看解析</div>}
                <style jsx>{`
                    .show-analysis {
                        display: inline-block;
                        border: 1px solid ${ThemeConfig.color.writtentestclockmain};
                        font-size: ${ThemeConfig.size.normal};
                        font-weight: bold;
                        border-radius: 1rem;
                        padding: 0.1rem 0.5rem;
                    }
                `}</style>
            </div>
        );
    }

    showAnalysis(isShowAnalysis) {
        this.setState({isShowAnalysis: !isShowAnalysis});
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
                <div onClick={() => this.answerComplete()}><img src="/static/complete-test.png"/></div>
            </div>
        );
    }

    answerComplete = async () => {
        const {answerList, initTime} = this.state;
        const {setId} = this.props.questionList;
        try {
            const spendTime = new Date() - initTime;
            const data = JSON.stringify({
                setId: setId,
                time: spendTime,
                answerDTOList: answerList
            });

            let complete = await AnswerAction.complete(encodeURI(data));
            location.href = '/writtentestclock/clock-in-result';
        } catch (e) {
            console.log(e);
        }
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
        const {questionList} = this.props;
        const {writtenTestTopicDTOList} = questionList;
        return (
            <div className='written-test-clock-answer'>
                {this.renderAnswer(currentObjectIndex, writtenTestTopicDTOList)}
                {this.renderAnswerAnalysis(currentObjectIndex, writtenTestTopicDTOList)}
                {finish ? this.renderFinishButton() : this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
                {this.renderCss()}
            </div>
        );
    }
}