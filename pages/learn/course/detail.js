import React from 'react'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Layout from '../../../containers/learn/course/layout'
import AliVideo from '../../../xz-components/aliVideo'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        courseId: '',
        menuId: '',
        sectionId: ''
      },
      menuContent: {},
      homeworkContent: {},
      course: '',
      homeWork: ''
    }
  }

  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let menuId = ToolsUtil.getQueryString('menuId')
    let sectionId = ToolsUtil.getQueryString('sectionId')
    /**
     * 课程菜单
     */
    let menuContent = await AxiosUtil.get(`/api/private/learning/course/${courseId}`)
    this.setState({menuContent: menuContent})
    /**
     * 获取课程详情
     * 如果链接没有sectionId, 默认显示第一节的内容
     */
    let course
    if (sectionId) {
      course = await AxiosUtil.get(`/api/private/learning/course/${courseId}/${sectionId}/1`)
      this.setState({course: ToolsUtil.parseVideo(course, true)})
    } else {
      sectionId = menuContent.menuDTOList[0].sectionMenuDTOList[0].id
      course = await AxiosUtil.get(`/api/private/learning/course/${courseId}/${sectionId}/1`)
      this.setState({course: ToolsUtil.parseVideo(course, true)})
    }
    /**
     * 作业列表
     */
    let homeworkContent = await AxiosUtil.get(`/api/private/work/workList/${courseId}`)
    this.setState({homeworkContent: homeworkContent})

    this.setState({
      query: {
        courseId: courseId,
        menuId: menuId,
        sectionId: sectionId
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
        <div className='course-detail' dangerouslySetInnerHTML={{__html: course.string}} />
        <div className='video-list'>
          {course.videoList && course.videoList.map((item, index) => {
            return (
              <div key={index}>
                src: {item.src}
                <br />
                playerId: {item.playerId}
                <AliVideo key={index} playerId={item.playerId} type='m3u8' src={item.src} height='170px' />
              </div>
            )
          })}
        </div>
      </div>
    )
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
  render () {
    const {
      query,
      menuContent,
      homeworkContent,
      course,
      homeWork
    } = this.state
    return (
      <Layout
        query={query}
        menuContent={menuContent}
        homeworkContent={homeworkContent}
        onChangeCourse={(sectionId) => { this.onChangeCourse(sectionId) }}
        onChangeHomeWork={(workId) => { this.onChangeHomeWork(workId) }}
      >
        {!DataUtil.isEmpty(course) && this.renderCourse(course)}
        {!DataUtil.isEmpty(homeWork) && this.renderHomeWork(homeWork)}
        <style global jsx>{`
          .course-detail {
            padding-bottom: 2rem;
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
      </Layout>
    )
  }
}
