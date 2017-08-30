import React from 'react';
import {Progress, Form, FormCell, CellBody, CellFooter, Radio} from 'react-weui';
import ThemeConfig from '../../../../config/theme';

export default class WrittenTestClock extends React.Component {
    renderAnswerOption(options) {
        return options.map((item, index) => {
            const key = `answer_${index}`;
            return (
                <FormCell key={key} radio>
                    <CellFooter>
                        <Radio name="answer-options" value="2"/>
                    </CellFooter>
                    <CellBody>{item.tag}</CellBody>
                </FormCell>
            );
        });
    }

    renderGlobalCss() {
        return (
            <style>{`
                .subject-detail .progress {
                    padding: 1rem 0;
                }
                .subject-detail .text {
                    text-align: center;
                    font-size: ${ThemeConfig.size.large};
                }
                .subject-detail img {
                    width: 100%;
                }
                /*微信样式*/
                .subject-detail .weui-progress__bar {
                    height: 0.75rem;
                    border-radius: 0.75rem;
                }
                .subject-detail .weui-progress__inner-bar {
                    border-radius: 0.75rem;
                }
                /*微信radio样式*/
                .subject-detail .weui-cells, .subject-detail .weui-check__label:active {
                    background-color: transparent;
                }
                .subject-detail .weui-cell:before, .subject-detail .weui-cells:before, .subject-detail .weui-cells:after {
                    border-top: none;
                    border-bottom: none;
                }
                .subject-detail span.weui-icon-checked {
                    width: 1.5rem;
                    height: 1.5rem;
                    background: ${ThemeConfig.color.white};
                    border-radius: 1rem;
                    margin-right: 1rem;
                    position: relative;
                }
                .subject-detail .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
                    color: transparent;
                    background: url(/static/check.png);
                    background-size: 100%;
                    width: 2.5rem;
                    height: 2.5rem;
                    position: absolute;
                    left: -0.8rem;
                    top: -0.5rem;
                }
                /*-----------*/
                .subject-detail .material {
                    border: 2px solid ${ThemeConfig.color.writtentestclockmain};
                }
            `}</style>
        );
    }

    render() {
        const {subject, index, total} = this.props;
        let progress = parseInt(index / total) * 100;
        return (
            <div className="subject-detail">
                <div className="text">答题进度条</div>
                <div className="progress">
                    <Progress value={80} showCancel={false}/>
                    <div className="triangle-up"></div>
                    <div className="percent">{progress}%</div>
                </div>
                <div className="material">
                    <img src={subject.materialContent}/>
                </div>
                <div>{index + 1}.{subject.question}</div>
                <div className="answer-option">
                    <Form radio>
                        {this.renderAnswerOption(subject.optionDTOList)}
                    </Form>
                </div>
                {this.renderGlobalCss()}
            </div>
        );
    }
}