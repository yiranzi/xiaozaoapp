<<<<<<< dae871440af7e7651c950803f0c1774b8f7df1dd
<<<<<<< b804211441c4503475c314425b207580923bc267:src/page/writtentestclocksecond/subject.js
import React from 'react'
import {Progress, Form} from 'react-weui'
import Radio from '../../../components/radio'
import ThemeConfig from '../../../../config/theme'
=======
import React from 'react';
import {Progress, Form} from 'react-weui';
import Radio from '../../components/radio';
import ThemeConfig from '../../../../config/theme';
>>>>>>> update: 调整目录结构:containers/writtentestclocksecond/subject.js
=======
import React from 'react'
import {Progress, Form} from 'react-weui'
import Radio from '../../components/radio'
<<<<<<< cc8a374ced86544ab8f67a36974c5236cb4bd271
import ThemeConfig from '../../../../config/theme'
>>>>>>> update: eslint .
=======
import ThemeConfig from '../../config/theme'
>>>>>>> update: 笔试大赛第二期答题

export default class WrittenTestSubject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      limitTime: this.props.subjectItem.limitTime * 60
    }
  }

  componentDidMount () {
    const {disabled} = this.props.subjectItem
    if (!disabled) {
      let interval = setInterval(() => {
        let {limitTime} = this.state
        if (limitTime >= 1) {
          this.setState({
            limitTime: limitTime - 1
          })
        } else {
          clearInterval(interval)
          this.props.timeDown()
        }
      }, 1 * 1000)
    }
  }

  renderAnswerOption (currentIndex, options, selectAnswer, disabled) {
    const {onChange} = this.props
    const name = `answer_${currentIndex}`

    return options.map((item, i) => {
      const {tag, content} = item
      const radioItem = Object.assign({}, {
        name: name,
        value: tag,
        defaultValue: selectAnswer,
        label: `${tag}.${content}`,
        disabled: disabled
      })
      const key = `answer_${currentIndex}_${i}`
      if (!disabled) {
        return (
          <Radio key={key} params={radioItem} onChange={(value) => {
            onChange(value)
          }} />
        )
      }
    })
  }

  renderCss () {
    return (
      <style >{`
        .subject-detail .progress {
          padding-right: 0.5rem;
        }
        .progress-sub {
          display: flex;
          justify-content: space-between;
        }
        .subject-detail .progress .percent {
          margin-top: 0.5rem;
        }
        .subject-detail .material {
          width: 80%;
          margin: auto;
          position: relative;
        }
        .subject-detail .material::before {
          content: '';
          width: 13%;
          height: 15%;
          background: url(/static/writtentestclocksecond/form-left.png) no-repeat;
          position: absolute;
          left: -13%;
          top: 45%;
          background-size: 100% 100%;
        }
        .subject-detail .material::after {
          content: '';
          width: 13%;
          height: 60%;
          background: url(/static/writtentestclocksecond/entry-form-right.png) no-repeat;
          position: absolute;
          right: -13%;
          top: 0;
          background-size: 100% 100%;
        }
        .subject-detail .count-down {
          flex: 1;
          color: #fff;
          padding: 1rem 0.5rem 0.5rem 0.5rem;
          margin-left: 1rem;
          text-align: center;
          background: url(/static/writtentestclocksecond/count-down-1.png) no-repeat;
          background-size: 100% 100%;
        }
        .subject-detail .question {
          padding: 0.5rem;
          background: url(/static/writtentestclocksecond/question-form.png) no-repeat;
          background-size: 100% 100%;
        }
        .subject-detail .ask {
          width: 100%;
          margin: auto;
          margin-top: -2rem;
          display: flex;
          justify-content: flex-start;
        }
        .subject-detail .border-left {
          width: 10%;
        }
        .subject-detail .border-left img {
          width: 100%;
          height: 100%;
        }
        .subject-detail .options {
          width: 80%;
          margin-top: 3rem;
          padding-bottom: 3rem;
        }
        .subject-detail .question-no {
          color: ${ThemeConfig.color.writtentestclocksecondmain};
        }
        .subject-detail .analysis {
          margin-top: 1rem;
          color: ${ThemeConfig.color.writtentestclocksecondmain};
        }
        .subject-detail .answer-option {
          padding-left: 10%;
        }
        /*微信样式*/
        .subject-detail .weui-progress {
          flex: 4;
        }
        .subject-detail .weui-progress__bar {
          height: 0.75rem;
          border-radius: 0.5rem;
        }
        .material img {
          width: 100%;
        }
        .subject-detail .weui-progress__bar {
          background-color: ${ThemeConfig.color.writtentestclocksecondmain};
        }
        .subject-detail .weui-progress__inner-bar {
          background-color: ${ThemeConfig.color.writtentestclocksecondmainlight};
          border-radius: 0.75rem;
        }
        /*微信radio样式*/
        .subject-detail .weui-cells,
        .subject-detail .weui-check__label:active {
          background-color: transparent;
        }
        .subject-detail .weui-cell:before,
        .subject-detail .weui-cells:before,
        .subject-detail .weui-cells:after {
          border-top: none;
          border-bottom: none;
        }
        .subject-detail span.weui-icon-checked {
          width: 1.5rem;
          height: 1.5rem;
          background: ${ThemeConfig.color.writtentestclocksecondmainlight};
          border-radius: 1rem;
          margin-right: 1rem;
          position: relative;
        }
        .subject-detail .weui-cells_radio .weui-check:checked+.weui-icon-checked:before {
          color: transparent;
          background: url(/static/writtentestclocksecond/test-check.png);
          background-size: 100%;
          width: 2.5rem;
          height: 2.5rem;
          position: absolute;
          left: -0.8rem;
          top: -0.5rem;
        }
        .subject-detail .weui-cell {
          padding: 0.5rem 0;
        }
      `}</style >
    )
  }

  isImg (materialType) {
    return materialType === 2
  }

  isText (materialType) {
    return materialType === 1
  }

  renderLeftTime () {
    let {limitTime} = this.state
    let minute = parseInt(limitTime / 60)
    let second = limitTime % 60
    if (second < 10) {
      return `${minute} : 0${second}`
    } else {
      return `${minute} : ${second}`
    }
  }

  renderAnswerAnalysis (questionItem) {
    const {answer, analysis} = questionItem

    return (
      <div className='analysis' >
        <div className='wrapper' >
          <div className='analysis-header' >
            <div className='answer' >答案：{answer}</div >
          </div >
          <div className='analysis-content' >{analysis}</div >
          <style jsx >{`
              .analysis-header {
                display: flex;
                justify-content: space-between;
              }
            `}</style >
        </div >
      </div >
    )
  }

  render () {
    const {total, questionItem, selectAnswer, disabled} = this.props.subjectItem
    const {no, materialType, materialContent} = questionItem
    let progress = Math.ceil(no / total * 100)
    return (
      <div className='subject-detail' >
        <div className='material' >
          {!disabled &&
          <div className='progress' >
            <div className='text' >答题进度条<span >{progress}%</span ></div >
            <div className='progress-sub' >
              <Progress value={progress} showCancel={false} />
              <div className='count-down' >{this.renderLeftTime()}</div >
            </div >
          </div >
          }
          <div className='question' >
            {this.isImg(materialType) && <img src={materialContent} />} {this.isText(materialType) &&
          <p >{materialContent}</p >}
          </div >
        </div >
        <div className='ask' >
          <div className='border-left' >
            <img src='/static/writtentestclocksecond/border-left-1.png' />
          </div >
          <div className='options' >
            <div className='question-no' >{questionItem.no}.{questionItem.question}</div >
            {disabled && this.renderAnswerAnalysis(questionItem)} {!disabled &&
          <div className='answer-option' >
            <Form radio >
              {this.renderAnswerOption(no, questionItem.optionDTOList, selectAnswer, disabled)}
            </Form >
          </div >
          }
          </div >
        </div >
        {this.renderCss()}
      </div >
    )
  }
}
