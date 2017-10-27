import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import { Button, Panel, PanelHeader, PanelBody, CellHeader, Checkbox,
  Form, CellsTitle, FormCell, CellBody, CellFooter, CellsTips,
  TextArea, Input } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      job: null,
      resumeList: null,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => {
    this.loadUserData()
    this.loadJobData()
    this.loadResumeListData()
  }

  loadUserData = async () => {
    try {
      let user = await AxiosUtil.get('/api/user')
      console.log(user)

      this.setState({
        user: user
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  loadJobData = async () => {
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

  loadResumeListData = async () => {
    try {
      let resumeList = await AxiosUtil.get('/api/resume')
      console.log(resumeList)

      this.setState({
        resumeList: resumeList
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderHeadInfo () {
    const {user, job} = this.state
    if (!user || !job) {
      return <div />
    }
    return <div className='wx-text-center'>
      <img className='headimg' src={user.headimgurl} />
      <p className='nickname'>{user.nickname}</p>
      <p className='job-title'>投递的职位：{job.title}</p>
      <style jsx>{`
        .headimg {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        .nickname, .job-title {
          font-size: 14px !important;
        }
      `}</style>
    </div>
  }

  renderMailingInfo () {
    const {job} = this.state
    if (job) {
      return <div>
        <Form>
          <CellsTitle>邮件标题：</CellsTitle>
          <FormCell>
            <CellBody>
              <Input className='input-text' type='text' placeholder='' />
            </CellBody>
          </FormCell>
          <CellsTips>该职位HR要求邮件标题格式为：{job.demand}</CellsTips>
        </Form>
        <Form>
          <CellsTitle>邮件正文：<a className='wx-pull-right small-font'
            href='https://shimo.im/doc/BDtNgrI5SWwpnsyc/'>如何写好一份求职信?</a></CellsTitle>
          <FormCell>
            <CellBody>
              <TextArea className='input-textarea'
                placeholder='求职信可以撰写自我介绍、对该公司和岗位的认识、自己的能力和优势等。' rows='3' />
            </CellBody>
          </FormCell>
          <CellsTips>选填，填写高质量求职信可大大提升求职成功率</CellsTips>
        </Form>
        <style jsx>{`
          .small-font {
            font-size: 12px;
          }
        `}</style>
        <style global jsx>{`
          .input-text, .input-textarea {
            font-size: 14px !important;
          }
        `}</style>
      </div>
    }
  }

  renderResumeList () {
    const {resumeList} = this.state
    if (resumeList) {
      const listElement = resumeList.map((item, index) => {
        return <FormCell checkbox key={index}>
          <CellHeader>
            <Checkbox name={item.name} value={item.id} />
          </CellHeader>
          <CellBody className='resume-name'>{item.name}</CellBody>
          <CellFooter>
            <span className='from-type-badge'>
              {item.fromType === 1 ? '中文' : item.fromType === 2 ? '英文' : '用户上传'}</span>
          </CellFooter>
          <style global jsx>{`
            .resume-name {
              font-size: 14px;
            }
            .from-type-badge {
              background-color: #efefef;
              color: #666;
              margin-right: 5px;
              padding: 2px 4px;
              font-size: 14px;
            }
          `}</style>
        </FormCell>
      })
      return <Form checkbox>
        <CellsTitle>选择你的简历：</CellsTitle>
        {listElement}
      </Form>
    }
  }

  render () {
    const {job} = this.state
    return (
      <JobLayout>
        <div className='job-list'>
          <Panel className='job-panel'>
            <PanelHeader className='head-info'>
              {this.renderHeadInfo()}
            </PanelHeader>
            <PanelBody>
              {this.renderMailingInfo()}
              {this.renderResumeList()}
              <div className='button-sp-area'>
                {job && <Button>立即投递</Button>}
              </div>
            </PanelBody>
          </Panel>
        </div>
        <style jsx>{`
          .job-list {

          }
          .button-sp-area {
            margin: 0 auto;
            padding: 15px 0;
            width: 60%;
          }
        `}</style>
        <style global jsx>{`
          .job-panel {
            background-color: #f8f8f8 !important;
          }
          .head-info {
            background-color: #fff;
          }
          .head-info:after {
            left: 0 !important;
          }
          .weui-cells__title {
            /*padding-left: 25px !important;*/
          }
          .weui-cells__title:before {
            content: '';
            position: absolute;
            left: 15px;
            width: 0px;
            height: 20px;
            background-color: #337ab7;
          }
          .weui-cells__tips {
            font-size: 12px !important;
          }
        `}</style>
      </JobLayout>
    )
  }
}
