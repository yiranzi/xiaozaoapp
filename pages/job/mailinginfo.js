import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ToolsUtil from '../../util/tools'
import Navbar from '../../components/navbar'
import {Confirm} from '../../xz-components/confirm'
import { Alert } from '../../xz-components/alert'
import {
  Button,
  Panel,
  PanelHeader,
  PanelBody,
  CellHeader,
  Checkbox,
  Form,
  CellsTitle,
  FormCell,
  CellBody,
  CellFooter,
  CellsTips,
  TextArea,
  Input
} from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const _this = this
    this.state = {
      user: null,
      job: null,
      resumeList: null,
      mailingObj: {
        jobId: null,
        mailBody: null,
        resumeTypeDTOList: [],
        title: null,
        userPhone: null,
        userEmail: null
      },
      toptips: {
        type: null,
        show: false,
        msg: null,
        callback: function () {
          _this.state.toptips.show = false
        }
      },
      toastTimer: null,
      isRender: true,
      dataState: 'none' /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */,
      error: ''
    }
  }

  componentDidMount = async () => {
    this.state.mailingObj.jobId = ToolsUtil.getQueryString('jobId')
    this.loadUserData()
    this.loadUserMailInfo()
    this.loadJobData()
    this.loadResumeListData()
  };

  componentWillUnmount () {
    this.state.toastTimer && clearTimeout(this.state.toastTimer)
  }

  loadUserData = async () => {
    try {
      let user = await AxiosUtil.get('/api/user')
      this.state.mailingObj.userPhone = user.phone
      this.setState({
        user: user,
        mailingObj: this.state.mailingObj
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  };

  loadUserMailInfo = async () => {
    try {
      let mailInfo = await AxiosUtil.get('/api/private/mailing/userMailInfo')
      if (mailInfo) {
        this.state.mailingObj.mailBody = mailInfo.mailBody
        this.state.mailingObj.userPhone = mailInfo.phone
        this.state.mailingObj.userEmail = mailInfo.email
      }

      this.setState({
        mailingObj: this.state.mailingObj
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

  loadResumeListData = async () => {
    try {
      let resumeList = await AxiosUtil.get('/api/resume')
      this.setState({
        resumeList: resumeList
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  };

  /*
  * 提交投递信息
  * */
  mailing () {
    let {toptips} = this.state
    if (ToolsUtil.strIsEmpty(this.state.mailingObj.userPhone) ||
      !ToolsUtil.isPhone(this.state.mailingObj.userPhone)) {
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = '请输入正确的手机号'
    } else if (ToolsUtil.strIsEmpty(this.state.mailingObj.userEmail) ||
      !ToolsUtil.isMail(this.state.mailingObj.userEmail)) {
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = '请输入正确的邮箱'
    } else if (ToolsUtil.strIsEmpty(this.state.mailingObj.title)) {
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = '请输入邮件标题（长度不超过100个字）'
    } else if (this.state.mailingObj.title.length > 100) {
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = '邮件标题长度不能超过100个字'
    } else if (this.state.mailingObj.resumeTypeDTOList.length <= 0) {
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = '请选择简历'
    } else {
      const _this = this
      Confirm({
        title: '确认发送',
        content: '即将发送到HR邮箱，确认发送？',
        okText: '立即发送',
        cancelText: '再检查下',
        ok: () => _this.doMailing()
      })
    }
    this.setState({
      toptips: toptips
    })
  };

  doMailing = async () => {
    try {
      await AxiosUtil.post('/api/mailing/sendResume', this.state.mailingObj)
      Alert({
        title: '提示',
        content: '投递成功，返回列表继续浏览其他职位',
        okText: '确定',
        ok: () => {
          location.href = '/job/internship'
        }
      })
    } catch (e) {
      Alert({
        title: '错误',
        content: e.message,
        okText: '确定'
      })
    }
  }

  changeHandle (e, field) {
    this.state.mailingObj[field] = e.target.value
    this.setState({
      mailingObj: this.state.mailingObj
    })
  }

  checkboxChangeHandle (e, id, fromType) {
    if (e.target.checked) {
      this.state.mailingObj.resumeTypeDTOList.push({
        fromType: fromType,
        id: id
      })
    } else {
      this.state.mailingObj.resumeTypeDTOList.map((item, index) => {
        if (item != null && item.id === id) {
          this.state.mailingObj.resumeTypeDTOList.splice(index, 1)
        }
      })
    }
    this.setState({
      mailingObj: this.state.mailingObj
    })
  }

  renderHeadInfo () {
    const { user, job } = this.state
    if (!user || !job) {
      return <div />
    }
    return (
      <div className='wx-clearfix headinfo'>
        <img className='headimg wx-pull-left' src={user.headimgurl} />
        <p className='nickname'>{user.nickname}<br />
        投递的职位：{job.title}</p>
        <style jsx>{`
          .headinfo {
            background-color: #3E84E0;
            color: #fff;
            margin: -15px -15px -10px -15px;
            padding: 15px;
          }
          .headimg {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
          .nickname {
            font-size: 14px !important;
            margin-left: 55px;
          }
        `}</style>
      </div>
    )
  }

  renderMailContactInfo () {
    const { job } = this.state
    if (job) {
      return (
        <div>
          <Form>
            <CellsTitle>联系方式<span className='red'>*</span>：</CellsTitle>
            <FormCell>
              <CellHeader>
                <img className='contact-img'
                  src='https://www.xiaozao.org/upload/comp/phone.png' />
              </CellHeader>
              <CellBody>
                <Input
                  className='input-text'
                  type='text'
                  placeholder='请输入手机号'
                  onChange={e => this.changeHandle(e, 'userPhone')}
                  value={this.state.mailingObj.userPhone !== null
                    ? this.state.mailingObj.userPhone : ''}
                />
              </CellBody>
            </FormCell>
            <FormCell>
              <CellHeader>
                <img className='contact-img'
                  src='https://www.xiaozao.org/upload/comp/mail.png' />
              </CellHeader>
              <CellBody>
                <Input
                  className='input-text'
                  type='text'
                  placeholder='请输入你的邮箱，用于接收投递反馈'
                  onChange={e => this.changeHandle(e, 'userEmail')}
                  value={this.state.mailingObj.userEmail !== null
                    ? this.state.mailingObj.userEmail : ''}
                />
              </CellBody>
            </FormCell>
          </Form>
          <style global jsx>{`
            .input-text {
              font-size: 14px !important;
            }
            .contact-img {
              margin-right: 10px;
            }
          `}</style>
        </div>
      )
    }
  }

  renderMailTitleInfo () {
    const { job } = this.state
    if (job) {
      return (
        <div>
          <Form>
            <CellsTitle>邮件标题<span className='red'>*</span>：</CellsTitle>
            <FormCell>
              <CellBody>
                <Input
                  className='input-text'
                  type='text'
                  placeholder='邮箱标题要有规范哦'
                  onChange={e => this.changeHandle(e, 'title')}
                />
              </CellBody>
            </FormCell>
            <CellsTips>该职位HR要求邮件标题格式为：{job.demand}</CellsTips>
          </Form>
          <style global jsx>{`
            .input-text {
              font-size: 14px !important;
            }
            .red {
              color: red;
              vertical-align: sub;
              margin-left: 3px;
            }
          `}</style>
        </div>
      )
    }
  }

  renderMailBodyInfo () {
    const { job } = this.state
    if (job) {
      return (
        <div>
          <Form>
            <CellsTitle>
              求职信（选填）：<a className='wx-pull-right small-font'
                href='https://shimo.im/doc/BDtNgrI5SWwpnsyc/' >
              如何写好一份求职信?
              </a>
            </CellsTitle>
            <FormCell>
              <CellBody>
                <TextArea
                  className='input-textarea'
                  rows='3'
                  placeholder='求职信可明确告诉HR你【最快上岗时间】和【实习时间长度】，并对自己在能力、经验、兴趣等匹配度进行简要说明。'
                  onChange={e => this.changeHandle(e, 'mailBody')}
                  value={this.state.mailingObj.mailBody !== null
                    ? this.state.mailingObj.mailBody : ''}
                />
              </CellBody>
            </FormCell>
          </Form>
          <style jsx>{`
            .small-font {
              font-size: 12px;
            }
          `}</style>
          <style global jsx>{`
            .input-textarea {
              font-size: 14px !important;
            }
          `}</style>
        </div>
      )
    }
  }

  renderResumeList () {
    const { resumeList } = this.state
    if (resumeList) {
      const listElement = resumeList.map((item, index) => {
        return (
          <FormCell checkbox key={index}>
            <CellHeader>
              <Checkbox
                name={item.name}
                value={item.id}
                onChange={e =>
                  this.checkboxChangeHandle(e, item.id, item.fromType)}
              />
            </CellHeader>
            <CellBody className='resume-name'>{item.name}</CellBody>
            <CellFooter>
              <span className='from-type-badge'>
                {item.fromType === 1
                  ? '中文'
                  : item.fromType === 2 ? '英文' : '用户上传'}
              </span>
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
        )
      })
      return (
        <Form checkbox>
          <CellsTitle>选择你的简历<span className='red'>*</span>：</CellsTitle>
          {listElement}
          {listElement.length === 0 && (
            <FormCell style={{ fontSize: '14px', color: '#555' }}>
              请电脑端登录（www.xiaozao.org）上传你的简历。上传后即可每天在移动端快捷投递！
            </FormCell>
          )}
        </Form>
      )
    }
  }

  render () {
    const { job } = this.state
    const leftbar = {
      onclick: history.go(-1),
      name: '返回'
    }
    const rightbar = {
      href: '/job/internship',
      name: '主页'
    }
    return (
      <JobLayout toptips={this.state.toptips}>
        <Navbar fixed leftbar={leftbar} rightbar={rightbar} navtitle='职位投递' />
        <div className='job-list wx-navbar-margin'>
          <Panel className='job-panel'>
            <PanelHeader className='head-info'>
              {this.renderHeadInfo()}
            </PanelHeader>
            <PanelBody>
              {this.renderMailContactInfo()}
              {this.renderMailTitleInfo()}
              {this.renderResumeList()}
              {this.renderMailBodyInfo()}
              <div className='button-sp-area'>
                {job && <Button onClick={(e) => this.mailing()}>立即投递</Button>}
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
            content: "";
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
