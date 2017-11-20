import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='plan'>
        <h1>各行业能力路径规划</h1>
        <div className='detail'>
          <div className='title'>前辈帮助规划你需要的能力提升路径</div>
          <div className='content'>
            <div className='link'>
              <a href=''><img src='/static/img/abilitycollege/zixun.png' /></a>
              <a href=''><img src='/static/img/abilitycollege/internet.png' /></a>
            </div>
            <a className='feedback' href=''>
              <p>想了解更多行业的能力规划？</p>
              <p>填写反馈</p>
            </a>
          </div>
        </div>
        <style jsx>{`
          .plan {
            margin-top: 3rem;
          }
          .title {
            font-size: 1rem;
            margin-left: 1.5rem;
          }
          .content {
            padding: 1rem;
          }
          .content .link a {
            width: 50%;
            display: inline-block;
          }
          .content .link a img {
            width: 100%;
          }
          .content a.feedback,
          .content a.feedback:active,
          .content a.feedback:hover,
          .content a.feedback:visited,
          .content a.feedback:focus {
            text-align: center;
            color: #2f3138;
          }
        `}</style>
      </div>
    )
  }
}