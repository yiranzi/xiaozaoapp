import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import Navbar from '../../containers/job/navbar'
import DateUtil from '../../util/date'
import { MediaBox, MediaBoxHeader, MediaBoxTitle,
  MediaBoxBody, MediaBoxDescription} from 'react-weui'

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
      let job = await AxiosUtil({
        method: 'get',
        url: `/api/private/job/${jobId}`
      })

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

  handleSearchBarChange (e) {
    console.log(e)
    location.href = '/job/search'
    e.stopPropagation()
    return false
  }

  handleCollectionChange (e, id) {
    console.log(e)
    console.log(id)
    e.stopPropagation()
    return false
  }

  renderJobTitle () {
    const {job} = this.state
    if (job) {
      return <div className='block'>
        <MediaBox type='text'>
          <MediaBoxTitle className='job-title'>{job.title}</MediaBoxTitle>
          <MediaBoxDescription>{job.address}
            <span className='wx-pull-right'>
              {DateUtil.format(job.createTime, 'MM月dd日')}</span>
          </MediaBoxDescription>
        </MediaBox>
        <style global jsx>{`
          .block {
            border-bottom: 1px dashed #efefef;
          }
          .job-title {
            font-size: 16px !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }
        `}</style>
      </div>
    }
  }

  renderCompanyTags () {
    const {job} = this.state
    if (job && job.tagList) {
      return job.tagList.map((item, index) => {
        return <span key={index} className='tagName'>{item}</span>
      })
    } else {
      return <div />
    }
  }

  renderJobDetail () {
    const {job} = this.state
    if (job) {
      return <div>
        <MediaBox type='appmsg'>
          <MediaBoxHeader>
            <img className='company-logo' src={job.companyLogo} /></MediaBoxHeader>
          <MediaBoxBody>
            <MediaBoxTitle className='info'>{job.companyName}</MediaBoxTitle>
            <MediaBoxTitle className='info'>
              {this.renderCompanyTags()}
            </MediaBoxTitle>
          </MediaBoxBody>
        </MediaBox>
        <div className='comment'>小灶点评：{job.companyComment}</div>
        <style jsx>{`
          .company-logo {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            border: 1px solid #ddd;
          }
          .comment,
          .tags {
            padding: 0 15px;
            margin-bottom: 5px;
          }
          .comment-icon {
            width: 20px;
            margin: 0 0 -3px 0;
          }
        `}</style>
        <style global jsx>{`
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
      </div>
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
    return (
      <JobLayout tabbar>
        <Navbar leftbar={leftbar} rightbar={rightbar} navtitle='职位详情' />
        <div className='job-detail'>
          {this.renderJobTitle()}
          {this.renderJobDetail()}
        </div>
        <style global jsx>{`
          .job-detail {

          }
        `}</style>
      </JobLayout>
    )
  }
}
