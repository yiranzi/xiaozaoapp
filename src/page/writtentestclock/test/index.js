import React from 'react';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';

export default class TestAnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObjectIndex: 0
        };
    }

    renderAnswer(currentObjectIndex) {
        const {questions} = this.props;
        const questionItem = questions[currentObjectIndex];//题目详情
        return (
            <div className='subject-item'>
                <SubjectComponent
                    subject={questionItem}
                    index={currentObjectIndex}
                    total={questions.length}
                />
            </div>
        );
    }

    prevAnswer(currentObjectIndex) {
        this.setState({
            currentObjectIndex: currentObjectIndex - 1
        });
    }

    nextAnswer(currentObjectIndex) {
        this.setState({
            currentObjectIndex: currentObjectIndex + 1
        });
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
        const {currentObjectIndex} = this.state;//当前题目在数组中的序号
        return (
            <div className='written-test-clock-answer'>
                {this.renderAnswer(currentObjectIndex)}
                <div className='action'>
                    <div onClick={() => {this.prevAnswer(currentObjectIndex);}}><img src='/static/prev.png'/></div>
                    <div onClick={() => {this.nextAnswer(currentObjectIndex);}}><img src='/static/next.png'/></div>
                </div>
                {this.renderCss()}
            </div>
        );
    }
}