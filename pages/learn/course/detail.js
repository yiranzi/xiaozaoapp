import React from 'react'
import ToolsUtil from '../../../util/tools'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Layout from '../../../containers/learn/course/layout'

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
    this.setState({
      query: {
        courseId: courseId,
        menuId: menuId,
        sectionId: sectionId
      }
    })

    let course = await AxiosUtil.get(`/api/private/learning/course/${courseId}/${sectionId}/1`)
    this.setState({course: course})

    let menuContent = await AxiosUtil.get(`/api/private/learning/course/${courseId}`)
    this.setState({menuContent: menuContent})

    let homeworkContent = await AxiosUtil.get(`/api/private/work/workList/${courseId}`)
    this.setState({homeworkContent: homeworkContent})
  }
  onChangeCourse = async (sectionId) => {
    this.setState({course: '', homeWork: ''})
    let course = await AxiosUtil.get(`/api/private/learning/course/${this.state.courseId}/${sectionId}/1`)
    this.setState({course: course})
  }
  renderCourse (course) {
    return (
      <div className='course-detail' dangerouslySetInnerHTML={{__html: course}} />
    )
  }
  onChangeHomeWork = async (workId) => {
    this.setState({course: '', homeWork: ''})
    let homeWork = await AxiosUtil.get(`/api/private/work/${this.state.courseId}/${workId}`)
    this.setState({homeWork: homeWork})
  }
  renderHomeWork (homeWork) {
    return (
      <div className='course-detail' dangerouslySetInnerHTML={{__html: homeWork}} />
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
        {!DataUtil.isEmpty(homeWork) && this.renderCourse(homeWork)}
        {this.renderHomeWork(homeWork)}
        <style global jsx>{`
          .course-detail img,
          .course-detail span,
          .course-detail ol,
          .course-detail ul {
            width: 100% !important;
          }
          .course-detail li {
            list-style-type: none;
          }
        `}</style>
      </Layout>
    )
  }
}
