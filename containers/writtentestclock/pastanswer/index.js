import React from 'react'
import SubjectComponent from '../components/subject'
<<<<<<< 3d843ce39f62e8ec68779be84e8636590d893324:containers/writtentestclock/pastanswer/index.js
<<<<<<< 976b0990b9936056310b888556cd1b6d55a35a44:containers/writtentestclock/pastanswer/index.js
import ThemeConfig from '../../../config/theme'
import AnswerAction from '../../../action/writtentestclock/answer'
import CommonUtil from '../../../util/common'
=======
import ThemeConfig from '../../../../config/theme'
import AnswerAction from '../../../../src/action/writtentestclock/answer'
import CommonUtil from '../../../../src/util/common'
>>>>>>> update: eslinit code style:src/page/writtentestclock/pastanswer/index.js
=======
import ThemeConfig from '../../../config/theme'
import AnswerAction from '../../../action/writtentestclock/answer'
import CommonUtil from '../../../util/common'
>>>>>>> update: project constructor:containers/writtentestclock/pastanswer/index.js

export default class AnswerPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentObjectIndex: 0,
      finish: false,
      questionList: {}
    }
  }

  componentDidMount = async () => {
    let questionList = {}
    const day = CommonUtil.getQueryString('day')
    try {
      if (day) {
        if (day === 'test') {
          questionList = await AnswerAction.getEvaluation()
        } else if (day === 'end') {
          questionList = await AnswerAction.getTest()
        } else {
          questionList = await AnswerAction.getByToday(day)
        }
      } else {
        questionList = await AnswerAction.getYesterday()
      }
      this.setState({questionList: questionList})
    } catch (error) {
      alert(error.message)
    }
  };

  renderAnswer (currentObjectIndex, questionList, answerDTOList) {
    const questionItem = questionList[currentObjectIndex]// 题目详情
    const subjectItem = Object.assign({}, {
      total: questionList.length, // 当前试卷总共多少题
      currentIndex: currentObjectIndex, // 当前题目在数组中的编号
      questionItem: questionItem, // 题目数组
      selectAnswer: answerDTOList[currentObjectIndex] ? answerDTOList[currentObjectIndex].answer : '', // 已选答案,
      disabled: true
    })
    return (
      <div className='subject-item'>
        <SubjectComponent
          subjectItem={subjectItem}
        />
      </div>
    )
  }

  answerCheck (id, value) {
    const {answerList} = this.state
    answerList[id] = value
  }

  prevAnswer (currentObjectIndex) {
    if (currentObjectIndex >= 1) {
      this.setState({
        currentObjectIndex: currentObjectIndex - 1
      })
    }
  }

  nextAnswer (currentObjectIndex, questions) {
    let nextObjectIndex = currentObjectIndex + 1
    if (nextObjectIndex <= questions.length - 1) {
      this.setState({
        currentObjectIndex: nextObjectIndex,
        finish: true
      })
    }
  }

  renderAnswerAnalysis (currentObjectIndex, questions) {
    const questionItem = questions[currentObjectIndex]
    const {answer, analysis} = questionItem

    return (
      <div className='analysis'>
        <div className='show-analysis'>
          <div className='wrapper'>
            <div className='analysis-header'>
              <div className='answer'>答案：{answer}</div>
            </div>
            <div className='analysis-content'>{analysis}</div>
          </div>
        </div>
        <style jsx>{`
          .analysis {
            padding: 1rem;
          }
          .analysis-header {
            font-weight: bold;
          }
          .analysis-content {
            padding: 0.5rem 1rem;
            border: 1px solid ${ThemeConfig.color.writtentestclockmain};
            position: relative;
            margin-top: 1rem;
          }
          .analysis-content:before {
            content: "";
            width: 1rem;
            height: 1rem;
            background: #1f1f1f;
            border: 1px solid ${ThemeConfig.color.writtentestclockmain};
            border-right: none;
            border-bottom: none;
            position: absolute;
            top: -0.65rem;
            left: 5rem;
            transform: rotate(45deg);
          }
        `}</style>
      </div>
    )
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

  renderFinishButton () {
    return (
      <div className='finish'>
        <div><img src='/static/writtentestclock/complete-test.png' /></div>
      </div>
    )
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
    const {currentObjectIndex, questionList} = this.state// 当前题目在数组中的序号
    const {writtenTestTopicDTOList, answerDTOList} = questionList
    if (writtenTestTopicDTOList) {
      return (
        <div className='written-test-clock-answer'>
          {this.renderAnswer(currentObjectIndex, writtenTestTopicDTOList, answerDTOList)}
          {this.renderAnswerAnalysis(currentObjectIndex, writtenTestTopicDTOList)}
          {this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
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
