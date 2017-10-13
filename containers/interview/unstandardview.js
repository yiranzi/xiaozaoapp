import React from 'react'
import {Button, Form} from 'react-weui'
import classNames from 'classnames'
import Radio from '../../components/radio'
import Audio from '../../components/audio'
import Back from '../../containers/interview/back'
import ToolsUtil from '../../util/tools'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      noPrev: true,
      noNext: false,
      answerList: {}
    }
  }

  renderMaterial (meterial) {
    let meterialArray = eval(meterial)
    return meterialArray.map((item, index) => {
      if (ToolsUtil.isImg(item)) {
        return <div key={index} className='meterial-item'>
          <img src={item}/>
          <style jsx>{`
            img {
              width: 100%;
            }
          `}</style>
        </div>
      } else if (ToolsUtil.isMp3(item)) {
        return <div key={index} className='meterial-item'>
          <Audio src={item}/>
        </div>
      }
    })
  }

  renderAnswer (answerDTOList) {
    let json = {}
    answerDTOList.map((item, index) => {
      const {id, answer} = item
      json[id] = answer
    })
    return json
  }

  renderDTOList (topicKey ,answerDTOList, DTOList) {
    const {index} = this.state
    const currentIndex = index
    const {material, question, voice} = DTOList[index]
    const questionLength = question.length
    let answerList = this.renderAnswer(answerDTOList)
    return (
      <div className='dto-list'>
        <Back text='< 返回结果页' url={`/interview/result?topicKey=${topicKey}`} />
        <div className='material'>
          <div className='title'>材料</div>
          <div className='content'>{this.renderMaterial(material)}</div>
        </div>
        <div className='pratice'>
          <div className='title'>练习</div>
          <div className='content'>
            <div className='question'>{DTOList[index].no}、{DTOList[index].question}</div>
            <div className='options'>
              <Form radio>
                {DTOList[index].optionDTOList.map((item, index) => {
                  const params = {
                    name: `answer-${currentIndex}`,
                    value: item.tag,
                    label: item.tag + '、' + item.content,
                    defaultValue: 'A',
                    disabled: true
                  }
                  return (
                    <div key={`${DTOList.title}-${index}`} className='option-item'>
                      <Radio
                        params={params}
                        onChange={(value) => {
                          this.onChange(item.id, value)
                        }}
                      />
                    </div>
                  )
                })}
              </Form>
            </div>
          </div>
        </div>
        <div className='answer'>
          <div className='title'>答案及解析</div>
          <div className='content'>
            <div className='result'>
              <div>参考答案: {DTOList[index].answer}</div>
              <div>正确率:</div>
            </div>
            <div className='analysis'>
              参考解析：{DTOList[index].analysis}
            </div>
          </div>
        </div>
        <div className='action'>
          <div className={classNames({prev: true, disabled: this.state.noPrev})}>
            <Button onClick={() => {
              this.prev(questionLength)
            }}>上一题</Button>
          </div>
          <div className={classNames({next: true, disabled: this.state.noNext})}>
            <Button onClick={() => {
              this.next(questionLength)
            }}>下一题</Button>
          </div>
        </div>
        <style jsx>{`
          .title {
            font-weight: bold;
            margin: 1rem 0;
          }
          .option-item {
            margin-top: 0.5rem;
          }
          .action {
            display: flex;
            justify-content: center;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            padding: 1rem 2rem;
            box-sizing: border-box;
            background: #F9F9F9;
          }
          .answer {
            margin-bottom: 5rem;
          }
          .prev, .next {
            flex: 1;
          }
          .next {
            margin-left: 1rem;
          }
          .result {
            display: flex;
          }
        `}</style>
      </div>
    )
  }

  prev (questionLength) {
    const {index, noPrev} = this.state
    const prevIndex = index - 1
    if (noPrev) {
      return
    }

    if (prevIndex <= 0) {
      this.setState({index: prevIndex, noNext: false, noPrev: true})
    } else {
      this.setState({index: prevIndex, noNext: false})
    }
  }

  next (questionLength) {
    const {index, noNext} = this.state
    const nextIndex = index + 1
    if (noNext) {
      return
    }
    if (nextIndex <= questionLength - 1) {
      this.setState({index: nextIndex, noNext: true, noPrev: false})
    } else {
      this.setState({index: nextIndex, noPrev: false})
    }
  }

  render () {
    const {questionList} = this.props
    const {topicKey, answerDTOList, interviewTopicDTOList} = questionList

    return (
      <div className='standard'>
        {this.renderDTOList(topicKey, answerDTOList, interviewTopicDTOList)}
      </div>
    )
  }
}
