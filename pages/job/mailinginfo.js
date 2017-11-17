import React from 'react'
import AxiosUtil from '../../util/axios'
import JobLayout from '../../containers/job/layout'
import ToolsUtil from '../../util/tools'
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
  Input,
  Toast
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
        title: null
      },
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
    this.state.mailingObj.jobId = ToolsUtil.getQueryString('jobId')
    this.loadUserData()
    this.loadJobData()
    this.loadResumeListData()
  };

  componentWillUnmount () {
    this.state.toastTimer && clearTimeout(this.state.toastTimer)
  }

  loadUserData = async () => {
    try {
      let user = await AxiosUtil.get('/api/user')
      this.setState({
        user: user
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  };

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
  mailing = async () => {
    let toptips = this.state.toptips
    try {
      if (ToolsUtil.strIsEmpty(this.state.mailingObj.title)) {
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
        await AxiosUtil.post('/api/mailing/sendResume', this.state.mailingObj
        )
        this.setState({ showToast: true })
        this.state.toastTimer = setTimeout(() => {
          location.href = '/job/detail?jobId=' + this.state.mailingObj.jobId
        }, 2000)
      }
    } catch (e) {
      toptips.type = 'warn'
      toptips.show = true
      toptips.msg = e.message
    }
    this.setState({
      toptips: toptips
    })
  };

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
      <div className='wx-text-center'>
        <img className='headimg' src={user.headimgurl} />
        <p className='nickname'>{user.nickname}</p>
        <p className='job-title'>投递的职位：{job.title}</p>
        <style jsx>{`
          .headimg {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
          .nickname,
          .job-title {
            font-size: 14px !important;
          }
        `}</style>
      </div>
    )
  }

  renderMailingInfo () {
    const { job } = this.state
    if (job) {
      return (
        <div>
          <Form>
            <CellsTitle>邮件标题：</CellsTitle>
            <FormCell>
              <CellBody>
                <Input
                  className='input-text'
                  type='text'
                  placeholder=''
                  onChange={e => this.changeHandle(e, 'title')}
                />
              </CellBody>
            </FormCell>
            <CellsTips>该职位HR要求邮件标题格式为：{job.demand}</CellsTips>
          </Form>
          <Form>
            <CellsTitle>
              邮件正文：<a
                className='wx-pull-right small-font'
                href='https://shimo.im/doc/BDtNgrI5SWwpnsyc/'
              >
                如何写好一份求职信?
              </a>
            </CellsTitle>
            <FormCell>
              <CellBody>
                <TextArea
                  className='input-textarea'
                  rows='3'
                  placeholder='求职信可以撰写自我介绍、对该公司和岗位的认识、自己的能力和优势等。'
                  onChange={e => this.changeHandle(e, 'mailBody')}
                />
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
            .input-text,
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
          <CellsTitle>选择你的简历：</CellsTitle>
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
    return (
      <JobLayout toptips={this.state.toptips}>
        <div className='job-list'>
          <Panel className='job-panel'>
            <PanelHeader className='head-info'>
              {this.renderHeadInfo()}
            </PanelHeader>
            <PanelBody>
              {this.renderMailingInfo()}
              {this.renderResumeList()}
              <div className='button-sp-area'>
                {job && <Button onClick={this.mailing}>立即投递</Button>}
              </div>
            </PanelBody>
          </Panel>
          <Toast icon='success-no-circle' show={this.state.showToast}>
            投递成功
          </Toast>
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
