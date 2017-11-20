import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='study'>
        <h1>采用高效的学习模式</h1>
        <div className='detail'>
          <div className='content'>
            <div className='title'>
              小灶能力学院将会在新技术驱动下，不断迭代已有的系统学、打卡学的使用体验和学习效果，
              也将探索更高效的学习模式，确保同学们能够最大化地吸收知识，掌握技能。
            </div>
            <br />
            <div className='title'>
              目前，小灶能力学院主要有系统学（重规划、重输出）和 打卡学（有监督、重积累） 两类学习模式。
            </div>
            <br />
            <a className='know' href=''>>>　点击了解系统学、打卡学</a>
          </div>
        </div>
        <style jsx>{`
          .study {
            margin-top: 3rem;
          }
          .detail {
            padding: 1rem;
          }
          .title {
            font-size: 1rem;
          }
          a.know,
          a.know:hover,
          a.know:active,
          a.know:visited,
          a.know:focus {
            color: red;
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
}