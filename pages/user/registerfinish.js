import React from 'react'
import Layout from '../../components/layout'
import Logo from '../../containers/user/logo'
import { Button } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  componentDidMount = async () => { }

  render () {
    return (
      <Layout>
        <Logo />
        <div className='login-main'>
          <div className='login-title wx-text-center'>恭喜你，注册成功</div>
          <div className='form-group'>
              你可以直接通过微信登录，也可以使用你的手机和密码进行登录。同时登录小灶官网电脑端（www.xiaozao.org）制作简历、投递职位等。
          </div>
          <div>
            <Button className='btn-block' href='/'>返回首页</Button>
          </div>
        </div>
        <style jsx>{`
          .login-main {
            padding: 0 30px;
          }
          .login-title {
            position: relative;
            z-index: 1;
            line-height: 20px;
            margin-bottom: 15px;
            font-size: 18px;
          }
          .form-group {
            margin-bottom: 15px;
            color: #8A8A8A;
            font-size: 14px;
          }
        `}</style>
        <style global jsx>{`
        `}</style>
      </Layout>
    )
  }
}
