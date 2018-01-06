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

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: '',
        menuId: '',
        sectionId: '',
        pageNumber: '',
        workId: ''
      },
      currentCourseDetail: {}, // 设置title所需要的字段
      array: [], // 上一页下一页
      menuContent: {}, // 左侧课程列表
      homeworkContent: {}, // 右侧作业列表
      detail: {} // 需要展示的内容,
    }
  }

  componentDidMount = async () => {
    let currentCourseDetail = {}
    let courseId = ToolsUtil.getQueryString('courseId')
    let footerPrint = await AxiosUtil.get(`/api/learning/getLearningFootprint/${courseId}`)
    let menuId = ToolsUtil.getQueryString('menuId')
    let sectionId = ToolsUtil.getQueryString('sectionId')
    let pageNumber = ToolsUtil.getQueryString('pageNumber') || 1

    if (!DataUtil.isEmpty(footerPrint)) {
      menuId = menuId || footerPrint.chapterId
      sectionId = sectionId || footerPrint.sectionId
      pageNumber = pageNumber || footerPrint.pageNumber
    }
    let menuContent = await AxiosUtil.get(`/api/learning/course/${courseId}`)
    let array = []
    menuId = menuId ? menuId : menuContent.menuDTOList[0].id
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
      let _menuId = menu.id

      menu.sectionMenuDTOList.map((section) => {
        if (sectionId.toString() === section.id.toString()) {
          currentCourseDetail.courseName = section.name
          currentCourseDetail.pageCount = section.contentDTOList.length
        }
        section.contentDTOList.map((content) => {
          let pageNumber = content.pageNumber
          array.push({
            menuId: _menuId.toString(),
            sectionId: section.id.toString(),
            pageNumber: pageNumber.toString()
          })
        })
      })
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
      if (DataUtil.isEmpty(prev) && DataUtil.isEmpty(next)) {
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
    this.setState({homeworkContent: homeworkContent})

    let workId
    homeworkContent.map((item, index) => {
      item.childLearningCourseWorkDTOList.map((item, index) => {
        if (item.sectionId.toString() === sectionId.toString() && item.pageNumber.toString() === pageNumber.toString()) {
          workId = item.workId
          return false
        }
      })
    })

    this.setState({
      query: {
        courseId: courseId,
        menuId: menuId || menuContent.menuDTOList[0].id,
        sectionId: sectionId,
        pageNumber: pageNumber,
        workId: workId
      }
    })
    AxiosUtil.post(`/api/learning/saveFootprint`, JSON.stringify({courseId: courseId, chapterId: menuId || menuContent.menuDTOList[0].id, pageNumber: pageNumber, sectionId: sectionId}))
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
      menuId: query.menuId,
      sectionId: query.sectionId,
      pageNumber: query.pageNumber
    }
    let pos
    array.map((item, index) => {
      if (json.menuId.toString() === item.menuId.toString() &&
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
    return (
      <Button
        id='prev'
        size='small'
        disabled={noPrev}
        onClick={() => { this.loadPage('prev') }}>
        {noPrev ? '上一节' : text}
      </Button>
    )
  }
  renderNext () {
    const {query, array} = this.state
    let json = {
      menuId: query.menuId,
      sectionId: query.sectionId,
      pageNumber: query.pageNumber
    }
    let pos
    array.map((item, index) => {
      if (json.menuId.toString() === item.menuId.toString() &&
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
      text = '下一节'
    }
    return (
      <Button
        id='next'
        size='small'
        disabled={noNext}
        onClick={() => { this.loadPage('next') }}>
        {noNext ? '下一节' : text}
      </Button>
    )
  }
  loadPage (type) {
    let {query, array} = this.state

    let {courseId, sectionId, menuId, pageNumber} = query

    let json = {
      menuId: menuId,
      sectionId: sectionId,
      pageNumber: pageNumber
    }

    let pos
    array.map((item, index) => {
      if (json.menuId.toString() === item.menuId.toString() &&
        json.sectionId.toString() === item.sectionId.toString() &&
        json.pageNumber.toString() === item.pageNumber.toString()) {
        pos = index
      }
    })

    if (type === 'next') {
      let next = array[pos + 1]
      if (!DataUtil.isEmpty(next)) {
        location.href = `/learn/course/detail?courseId=${courseId}&menuId=${next.menuId}&sectionId=${next.sectionId}&pageNumber=${next.pageNumber}`
      }
    } else if (type === 'prev') {
      let prev = array[pos - 1]
      if (!DataUtil.isEmpty(prev)) {
        location.href = `/learn/course/detail?courseId=${courseId}&menuId=${prev.menuId}&sectionId=${prev.sectionId}&pageNumber=${prev.pageNumber}`
      }
    }
  }
  render () {
    const {
      query,
      menuContent,
      homeworkContent,
      currentCourseDetail,
      detail
    } = this.state
    return (
      <Layout
        query={query}
        menuContent={menuContent}
        homeworkContent={homeworkContent}
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
            <MyWork {...this.state} />
          </div>
        )}
        <style global jsx>{`
          .course-detail {
            padding-top: 1rem;
            padding-bottom: 4rem;
          }
          .course-detail .detail img,
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
          .home-work img,
          .home-work span,
          .home-work ol,
          .home-work ul {
            width: 100% !important;
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
