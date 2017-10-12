import React from 'react'
import {Button} from 'react-weui'
import classNames from 'classnames'
import ToolsUtil from '../../util/tools'
import AxiosUtil from '../../util/axios'
import Radio from '../../components/radio'
import Audio from '../../components/audio'
import Loading from '../../components/loading'
import TimeDown from '../../components/timedown'
import WxRecord from '../../containers/interview/wxrecord'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      noPrev: true,
      noNext: false,
      answerList: {},
      isSubmit: false
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

  renderAnswerOption (id, DTOList) {
    return <WxRecord ref='wxrecord' onChange={(value) => {
      this.onChange(id, value)
    }}/>
  }

  renderDTOList () {
    const {questionList} = this.props
    const {interviewTopicDTOList} = questionList
    const {index} = this.state
    const {id, material, question} = interviewTopicDTOList[index]
    const questionLength = question.length
    return (
      <div className='dto-list'>
        <div className='material'>
          <div className='title'>材料<TimeDown limitTime={questionList.limitTime} timeDown={() => {this.timeDown()}}/></div>
          <div className='content'>{this.renderMaterial(material)}</div>
        </div>
        <div className='pratice'>
          <div className='title'>练习</div>
          <div className='content'>
            <div className='question'>{interviewTopicDTOList[index].no}、{interviewTopicDTOList[index].question}</div>
            <div className='options'>
              {this.renderAnswerOption(id, interviewTopicDTOList)}
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
                this.answerComplete()
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
            background: #F9F9F9;
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

  timeDown () {
    this.answerComplete()
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
    this.refs.wxrecord.uploadVoice();
    if (nextIndex <= questionLength - 1) {
      this.setState({index: nextIndex, noNext: true, noPrev: false})
    } else {
      this.setState({index: nextIndex, noPrev: false})
    }
  }

  formatAnswerList () {
    const {questionList} = this.props
    const {answerList} = this.state
    return questionList.interviewTopicDTOList.map((item, index) => {
      let id = item.id
      let answer = answerList[id] ? answerList[id] : ''
      return {answer: answer, id: id}
    })
  }

  answerComplete = async () => {
    const {topicKey} = this.props.questionList
    const answerList = this.formatAnswerList()

    try {
      this.setState({isSubmit: true})
      const data = JSON.stringify({
        answerDTOList: answerList,
        time: 30,
        topicKey: topicKey
      })
      this.setState({isSubmit: true})
      await AxiosUtil({
        method: 'post',
        url: '/api/interview/complete',
        data: data
      })
      location.href = '/interview/result'
    } catch (e) {
      this.setState({isSubmit: false})
      alert('提交失败，请重新提交')
    }
  }

  onChange (id, value) {
    let {answerList} = this.state
    answerList[id] = answerList[id] || {}
    answerList[id] = value
    this.setState({
      answerList: answerList
    })
    console.log(this.state.answerList)
  }

  render () {
    const {isSubmit} = this.state

    return (
      <div className='standard'>
        {isSubmit && <Loading/>}
        {this.renderDTOList()}
      </div>
    )
  }
}
