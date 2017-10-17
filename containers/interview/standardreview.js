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
import Back from '../../containers/interview/back'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      noPrev: true,
      noNext: false,
      canNext: false
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

  renderAnaysis (anaysis) {
    if (anaysis.indexOf('png') >= 0 || anaysis.indexOf('jpg') >= 0) {
      return (
        <div className='analysis-item'>
          <img src={anaysis}/>
          <style jsx>{`
            img {
              width: 100%;
            }
          `}</style>
        </div>
      )
    } else {
      return <div className='meterial-item'>{anaysis}</div>
    }
  }

  getAnswerList (answerDTOList) {
    let json = {}
    answerDTOList.map((item, index) => {
      json[item.id] = item.answer
    })
    return json
  }

  renderRadioGroup (id, index, answerList, DTOList) {
    const name = `answer_${index}`
    const options = DTOList[index].optionDTOList
    answerList = this.getAnswerList(answerList)

    return options.map((item, i) => {
      const {tag, content} = item
      const params = {
        name: name,
        value: tag,
        label: tag + '、' + content,
        defaultValue: answerList ? answerList[id] : '',
        disabled: true
      }
      const key = `answer_${index}_${i}`
      return (
        <Radio key={key} params={params}/>
      )
    })
  }

  renderAnswerOption (id, answerDTOList, DTOList) {
    const {index} = this.state
    return <Form radio>{this.renderRadioGroup(id, index, answerDTOList, DTOList)}</Form>
  }

  renderDTOList () {
    const {questionList} = this.props
    const {topicKey, day, answerDTOList, interviewTopicDTOList} = questionList
    const {index, noPrev, noNext} = this.state
    const {id, material} = interviewTopicDTOList[index]
    const questionLength = interviewTopicDTOList.length

    return (
      <div className='dto-list'>
        <div className='material'>
          <div className="topFixed">
            <div className='topTitle'><Back text='< 查看打卡成绩' url={`/interview/result?topicKey=${topicKey}&review=review`}/></div>
          </div>
          <div className="topAbsolute">
            <span>材料</span>
          </div>
          <div className='content'>{this.renderMaterial(material)}</div>
        </div>
        <div className='pratice'>
          <div className='title'>练习</div>
          <div className='content'>
            <div className='question'>{interviewTopicDTOList[index].no}、{interviewTopicDTOList[index].question}</div>
            <div className='options'>
              {this.renderAnswerOption(id, answerDTOList, interviewTopicDTOList)}
            </div>
          </div>
        </div>
        <div className='answer'>
          <div className='title'>答案及解析</div>
          <div className='content'>
            <div className='result'>
              <div>参考答案: {interviewTopicDTOList[index].answer}</div>
            </div>
            <div className='analysis'>
              参考解析：{this.renderAnaysis(interviewTopicDTOList[index].analysis)}
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
          {noNext && (<div className='next disabled'><Button>下一题</Button></div>)}
          {!noNext && (
            <div className={classNames({next: true, disabled: this.state.noNext})}>
              <Button onClick={() => {
                this.next(questionLength)
              }}>下一题</Button>
            </div>
          )}
        </div>
        <style jsx>{`
          .topFixed{
            position: fixed;
            background-color: #F9F9F9;
            width: 100%;
            top: 0rem;
            left: 0;
            padding-top:1rem;
            height: 50px;
            z-index: 10;
          }
          .topTitle {
            font-weight: bold;
            margin: 0rem 1rem 0rem 1rem;
            display: flex;
            justify-content: flex-end;
            line-height: 50px;
          }
          .topAbsolute{
            top: 0;
            position: absolute;
            font-weight: bold;
            margin: 1rem 1rem 0rem 1rem;
            display: flex;
            justify-content: flex-end;
            line-height: 50px;
          }

          .content{
            margin-top: 50px;
          }
          .title {
            font-weight: bold;
            margin: 1rem 0;
            display: flex;
            justify-content: space-between;
          }
          .option-item {
            margin-top: 0.5rem;
          }
          .answer {
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

  render () {
    const {isSubmit} = this.state

    return (
      <div className='standard'>
        {isSubmit && <Loading/>}
        {this.renderDTOList()}
        <style global jsx>{`
          .back {
            font-size: 16px;
          }
        `}</style>
      </div>
    )
  }
}
