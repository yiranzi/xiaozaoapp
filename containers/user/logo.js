import React from 'react'

export default class extends React.Component {
  render () {
    return <div className='wx-text-center login-logo'>
      <a href='/'><img className='logo' src='/static/img/common/login_logo.png' />
        <img className='company-name' src='/static/img/common/login_text.png' /></a>
      <style jsx>{`
        .login-logo {
          padding: 30px 0;
        }
        .logo {
          width: 50px;
          height: 50px;
        }
        .company-name {
          width: 100px;
          height: 50px;
        }
      `}</style>
    </div>
  }
}
