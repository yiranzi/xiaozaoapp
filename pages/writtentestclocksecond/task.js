import React from 'react'
import ToolsUtil from '../../util/tools'
import WrittenTestClockSecond from '../../containers/writtentestclocksecond/layout'
import WrittenTestClockSecondAction from '../../action/writtentestclocksecond/index'
import WrittenTestSubject from '../../containers/writtentestclocksecond/subject'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category: '',
      day: '',
      currentObjectIndex: 0,
      answerListResult: {},
      questionList: {},
      initTime: 0,
      isShowAnalysis: false,
      isSubmit: false,
      isLoading: true
    }
  }

  componentDidMount = async () => {
    const category = ToolsUtil.getQueryString('category')
    let questionList
    // 首次测评
    try {
      if (category === 'entrance') {
        const action = ToolsUtil.getQueryString('action')
        questionList = await WrittenTestClockSecondAction.getEvaluation()
        if (action === 'review') {
          // 查看解析
          this.setState({
            questionList: questionList,
            isShowAnalysis: true,
            category: 'entrance'
          })
        } else {
          // 做题
          this.setState({questionList: questionList, category: 'entrance'})
        }
        // 最后测评
      } else if (category === 'finish') {
        const action = ToolsUtil.getQueryString('action')
        questionList = await WrittenTestClockSecondAction.getTest()
        if (action === 'review') {
          // 查看解析
          this.setState({
            questionList: questionList,
            isShowAnalysis: true,
            category: 'finish'
          })
        } else {
          // 最后测评
          this.setState({questionList: questionList, category: 'finish'})
        }
        // 每日做题
      } else if (category === 'task') {
        const day = ToolsUtil.getQueryString('day')
        questionList = await WrittenTestClockSecondAction.getByDay(day)
        const {answerDTOList} = questionList
        // 需要判断是查看过去的还是今日打卡
        if (questionList.today) {
          if (answerDTOList.length > 1) {
            this.setState({questionList: questionList, isShowAnalysis: true})
          } else {
            this.setState({questionList: questionList})
          }
        } else {
          this.setState({questionList: questionList, isShowAnalysis: true})
        }
      }
    } catch (e) {
      this.setState({isSubmit: false, isLoading: false})
      const {message} = e
      if (message) {
        alert(message)
      } else {
        alert(e)
      }
    }
  }

  renderAnswer (currentObjectIndex, questionList) {
    const {limitTime, answerDTOList, writtenTestTopicDTOList} = questionList
    const questionItem = writtenTestTopicDTOList[currentObjectIndex]// 题目详情

    const {answerListResult, isShowAnalysis} = this.state
    // 显示答题记录
    if (isShowAnalysis) {
      const selectAnswer = answerDTOList[currentObjectIndex] ? answerDTOList[currentObjectIndex].answer : ''
      const subjectItem = {
        total: writtenTestTopicDTOList.length, // 当前试卷总共多少题
        currentIndex: currentObjectIndex, // 当前题目在数组中的编号
        questionItem: questionItem, // 题目数组
        selectAnswer: selectAnswer, // 已选答案,
        disabled: true
      }
      return (
        <div className='subject-item' >
          <WrittenTestSubject
            subjectItem={subjectItem}
          />
        </div >
      )
      // 答题过程
    } else {
      const selectAnswer = answerListResult[questionItem.id] ? answerListResult[questionItem.id].tag : ''
      const subjectItem = {
        limitTime: limitTime,
        total: writtenTestTopicDTOList.length, // 当前试卷总共多少题
        currentIndex: currentObjectIndex, // 当前题目在数组中的编号
        questionItem: questionItem, // 题目数组
        selectAnswer: selectAnswer// 已选答案
      }
      return (
        <div className='subject-item' >
          <WrittenTestSubject
            subjectItem={subjectItem}
            onChange={(value) => {
              this.answerCheck(questionItem.id, value)
            }}
            timeDown={() => this.timeDown()}
          />
        </div >
      )
    }
  }

  timeDown () {
    alert('答题时间到,强制交卷')
    this.answerComplete()
  }

  answerCheck (id, value) {
    // const {answerList} = this.state;
    let {answerListResult} = this.state
    answerListResult[id] = answerListResult[id] || {}
    answerListResult[id].tag = value
    this.setState({
      answerListResult: answerListResult
    })
  }

  renderAnswerAnalysis (currentObjectIndex, questionList) {
    const {isShowAnalysis} = this.state
    const {answerDTOList, writtenTestTopicDTOList} = questionList
    const questionItem = writtenTestTopicDTOList[currentObjectIndex]
    const {id, answer, analysis} = questionItem
    const answerList = this.formatAnswerDTOList(answerDTOList)

    const analysisContent = (
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

    const category = ToolsUtil.getQueryString('category')

    if (isShowAnalysis) {
      return analysisContent
    }
    if (category === 'task' && answerList.hasOwnProperty(id)) {
      return analysisContent
    }
  }

  formatAnswerDTOList (answerDTOList) {
    let json = {}
    answerDTOList.map((item, index) => {
      json[item.id] = item.answer
    })
    return json
  }

  renderFinishButton (currentObjectIndex) {
    return (
      <div className='finish' >
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex)
        }} >
          <img src='/static/writtentestclocksecond/prev.png' />
        </div >
        {this.renderCompleteButton()}
      </div >
    )
  }

  renderCompleteButton () {
    const {category} = this.state
    if (category === 'entrance' || category === 'finish') {
      return (
        <div onClick={() => this.answerComplete()} >
          <img src='/static/writtentestclocksecond/test-complete.png' />
        </div >
      )
    } else {
      return (
        <div onClick={() => this.answerComplete()} >
          <img src='/static/writtentestclocksecond/test-complete.png' />
        </div >
      )
    }
  }

  answerComplete = async () => {
    const {initTime, category} = this.state
    const {setId} = this.state.questionList
    const answerList = this.formatAnswerList()
    try {
      this.setState({isSubmit: true})
      const spendTime = new Date() - initTime
      const data = JSON.stringify({
        setId: setId,
        time: spendTime,
        answerDTOList: answerList
      })

      await WrittenTestClockSecondAction.complete(data)
      if (category === 'entrance') {
        location.href = '/writtentestclocksecond/test-result'
      } else if (category === 'finish') {
        location.href = '/writtentestclocksecond/clock-in-result'
      } else {
        location.href = '/writtentestclocksecond/clock-in-result'
      }
    } catch (e) {
      console.log(e)
      this.setState({isSubmit: false})
    }
  }

  formatAnswerList () {
    const {questionList, answerListResult} = this.state
    let answerList = []

    questionList.writtenTestTopicDTOList.map((item, index) => {
      const {id} = item
      let seleteAnswer = answerListResult[id] ? answerListResult[id].tag : ''
      answerList.push({id: item.id, answer: seleteAnswer})
    })
    return answerList
  }

  renderActionButton (currentObjectIndex, questions) {
    const {finish} = this.state
    return (
      <div className='action' >
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex)
        }} ><img src='/static/writtentestclocksecond/prev.png' /></div >
        {finish
          ? <div ><img src='/static/writtentestclocksecond/next.png' /></div >
          : <div onClick={() => {
            this.nextAnswer(currentObjectIndex, questions)
          }} ><img src='/static/writtentestclocksecond/next.png' /></div >
        }
        <style jsx >{`
          .action {
            display: flex;
            justify-content: center;
            text-align: center;
          }
          .action img {
            width: 100%;
          }
        `}</style >
      </div >
    )
  }

  prevAnswer (currentObjectIndex) {
    if (currentObjectIndex > 0) {
      this.setState({
        currentObjectIndex: currentObjectIndex - 1,
        finish: false
      })
    }
  }

  nextAnswer (currentObjectIndex, questionList) {
    let nextObjectIndex = currentObjectIndex + 1
    const {writtenTestTopicDTOList} = questionList
    if (nextObjectIndex >= writtenTestTopicDTOList.length - 1) {
      this.setState({
        currentObjectIndex: nextObjectIndex,
        finish: true
      })
    } else {
      this.setState({
        currentObjectIndex: nextObjectIndex
      })
    }
  }

  renderAnalysisActionButton (currentObjectIndex, questionList) {
    return this.renderActionButton(currentObjectIndex, questionList)
  }

  renderTaskActionButton (currentObjectIndex, questionList) {
    const {finish} = this.state
    if (finish) {
      return this.renderFinishButton(currentObjectIndex)
    } else {
      return this.renderActionButton(currentObjectIndex, questionList)
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx >{`
        .finish {
          display: flex;
          jusity-content: center;
          align-items: center;
        }
        .finish img {
          width: 100%;
        }
      `}</style >
    )
  }

  render () {
    const {currentObjectIndex, questionList, isSubmit, isLoading, isShowAnalysis} = this.state
    if (questionList.hasOwnProperty('setId')) {
      return (
        <WrittenTestClockSecond >
          <div className='task-main' >
            <div className='task-content' >
              {this.renderAnswer(currentObjectIndex, questionList)}
            </div >
            <div className='task-action' >
              {isShowAnalysis
                ? this.renderAnalysisActionButton(currentObjectIndex, questionList)
                : this.renderTaskActionButton(currentObjectIndex, questionList)}
            </div >
            {isSubmit && <Loading />}
          </div >
          <style jsx >{`
            .task-action {
              width: 80%;
              margin: auto;
            }
          `}</style >
          {this.renderGlobalCss()}
        </WrittenTestClockSecond >
      )
    } else {
      return (
        <WrittenTestClockSecond >
          {isLoading && <Loading />}
        </WrittenTestClockSecond >
      )
    }
  }
}
