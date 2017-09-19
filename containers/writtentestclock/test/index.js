import React from 'react'
import SubjectComponent from '../components/subject'
import ThemeConfig from '../../../config/theme'
import AnswerAction from '../../../action/writtentestclock/answer'
import ToolsUtil from '../../../util/tools'

export default class TestAnswerPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category: '',
      currentObjectIndex: 0,
      answerListResult: {},
      finish: false,
      initTime: new Date(),
      questionList: {}
    }
  }

    componentDidMount = async () => {
      let questionList = {}
      const category = ToolsUtil.getQueryString('category')

      try {
        if (category === 'first') {
          questionList = await AnswerAction.getEvaluation(category)
          this.setState({questionList: questionList, category: category})
        } else if (category === 'end') {
          questionList = await AnswerAction.getTest(category)
          this.setState({questionList: questionList, category: category})
        }
      } catch (error) {
        alert(error.message)
      }
    }

    renderAnswer (currentObjectIndex, questions) {
      const {answerListResult} = this.state

      const questionItem = questions[currentObjectIndex]// 题目详情
      let selectAnswer = answerListResult[questionItem.id] ? answerListResult[questionItem.id].tag : ''

      const subjectItem = Object.assign({}, {
        total: questions.length, // 当前试卷总共多少题
        questionItem: questionItem, // 题目数组
        selectAnswer: selectAnswer// 已选答案
      })
      return (
        <div className='subject-item'>
          <SubjectComponent
            subjectItem={subjectItem}
            onChange={(value) => {
              this.answerCheck(questionItem.id, value)
            }}
          />
        </div>
      )
    }

    answerCheck (id, value) {
      let {answerListResult} = this.state
      answerListResult[id] = answerListResult[id] || {}
      answerListResult[id].tag = value
      this.setState({
        answerListResult: answerListResult
      })
    }

    prevAnswer (currentObjectIndex) {
      if (currentObjectIndex >= 1) {
        this.setState({
          currentObjectIndex: currentObjectIndex - 1,
          finish: false
        })
      }
    }

    nextAnswer (currentObjectIndex, questions) {
      let nextObjectIndex = currentObjectIndex + 1
      if (nextObjectIndex >= questions.length - 1) {
        this.setState({
          finish: true,
          currentObjectIndex: nextObjectIndex
        })
      } else {
        this.setState({
          currentObjectIndex: nextObjectIndex
        })
      }
    }

    renderActionButton (currentObjectIndex, questions) {
      return (
        <div className='action'>
          <div onClick={() => {
            this.prevAnswer(currentObjectIndex)
          }}><img src='/static/writtentestclock/prev.png' /></div>
          <div onClick={() => {
            this.nextAnswer(currentObjectIndex, questions)
          }}><img src='/static/writtentestclock/next.png' /></div>
        </div>
      )
    }

    renderFinishButton (currentObjectIndex) {
      return (
        <div className='finish'>
          <div onClick={() => {
            this.prevAnswer(currentObjectIndex)
          }}><img src='/static/writtentestclock/prev.png' /></div>
          <div onClick={() => this.answerComplete()}><img src='/static/writtentestclock/complete-test.png' /></div>
        </div>
      )
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

    answerComplete = async () => {
      const {initTime, category} = this.state
      const {setId} = this.state.questionList
      const answerList = this.formatAnswerList()
      try {
        const spendTime = new Date() - initTime
        const data = JSON.stringify({
          setId: setId,
          time: spendTime,
          answerDTOList: answerList
        })
        await AnswerAction.complete(data)
        if (category === 'first') {
          location.href = '/writtentestclock/test-result'
        } else if (category === 'end') {
          location.href = '/writtentestclock/exam-result'
        }
      } catch (e) {
        console.log(e)
      }
    }

    renderCss () {
      return (
        <style>{`
          .triangle-up {
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 12px solid ${ThemeConfig.color.writtentestclockmain};
            margin-left: -0.75rem;
          }
          .triangle-up + div {
            margin-left: -1rem;
          }
          .action, .finish {
            display: flex;
            justify-content: center;
            padding: 1rem 0;
            text-align: center;
          }
          .action img, .finish img {
            width: 85%;
          }
        `}</style>
      )
    }

    render () {
      const {currentObjectIndex, finish, questionList} = this.state// 当前题目在数组中的序号
      const {writtenTestTopicDTOList} = questionList
      if (writtenTestTopicDTOList) {
        return (
          <div className='written-test-clock-answer'>
            {this.renderAnswer(currentObjectIndex, writtenTestTopicDTOList)}
            {finish ? this.renderFinishButton(currentObjectIndex) : this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
            {this.renderCss()}
          </div>
        )
      } else {
        return (
          <div className='written-test-clock-answer' />
        )
      }
    }
}
