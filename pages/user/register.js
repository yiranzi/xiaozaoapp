import React from 'react'
import AxiosUtil from '../../util/axios'
import Layout from '../../components/layout'
import ThemeConfig from '../../config/theme'
import ToolsUtil from '../../util/tools'
import Logo from '../../containers/user/logo'
import { Button, Panel, PanelHeader, PanelBody, CellHeader,
  Form, CellsTitle, FormCell, CellBody, CellFooter, ButtonArea,
  Select, Input, Label, Agreement } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      regionList: null,
      user: null,
      job: null,
      resumeList: null,
      params: {
        phone: null,
        regionCodeIndex: 37,
        validateCode: null,
        password: null,
        agreement: true
      },
      waiting: false,
      waitingCount: 60,
      waitingIntervalId: null,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => {
    this.loadAllCountRegion()
  }

  waitingSend () {
    this.state.waiting = !this.state.waiting
    if (this.state.waiting) {
      const _this = this
      this.state.waitingIntervalId = setInterval(function () {
        _this.state.waitingCount = _this.state.waitingCount - 1
        if (_this.state.waitingCount === 0) {
          clearInterval(_this.state.waitingIntervalId)
          _this.state.waitingCount = 60
          _this.state.waiting = !_this.state.waiting
        }
        _this.setState({})
      }, 1000)
    }
  }

  loadAllCountRegion = async () => {
    try {
      let regionList = await AxiosUtil.get('/api/user/getAllCountryRegion')
      this.setState({
        regionList: regionList
      })
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  validateData (type) {
    if (ToolsUtil.strIsEmpty(this.state.params.phone)) {
      alert('手机号不能为空')
      return false
    }
    if (!ToolsUtil.isPhone(this.state.params.phone)) {
      alert('请输入正确的手机号')
      return false
    }
    if (type === 'validateCode') {
      return true
    }
    if (ToolsUtil.strIsEmpty(this.state.params.validateCode)) {
      alert('验证码不能为空')
      return false
    }
    if (ToolsUtil.strIsEmpty(this.state.params.password)) {
      alert('密码不能为空')
      return false
    }
    if (this.state.params.password.trim().length < 6 || this.state.params.password.trim().length > 16) {
      alert('密码长度为6-16位')
      return false
    }
    if (!this.state.params.agreement) {
      alert('必须同意小灶教育用户注册协议')
      return false
    }
    return true
  }

  genRegisterValidateCode = async () => {
    try {
      if (!this.validateData('validateCode')) {
        return
      }
      this.waitingSend()
      let ret = await AxiosUtil.get(`/api/user/registerValidateCode?phone=${this.state.params.phone}&regionCodeIndex=${this.state.params.regionCodeIndex}`)
      console.log(ret)
      alert('验证码已发出')
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
    }
  }

  registerAndBind = async () => {
    try {
      if (!this.validateData()) {
        return
      }
      console.log(this.state.params)
      let ret = await AxiosUtil.get(`/api/user/registerAndBind?phone=${this.state.params.phone}&regionCodeIndex=${this.state.params.regionCodeIndex}&validateCode=${this.state.params.validateCode}&password=${this.state.params.password}`)
      alert('注册绑定成功')
      setTimeout(() => {
        location.href = '/user/registerfinish'
      }, 2000)
    } catch (e) {
      this.setState({
        isRender: false,
        error: e.message
      })
      alert(e.message)
    }
  }

  changeHandle (e, field) {
    console.log(e.target.value)
    this.state.params[field] = e.target.value
    this.setState({
      params: this.state.params
    })
  }

  changeAgreement () {
    this.state.params.agreement = !this.state.params.agreement
    this.setState({
      params: this.state.params
    })
  }

  renderFormInfo () {
    let regionElements = ''
    if (this.state.regionList) {
      regionElements = this.state.regionList.map((item, index) => {
        return <option value={item.keyIndex} key={index}>
          {item.country + '' + item.region}</option>
      })
    }
    return <div>
      <Form>
        <CellsTitle>欢迎加入</CellsTitle>
        <FormCell select selectPos='before'>
          <CellHeader>
            <Select onChange={e => this.changeHandle(e, 'regionCodeIndex')}>
              {regionElements}
            </Select>
          </CellHeader>
          <CellBody>
            <Input type='tel' placeholder='请输入你的手机号'
              onChange={e => this.changeHandle(e, 'phone')} />
          </CellBody>
        </FormCell>
        <FormCell vcode>
          <CellHeader>
            <Label>验证码</Label>
          </CellHeader>
          <CellBody>
            <Input type='tel' placeholder='请输入验证码'
              onChange={e => this.changeHandle(e, 'validateCode')} />
          </CellBody>
          <CellFooter>
            {this.state.waiting &&
              <Button type='vcode'>{this.state.waitingCount}秒后可重发</Button>
            }
            {!this.state.waiting &&
              <Button type='vcode'
                onClick={e => this.genRegisterValidateCode(e)}>获取验证码</Button>
            }
          </CellFooter>
        </FormCell>
        <FormCell>
          <CellHeader>
            <Label>设置密码</Label>
          </CellHeader>
          <CellBody>
            <Input type='password' placeholder='请输入你的密码（6-16位）'
              onChange={e => this.changeHandle(e, 'password')} />
          </CellBody>
        </FormCell>
        <ButtonArea>
          <Button onClick={e => this.registerAndBind(e)}>注册</Button>
        </ButtonArea>
      </Form>
      <style jsx>{`
      `}</style>
      <style global jsx>{`
        input, .weui-label, .weui-vcode-btn {
          font-size: 14px !important;
        }
      `}</style>
    </div>
  }

  renderTips () {
    return <div>
      <Agreement onClick={e => this.changeAgreement()} defaultChecked>
        &nbsp;&nbsp;注册即代表你同意 <a href='javascript:;'>《小灶教育用户注册协议》</a>
      </Agreement>
      <p className='tips'>收不到验证码？请尝试删掉号码中第一个0，例如：某韩国手机号码01097284660，删掉第一个0后，即填入1097284660，就能够收到验证码。（区号在列表中选择，无需写在号码中）如果验证码收不到，请添加小助手帮助解决（微信：xiaozaoPM）</p>
      <style jsx>{`
        .tips {
          font-size: 12px;
          padding: 5px 15px;
          color: #555;
        }
      `}</style>
    </div>
  }

  render () {
    return (
      <Layout>
        <div className='job-list'>
          <Panel className='job-panel'>
            <PanelHeader className='head-info'>
              <Logo />
            </PanelHeader>
            <PanelBody>
              {this.renderFormInfo()}
              {this.renderTips()}
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
      </Layout>
    )
  }
}
