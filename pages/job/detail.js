import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ToolsUtil from '../../util/tools'
import Navbar from '../../components/navbar'
import DateUtil from '../../util/date'
import {
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  MediaBoxHeader,
  MediaBoxTitle,
  MediaBoxBody,
  MediaBoxDescription,
  Button,
  LoadMore,
  Toast
} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const _this = this
    this.state = {
      job: null,
      toptips: {
        type: null,
        show: false,
        msg: null,
        callback: function () {
          _this.state.toptips.show = false
        }
      },
      showToast: false,
      toastTimer: null,
      isRender: true,
      dataState: 'none' /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */,
      error: ''
    }
  }

  componentDidMount = async () => {
    this.loadJobData()
  };

  componentWillUnmount () {
    this.state.toastTimer && clearTimeout(this.state.toastTimer)
  }

  loadJobData = async () => {
    this.setState({ dataState: 'loading' })
    let jobId = ToolsUtil.getQueryString('jobId')
    if (location.pathname.indexOf('/jobs/') >= 0) {
      jobId = location.pathname.replace('/jobs/', '')
    }
    try {
      let job = await AxiosUtil.get(`/api/private/job/${jobId}`)
      this.setState({
        job: job,
        isRender: false
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  };

  handleCollectionClick = async (e, jobId, collection) => {
    try {
      await AxiosUtil.get(`/api/collection/${jobId}`)
      this.state.job.collection = !collection
      this.setState({
        showToast: true,
        job: this.state.job
      })
      const _this = this
      this.state.toastTimer = setTimeout(() => {
        _this.setState({ showToast: false })
      }, 2000)
    } catch (e) {
      let toptips = this.state.toptips
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = e.message
      this.setState({
        toptips: toptips
      })
    }
  };

  handleMailingClick () {
    const { job } = this.state
    if (job) {
      location.href = '/job/mailinginfo?jobId=' + job.jobId
    }
  }

  renderJobTitle () {
    const { job } = this.state
    if (job) {
      return (
        <Panel className='block'>
          <MediaBox type='text'>
            <span className='wx-pull-right salary'>{job.salary}</span>
            <MediaBoxTitle className='job-title'>{job.title}</MediaBoxTitle>
            <MediaBoxDescription>
              {job.address}
              <span className='wx-pull-right'>
                {DateUtil.format(job.createTime, 'MM月dd日')}
              </span>
            </MediaBoxDescription>
          </MediaBox>
          <style global jsx>{`
            .salary {
              color: #f7abab;
              margin-top: 3px;
            }
          `}</style>
          <style global jsx>{`
            .block {
            }
            .job-title {
              font-size: 16px !important;
            }
          `}</style>
        </Panel>
      )
    }
  }

  renderCompanyTags () {
    const { job } = this.state
    if (job && job.tagList) {
      return job.tagList.map((item, index) => {
        return (
          <span key={index} className='tagName'>
            {item}
          </span>
        )
      })
    }
  }

  renderCompanyDetail () {
    const { job } = this.state
    if (job) {
      return (
        <Panel>
          <MediaBox type='appmsg' className='company-info'>
            <MediaBoxHeader>
              <img className='company-logo' src={job.companyLogo} />
            </MediaBoxHeader>
            <MediaBoxBody>
              <MediaBoxTitle className='company-name'>
                {job.companyName}
              </MediaBoxTitle>
              <MediaBoxTitle className='info'>
                {this.renderCompanyTags()}
              </MediaBoxTitle>
            </MediaBoxBody>
          </MediaBox>
          {job.companyComment && (
            <div className='comment'>
              <label className='comment-label'>小灶点评：</label>
              {job.companyComment}
            </div>
          )}
          <style jsx>{`
            .company-logo {
              width: 50px;
              height: 50px;
              border-radius: 8px;
              border: 1px solid #ddd;
            }
            .comment {
              padding: 0 15px;
              margin-bottom: 10px;
              color: #555;
            }
            .comment-icon {
              width: 20px;
              margin: 0 0 -3px 0;
            }
            .comment-label {
              color: #2196f3;
            }
          `}</style>
          <style global jsx>{`
            .company-info {
              align-items: normal !important;
            }
            .company-name {
              font-size: 16px !important;
              margin-bottom: 5px;
            }
            .info {
              font-size: 14px !important;
            }
            .tagName {
              background-color: #efefef;
              color: #666;
              margin-right: 5px;
              padding: 2px 4px;
            }
          `}</style>
        </Panel>
      )
    }
  }

  renderJobDetail () {
    const { job } = this.state
    if (job) {
      return (
        <Panel>
          <PanelHeader>
            <span className='job-detail-label'>职位描述</span>
          </PanelHeader>
          <PanelBody>
            <MediaBox type='text'>
              <div
                className='job-des'
                dangerouslySetInnerHTML={{ __html: job.des }}
              />
              <br />
              {job.endTime && (
                <p className='job-endtime'>
                  截止时间：{DateUtil.format(job.endTime, 'yyyy-MM-dd')}
                </p>
              )}
            </MediaBox>
          </PanelBody>
          <style jsx>{`
            .job-des {
              color: #555;
            }
            .job-detail-label {
              padding-left: 8px;
              border-left: solid #2196f3 5px;
              font-weight: bold;
            }
            .job-endtime {
              padding-top: 5px;
              border-top: 1px solid #ddd;
            }
          `}</style>
          <style global jsx>{``}</style>
        </Panel>
      )
    } else {
      return (
        <Panel>
          <PanelBody className='wx-text-center'>
            {this.state.dataState === 'loading' && (
              <LoadMore loading>Loading</LoadMore>
            )}
            {this.state.dataState === 'null' && (
              <LoadMore showLine>No Data</LoadMore>
            )}
          </PanelBody>
        </Panel>
      )
    }
  }

  renderMailingTabbar () {
    const { job } = this.state
    if (job) {
      const isOnlineApply = !ToolsUtil.strIsEmpty(job.mailingUrl)
      return (
        <div className='wx-bottom-fixed'>
          <Button
            className='wx-pull-left collection-btn'
            type='primary'
            plain
            onClick={e =>
              this.handleCollectionClick(e, job.jobId, job.collection)}
          >
            {job.collection ? '★' : '☆'}
          </Button>
          {isOnlineApply && (
            <a href={job.mailingUrl}>
              <Button
                className='wx-pull-right mailing-btn'
                onClick={e => this.handleMailingClick()}
              >
                网申地址
              </Button>
            </a>
          )}
          {!isOnlineApply &&
            job.status === 1 && (
              <Button
                className='wx-pull-right mailing-btn'
                onClick={e => this.handleMailingClick()}
              >
                立即投递
              </Button>
            )}
          {!isOnlineApply &&
            job.status === 2 && (
              <Button className='wx-pull-right mailing-btn' disabled>
                已投递
              </Button>
            )}
          {!isOnlineApply &&
            job.status > 2 && (
              <Button className='wx-pull-right mailing-btn' disabled>
                立即投递
              </Button>
            )}
          <style global jsx>{`
            .wx-bottom-fixed {
              border-top: 1px solid #ddd;
              height: 45px;
            }
          `}</style>
          <style global jsx>{`
            .collection-btn {
              width: 30% !important;
              border-width: 0 !important;
            }
            .mailing-btn {
              width: 70% !important;
              margin-top: 0 !important;
              border-width: 0 0 0 1px !important;
              border-color: #ddd !important;
              border-radius: 0 !important;
            }
          `}</style>
        </div>
      )
    }
  }

  render () {
    const leftbar = {
      href: '/job/internship',
      name: '返回'
    }
    const rightbar = {
      href: '/job/internship',
      name: '主页'
    }
    const { job } = this.state
    const isDown =
      job &&
      (job.status === 3 ||
        job.status === 4 ||
        job.status === 5 ||
        job.status === 6)
    return (
      <JobLayout toptips={this.state.toptips}>
        <Navbar fixed leftbar={leftbar} rightbar={rightbar} navtitle='职位详情' />
        <div style={{height: '46px'}} />
        {isDown && (
          <div className='job-expire wx-text-center' id='jobisDown'>
            提示：该职位信息已下线
          </div>
        )}
        <div className='job-detail'>
          {this.renderJobTitle()}
          {this.renderCompanyDetail()}
          {this.renderJobDetail()}
        </div>
        <br />
        <br />
        {this.renderMailingTabbar()}
        <Toast icon='success-no-circle' show={this.state.showToast}>
          {this.state.job && this.state.job.collection ? '收藏成功' : '取消收藏成功'}
        </Toast>
        <style global jsx>{`
          .job-expire {
            background-color: #f26a6a;
            color: #fff;
          }
          .job-detail {
          }
        `}</style>
      </JobLayout>
    )
  }
}
