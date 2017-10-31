import React from 'react'
import {Button, Form} from 'react-weui'
import classNames from 'classnames'
import DateUtil from '../../util/data'
import ToolsUtil from '../../util/tools'
import AxiosUtil from '../../util/axios'
import Radio from '../../components/radio'
import Audio from '../../components/audio'
import Loading from '../../components/loading'
import TimeUp from '../../components/timeup'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      noPrev: true,
      noNext: false,
      answerList: {},
      isSubmit: false,
      canNext: false,
      isRecording: false, // 正在录音
      isPlaying: false, // 正在播放录音
      serverId: '',
      initTime: new Date(),
      stop: false
    }
  }

  renderMaterial (meterial) {
    let meterialArray = eval(meterial)
    return meterialArray.map((item, index) => {
      if (ToolsUtil.isImg(item)) {
        return <div key={index} className='meterial-item'>
          <img src={item} />
          <style jsx>{`
            img {
              width: 100%;
            }
          `}</style>
        </div>
      } else if (ToolsUtil.isMp3(item)) {
        return <div key={index} className='meterial-item'>
          <Audio src={item} />
        </div>
      }
    })
  }

  renderRadioGroup (id, index, answerList, DTOList) {
    const name = `answer_${index}`
    const options = DTOList[index].optionDTOList

    return options.map((item, i) => {
      const {tag, content} = item
      const params = {
        name: name,
        value: tag,
        label: tag + '、' + content,
        defaultValue: answerList ? answerList[id] : ''
      }
      const key = `answer_${index}_${i}`
      return (
        <Radio key={key} params={params} onChange={(value) => {
          this.onChange(id, value)
        }} />
      )
    })
  }

  renderAnswerOption (id, DTOList) {
    const {index, answerList} = this.state
    return <Form radio>{this.renderRadioGroup(id, index, answerList, DTOList)}</Form>
  }

  renderDTOList () {
    const {questionList} = this.props
    const {interviewTopicDTOList} = questionList
    const {index, noPrev} = this.state
    const {id, material} = interviewTopicDTOList[index]
    const questionLength = interviewTopicDTOList.length
    return (
      <div className='dto-list'>
        <div className='material'>
          <div className='title'>材料<TimeUp /></div>
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
          {noPrev && (<div className='prev disabled'><Button>上一题</Button></div>)}
          {!noPrev && (
            <div className={classNames({prev: true, disabled: this.state.noPrev})}>
              <Button onClick={() => {
                this.prev(questionLength)
              }}>上一题</Button>
            </div>
          )}
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
          .material .title {
            display: flex;
            justify-content: space-between;
          }
          .option-item {
            margin-top: 0.5rem;
          }
          .pratice {
            margin-bottom: 5rem;
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
    alert('做题时间到，强制交卷')
    this.answerComplete()
  }

  needRecord (value) {
    this.setState({nextTopic: value})
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
    if (nextIndex >= questionLength - 1) {
      this.setState({index: nextIndex, noNext: true, noPrev: false})
    } else {
      this.setState({index: nextIndex, noPrev: false})
    }
  }

  formatAnswerList () {
    let answer
    const {questionList} = this.props
    const {answerList} = this.state
    return questionList.interviewTopicDTOList.map((item, index) => {
      let id = item.id
      if (DateUtil.isEmpty(answerList)) {
        answer = ''
      } else {
        answer = answerList ? answerList[id] : ''
      }
      return {answer: answer, id: id}
    })
  }

  answerComplete = async () => {
    const {isRecording, isPlaying, initTime} = this.state
    if (isRecording) {
      alert('正在录音，请结束录音后提交')
      return
    }
    if (isPlaying) {
      alert('正在播放录音，请结束音频后提交')
      return
    }

    // TODO: 既有录音也有选择题条件
    // const {answerList} = this.state
    // const {interviewTopicDTOList} = this.props.questionList

    // if (Object.keys(answerList).length < interviewTopicDTOList.length) {
    //   alert('当前题目未录音')
    //   return
    // }

    const {topicKey} = this.props.questionList
    let answerListArray = this.formatAnswerList()

    try {
      this.setState({isSubmit: true, stop: true})
      const data = JSON.stringify({
        answerDTOList: answerListArray,
        time: new Date() - initTime,
        topicKey: topicKey
      })
      this.setState({isSubmit: true})
      await AxiosUtil({
        method: 'post',
        url: '/api/interview/complete',
        data: data
      })
      location.href = `/interview/result?topicKey=${topicKey}`
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
  }

  render () {
    const {isSubmit} = this.state

    return (
      <div className='standard'>
        {isSubmit && <Loading />}
        {this.renderDTOList()}
      </div>
    )
  }
}
