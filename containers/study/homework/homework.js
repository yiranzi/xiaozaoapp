import React from 'react'
import AxiosUtil from '../../../util/axios'
import HocRenderContent from '/containers/study/hocRenderContent'
import QuestionItem from '/containers/study/homework/questionItem'

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
      return (<QuestionItem questionItem={questionItem} payStatus={this.props.courseStatus} />)
    })
    return (questionDivList)
  }

  render () {
    let {data: allHomeworkByLesson} = this.props
    if (allHomeworkByLesson && allHomeworkByLesson.length > 0) {
      let lessonHomework = allHomeworkByLesson.map((lesson) => {
        return (<div className='homework-page'>

          <div className='lesson-title'>
            <img src='/static/img/study/homework-icon.png' />
            <h2>{lesson.chapterName}</h2>
          </div>
          {this.renderLessonQuestions(lesson)}
          <style jsx>{`
            .homework-page {

            }
            .lesson-title {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
            }
            .lesson-title img {
              width: 30px;
            }
            .lesson-title h2 {
              font-size: 20px;
            }
          `}</style>
        </div>)
      })
      return (<div>
        <h1>{this.props.courseStatus}</h1>
        {lessonHomework}
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

