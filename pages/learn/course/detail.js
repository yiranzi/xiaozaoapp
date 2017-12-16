import React from 'react'
import Link from 'next/link'
import ThemeConfig from '../../../config/theme'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import DateUtil from '../../../util/date'
import Layout from '../../../containers/learn/course/layout'
import AliVideo from '../../../xz-components/aliVideo'
import LoadingIcon from '../../../xz-components/loadingicon'
import Option from '../../../containers/clock/option'
import Button from '../../../xz-components/button'
import Traning from '../../../containers/learn/course/traning'
import CoursePageTitle from '../../../containers/learn/course/coursePageTitle'

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
      currentCourseDetail: {},
      array: [],
      menuContent: {}, // 左侧课程列表
      homeworkContent: {}, // 右侧作业列表
      detail: {}, // 需要展示的内容,
      workDetail: {}, // 作业详情
      myWork: '', // 我的作业
      isEditmyWork: false,
      workAnswer: {},
      showWorkAnser: false
    }
  }

  componentDidMount = async () => {
    let currentCourseDetail = {}
    let courseId = ToolsUtil.getQueryString('courseId')
    let footerPrint = await AxiosUtil.get(`/api/learning/getLearningFootprint/${courseId}`)
    let menuId = ToolsUtil.getQueryString('menuId') || footerPrint.chapterId
    let sectionId = ToolsUtil.getQueryString('sectionId') || footerPrint.sectionId
    let pageNumber = ToolsUtil.getQueryString('pageNumber') || footerPrint.pageNumber
    let menuContent = await AxiosUtil.get(`/api/learning/course/${courseId}`)
    let array = []
    menuId = menuId ? menuId : menuContent.menuDTOList[0].id
    menuContent.menuDTOList.map((menu) => {
      let _menuId = menu.id
      if (menuId.toString() === menu.id.toString()) {
        currentCourseDetail.courseName = menu.name
        currentCourseDetail.pageCount = menu.sectionMenuDTOList.length
      }
      menu.sectionMenuDTOList.map((section) => {
        let sectionId = section.id
        section.contentDTOList.map((content) => {
          let pageNumber = content.pageNumber
          array.push({
            menuId: _menuId.toString(),
            sectionId: sectionId.toString(),
            pageNumber: pageNumber.toString()
          })
        })
      })
    })
    this.setState({array: array, currentCourseDetail: currentCourseDetail})
    this.setState({menuContent: menuContent})
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

    // 为了设置上一页下一页的值

    let m1 = 0 // 滚动的值
    let m2 = 0 // 对比时间的值
    let timer = null

    document.addEventListener('scroll', () => {
      document.getElementById('prev').style.backgroundColor = 'rgba(62,166,247,0.2)'
      document.getElementById('next').style.backgroundColor = 'rgba(62,166,247,0.2)'
      clearTimeout(timer) // 每次滚动前 清除一次
      timer = setTimeout(() => {
        m2 = document.documentElement.scrollTop || document.body.scrollTop
        if (m2 === m1) {
          document.getElementById('prev').style.backgroundColor = '#3ea6f7'
          document.getElementById('next').style.backgroundColor = '#3ea6f7'
        }
      }, 500)
      m1 = document.documentElement.scrollTop || document.body.scrollTop
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

    if (workId) {
      const _this = this
      AxiosUtil.get(`/api/work/${courseId}/${workId}`).then((workDetail) => {
        _this.setState({workDetail: workDetail})
        return AxiosUtil.get(`/api/work/myAnswer/${courseId}/${workId}`) // 我的答案
      }).then((myWork) => {
        return AxiosUtil.get(`/api/work/workAnswerEvaluate/${myWork.id}`) // 我的答案
      }).then((workAnswer) => {
        _this.setState({workAnswer: workAnswer})
      })
    }
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
  onChangeCourse = async (sectionId) => {
    this.setState({course: '', homeWork: ''})
    let course = await AxiosUtil.get(`/api/learning/course/${this.state.courseId}/${sectionId}/1`)
    this.setState({course: course})
  }
  renderCourse (course) {
    return (
      <div className='course-detail'>
        <div className='text' dangerouslySetInnerHTML={{__html: course.string}} />
        {this.renderCourseDetail(course)}
        {this.renderWorkDetail()}
      </div>
    )
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
  renderWorkDetail () {
    const {query, workDetail, isEditmyWork} = this.state
    const {answer} = workDetail
    if (!DataUtil.isEmpty(workDetail)) {
      return (
        <div className='homework'>
          <div className='header'><img style={{width: '1rem'}} src='/static/img/icon/file.png' />课间思考作业</div>
          <div style={{marginTop: '1rem'}}>{workDetail.question}</div>
          <div style={{marginTop: '1rem'}}>截止时间：{DateUtil.format(workDetail.endTime, 'yyyy-MM-dd hh:mm')}</div>
          <Option topic={workDetail} onChange={(id, value) => this.workChange(value, workDetail.type)} disabled={!(Boolean(answer) && isEditmyWork)} />
          {DataUtil.isEmpty(answer) || isEditmyWork ? (
            <div className='wx-text-center'>
              <Button size='small' onClick={() => { this.submitWork(workDetail.type) }}>上传作业</Button>
            </div>
          ) : (
            <div>
              <div className='wx-space-center'>
                <Button style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}} type='normal' size='small'>
                  <Link href={`/learn/course/otherAnswer${location.search}&workId=${query.workId}`}><a>查看其他同学答案</a></Link>
                </Button>
                <Button onClick={() => { this.setState({showWorkAnser: !this.state.showWorkAnser}) }} style={{borderColor: ThemeConfig.color.content, color: ThemeConfig.color.content}} type='normal' size='small'>查看导师点评</Button>
                {DataUtil.isEmpty(this.state.workAnswer) && (
                  <Button style={{borderColor: ThemeConfig.color.red, color: ThemeConfig.color.red}} type='normal' size='small' onClick={() => { this.editMyWork() }}>修改答案</Button>
                )}
              </div>
              {this.state.showWorkAnser && (
                <div>导师点评：{this.state.workAnswer}</div>
              )}
              <a href={`/learn/course/questionList?courseId=${query.courseId}&sectionId=${query.sectionId}&pageNumber=${query.pageNumber}`}><Button style={{marginTop: '2rem', backgroundColor: ThemeConfig.color.red}} >对学习内容有疑问？点击查看导师答疑</Button></a>
            </div>
          )}
          <style jsx>{`
            .homework {
              padding: 2rem 1rem;
            }
            .header img {
              width: 1rem;
            }
          `}</style>
        </div>
      )
    }
  }
  workChange (value, type) {
    if (ToolsUtil.isUploader(type)) {
      this.setState({myWork: value[0].url})
    }
    if (ToolsUtil.isTextarea(type)) {
      console.log(value)
      this.setState({myWork: value})
    }
  }
  editMyWork () {
    this.setState({isEditmyWork: true})
  }
  submitWork = async (type) => {
    const {query, myWork} = this.state
    this.setState({isEditmyWork: false})
    try {
      if (ToolsUtil.isUploader(type)) {
        let uuid = DataUtil.uuid(11)
        let formdata = DataUtil.imgFormat(myWork, uuid, 'jpg')
        await AxiosUtil.post(`/api/work/workFileComplete/${query.courseId}/${query.workId}`, formdata)
      }
      if (ToolsUtil.isTextarea(type)) {
        await AxiosUtil.post(`/api/work/workComplete/${query.courseId}/${query.workId}`, myWork)
      }
    } catch (err) {

    }
  }
  renderHomeWork (homeWork) {
    return (
      <div className='home-work'>
        <div className='question' dangerouslySetInnerHTML={{__html: homeWork.question}} />
      </div>
    )
  }
  renderContent () {
    const {detail} = this.state
    if (DataUtil.isEmpty(detail)) return <LoadingIcon />
    return this.renderCourse(detail)
  }
  renderPrev () {
    return <Button id='prev' size='small' onClick={() => { this.loadPage('prev') }}>上一页</Button>
  }
  renderNext () {
    return <Button id='next' size='small' onClick={() => { this.loadPage('next') }} >下一页</Button>
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
      if (json.menuId === item.menuId && json.sectionId === item.sectionId && json.pageNumber === item.pageNumber) {
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
      currentCourseDetail
    } = this.state
    return (
      <Layout
        query={query}
        menuContent={menuContent}
        homeworkContent={homeworkContent}
        onChangeCourse={(sectionId) => { this.onChangeCourse(sectionId) }}
        onChangeHomeWork={(workId) => { this.onChangeHomeWork(workId) }}
      >
        <CoursePageTitle title={currentCourseDetail.courseName} pageNumber={query.pageNumber} totalSize={currentCourseDetail.pageCount} />
        {this.renderPrev()}
        {this.renderNext()}
        {this.renderContent()}
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
