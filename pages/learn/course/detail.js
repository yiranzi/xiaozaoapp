import React from 'react'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Layout from '../../../containers/learn/course/layout'
import AliVideo from '../../../xz-components/aliVideo'
import LoadingIcon from '../../../xz-components/loadingicon'
import Button from '../../../xz-components/button'
import Traning from '../../../containers/learn/course/traning'
import CoursePageTitle from '../../../containers/learn/course/coursePageTitle'
import MyWork from '../../../containers/learn/course/myWork'
import ThemeConfig from '../../../config/theme'
import Router from 'next/router'
import Link from 'next/link'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: '',
        chapterId: '',
        sectionId: '',
        pageNumber: '',
        workId: []
      },
      showQuestionButton: false,
      currentCourseDetail: {}, // 设置title所需要的字段
      array: [], // 上一页下一页
      menuContent: {}, // 左侧课程列表
      homeworkContent: {}, // 右侧作业列表
      detail: {}, // 需要展示的内容,
      done: false
    }
  }

  componentDidMount = async () => {
    let currentCourseDetail = {}
    let courseId = ToolsUtil.getQueryString('courseId')
    let footerPrint = await AxiosUtil.get(`/api/learning/getLearningFootprint/${courseId}`)
    let chapterId = ToolsUtil.getQueryString('chapterId')
    let sectionId = ToolsUtil.getQueryString('sectionId')
    let pageNumber = ToolsUtil.getQueryString('pageNumber') || 1

    if (!DataUtil.isEmpty(footerPrint)) {
      chapterId = chapterId || footerPrint.chapterId
      sectionId = sectionId || footerPrint.sectionId
      pageNumber = pageNumber || footerPrint.pageNumber
    }
    let menuContent = await AxiosUtil.get(`/api/learning/course/${courseId}`)
    let array = []
    chapterId = chapterId ? chapterId : menuContent.menuDTOList[0].id
    /**
     * 获取课程详情
     * 如果链接没有sectionId, 默认显示第一节的内容
     */
    let detail
    if (sectionId) {
      detail = await AxiosUtil.get(`/api/learning/course/${courseId}/${sectionId}/${pageNumber}`)

      this.setState({detail: ToolsUtil.parseHtml(detail, true)})
    } else {
      sectionId = menuContent.menuDTOList[0].sectionMenuDTOList[0].id
      detail = await AxiosUtil.get(`/api/learning/course/${courseId}/${sectionId}/${pageNumber}`)
      this.setState({detail: ToolsUtil.parseHtml(detail, true), sectionId: sectionId})
    }

    menuContent.menuDTOList.map((menu) => {
      let chapterId = menu.id
      let type = menu.type
      if (type === 'chapter') {
        menu.sectionMenuDTOList.map((section) => {
          if (sectionId.toString() === section.id.toString()) {
            currentCourseDetail.courseName = section.name
            currentCourseDetail.pageCount = section.contentDTOList.length
          }
          section.contentDTOList.map((content) => {
            let pageNumber = content.pageNumber
            array.push({
              chapterId: chapterId.toString(),
              sectionId: section.id.toString(),
              pageNumber: pageNumber.toString()
            })
          })
        })
      }
    })
    this.setState({array: array, currentCourseDetail: currentCourseDetail})
    this.setState({menuContent: menuContent})

    // 为了设置上一页下一页的值

    let m1 = 0 // 滚动的值
    let m2 = 0 // 对比时间的值
    let timer = null

    document.addEventListener('scroll', () => {
      let prev = document.getElementById('prev')
      let next = document.getElementById('next')
      if (!DataUtil.isEmpty(prev) && !DataUtil.isEmpty(next)) {
        if (prev.className.indexOf('xz-btn_disabled') < 0) {
          document.getElementById('prev').style.backgroundColor = '#3ea6f7'
        }
        if (next.className.indexOf('xz-btn_disabled') < 0) {
          document.getElementById('next').style.backgroundColor = '#3ea6f7'
        }

        clearTimeout(timer) // 每次滚动前 清除一次
        timer = setTimeout(() => {
          m2 = document.documentElement.scrollTop || document.body.scrollTop
          if (m2 === m1) {
            if (prev.className.indexOf('xz-btn_disabled') < 0) {
              document.getElementById('prev').style.backgroundColor = 'rgba(62,166,247,0.2)'
            }
            if (next.className.indexOf('xz-btn_disabled') < 0) {
              document.getElementById('next').style.backgroundColor = 'rgba(62,166,247,0.2)'
            }
          }
        }, 500)
        m1 = document.documentElement.scrollTop || document.body.scrollTop
      }
    })

    /**
     * 作业列表
     */
    let homeworkContent = await AxiosUtil.get(`/api/work/workList/${courseId}`)
    this.setState({homeworkContent: homeworkContent, done: true})

    let workId = []
    homeworkContent.map((item, index) => {
      item.childLearningCourseWorkDTOList.map((item, index) => {
        if (item.sectionId.toString() === sectionId.toString() && item.pageNumber.toString() === pageNumber.toString()) {
          workId.push(item.workId)
          return false
        }
      })
    })

    this.setState({
      query: {
        courseId: courseId,
        chapterId: chapterId,
        sectionId: sectionId,
        pageNumber: pageNumber,
        workId: workId
      }
    })
    // 保存足迹
    AxiosUtil.post(`/api/learning/saveFootprint`, JSON.stringify({
      courseId: courseId,
      chapterId: chapterId,
      pageNumber: pageNumber,
      sectionId: sectionId
    }))
  }
  renderCourseDetail (course) {
    return (
      <div className='detail'>
        {course.map((item, index) => {
          return (
            <div key={`course_${index}`}>
              {item.hasOwnProperty('html') && <div dangerouslySetInnerHTML={{__html: item.html.content}} />}
              {item.hasOwnProperty('traning') && <Traning id={item.traning.id} />}
              {item.hasOwnProperty('video') && <AliVideo key={index} playerId={item.video.playerId} type='m3u8' src={item.video.src} height='170px' />}
            </div>
          )
        })}
        <style jsx>{`
          .detail {
            background-color: #efeff4;
            padding: 2rem 1rem;
          }
        `}</style>
      </div>
    )
  }

  renderPrev () {
    const {query, array} = this.state
    let json = {
      chapterId: query.chapterId,
      sectionId: query.sectionId,
      pageNumber: query.pageNumber
    }
    let pos
    array.map((item, index) => {
      if (json.chapterId.toString() === item.chapterId.toString() &&
          json.sectionId.toString() === item.sectionId.toString() &&
          json.pageNumber.toString() === item.pageNumber.toString()) {
        pos = index
      }
    })
    let prev = array[pos - 1]
    let noPrev = DataUtil.isEmpty(prev)
    let text
    if (json && prev && json.sectionId === prev.sectionId) {
      text = '上一页'
    } else {
      text = '上一节'
    }
    if (query.chapterId) {
      return (
        <Button
          style={{backgroundColor: 'rgba(62,166,247,0.2)'}}
          id='prev'
          size='small'
          disabled={noPrev}
          onClick={() => { this.loadPage('prev') }}>
          {noPrev ? '上一节' : text}
        </Button>
      )
    }
  }
  renderNext () {
    const {query, array} = this.state
    let json = {
      chapterId: query.chapterId,
      sectionId: query.sectionId,
      pageNumber: query.pageNumber
    }
    let pos
    array.map((item, index) => {
      if (json.chapterId.toString() === item.chapterId.toString() &&
          json.sectionId.toString() === item.sectionId.toString() &&
          json.pageNumber.toString() === item.pageNumber.toString()) {
        pos = index
      }
    })
    let next = array[pos + 1]
    let noNext = DataUtil.isEmpty(next)
    let text
    if (json && next && json.sectionId === next.sectionId) {
      text = '下一页'
    } else {
      if (query.courseId && query.sectionId) {
        AxiosUtil.get(`/api/learning/course/sectionComplete/${query.courseId}/${query.sectionId}`)
      }
      text = '下一节'
    }
    if (query.chapterId) {
      return (
        <Button
          style={{backgroundColor: 'rgba(62,166,247,0.2)'}}
          id='next'
          size='small'
          disabled={noNext}
          onClick={() => { this.loadPage('next') }}>
          {noNext ? '下一节' : text}
        </Button>
      )
    }
  }
  loadPage (type) {
    let {query, array} = this.state

    let {courseId, sectionId, chapterId, pageNumber} = query

    let json = {
      chapterId: chapterId,
      sectionId: sectionId,
      pageNumber: pageNumber
    }

    let pos
    array.map((item, index) => {
      if (json.chapterId.toString() === item.chapterId.toString() &&
        json.sectionId.toString() === item.sectionId.toString() &&
        json.pageNumber.toString() === item.pageNumber.toString()) {
        pos = index
      }
    })

    if (type === 'next') {
      let next = array[pos + 1]
      if (!DataUtil.isEmpty(next)) {
        let url = `/learn/course/detail?courseId=${courseId}&chapterId=${next.chapterId}&sectionId=${next.sectionId}&pageNumber=${next.pageNumber}`
        Router.replace(url)
        window.history.go(0)
      }
    } else if (type === 'prev') {
      let prev = array[pos - 1]
      if (!DataUtil.isEmpty(prev)) {
        let url = `/learn/course/detail?courseId=${courseId}&chapterId=${prev.chapterId}&sectionId=${prev.sectionId}&pageNumber=${prev.pageNumber}`
        Router.replace(url)
        window.history.go(0)
      }
    }
  }
  render () {
    const {
      query,
      menuContent,
      homeworkContent,
      currentCourseDetail,
      detail,
      showQuestionButton,
      done
    } = this.state
    let questionListAfterFix = 'courseId=' + query.courseId + '&' +
            'sectionId=' + query.sectionId + '&' +
            'title=' + encodeURI(encodeURI(currentCourseDetail.courseName)) + '&' +
            'totalSize=' + currentCourseDetail.pageCount + '&' +
            'pageNumber=' + query.pageNumber
    return (
      <Layout
        query={query}
        menuContent={menuContent}
        homeworkContent={homeworkContent}
        done={done}
        onChangeCourse={(sectionId) => { this.onChangeCourse(sectionId) }}
        onChangeHomeWork={(workId) => { this.onChangeHomeWork(workId) }}
      >
        <CoursePageTitle
          title={currentCourseDetail.courseName}
          pageNumber={query.pageNumber}
          totalSize={currentCourseDetail.pageCount}
        />
        {DataUtil.isEmpty(detail) && <LoadingIcon />}
        {!DataUtil.isEmpty(detail) && (
          <div className='course-detail'>
            {this.renderPrev()} {/* 上一页 */}
            {this.renderNext()} {/* 下一页 */}
            {this.renderCourseDetail(detail)} {/* 解析课程内容 */}
            {!DataUtil.isEmpty(query.workId) && query.workId.map((id, index) => {
              return (
                <MyWork
                  key={`work_${index}`}
                  courseId={query.courseId}
                  sectionId={query.sectionId}
                  workId={id}
                  pageNumber={query.pageNumber}
                  currentCourseDetail={currentCourseDetail}
                />
              )
            })}
            <div
              className='question wx-text-center'>
              {showQuestionButton && (
                <Link href={`/learn/course/questionList?${questionListAfterFix}`}>
                  <img
                    src='/static/img/learn/course/question-button.png'
                    style={{width: '70%', marginTop: '6px'}}
                  />
                </Link>
              )}
              <img
                src='/static/img/learn/course/question.png'
                style={{width: '3rem', float: 'right'}}
                onClick={() => { this.setState({showQuestionButton: !this.state.showQuestionButton}) }}
              />
            </div>
          </div>
        )}
        <style jsx>{`
          .question {
            position: fixed;
            width: 100%;
            bottom: 60px;
            padding: 0 10px;
            box-sizing: border-box;
          }
        `}</style>
        <style global jsx>{`
          .course-detail {
            padding-top: 1rem;
            padding-bottom: 4rem;
          }
          .course-detail .detail span,
          .course-detail .detail ol,
          .course-detail .detail ul {
            width: 100% !important;
          }
          .course-detail li {
            list-style-type: none;
          }
          .home-work {
            padding-bottom: 2rem;
          }
          .home-work span,
          .home-work ol,
          .home-work ul {
            width: 100% !important;
          }
          .course-detail .detail img,
          .home-work img {
            max-width: 100% !important;
            height: auto !important;
          }
          .home-work li {
            list-style-type: none;
          }
          button#prev {
            position: fixed;
            left: 5px;
            top: 50%;
            z-index: 999;
          }
          button#next {
            position: fixed;
            right: 5px;
            top: 50%;
            z-index: 999;
          }
        `}</style>
      </Layout>
    )
  }
}
