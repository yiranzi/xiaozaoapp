import React from 'react'
import Layout from '../../components/layout'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import ThemeConfig from '../../config/theme'
import Button from '../../xz-components/button'
import {Toast} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseId: '',
      packageId: '',
      courseDetail: {},
      isSubmit: false,
      success: false,
      failed: false,
      buyed: false,
      error: ''
    }
  }
  componentDidMount = async () => {
    let courseId = ToolsUtil.getQueryString('courseId')
    let packageId = ToolsUtil.getQueryString('courseId')
    let courseDetail = await AxiosUtil.get('/api/private/learning/courseDetail/' + courseId)
    this.setState({courseId: courseId, packageId: packageId, courseDetail: courseDetail})
  }
  buyFree = async () => {
    try {
      this.setState({isSubmit: true})
      await AxiosUtil.get('/api/payment/buyFree/' + this.state.packageId)
      this.setState({
        isSubmit: false,
        success: true,
        buyed: true
      })
    } catch (e) {
      this.setState({
        isSubmit: false,
        failed: true,
        error: e.message
      })
    }
    const _this = this
    setTimeout(() => {
      _this.setState({
        isSubmit: false,
        success: false,
        failed: false
      })
    }, 2 * 1000)
  }
  renderButton (buyed) {
    if (buyed) {
      return <a style={{display: 'block'}} href='/ucenter/classroom'><Button style={{backgroundColor: ThemeConfig.color.red}}>去上课</Button></a>
    } else {
      return <Button onClick={() => { this.buyFree() }} style={{backgroundColor: ThemeConfig.color.red}}>马上报名</Button>
    }
  }
  render () {
    const {courseDetail} = this.state
    return (
      <Layout>
        <Toast icon='loading' show={this.state.isSubmit}>Loading...</Toast>
        <Toast icon='success-no-circle' show={this.state.success}>报名成功</Toast>
        <Toast icon='success-no-circle' show={this.state.failed}>{this.state.error}</Toast>
        <div className='course'>
          <div className='header'>
            <div className='logo'>小灶能力派</div>
            <div className='classroom'><a href='/ucenter/classroom' style={{display: 'block'}}><Button style={{backgroundColor: '#241d66', width: 'auto', padding: '0.5rem 1rem'}}>我的教室</Button></a></div>
          </div>
          <div className='title'>{courseDetail.name}</div>
          <div className='detail'>
            <div className='learned'><img src='/static/img/course/person.png' />{courseDetail.buyCount}人学过</div>
            <div className='expired'><img src='/static/img/course/clock.png' />报名后即可上课，课程有效期７天</div>
            <div className='free'><img src='/static/img/course/cash.png' />限时免费</div>
          </div>
          <img style={{width: '100%'}} src={`http://xiaozaoresource.oss-cn-shanghai.aliyuncs.com/wxfreecourse/${this.state.courseId}.jpg`} />
          <div className='btn-group'>
            {this.state.buyed
              ? <a style={{display: 'block'}} href='/ucenter/classroom'><Button style={{backgroundColor: ThemeConfig.color.red}}>去上课</Button></a>
              : this.renderButton(courseDetail.buyed)
            }
          </div>
        </div>
        <style jsx>{`
          .header {
            background-color: #fff;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .course {
            background-color: #f0f2f6;
            min-height: 100vh;
            color: ${ThemeConfig.color.content};
          }
          .course .title {
            margin-top: 1rem;
            font-size: 1.5rem;
            background-color: #fff;
            padding: 1rem;
          }
          .course .detail {
            background-color: #fff;
            margin-top: 0.1rem;
            padding: 1rem;
          }
          .course .detail .free {
            color: ${ThemeConfig.color.red};
          }
          .course .detail img {
            width: 1rem;
            margin-right: 0.5rem;
          }
          .course .btn-group {
            background-color: ${ThemeConfig.color.red};
            width: 100%;
            position: fixed;
            bottom: 0;
          }
        `}</style>
      </Layout>
    )
  }
}
