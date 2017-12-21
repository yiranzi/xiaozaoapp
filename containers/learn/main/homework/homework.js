import React from 'react'
import AxiosUtil from '/util/axios'
import HocRenderContent from '/containers/learn/main/hocRenderContent'
import QuestionItem from '/containers/learn/main/homework/questionItem'
import {
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxTitle,
  MediaBoxDescription
} from 'react-weui'
import TitleWithIcon from '/xz-components/titleWithIcon'
import Router from 'next/router'
import ToolsUtil from '/util/tools'
class innerComponent extends React.Component {
  chapterMode
  scrollTop
  constructor (props) {
    super(props)
    this.state = {
      currentQuestion: undefined,
      currentLessonIndex: undefined,
      currentChapterIndex: undefined,
      viewType: undefined
    }
    this.chooseChapterAndLesson = this.chooseChapterAndLesson.bind(this)
  }

  componentWillMount () {
    this.setChapterMode(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setChapterMode(nextProps)
    // 计算路由
    let type = ToolsUtil.getQueryString('test')
    if (!type && this.state.viewType === 'open') {
      console.log('set close')
      this.setState({
        viewType: 'close'
      })
    }
  }

  setChapterMode (props) {
    // 如果是从有设置章节
    let {workId, data: allHomeworkByLesson} = props
    if (workId && allHomeworkByLesson) {
      this.chapterMode = true
      // 遍历对应上index
      let findLessonIndex = -1
      let findChapterIndex = allHomeworkByLesson.findIndex((lesson, chapterIndex) => {
        findLessonIndex = lesson.childLearningCourseWorkDTOList.findIndex((questionItem, lessonIndex) => {
          return (questionItem.workId === workId)
        })
        if (findLessonIndex !== -1) {
          return true
        }
      })
      if (findLessonIndex !== undefined && findChapterIndex !== undefined) {
        this.setState({
          currentLessonIndex: findLessonIndex,
          currentChapterIndex: findChapterIndex
        })
      } else {
        console.error('not found')
      }
    } else {
      this.chapterMode = false
    }
  }

  renderLessonQuestions (lesson, chapterIndex) {
    let questionDivList = lesson.childLearningCourseWorkDTOList.map((questionItem, lessonIndex) => {
      // 如果当前有选中 并且 当前选中的不是这个 就不能展示
      if (this.state.currentLessonIndex !== undefined && this.state.currentLessonIndex !== lessonIndex) {
        return null
      }
      return (<QuestionItem key={lessonIndex} {...this.props}
        chooseChapterAndLesson={this.chooseChapterAndLesson}
        chapterIndex={chapterIndex}
        lessonIndex={lessonIndex}
        viewType={this.state.viewType}
        questionItem={questionItem} />)
    })
    return (questionDivList)
  }

  // 点击后的回调
  chooseChapterAndLesson (currentChapterIndex, currentLessonIndex, tabChoose) {
    // 如果不是章节设固定（可切换章节）
    if (this.chapterMode) {
      return
    }
    // 如果选中状态
    if (tabChoose === 0) {
      // 记录滚动前的位置
      this.scrollTop = window.scrollY
      this.screenMove('on')
      this.setState({
        currentChapterIndex: currentChapterIndex,
        currentLessonIndex: currentLessonIndex,
        viewType: 'open'
      })
      let url = window.history.state.url
      url = url + '&test=true'
      Router.push(url)
    } else {
      this.setState({
        viewType: undefined,
        currentChapterIndex: undefined,
        currentLessonIndex: undefined
      }, () => {
        this.screenMove('off')
        window.scrollTo(0, this.scrollTop)
      })
    }
  }

  componentWillUnmount () {
    this.screenMove('off')
  }

  screenMove (type) {
    if (type === 'on') {
      const topDivtotalHeight = 263 + 79
      // window.scrollTo(0, topDivtotalHeight)
      // 保存状态
      let a = document.body.clientWidth
      document.body.style.position = 'fixed'
      document.body.style.top = -topDivtotalHeight + 'px'
      document.body.style.width = a + 'px'
    } else if (type === 'off') {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }

  render () {
    let {data: allHomeworkByLesson} = this.props
    if (allHomeworkByLesson && allHomeworkByLesson.length > 0) {
      let lessonHomework = allHomeworkByLesson.map((lesson, chapterIndex) => {
        // 如果当前有选中 并且 当前选中的不是这个 就不能展示
        if (this.state.currentChapterIndex !== undefined && this.state.currentChapterIndex !== chapterIndex) {
          return null
        }
        return (
          <Panel style={{marginBottom: '30px'}} key={chapterIndex}>
            <PanelHeader>
              <TitleWithIcon title={lesson.chapterName} imgUrl={'/static/img/icon/homework-icon.png'} />
            </PanelHeader>
            <PanelBody>
              {this.renderLessonQuestions(lesson, chapterIndex)}
            </PanelBody>
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
      return (
        <Panel className='introduce'>
          <MediaBox>
            <MediaBoxTitle />
            <MediaBoxDescription style={{display: 'block'}}>
              暂无作业
            </MediaBoxDescription>
          </MediaBox>
        </Panel>
      )
    }
  }
}

// 自定义拉取数据的方法
// updateFunc会刷新数据
const getData = async function (courseId) {
  return (AxiosUtil.get(`/api/work/workList/${courseId}`, true))
}

// 返回包裹后的组件
export default class extends React.Component {
  RenderComponent = HocRenderContent(innerComponent, getData)
  render () {
    let RenderComponent = this.RenderComponent
    return (<RenderComponent {...this.props} />)
  }
}

