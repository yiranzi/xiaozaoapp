// import React from 'react';
// import SubjectComponent from '../components/subject';
// import ThemeConfig from '../../../config/theme';
// import AnswerAction from '../../../../action/writtentestclock/answer';
//
// export default class AnswerPage extends React.Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       currentObjectIndex: 0,
//       answerListResult: {},
//       // answerList: [],//题目答案[{id: , tag: }]
//       isChecked: false,
//       finish: false,
//       initTime: new Date(),
//       isShowAnalysisButton: false,
//       isShowAnalysis: false,
//       questionList: {}
//     };
//   }
//
//   componentDidMount = async () => {
//     let questionList = {};
//     try {
//       questionList = await AnswerAction.getToday();
//       console.log(questionList);
//       if (questionList.answerDTOList.length > 1) {
//         this.setState({questionList: questionList, isChecked: true});
//       } else {
//         this.setState({questionList: questionList});
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   renderAnswer (currentObjectIndex, questionList, answerDTOList) {
//     const questionItem = questionList[currentObjectIndex];// 题目详情
//     const subjectItem = Object.assign({}, {
//       total: questionList.length, // 当前试卷总共多少题
//       currentIndex: currentObjectIndex, // 当前题目在数组中的编号
//       questionItem: questionItem, // 题目数组
//       selectAnswer: answerDTOList[currentObjectIndex] ? answerDTOList[currentObjectIndex].answer : '', // 已选答案,
//       disabled: true
//     });
//     return (
//       <div className='subject-item'>
//         <SubjectComponent
//           subjectItem={subjectItem}
//         />
//       </div>
//     );
//   }
//
//
//
//
//
//
//   renderAnswer (currentObjectIndex, answerList, questions) {
//     // const {answerList} = this.state;
//     let {answerListResult} = this.state;
//     const questionItem = questions[currentObjectIndex];// 题目详情
//     let selectAnswer = answerListResult[questionItem.id] ? answerListResult[questionItem.id].tag : '';
//     let isCheckAnalysis = answerListResult[questionItem.id] ? answerListResult[questionItem.id].isShowAnalysis : '';
//
//     if (answerList.hasOwnProperty(questionItem.id)) {
//       const subjectItem = Object.assign({}, {
//         total: questions.length, // 当前试卷总共多少题
//         currentIndex: currentObjectIndex, // 当前题目在数组中的编号
//         questionItem: questionItem, // 题目数组
//         selectAnswer: answerList[questionItem.id], // 已选答案,
//         disabled: true
//       });
//       return (
//         <div className='subject-item'>
//           <SubjectComponent
//             subjectItem={subjectItem}
//           />
//         </div>
//       );
//     } else if (isCheckAnalysis) {
//       const subjectItem = Object.assign({}, {
//         total: questions.length, // 当前试卷总共多少题
//         currentIndex: currentObjectIndex, // 当前题目在数组中的编号
//         questionItem: questionItem, // 题目数组
//         selectAnswer: selectAnswer, // 已选答案,
//         disabled: true
//       });
//       return (
//         <div className='subject-item'>
//           <SubjectComponent
//             subjectItem={subjectItem}
//           />
//         </div>
//       );
//     } else {
//       const subjectItem = Object.assign({}, {
//         total: questions.length, // 当前试卷总共多少题
//         currentIndex: currentObjectIndex, // 当前题目在数组中的编号
//         questionItem: questionItem, // 题目数组
//         selectAnswer: selectAnswer// 已选答案
//       });
//       return (
//         <div className='subject-item'>
//           <SubjectComponent
//             subjectItem={subjectItem}
//             onChange={(value) => {
//               this.answerCheck(questionItem.id, value);
//             }}
//           />
//         </div>
//       );
//     }
//   }
//
//   formatAnswerDTOList (answerDTOList) {
//     let json = {};
//     answerDTOList.map((item, index) => {
//       json[item.id] = item.answer;
//     });
//     return json;
//   }
//
//   answerCheck (id, value) {
//     // const {answerList} = this.state;
//     let {answerListResult} = this.state;
//     answerListResult[id] = answerListResult[id] || {};
//     answerListResult[id].tag = value;
//     this.setState({
//       answerListResult: answerListResult,
//       // answerList: answerList.concat({id: id, answer: value}),
//       isShowAnalysisButton: true
//     });
//   }
//
//   prevAnswer (currentObjectIndex) {
//     if (currentObjectIndex >= 1) {
//       this.setState({
//         currentObjectIndex: currentObjectIndex - 1,
//         isShowAnalysis: false,
//         finish: false
//       });
//     }
//   }
//
//   nextAnswer (currentObjectIndex, questions) {
//     let nextObjectIndex = currentObjectIndex + 1;
//     if (nextObjectIndex >= questions.length - 1) {
//       this.setState({
//         currentObjectIndex: nextObjectIndex,
//         finish: true,
//         isShowAnalysis: false,
//         isShowAnalysisButton: false
//       });
//     } else {
//       this.setState({
//         currentObjectIndex: nextObjectIndex,
//         isShowAnalysis: false,
//         isShowAnalysisButton: false
//       });
//     }
//   }
//
//   renderAnswerAnalysis (currentObjectIndex, answerList, questions) {
//     const {answerListResult, isShowAnalysisButton, isShowAnalysis} = this.state;
//     const questionItem = questions[currentObjectIndex];
//     const {id, answer, analysis} = questionItem;
//
//     const analysisContent = (
//       <div className='analysis'>
//         <div className='wrapper'>
//           <div className='analysis-header'>
//             <div className='answer'>答案：{answer}</div>
//             <div className='line' />
//             <div className='hide-analysis'>查看解析</div>
//           </div>
//           <div className='analysis-content'>{analysis}</div>
//           <style jsx>{`
//               .analysis-header {
//                 display: flex;
//                 justify-content: space-between;
//               }
//               .hide-analysis {
//                 display: inline-block;
//                 border: 1px solid ${ThemeConfig.color.writtentestclockmain};
//                 font-size: ${ThemeConfig.size.normal};
//                 font-weight: bold;
//                 border-radius: 1rem;
//                 padding: 0.1rem 0.5rem;
//               }
//             `}</style>
//         </div>
//       </div>
//     );
//
//     const analysisButton = (
//       <div className='analysis'>
//         <div className='show-analysis' onClick={() => {
//           this.showAnalysis(currentObjectIndex, questions, isShowAnalysis);
//         }}>查看解析
//         </div>
//         <style jsx>{`
//             .show-analysis {
//               display: inline-block;
//               border: 1px solid ${ThemeConfig.color.writtentestclockmain};
//               font-size: ${ThemeConfig.size.normal};
//               font-weight: bold;
//               border-radius: 1rem;
//               padding: 0.1rem 0.5rem;
//             }
//           `}</style>
//       </div>
//     );
//
//     let isCheckAnalysis = answerListResult[id] ? answerListResult[id].isShowAnalysis : false;
//     let canShowAnalysis = answerListResult[id] ? answerListResult[id].tag : false;
//     if (isShowAnalysis || isCheckAnalysis || answerList.hasOwnProperty(id)) {
//       return analysisContent;
//     }
//     if (isShowAnalysisButton || canShowAnalysis) {
//       return analysisButton;
//     }
//   }
//
//   showAnalysis (currentObjectIndex, questions, isShowAnalysis) {
//     const questionItem = questions[currentObjectIndex];// 题目详情
//     const id = questionItem.id;
//
//     let {answerListResult} = this.state;
//     answerListResult[id] = answerListResult[id] || {};
//     answerListResult[id].isShowAnalysis = true;
//     this.setState({
//       answerListResult: answerListResult,
//       isShowAnalysis: !isShowAnalysis,
//       isShowAnalysisButton: false
//     });
//   }
//
//   renderActionButton (currentObjectIndex, questions) {
//     return (
//       <div className='action'>
//         <div onClick={() => {
//           this.prevAnswer(currentObjectIndex);
//         }}><img src='/static/writtentestclock/prev.png' /></div>
//         <div onClick={() => {
//           this.nextAnswer(currentObjectIndex, questions);
//         }}><img src='/static/writtentestclock/next.png' /></div>
//       </div>
//     );
//   }
//
//   renderFinishButton (currentObjectIndex) {
//     const {isChecked} = this.state;
//     if (isChecked) {
//       return (
//         <div className='action'>
//           <div onClick={() => {
//             this.prevAnswer(currentObjectIndex);
//           }}><img src='/static/writtentestclock/prev.png' /></div>
//           <div><img src='/static/writtentestclock/next.png' /></div>
//         </div>
//       );
//     } else {
//       return (
//         <div className='finish'>
//           <div onClick={() => {
//             this.prevAnswer(currentObjectIndex);
//           }}><img src='/static/writtentestclock/prev.png' /></div>
//           <div onClick={() => {
//             this.answerComplete();
//           }}><img src='/static/writtentestclock/complete.png' /></div>
//         </div>
//       );
//     }
//   }
//
//   formatAnswerList () {
//     const {questionList, answerListResult} = this.state;
//     let answerList = [];
//
//     questionList.writtenTestTopicDTOList.map((item, index) => {
//       const {id} = item;
//       let seleteAnswer = answerListResult[id] ? answerListResult[id].tag : '';
//       answerList.push({id: item.id, answer: seleteAnswer});
//     });
//     return answerList;
//   }
//
//   answerComplete = async () => {
//     const {initTime} = this.state;
//     const {setId} = this.state.questionList;
//     const answerList = this.formatAnswerList();
//     try {
//       const spendTime = new Date() - initTime;
//       const data = JSON.stringify({
//         setId: setId,
//         time: spendTime,
//         answerDTOList: answerList
//       });
//
//       await AnswerAction.complete(data);
//       location.href = '/writtentestclock/clock-in-result';
//     } catch (e) {
//       console.log(e);
//     }
//   };
//
//   renderCss () {
//     return (
//       <style>{`
//         .triangle-up {
//           width: 0;
//           height: 0;
//           border-left: 0.5rem solid transparent;
//           border-right: 0.5rem solid transparent;
//           border-bottom: 1rem solid ${ThemeConfig.color.writtentestclockmain};
//           margin-left: -0.75rem;
//         }
//         .triangle-up + div {
//           margin-left: -1rem;
//         }
//         .action, .finish {
//           display: flex;
//           justify-content: center;
//           padding: 1rem 0;
//           text-align: center;
//         }
//         .action img, .finish img {
//           width: 85%;
//         }
//       `}</style>
//     );
//   }
//
//   render () {
//     const {currentObjectIndex, finish, questionList} = this.state;// 当前题目在数组中的序号
//     const {answerDTOList, writtenTestTopicDTOList} = questionList;
//     if (writtenTestTopicDTOList) {
//       let answerList = this.formatAnswerDTOList(answerDTOList);
//       return (
//         <div className='written-test-clock-answer'>
//           {this.renderAnswer(currentObjectIndex, answerList, writtenTestTopicDTOList)}
//           {this.renderAnswerAnalysis(currentObjectIndex, answerList, writtenTestTopicDTOList)}
//           {finish ? this.renderFinishButton(currentObjectIndex) : this.renderActionButton(currentObjectIndex, writtenTestTopicDTOList)}
//           {this.renderCss()}
//         </div>
//       );
//     } else {
//       return (
//         <div className='written-test-clock-answer' />
//       );
//     }
//   }
// }
import React from 'react'
import SubjectComponent from '../components/subject'
import ThemeConfig from '../../../config/theme'
import AnswerAction from '../../../action/writtentestclock/answer'

export default class AnswerPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentObjectIndex: 0,
      finish: false,
      questionList: {}
    }
  }
  // componentDidMount = async () => {
  //     let questionList = {};
  //     try {
  //       questionList = await AnswerAction.getToday();
  //       console.log(questionList);
  //       if (questionList.answerDTOList.length > 1) {
  //         this.setState({questionList: questionList, isChecked: true});
  //       } else {
  //         this.setState({questionList: questionList});
  //       }
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   };

  componentDidMount = async () => {
    let questionList = {}
    try {
      questionList = await AnswerAction.getToday()
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
