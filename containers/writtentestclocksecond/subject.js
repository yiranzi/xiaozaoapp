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
          padding: 1rem 0;
        }
        .subject-detail .progress .percent {
          margin-top: 0.5rem;
        }
        /*微信样式*/
        .subject-detail .weui-progress__bar {
          height: 0.75rem;
          border-radius: 0.75rem;
        }
        .material {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .material .left, .material .right {
          width: 10%;
        }
        .material .content {
          width: 80%;
          align-self: flex-start;
        }
        .material img {
          width: 100%;
        }
        .subject-detail .weui-progress__inner-bar {
          background-color: ${ThemeConfig.color.writtentestclocksecondmain};
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
          background: ${ThemeConfig.color.writtentestclocksecondmain};
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
      `}</style >
    )
  }

  isImg (materialType) {
    return materialType === 2
  }

  isText (materialType) {
    return materialType === 1
  }

  render () {
    const {total, questionItem, selectAnswer, disabled} = this.props.subjectItem
    const {no, materialType, materialContent} = questionItem
    let progress = Math.ceil(no / total * 100)
    return (
      <div className='subject-detail' >
        {!disabled &&
        <div >
          <div className='text' >答题进度条<span >{progress}%</span ></div >
          <div className='progress' >
            <Progress value={progress} showCancel={false} />
          </div >
        </div >
        }
        <div className='material' >
          <div className='left'>
            <img src='/static/writtentestclocksecond/form-left.png' />
          </div>
          <div className='content'>
            {this.isImg(materialType) && <img src={materialContent} />}
            {this.isText(materialType) && <p>{materialContent}</p >}
          </div>
          <div className='right'>
            <img src='/static/writtentestclocksecond/entry-form-right.png' />
          </div>
        </div >
        <div >{questionItem.no}.{questionItem.question}</div >
        <div className='answer-option' >
          <Form radio >
            {this.renderAnswerOption(no, questionItem.optionDTOList, selectAnswer, disabled)}
          </Form >
        </div >
        {this.renderCss()}
      </div >
    )
  }
}
