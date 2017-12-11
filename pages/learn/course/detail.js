import React from 'react'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import DateUtil from '../../../util/date'
import Layout from '../../../containers/learn/course/layout'
import AliVideo from '../../../xz-components/aliVideo'
import LoadingIcon from '../../../xz-components/loadingicon'
import Option from '../../../containers/clock/option'
import Button from '../../../xz-components/button'

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
      menuContent: {}, // 左侧课程列表
      homeworkContent: {}, // 右侧作业列表
      showCourse: true, // 当前是课程详情, false显示的是homework
      detail: {}, // 需要展示的内容,
      workDetail: {}, // 作业详情
      myWork: '', // 我的作业
      isEditmyWork: false
    }
  }

  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let menuId = ToolsUtil.getQueryString('menuId')
    let sectionId = ToolsUtil.getQueryString('sectionId')
    let pageNumber = ToolsUtil.getQueryString('pageNumber') || 1

    let menuContent = await AxiosUtil.get(`/api/private/learning/course/${courseId}`)
    this.setState({menuContent: menuContent})
    /**
     * 获取课程详情
     * 如果链接没有sectionId, 默认显示第一节的内容
     */
    let detail
    if (sectionId) {
      detail = await AxiosUtil.get(`/api/private/learning/course/${courseId}/${sectionId}/${pageNumber}`)
      this.setState({detail: ToolsUtil.parseVideo(detail, true)})
    } else {
      sectionId = menuContent.menuDTOList[0].sectionMenuDTOList[0].id
      detail = await AxiosUtil.get(`/api/private/learning/course/${courseId}/${sectionId}/${pageNumber}`)
      this.setState({detail: ToolsUtil.parseVideo(detail, true), sectionId: sectionId})
    }
    /**
     * 作业列表
     */
    let homeworkContent = await AxiosUtil.get(`/api/private/work/workList/${courseId}`)
    this.setState({homeworkContent: homeworkContent})

    let workId
    const _this = this
    homeworkContent.map((item, index) => {
      item.childLearningCourseWorkDTOList.map((item, index) => {
        if (item.sectionId === _this.state.sectionId && item.pageNumber === pageNumber) {
          workId = item.workId
          return false
        }
      })
    })

    if (workId) {
      let workDetail = await AxiosUtil.get(`/api/private/work/${courseId}/${workId}`)
      this.setState({workDetail: workDetail})
    }

    this.setState({
      query: {
        courseId: courseId,
        menuId: menuId,
        sectionId: sectionId,
        pageNumber: pageNumber,
        workId: workId
      }
    })
  }
  onChangeCourse = async (sectionId) => {
    this.setState({course: '', homeWork: ''})
    let course = await AxiosUtil.get(`/api/private/learning/course/${this.state.courseId}/${sectionId}/1`)
    this.setState({course: course})
  }
  renderCourse (course) {
    return (
      <div className='course-detail'>
        <div className='text' dangerouslySetInnerHTML={{__html: course.string}} />
        <div className='video-list'>
          {course.videoList && course.videoList.map((item, index) => {
            return (
              <div key={index}>
                <AliVideo key={index} playerId={item.playerId} type='m3u8' src={item.src} height='170px' />
              </div>
            )
          })}
        </div>
        {this.renderWorkDetail()}
      </div>
    )
  }
  renderWorkDetail () {
    const {workDetail, isEditmyWork} = this.state
    const {answer} = workDetail
    if (!DataUtil.isEmpty(workDetail)) {
      return (
        <div>
          <div>课间思考作业</div>
          <div>{workDetail.question}</div>
          <div>截止时间：{DateUtil.format(workDetail.endTime, 'yyyy-MM-dd hh:mm')}</div>
          <Option topic={workDetail} onChange={(id, value) => this.setState({myWork: value[0].url})} disabled={!(Boolean(answer) && isEditmyWork)} />
          {DataUtil.isEmpty(answer) || isEditmyWork ? (
            <Button onClick={() => { this.submitWork(workDetail.type) }}>上传作业</Button>
          ) : (
            <div>
              <Button type='normal'>查看其他同学答案</Button>
              <Button>查看导师点评</Button>
              <Button onClick={() => { this.editMyWork() }}>修改答案</Button>
            </div>
          )}
        </div>
      )
    }
  }
  editMyWork () {
    this.setState({isEditmyWork: true})
  }
  submitWork = async (type) => {
    const {query, myWork} = this.state
    console.log('myWork:', myWork)
    if (ToolsUtil.isUploader(type)) {
      let uuid = DataUtil.uuid(11)
      let formdata = DataUtil.imgFormat(myWork, uuid, 'jpg')
      await AxiosUtil.post(`/api/work/workFileComplete/${query.courseId}/${query.workId}`, formdata)
    }
  }
  onChangeHomeWork = async (homeWork) => {
    this.setState({course: '', homeWork: homeWork})
    // let homeWork = await AxiosUtil.get(`/api/private/work/${this.state.courseId}/${workId}`)
    // this.setState({homeWork: homeWork})
  }
  renderHomeWork (homeWork) {
    return (
      <div className='home-work'>
        <div className='question' dangerouslySetInnerHTML={{__html: homeWork.question}} />
      </div>
    )
  }
  renderContent () {
    const {detail, showCourse} = this.state
    if (DataUtil.isEmpty(detail)) return <LoadingIcon />
    if (showCourse) {
      return this.renderCourse(detail)
    } else {
      return this.renderHomeWork(detail)
    }
  }
  render () {
    const {
      query,
      menuContent,
      homeworkContent
    } = this.state
    return (
      <Layout
        query={query}
        menuContent={menuContent}
        homeworkContent={homeworkContent}
        onChangeCourse={(sectionId) => { this.onChangeCourse(sectionId) }}
        onChangeHomeWork={(workId) => { this.onChangeHomeWork(workId) }}
      >
        {this.renderContent()}
        {/* {!DataUtil.isEmpty(course) && this.renderCourse(course)} */}
        {/* {!DataUtil.isEmpty(homeWork) && this.renderHomeWork(homeWork)} */}
        <style global jsx>{`
          .course-detail {
            padding-top: 1rem;
            padding-bottom: 4rem;
          }
          .course-detail img,
          .course-detail span,
          .course-detail ol,
          .course-detail ul {
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
        `}</style>
        <link href='/static/js/video-js.css' rel='stylesheet' />
        <script src='/static/js/video.js' />
        <script src='/static/js/videojs-contrib-hls.min.js' />
      </Layout>
    )
  }
}
