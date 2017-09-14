import React from 'react';
import {Progress, Form} from 'react-weui';
import Radio from '../../../components/radio';
import ThemeConfig from '../../../../config/theme';

export default class WrittenTestClock extends React.Component {
  renderAnswerOption (currentIndex, options, selectAnswer, disabled) {
    const {onChange} = this.props;
    const name = `answer_${currentIndex}`;

    return options.map((item, i) => {
      const {tag, content} = item;
      const radioItem = Object.assign({}, {
        name: name,
        value: tag,
        defaultValue: selectAnswer,
        label: `${tag}.${content}`,
        disabled: disabled
      });
      const key = `answer_${currentIndex}_${i}`;
      if (disabled) {
        return (
          <Radio key={key} params={radioItem} disabled />
        );
      } else {
        return (
          <Radio key={key} params={radioItem} onChange={(value) => {
            onChange(value);
          }} />
        );
      }
    });
  }

  renderCss () {
    return (
      <style>{`
                .subject-detail .progress {
                    padding: 1rem 0;
                }
                .subject-detail .progress .percent {
                    margin-top: 0.5rem;
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
                    background: url(/static/writtentestclock/check.png);
                    background-size: 100%;
                    width: 2.5rem;
                    height: 2.5rem;
                    position: absolute;
                    left: -0.8rem;
                    top: -0.5rem;
                }
                /*-----------*/
                .subject-detail .material img {
                    border: 2px solid ${ThemeConfig.color.writtentestclockmain};
                }
            `}</style>
    );
  }

  isImg (materialType) {
    return materialType === 2;
  }

  isText (materialType) {
    return materialType === 1;
  }

  render () {
    const {total, questionItem, selectAnswer, disabled} = this.props.subjectItem;
    const {no, materialType, materialContent} = questionItem;
    let progress = Math.ceil(no / total * 100);
    return (
      <div className='subject-detail'>
        <div className='text'>答题进度条</div>
        <div className='progress'>
          <Progress value={progress} showCancel={false} />
          <div className='percent' style={{'marginLeft': `${progress}%`}}>
            <div className='triangle-up' />
            <div>{progress}%</div>
          </div>
        </div>
        <div className='material'>
          {this.isImg(materialType) && <img src={materialContent} />}
          {this.isText(materialType) && <p>{materialContent}</p>}
        </div>
        <div>{questionItem.no}.{questionItem.question}</div>
        <div className='answer-option'>
          <Form radio>
            {this.renderAnswerOption(no, questionItem.optionDTOList, selectAnswer, disabled)}
          </Form>
        </div>
        {this.renderCss()}
      </div>
    );
  }
}
