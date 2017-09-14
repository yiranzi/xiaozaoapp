import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import WrittenTestClockSecondAction from '../../src/action/writtentestclocksecond/index';
import SubjectComponent from '../../src/page/writtentestclock/components/subject';
import ToolsUtil from '../../src/util/tools';
import ThemeConfig from '../../config/theme';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentObjectIndex: 0,
      answerListResult: {},
      questionList: {},
      initTime: 0,
      isShowAnalysis: false
    };
  }

  componentDidMount = async () => {
    const category = ToolsUtil.getQueryString('category');
    const day = ToolsUtil.getQueryString('day');
    let questionList;
    if (category === 'entrance') { // 首次测评
      questionList = await WrittenTestClockSecondAction.getEvaluation();
    } else if (category === 'review') {
      const day = ToolsUtil.getQueryString('day');
      if (day) {
        questionList = await WrittenTestClock.getByToday(day);
      } else {
        questionList = await WrittenTestClock.getYesterday();
      }
    } else if (category === 'finish') {
      questionList = await WrittenTestClock.getTest();
    } else {
      if (day) {
        questionList = await WrittenTestClock.getByToday(day);
      } else {
        questionList = await WrittenTestClockSecondAction.getToday();
      }
    }
    this.setState({questionList: questionList});
  };

  renderAnswer (currentObjectIndex, questionList) {
    const {writtenTestTopicDTOList} = questionList;
    const questionItem = writtenTestTopicDTOList[currentObjectIndex];
    const subjectItem = {
      total: writtenTestTopicDTOList.length, // 当前试卷总共多少题
      currentIndex: currentObjectIndex, // 当前题目在数组中的编号
      questionItem: questionItem, // 题目数组
      selectAnswer: ''// 已选答案
    };
    return (
      <div className='subject-item' >
        <SubjectComponent
          subjectItem={subjectItem}
          onChange={(value) => {
            this.answerCheck(questionItem.id, value);
          }}
        />
      </div >
    );
  }

  answerCheck (id, value) {
    // const {answerList} = this.state;
    let {answerListResult} = this.state;
    answerListResult[id] = answerListResult[id] || {};
    answerListResult[id].tag = value;
    this.setState({
      answerListResult: answerListResult
    });
  }

  renderAnswerAnalysis (currentObjectIndex, questionList) {
    const {isShowAnalysis} = this.state;
    const {answerDTOList, writtenTestTopicDTOList} = questionList;
    const questionItem = writtenTestTopicDTOList[currentObjectIndex];
    const {id, answer, analysis} = questionItem;
    const answerList = this.formatAnswerDTOList(answerDTOList);

    const analysisContent = (
      <div className='analysis' >
        <div className='wrapper' >
          <div className='analysis-header' >
            <div className='answer' >答案：{answer}</div >
            <div className='line' />
            <div className='hide-analysis' >查看解析</div >
          </div >
          <div className='analysis-content' >{analysis}</div >
          <style jsx >{`
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
            `}</style >
        </div >
      </div >
    );

    if (isShowAnalysis || answerList.hasOwnProperty(id)) {
      return analysisContent;
    }
  }

  formatAnswerDTOList (answerDTOList) {
    let json = {};
    answerDTOList.map((item, index) => {
      json[item.id] = item.answer;
    });
    return json;
  }

  renderFinishButton (currentObjectIndex) {
    return (
      <div className='finish' >
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex);
        }} >
          <img src='/static/writtentestclock/prev.png' />
        </div >
        <div onClick={() => {
          this.answerComplete();
        }} ><img src='/static/writtentestclock/complete.png' /></div >
      </div >
    );
  }
  answerComplete = async () => {
    const {initTime} = this.state;
    const {setId} = this.state.questionList;
    const answerList = this.formatAnswerList();
    console.log(answerList);
    // try {
    //   const spendTime = new Date() - initTime;
    //   const data = JSON.stringify({
    //     setId: setId,
    //     time: spendTime,
    //     answerDTOList: answerList
    //   });
    //
    //   await WrittenTestClockSecondAction.complete(data);
    //   location.href = '/writtentestclock/clock-in-result';
    // } catch (e) {
    //   console.log(e);
    // }
  };
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

  renderActionButton (currentObjectIndex, questions) {
    return (
      <div className='action' >
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex);
        }} ><img src='/static/writtentestclock/prev.png' /></div >
        <div onClick={() => {
          this.nextAnswer(currentObjectIndex, questions);
        }} ><img src='/static/writtentestclock/next.png' /></div >
      </div >
    );
  }

  prevAnswer (currentObjectIndex) {
    this.setState({
      currentObjectIndex: currentObjectIndex - 1,
      finish: false
    });
  }

  nextAnswer (currentObjectIndex, questionList) {
    let nextObjectIndex = currentObjectIndex + 1;
    const {writtenTestTopicDTOList} = questionList;
    if (nextObjectIndex >= writtenTestTopicDTOList.length - 1) {
      this.setState({
        currentObjectIndex: nextObjectIndex,
        finish: true
      });
    } else {
      this.setState({
        currentObjectIndex: nextObjectIndex
      });
    }
  }

  render () {
    const {currentObjectIndex, questionList, finish} = this.state;
    if (questionList.hasOwnProperty('setId')) {
      return (
        <WrittenTestClock >
          {this.renderAnswer(currentObjectIndex, questionList)} {this.renderAnswerAnalysis(currentObjectIndex, questionList)} {finish ? this.renderFinishButton(currentObjectIndex) : this.renderActionButton(currentObjectIndex, questionList)}
        </WrittenTestClock >
      );
    } else {
      return (
        <WrittenTestClock />
      );
    }
  }
}
