import React from 'react';
import SubjectComponent from './components/subject';
import ThemeConfig from '../../../config/theme';

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObjectIndex: 0
        };
    }

    renderAnswer() {
        const {currentObjectIndex} = this.state; //当前题目序号
        const {questions} = this.props;
        const questionItem = questions[currentObjectIndex];//题目详情

        return (
            <div className="subject-item">
                <SubjectComponent
                    subject={questionItem}
                    index={currentObjectIndex}
                    total={questions.length}
                />
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
            `}</style>
        );
    }

    render() {
        return (
            <div className="written-test-clock-answer">
                {this.renderAnswer()}
                <div className="action">
                    <div><img src="/static/prev.png"/></div>
                    <div><img src="/static/next.png"/></div>
                </div>
                {this.renderCss()}
            </div>
        );
    }
}