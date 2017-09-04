import React from 'react';
import classNames from 'classnames';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';
import AnswerAction from '../../../../src/action/writtentestclock/answer';

export default class TestAnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObjectIndex: 0,
            answerList: [],
            finish: false,
            initTime: new Date(),
            questionList: {}
        };
    }

    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    componentDidMount() {
        const _this = this;
        const category = this.getQueryString('category');

        if (category === 'first') {
            AnswerAction.getEvaluation(category).then((res) => {
                _this.setState({questionList: res});
            });
        } else if (category === 'end') {
            AnswerAction.getTest(category).then((res) => {
                _this.setState({questionList: res});
            });
        }
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
        this.setState({
            answerList: answerList.concat({id: id, answer: value})
        })
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
                finish: true,
                currentObjectIndex: nextObjectIndex
            });
        } else {
            this.setState({
                currentObjectIndex: nextObjectIndex
            });
        }
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
                <div onClick={() => this.answerComplete()}><img src="/static/writtentestclock/complete-test.png"/></div>
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
        const {currentObjectIndex, finish, questionList} = this.state;//当前题目在数组中的序号
        const {writtenTestTopicDTOList} = questionList;
        if (writtenTestTopicDTOList) {
            return (
                <div className='written-test-clock-answer'>
                    {this.renderAnswer(currentObjectIndex, writtenTestTopicDTOList)}
                    {finish ? this.renderFinishButton() : this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
                    {this.renderCss()}
                </div>
            );
        } else {
            return (
                <div className='written-test-clock-answer'>
                </div>
            );
        }

    }
}