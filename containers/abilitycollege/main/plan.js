import React from 'react'
import ThemeConfig from '../../../config/theme'

export default class extends React.Component {
  render () {
    return (
      <div className='plan'>
        <h1>各行业能力路径规划</h1>
        <div className='detail'>
          <div className='title'>前辈帮助规划你需要的能力提升路径</div>
          <div className='content'>
            <div className='link'>
              <a href='/abilitycollege/zixun'><img src='/static/img/abilitycollege/zixun.png' /></a>
              <a href='/abilitycollege/bigfour'><img src='/static/img/abilitycollege/sida.png' /></a>
            </div>
            <div className='feedback'>
              <p>更多行业的能力规划？</p>
              <p>敬请期待</p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .plan {
            margin-top: 2rem;
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
          .content .feedback {
            font-size: 1rem;
            text-align: center;
            color: ${ThemeConfig.color.content};
          }
        `}</style>
      </div>
    )
  }
}