import React from 'react'
import AxiosUtil from '../../util/axios'
import UCenterLayout from '../../containers/ucenter/layout'
import Navbar from '../../components/navbar'
import DateUtil from '../../util/date'
import { Panel, PanelBody, MediaBox, MediaBoxBody,
  Button, Progress, Flex, FlexItem } from 'react-weui'
import wxPay from '../../util/wxPay'
import {Alert} from '../../xz-components/alert'
import {Modal} from '../../xz-components/modal'

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
      let courseList = await AxiosUtil.get('/api/learning/myCourse')
      this.setState({
        courseList: courseList
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  doCourseRenew = async (courseId, day) => {
    let payInfo = await AxiosUtil.get(`/api/payment/freeCourseRenew/${courseId}/${day}`)
    wxPay.payInit(payInfo).then(function (res) {
      if (res) {
        const state = res.state
        Alert({
          content: res.message,
          okText: '确定',
          ok: function () {
            if (state === 'ok') {
              location.reload(true)
            }
          }
        })
      } else {
        Alert({
          content: '支付失败，请刷新后重试',
          okText: '确定'
        })
      }
    }).catch(function (err) {
      Alert({
        content: err.message
      })
    })
  }

  showCourseRenewModal (courseId) {
    Modal({children: <div className='wx-text-center'>
      <h3>请选择续费套餐</h3><br />
      <Flex>
        <FlexItem>
          1天<br />&yen;3<br />
          <Button size='small' type='warn' className=''
            onClick={(e) => this.doCourseRenew(courseId, 1)}>点击续费</Button>
        </FlexItem>
        <FlexItem style={{borderLeft: '1px solid #eee'}}>
          7天<br />&yen;6<br />
          <Button size='small' type='warn' className=''
            onClick={(e) => this.doCourseRenew(courseId, 7)}>点击续费</Button>
        </FlexItem>
        <FlexItem style={{borderLeft: '1px solid #eee'}}>
          30天<br />&yen;19<br />
          <Button size='small' type='warn' className=''
            onClick={(e) => this.doCourseRenew(courseId, 30)}>点击续费</Button>
        </FlexItem>
      </Flex>
    </div>})
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
            <div className='wx-pull-left' style={{width: '65%'}}>
              <span>{item.courseName}</span><br />
              <span className='course-list-item'>
                <Progress value={prog} showCancel={false}
                  className='wx-pull-left course-progress' />&nbsp;{prog}%
              </span>
            </div>
            <div className='wx-pull-right wx-text-center'>
              <span>
                {endDay > 0 ? (endDay + '天后结束') : '已结束'}<br />
                {endDay > 0 && item.free && <small>(结束后可续费)<br /></small>}
              </span>
              {endDay > 0 &&
                <a href={'https://www.xiaozao.org/learn/course/' + item.courseId}>
                  <Button size='small' className='wx-pull-right'>去上课</Button></a>
              }
              {
                endDay <= 0 && item.free &&
                <Button size='small' type='warn' className='wx-pull-right'
                  onClick={(e) => this.showCourseRenewModal(item.courseId)}>续费学习</Button>
              }
            </div>
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
            width: 75%;
            margin-top: 12px;
          }
        `}</style>
      </PanelBody>
    }
  }

  render () {
    const leftbar = {
      href: '/ucenter/portal',
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
