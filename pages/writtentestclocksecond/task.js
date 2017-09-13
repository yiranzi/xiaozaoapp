import React from 'react';
import WrittenTestClock from '../../src/page/writtentestclock/components/layout';
import WrittenTestClockAction from '../../src/action/writtentestclock/answer';
import SubjectComponent from '../../src/page/writtentestclock/components/subject';
import ToolsUtil from '../../src/util/tools';

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentObjectIndex: 0,
      questionList: {}
    };
  }

  componentDidMount = async () => {
    const category = ToolsUtil.getQueryString('category');
    let questionList;
    // 首次测评
    if (category === 'entrance') {
      questionList = await WrittenTestClockAction.getEvaluation();
    } else if (category === 'task') {
      questionList = await WrittenTestClockAction.getToday();
    } else if (category === 'review') {
      const day = ToolsUtil.getQueryString('day');
      if (day) {
        questionList = await WrittenTestClock.getByToday(day);
      } else {
        questionList = await WrittenTestClock.getYesterday();
      }
    } else if (category === 'finish') {
      questionList = await WrittenTestClock.getTest();
    }
    this.setState({questionList: questionList});
  };

  renderAnswer (questionList) {
    const {currentObjectIndex} = this.state;
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

  render () {
    const {questionList} = this.state;
    if (questionList.hasOwnProperty('setId')) {
      return (
        <WrittenTestClock >
          {this.renderAnswer(questionList)}
        </WrittenTestClock >
      );
    } else {
      return (
        <WrittenTestClock > </WrittenTestClock >
      );
    }

  }
}
