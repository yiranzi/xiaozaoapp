import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import Navbar from '../../containers/job/navbar'
import DateUtil from '../../util/date'
import { Panel, PanelHeader, PanelBody, MediaBox, MediaBoxHeader, MediaBoxTitle,
  MediaBoxBody, MediaBoxDescription, Button, LoadMore} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      job: null,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => {
    this.setState({dataState: 'loading'})
    const jobId = ToolsUtil.getQueryString('jobId')
    try {
      let job = await AxiosUtil.get(`/api/private/job/${jobId}`)
      console.log(job)

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
  }

  handleCollectionClick () {

  }

  handleMailingClick () {
    const {job} = this.state
    if (job) {
      location.href = '/job/mailinginfo?jobId=' + job.jobId
    }
  }

  renderJobTitle () {
    const {job} = this.state
    if (job) {
      return <Panel className='block'>
        <MediaBox type='text'>
          <span className='wx-pull-right salary'>{job.salary}</span>
          <MediaBoxTitle className='job-title'>{job.title}</MediaBoxTitle>
          <MediaBoxDescription>{job.address}
            <span className='wx-pull-right'>
              {DateUtil.format(job.createTime, 'MM月dd日')}</span>
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
    }
  }

  renderCompanyTags () {
    const {job} = this.state
    if (job && job.tagList) {
      return job.tagList.map((item, index) => {
        return <span key={index} className='tagName'>{item}</span>
      })
    }
  }

  renderCompanyDetail () {
    const {job} = this.state
    if (job) {
      return <Panel>
        <MediaBox type='appmsg' className='company-info'>
          <MediaBoxHeader>
            <img className='company-logo' src={job.companyLogo} /></MediaBoxHeader>
          <MediaBoxBody>
            <MediaBoxTitle className='company-name'>{job.companyName}</MediaBoxTitle>
            <MediaBoxTitle className='info'>
              {this.renderCompanyTags()}
            </MediaBoxTitle>
          </MediaBoxBody>
        </MediaBox>
        {job.companyComment &&
          <div className='comment'>
            <label className='comment-label'>小灶点评：</label>{job.companyComment}
          </div>
        }
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
    }
  }

  renderJobDetail () {
    const {job} = this.state
    if (job) {
      return <Panel>
        <PanelHeader>
          <span className='job-detail-label'>职位描述</span>
        </PanelHeader>
        <PanelBody>
          <MediaBox type='text'>
            <div className='job-des' dangerouslySetInnerHTML={{__html: job.des}} />
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
        `}</style>
        <style global jsx>{`

        `}</style>
      </Panel>
    } else {
      return <Panel>
        <PanelBody className='wx-text-center'>
          {this.state.dataState === 'loading' && <LoadMore loading>Loading</LoadMore>}
          {this.state.dataState === 'null' && <LoadMore showLine>No Data</LoadMore>}
        </PanelBody>
      </Panel>
    }
  }

  renderMailingTabbar () {
    return <div className='wx-bottom-fixed'>
      <Button className='wx-pull-left collection-btn' type='primary' plain
        onClick={e => this.handleCollectionClick()}>★☆</Button>
      <Button className='wx-pull-right mailing-btn'
        onClick={e => this.handleMailingClick()}>立即投递</Button>
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
          border-width:0 0 0 1px !important;
          border-color: #ddd !important;
          border-radius: 0 !important;
        }
      `}</style>
    </div>
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
    return (
      <JobLayout>
        <Navbar fixed leftbar={leftbar} rightbar={rightbar} navtitle='职位详情' />
        <br /><br />
        <div className='job-detail'>
          {this.renderJobTitle()}
          {this.renderCompanyDetail()}
          {this.renderJobDetail()}
        </div>
        <br /><br />
        {this.renderMailingTabbar()}
        <style global jsx>{`
          .job-detail {

          }
        `}</style>
      </JobLayout>
    )
  }
}
