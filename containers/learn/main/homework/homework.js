import React from 'react'
import AxiosUtil from '../../../../util/axios'
import HocRenderContent from '../../../../containers/learn/main/hocRenderContent'
import QuestionItem from '../../../../containers/learn/main/homework/questionItem'
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

/**
 * --must--
 * courseStatus: 'doing' 课程进度
 * courseId: 课程编号
 * --userSet--
 * tabSelect: 0, 1 默认打开的tab
 * workId: 默认打开的workId
 * --hoc--
 * data 传入数据
 * updateFunc 拉取数据
 * --self
 * needChangeWhenTab 是否根据点击控制fixed
 * pageOpenTag 标记是否是单独的页面
 * scrollTop 记录离开的时候的滚动位置
 * --
 * 点击back 清空pageOpenTag
 * 重新加载 清空pageOpenTag
 */


class innerComponent extends React.Component {
  needChangeWhenTab = true
  scrollTop
  pageOpenTag = 'windowstatus'
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

  // 监听用户刷新。
  // 如果窗口打开。那么手动back。
  componentWillMount () {
    this.setChapterMode(this.props)
    //
    let a = ToolsUtil.getQueryString(this.pageOpenTag)
    if (a) {
      history.go(-1)
    }
  }

  // 监听history.back
  // 如果当前没有 并且 窗口还在打卡。
  // 关闭窗口
  // 如果这里面能控制tab。那么直接在这里初始化 并且将index设置undefin。
  // 但是没办法，只能通过viewType多跑一层。
  componentWillReceiveProps (nextProps) {
    this.setChapterMode(nextProps)
    // 计算路由
    let type = ToolsUtil.getQueryString(this.pageOpenTag)
    if (!type && this.state.viewType === 'open') {
      this.setState({
        viewType: 'close'
      })
    }
  }

  setChapterMode (props) {
    // 如果是从有设置章节
    let {workId, data: allHomeworkByLesson} = props
    if (workId && allHomeworkByLesson) {
      this.needChangeWhenTab = false
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
      this.needChangeWhenTab = true
    }
  }

  // 点击后的回调。控制滚动。
  chooseChapterAndLesson (currentChapterIndex, currentLessonIndex, tabChoose) {
    // 如果不是章节设固定（可切换章节）,则返回
    if (!this.needChangeWhenTab) {
      return
    }
    // 如果选中状态
    if (tabChoose === 0) {
      // 如果已经开启
      if (this.state.viewType === 'open') {
        return
      }
      // 记录滚动前的位置
      this.scrollTop = window.scrollY
      this.screenMove('on')
      this.setState({
        viewType: 'open',
        currentChapterIndex: currentChapterIndex,
        currentLessonIndex: currentLessonIndex
      })
      let url = window.history.state.as

      url = url + `&${this.pageOpenTag}=true`
      Router.push(url)
      // window.location.reload()
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

  renderChapterLessons (chapter, chapterIndex) {
    return (
      chapter.childLearningCourseWorkDTOList.map((questionItem, lessonIndex) => {
        // 如果当前有选中 并且 当前选中的不是这个 就不能展示
        if (this.state.currentLessonIndex !== undefined && this.state.currentLessonIndex !== lessonIndex) {
          return null
        } else {
          return (
            <QuestionItem key={lessonIndex} {...this.props}
              chooseChapterAndLesson={this.chooseChapterAndLesson}
              chapterIndex={chapterIndex}
              lessonIndex={lessonIndex}
              viewType={this.state.viewType}
              questionItem={questionItem} />
          )
        }
      })
    )
  }

  renderAllChapter () {
    let {data: allHomeworkData} = this.props
    if (allHomeworkData && allHomeworkData.length > 0) {
      return (
        allHomeworkData.map((chapter, chapterIndex) => {
          // 如果当前有选中 并且 当前选中的不是这个 就不能展示
          if (this.state.currentChapterIndex !== undefined && this.state.currentChapterIndex !== chapterIndex) {
            return null
          } else {
            return (
              <Panel style={{marginBottom: '30px'}} key={chapterIndex}>
                <PanelHeader>
                  <TitleWithIcon title={chapter.chapterName} imgUrl={'/static/img/icon/homework-icon.png'} />
                </PanelHeader>
                <PanelBody>
                  {this.renderChapterLessons(chapter, chapterIndex)}
                </PanelBody>
                <style jsx global>{`
                  .weui-media-box__info {
                    line-height: 20px !important;
                  }
                `}</style>
              </Panel>)
          }
        })
      )
    }
  }

  render () {
    let {data: allHomeworkByLesson} = this.props
    if (allHomeworkByLesson && allHomeworkByLesson.length > 0) {
      return (
        <div className='homework-page'>
          {this.props.courseStatus === 'unbuyed' && <h1 className='title'>立即报名课程，解锁以下作业</h1>}
          {this.renderAllChapter()}
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
        </div>
      )
    } else {
      return (
        <Panel className='introduce'>
          <MediaBox>
            <MediaBoxTitle />
            <MediaBoxDescription style={{display: 'block'}}>
              本课程暂无作业
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
