import React from 'react';
import ToolsUtil from '../../src/util/tools';
import ThemeConfig from '../../config/theme';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import WrittenTestClockSecondAction from '../../src/action/writtentestclocksecond/index';
import SubjectComponent from '../../src/page/writtentestclock/components/subject';
import Loading from '../../src/components/loading';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      category: '',
      day: '',
      currentObjectIndex: 0,
      answerListResult: {},
      questionList: {},
      initTime: 0,
      isShowAnalysis: false,
      isSubmit: false
    };
  }

  componentDidMount = async () => {
    const category = ToolsUtil.getQueryString('category');
    let questionList;
    // 首次测评
    try {
      if (category === 'entrance') {
        const action = ToolsUtil.getQueryString('action');
        questionList = await WrittenTestClockSecondAction.getEvaluation();
        if (action === 'review') {
          // 查看解析
          this.setState({questionList: questionList, isShowAnalysis: true});
        } else {
          // 做题
          this.setState({questionList: questionList});
        }
        // 最后测评
      } else if (category === 'finish') {
        const action = ToolsUtil.getQueryString('action');
        questionList = await WrittenTestClockSecondAction.getTest();
        if (action === 'review') {
          // 查看解析
          this.setState({questionList: questionList, isShowAnalysis: true});
        } else {
          // 最后测评
          this.setState({questionList: questionList});
        }
        // 每日做题
      } else if (category === 'task') {
        const day = ToolsUtil.getQueryString('day');
        questionList = await WrittenTestClockSecondAction.getByDay(day);
        // 需要判断是查看过去的还是今日打卡
        this.setState({questionList: questionList});
      }
    } catch (e) {
      this.setState({isSubmit: false});
      const {message} = e;
      if (message) {
        alert(message);
      } else {
        alert(e);
      }
    }
  };

  renderAnswer (currentObjectIndex, questionList) {
    const {answerDTOList, writtenTestTopicDTOList} = questionList;
    const questionItem = writtenTestTopicDTOList[currentObjectIndex];// 题目详情

    const {answerListResult, isShowAnalysis} = this.state;
    // 显示答题记录
    if (isShowAnalysis) {
      const subjectItem = {
        total: writtenTestTopicDTOList.length, // 当前试卷总共多少题
        currentIndex: currentObjectIndex, // 当前题目在数组中的编号
        questionItem: questionItem, // 题目数组
        selectAnswer: answerDTOList[currentObjectIndex] ? answerDTOList[currentObjectIndex].answer : '', // 已选答案,
        disabled: true
      };
      return (
        <div className='subject-item' >
          <SubjectComponent
            subjectItem={subjectItem}
          />
        </div >
      );
      // 答题过程
    } else {
      const selectAnswer = answerListResult[questionItem.id] ? answerListResult[questionItem.id].tag : '';
      const subjectItem = {
        total: writtenTestTopicDTOList.length, // 当前试卷总共多少题
        currentIndex: currentObjectIndex, // 当前题目在数组中的编号
        questionItem: questionItem, // 题目数组
        selectAnswer: selectAnswer// 已选答案
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

    const category = ToolsUtil.getQueryString('category');

    if (isShowAnalysis) {
      return analysisContent;
    }
    if (category === 'task' && answerList.hasOwnProperty(id)) {
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
    const {isSubmit} = this.state;
    return (
      <div className='finish' >
        <div onClick={() => {
          this.prevAnswer(currentObjectIndex);
        }} >
          <img src='/static/writtentestclock/prev.png' />
        </div >
        {isSubmit ? <div ><img src='/static/writtentestclock/complete.png' /></div > : <div onClick={() => {
          this.answerComplete();
        }} >
          <img src='/static/writtentestclock/complete.png' />
        </div >}
      </div >
    );
  }

  answerComplete = async () => {
    const {initTime} = this.state;
    const {setId} = this.state.questionList;
    const answerList = this.formatAnswerList();
    try {
      this.setState({isSubmit: true});
      const spendTime = new Date() - initTime;
      const data = JSON.stringify({
        setId: setId,
        time: spendTime,
        answerDTOList: answerList
      });

      await WrittenTestClockSecondAction.complete(data);
      // location.href = '/writtentestclock/clock-in-result';
    } catch (e) {
      console.log(e);
      this.setState({isSubmit: false});
    }
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
    if (currentObjectIndex > 0) {
      this.setState({
        currentObjectIndex: currentObjectIndex - 1,
        finish: false
      });
    }
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
    const {currentObjectIndex, questionList, finish, isSubmit} = this.state;
    if (questionList.hasOwnProperty('setId')) {
      return (
        <WrittenTestClock >
          <div className='task-content' >
            {this.renderAnswer(currentObjectIndex, questionList)}
          </div >
          <div className='task-analysis' >
            {this.renderAnswerAnalysis(currentObjectIndex, questionList)}
          </div >
          <div className='task-action' >
            {finish ? this.renderFinishButton(currentObjectIndex) : this.renderActionButton(currentObjectIndex, questionList)}
          </div >
          {isSubmit && <Loading loading />}
        </WrittenTestClock >
      );
    } else {
      return (
        <WrittenTestClock > <Loading loading /> </WrittenTestClock >
      );
    }
  }
}
