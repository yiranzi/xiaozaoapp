import React from 'react'
import TimeDown from '../../xz-components/timedown'
/**
 * 渲染团购的卡片
 */
export default class extends React.Component {
  render () {
    let {groupInfo, button} = this.props
    let {headimgurl, leftHour, leftMinute, nickname} = groupInfo
    let content
    if (groupInfo.status === 1) {
      content = '已成团'
    } else {
      let style = {
        backgroundColor: '#f0f2f6',
        borderRadius: '20px',
        padding: '0px 0px 0px 10px',
        display: 'inline-block',
        color: 'red',
        minWidth: '75px'
      }
      content = <div>
        剩余
        <div style={style}>
          <TimeDown limitTime={leftMinute} randomSecond={parseInt(10 * Math.random())}>
            {`${leftHour} : `}
          </TimeDown>
        </div>
        还差<strong style={{color: 'red'}}>1</strong>人
      </div>
    }
    return (<div className='group-card'>
      <div className='head-list'>
        {headimgurl.map((ele, index) => {
          return (<div key={index} >
            <img src={ele} />
          </div>)
        })}
      </div>
      <div className='content'>
        <p>{nickname}的拼团</p>
        <p>{content}</p>
      </div>
      <div className='empty'></div>
      <div className='button'>
        {button}
      </div>
      <style jsx>{`
        .group-card {
          display: flex;
          font-size: 12px;
          align-items: center;
          margin: 5px 0px;
          height: 50px;
        }
        .head-list {
          text-align: center;
          display: flex;
          justify-content: center;
          flex: none;
          width: 40px;
          margin-right: 16px;
        }
        .head-list div {
          position: relative;
          z-index: 10;
          width: 100%;
          flex: none;
          text-align:center;
        }
        .head-list img {
          width: 100%;
          border-radius: 50%;
        }
        .head-list div+div {
          z-index: 15;
          margin-left: -25px;
        }
        .content {
          text-align: left;
          min-width: 150px;
          flex: none;
        }
        .button {
          flex: auto;
          max-width: 160px;
          text-align:right;
        }
        .empty {
          flex: auto;
        }
      `}</style>
    </div>)
  }
}
