import React from 'react'
import {Button} from 'react-weui'
import classNames from 'classnames'
import Radio from '../../components/radio'
import Audio from '../../components/audio'
import ToolsUtil from '../../util/tools'
import ThemeConfig from '../../config/theme'

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
    return <div>{meterial}</div>
  }

  renderDTOList (DTOList) {
    const {index} = this.state
    const currentIndex = index
    const {id, material, question} = DTOList[index]
    const questionLength = question.length
    return (
      <div className='dto-list'>
        <div className='material'>
          <div className='title'>材料</div>
          <div className='content'>{this.renderMaterial(material)}</div>
        </div>
        <div className='pratice'>
          <div className='title'>练习</div>
          <div className='content'>
            <div className='question'>{DTOList[index].no}、{DTOList[index].question}</div>
            <div className='options'>
              {DTOList[index].optionDTOList.map((item, index) => {
                const params = {
                  name: `answer-${currentIndex}`,
                  value: item.tag,
                  label: item.tag + '、' + item.content,
                  defaultValue: ''
                }
                return (
                  <div key={`${DTOList.title}-${index}`} className='option-item'>
                    <Radio
                      params={params}
                      onChange={(value) => {
                        this.onChange(id, value)
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='action'>
          <div className={classNames({prev: true, disabled: this.state.noPrev})}>
            <Button onClick={() => {
              this.prev(questionLength)
            }}>上一题</Button>
          </div>
          <div className='next'>
            {this.state.noNext
              ? <Button onClick={() => {
                this.next(questionLength)
              }}>提交</Button>
              : <Button onClick={() => {
                this.next(questionLength)
              }}>下一题</Button>
            }
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
          }
          .prev, .next {
            flex: 1;
          }
          .next {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    )
  }

  prev (questionLength) {
    const {index} = this.state
    const prevIndex = index - 1

    if (prevIndex <= 0) {
      this.setState({index: prevIndex, noNext: false, noPrev: true})
    } else {
      this.setState({index: prevIndex, noNext: false})
    }
  }

  next (questionLength) {
    const {index} = this.state
    const nextIndex = index + 1
    if (nextIndex <= questionLength - 1) {
      this.setState({index: nextIndex, noNext: true, noPrev: false})
    } else {
      this.setState({index: nextIndex, noPrev: false})
    }
  }

  onChange (id, value) {
    console.log(this.props.questionList)
    let {answerList} = this.state
    answerList[id] = answerList[id] || {}
    answerList[id].tag = value
    this.setState({
      answerList: answerList
    }, () => {
      console.log(this.state.answerList)
    })
  }

  render () {
    const {questionList} = this.props
    const {interviewTopicDTOList} = questionList

    return (
      <div className='standard'>
        {this.renderDTOList(interviewTopicDTOList)}
      </div>
    )
  }
}
