import React from 'react'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'
import QuestionItem from '/containers/learn/main/homework/questionItem'
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
      return (<QuestionItem key={index} questionItem={questionItem} {...this.props} />)
    })
    return (questionDivList)
  }

  render () {
    let {data: allHomeworkByLesson} = this.props
    if (allHomeworkByLesson && allHomeworkByLesson.length > 0) {
      let lessonHomework = allHomeworkByLesson.map((lesson, index) => {
        return (
          <Panel style={{marginBottom: '30px'}} key={index}>
            <PanelHeader>
              <div className='lesson-title'>
                <img src='/static/img/icon/homework-icon.png' />
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
            <style jsx global>{`
             .weui-media-box__info {
                line-height: 20px !important;
             }
            `}</style>
          </Panel>)
      })
      return (<div className='homework-page'>
        {this.props.courseStatus === 'unbuyed' && <h1 className='title'>立即报名课程，解锁以下作业</h1>}
        {lessonHomework}
        <style jsx>{`
          .homework-page {
            background-color: #efeff4
          }
          .title {
            padding-top: 25px;
            text-align: center;
            font-size: 16px;
          }
        `}</style>
      </div>)
    } else {
      return null
    }
  }
}

// 自定义拉取数据的方法
// updateFunc会刷新数据
const getData = async function (courseId) {
  return (AxiosUtil.get(`/api/work/workList/${courseId}`))
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

