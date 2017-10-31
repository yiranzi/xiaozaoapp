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
      user: null,
      job: null,
      resumeList: null,
      isRender: true,
      dataState: 'none', /* none 未加载，loading 正在加载，null 没有数据，more 继续加载 */
      error: ''
    }
  }

  componentDidMount = async () => { }

  renderFormInfo () {
    return <div>
      <Form>
        <CellsTitle>欢迎加入</CellsTitle>
        <FormCell select selectPos='before'>
          <CellHeader>
            <Select>
              <option value='1'>+86</option>
              <option value='2'>+80</option>
              <option value='3'>+84</option>
              <option value='4'>+87</option>
            </Select>
          </CellHeader>
          <CellBody>
            <Input type='tel' placeholder='请输入你的手机号' />
          </CellBody>
        </FormCell>
        <FormCell vcode>
          <CellHeader>
            <Label>验证码</Label>
          </CellHeader>
          <CellBody>
            <Input type='tel' placeholder='请输入验证码' />
          </CellBody>
          <CellFooter>
            <Button type='vcode'>获取验证码</Button>
          </CellFooter>
        </FormCell>
        <FormCell>
          <CellHeader>
            <Label>设置密码</Label>
          </CellHeader>
          <CellBody>
            <Input type='tel' placeholder='请输入你的密码（6-16位）' />
          </CellBody>
        </FormCell>
        <ButtonArea>
          <Button>注册</Button>
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
      <Agreement>
        &nbsp;&nbsp;注册即代表你同意 <a href='javascript:;'>《小灶教育用户注册协议》</a>
      </Agreement>
      <p className='tips'>收不到验证码？请尝试删掉号码中第一个0，例如：某韩国手机号码01097284660，删掉第一个0后，即填入1097284660，就能够收到验证码。（区号在列表中选择，无需写在号码中）如果验证码收不到，请添加小助手帮助解决（微信：xiaozaoPM）</p>
      <p className='tips'><a href='/auth/logout'>已经注册手机号，重新登录</a></p>
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
