import React from 'react';
import SubjectComponent from '../components/subject';
import ThemeConfig from '../../../../config/theme';
import AnswerAction from '../../../../src/action/writtentestclock/answer';

export default class AnswerPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentObjectIndex: 0,
      answerListResult: {},
      // answerList: [],//题目答案[{id: , tag: }]
      finish: false,
      initTime: new Date(),
      isShowAnalysisButton: false,
      isShowAnalysis: false,
      questionList: {}
    };
  }

  componentDidMount = async () => {
    let questionList = {};
    try {
      questionList = await AnswerAction.getToday();
      if (questionList.answerTime) {
        location.href = '/writtentestclock/pastanswer?day=today';
      } else {
        this.setState({questionList: questionList});
      }
    } catch (error) {
      alert(error.message);
    }
  };

  renderAnswer (currentObjectIndex, questions) {
    // const {answerList} = this.state;
    let {answerListResult} = this.state;
    const questionItem = questions[currentObjectIndex];// 题目详情
    let selectAnswer = answerListResult[questionItem.id] ? answerListResult[questionItem.id].tag : '';
    let isCheckAnalysis = answerListResult[questionItem.id] ? answerListResult[questionItem.id].isShowAnalysis : '';

    if (isCheckAnalysis) {
      const subjectItem = Object.assign({}, {
        total: questions.length, // 当前试卷总共多少题
        currentIndex: currentObjectIndex, // 当前题目在数组中的编号
        questionItem: questionItem, // 题目数组
        selectAnswer: selectAnswer, // 已选答案,
        disabled: true
      });
      return (
        <div className='subject-item'>
          <SubjectComponent
            subjectItem={subjectItem}
          />
        </div>
      );
    } else {
      const subjectItem = Object.assign({}, {
        total: questions.length, // 当前试卷总共多少题
        currentIndex: currentObjectIndex, // 当前题目在数组中的编号
        questionItem: questionItem, // 题目数组
        selectAnswer: selectAnswer// 已选答案
      });
      return (
        <div className='subject-item'>
          <SubjectComponent
            subjectItem={subjectItem}
            onChange={(value) => {
              this.answerCheck(questionItem.id, value);
            }}
          />
        </div>
      );
    }
  }

  answerCheck (id, value) {
    // const {answerList} = this.state;
    let {answerListResult} = this.state;
    answerListResult[id] = answerListResult[id] || {};
    answerListResult[id].tag = value;
    this.setState({
      answerListResult: answerListResult,
      // answerList: answerList.concat({id: id, answer: value}),
      isShowAnalysisButton: true
    });
  }

  prevAnswer (currentObjectIndex) {
    this.setState({
      currentObjectIndex: currentObjectIndex - 1,
      isShowAnalysis: false,
      finish: false
    });
  }

  nextAnswer (currentObjectIndex, questions) {
    let nextObjectIndex = currentObjectIndex + 1;
    if (nextObjectIndex >= questions.length - 1) {
      this.setState({
        currentObjectIndex: nextObjectIndex,
        finish: true,
        isShowAnalysis: false,
        isShowAnalysisButton: false
      });
    } else {
      this.setState({
        currentObjectIndex: nextObjectIndex,
        isShowAnalysis: false,
        isShowAnalysisButton: false
      });
    }
  }

  renderAnswerAnalysis (currentObjectIndex, questions) {
    const {answerListResult, isShowAnalysisButton, isShowAnalysis} = this.state;
    const questionItem = questions[currentObjectIndex];
    const {id, answer, analysis} = questionItem;

    const analysisContent = (
      <div className='analysis'>
        <div className='wrapper'>
          <div className='analysis-header'>
            <div className='answer'>答案：{answer}</div>
            <div className='line'/>
            <div className='hide-analysis'>查看解析</div>
          </div>
          <div className='analysis-content'>{analysis}</div>
          <style jsx>{`
              .analysis-header {
                display: flex;
                justify-content: space-between;
              }
              .hide-analysis {
                display: inline-block;
                border: 1px solid ${ThemeConfig.color.writtentestclockmain};
                font-size: ${ThemeConfig.size.normal};
                font-weight: bold;
                border-radius: 1rem;
                padding: 0.1rem 0.5rem;
              }
            `}</style>
        </div>
      </div>
    );

    const analysisButton = (
      <div className='analysis'>
        <div className='show-analysis' onClick={() => {
          this.showAnalysis(currentObjectIndex, questions, isShowAnalysis);
        }}>查看解析
        </div>
        <style jsx>{`
            .show-analysis {
              display: inline-block;
              border: 1px solid ${ThemeConfig.color.writtentestclockmain};
              font-size: ${ThemeConfig.size.normal};
              font-weight: bold;
              border-radius: 1rem;
              padding: 0.1rem 0.5rem;
            }
          `}</style>
      </div>
    );

    let isCheckAnalysis = answerListResult[id] ? answerListResult[id].isShowAnalysis : false;
    let canShowAnalysis = answerListResult[id] ? answerListResult[id].tag : false;
    if (isShowAnalysis || isCheckAnalysis) {
      return analysisContent;
    }
    if (isShowAnalysisButton || canShowAnalysis) {
      return analysisButton;
    }
  }

  showAnalysis (currentObjectIndex, questions, isShowAnalysis) {
    const questionItem = questions[currentObjectIndex];// 题目详情
    const id = questionItem.id;

    let {answerListResult} = this.state;
    answerListResult[id] = answerListResult[id] || {};
    answerListResult[id].isShowAnalysis = true;
    this.setState({
      answerListResult: answerListResult,
      isShowAnalysis: !isShowAnalysis,
      isShowAnalysisButton: false
    });
  }

  renderActionButton (currentObjectIndex, questions) {
    return (
      <div className='action'>
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex);
        }}><img src='/static/writtentestclock/prev.png'/></div>
        <div onClick={() => {
          this.nextAnswer(currentObjectIndex, questions);
        }}><img src='/static/writtentestclock/next.png'/></div>
      </div>
    );
  }

  renderFinishButton (currentObjectIndex) {
    return (
      <div className='finish'>
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex);
        }}><img src='/static/writtentestclock/prev.png'/></div>
        <div onClick={() => {
          this.answerComplete();
        }}><img src='/static/writtentestclock/complete.png'/></div>
      </div>
    );
  }

  formatAnswerList () {
    const {questionList, answerListResult} = this.state;
    let answerList = [];

    questionList.writtenTestTopicDTOList.map((item, index) => {
      const {id} = item;
      let seleteAnswer = answerListResult[id] ? answerListResult[id].tag : '';
      answerList.push({id: item.id, answer: seleteAnswer});
    });
    return answerList;
  }

  answerComplete = async () => {
    const {initTime} = this.state;
    const {setId} = this.state.questionList;
    const answerList = this.formatAnswerList();
    try {
      const spendTime = new Date() - initTime;
      const data = JSON.stringify({
        setId: setId,
        time: spendTime,
        answerDTOList: answerList
      });

      await AnswerAction.complete(data);
      location.href = '/writtentestclock/clock-in-result';
    } catch (e) {
      console.log(e);
    }
  };

  renderCss () {
    return (
      <style>{`
        .triangle-up {
          width: 0;
          height: 0;
          border-left: 0.5rem solid transparent;
          border-right: 0.5rem solid transparent;
          border-bottom: 1rem solid ${ThemeConfig.color.writtentestclockmain};
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
    );
  }

  render () {
    const {currentObjectIndex, finish, questionList} = this.state;// 当前题目在数组中的序号
    const {writtenTestTopicDTOList} = questionList;
    if (writtenTestTopicDTOList) {
      return (
        <div className='written-test-clock-answer'>
          {this.renderAnswer(currentObjectIndex, writtenTestTopicDTOList)}
          {this.renderAnswerAnalysis(currentObjectIndex, writtenTestTopicDTOList)}
          {finish ? this.renderFinishButton(currentObjectIndex) : this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
          {this.renderCss()}
        </div>
      );
    } else {
      return (
        <div className='written-test-clock-answer'/>
      );
    }
  }
}
