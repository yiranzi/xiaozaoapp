import React from 'react'
import AxiosUtil from '../../util/axios'
import UCenterLayout from '../../containers/ucenter/layoutbackup'
import Navbar from '../../components/navbar'
import DateUtil from '../../util/date'
import { Panel, PanelBody, MediaBox, MediaBoxBody,
  Button, Progress } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseList: null
    }
  }

  componentDidMount = async () => {
    this.loadBuyCourseList()
  }

  loadBuyCourseList = async () => {
    try {
      let courseList = await AxiosUtil.get('/api/private/learning/myCourse')
      this.setState({
        courseList: courseList
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderCourseList () {
    const {courseList} = this.state
    if (courseList) {
      const listElement = courseList.map((item, index) => {
        const prog = Math.ceil(item.overChapter /
          (item.totalChapter === 0 ? 1 : item.totalChapter) * 100)
        const endDay = DateUtil.diffDay(item.endDate)
        return <MediaBox type='text' key={index}>
          <MediaBoxBody className='wx-clearfix'>
            <span className='wx-pull-left' style={{width: '65%'}}>{item.courseName}</span>
            <span className='wx-pull-right'>
              {endDay > 0 ? (endDay + '天后结束') : '已结束'}</span>
          </MediaBoxBody>
          <MediaBoxBody className='wx-clearfix course-list-item'>
            <Progress value={prog} showCancel={false}
              className='wx-pull-left course-progress' />&nbsp;{prog}%&nbsp;
            {endDay > 0 &&
              <a href={'https://www.xiaozao.org/learn/course/' + item.courseId}>
                <Button size='small' className='wx-pull-right'>去上课</Button></a>
            }
          </MediaBoxBody>
        </MediaBox>
      })
      return <PanelBody>
        {listElement}
        <style global jsx>{`
          .course-list-item {
            margin-top: 10px;
          }
          .course-progress {
            width: 55%;
            margin-top: 12px;
          }
        `}</style>
      </PanelBody>
    }
  }

  render () {
    const leftbar = {
      href: '/ucenter/portalx',
      name: '返回'
    }
    return (
      <UCenterLayout>
        <Navbar fixed leftbar={leftbar} navtitle='我的课堂' />
        <Panel className='wx-navbar-margin' style={{marginTop: '2.5rem'}}>
          {this.renderCourseList()}
        </Panel>
        <style global jsx>{`
        `}</style>
      </UCenterLayout>
    )
  }
}
