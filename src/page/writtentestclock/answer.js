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

    renderGlobalCss(){
        return (
            <style global jsx>{`
                .triangle-up {
                    width: 0;
                    height: 0;
                    border-left: 0.5rem solid transparent;
                    border-right: 0.5rem solid transparent;
                    border-bottom: 1rem solid ${ThemeConfig.color.writtentestclockmain};
                }
            `}</style>
        );
    }

    render() {
        return (
            <div className="written-test-clock-answer">
                {this.renderAnswer()}
                {this.renderGlobalCss()}
            </div>
        );
    }
}