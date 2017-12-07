import React from 'react'
import AxiosUtil from '../../../util/axios'
import HocRenderContent from '/containers/study/hocRenderContent'
import QuestionItem from '/containers/study/homework/questionItem'
import {
  Panel,
  PanelHeader,
  PanelBody
} from 'react-weui'
// 原始组件
class innerComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentQuestion: undefined
    }
  }

  renderLessonQuestions (lesson) {
    let questionDivList = lesson.childLearningCourseWorkDTOList.map((questionItem, index) => {
      return (<QuestionItem key={questionItem.workId} courseId={this.props.courseId} questionItem={questionItem} payStatus={this.props.courseStatus} />)
    })
    return (questionDivList)
  }

  render () {
    let {data: allHomeworkByLesson} = this.props
    if (allHomeworkByLesson && allHomeworkByLesson.length > 0) {
      let lessonHomework = allHomeworkByLesson.map((lesson, index) => {
        return (
          <Panel key={index}>
            <PanelHeader>
              <div className='lesson-title'>
                <img src='/static/img/study/homework-icon.png' />
                <h2>{lesson.chapterName}</h2>
              </div>
            </PanelHeader>
            <PanelBody>
              {this.renderLessonQuestions(lesson)}
            </PanelBody>
            <style jsx>{`
            .lesson-title {
              display: flex;
              justify-content: center;
              align-items: center;
              color: black;
            }
            .lesson-title img {
              width: 30px;
            }
            .lesson-title h2 {
              font-size: 18px;
            }
          `}</style>
          </Panel>)
      })
      return (<div className='homework-page'>
        {this.props.courseStatus === 'unbuyed' && <h1>立即报名课程，解锁以下作业</h1>}
        {lessonHomework}
        <style jsx>{`
          .homework-page {
            background-color: #efeff4
          }
        `}</style>
      </div>)
    } else {
      return null
    }
  }
}

// 自定义拉取数据的方法
const getData = async function (courseId) {
  let courseSummaryJson = await AxiosUtil.get(`/api/private/work/workList/${courseId}`)
  return courseSummaryJson
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(innerComponent, getData)

  render () {
    let RenderComponent = this.RenderComponent
    return (<div>
      <RenderComponent {...this.props} />
    </div>)
  }
}

