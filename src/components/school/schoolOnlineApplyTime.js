import React from 'react';

export default class schoolOnlineApplyTime extends React.Component {
  render () {
    return (
      <div>
        <div className='school__online_time'>
          {this.props.time ? <div> {this.props.time}，点击官网链接查看详情</div> : <div>已经开启校招，点击官网链接查看详情</div>}
          <div className='school__online_address my-text-rowsingle'><a href={this.props.address}>{this.props.address}</a></div>

        </div>
        <style jsx>{`
          .school__online_time {
            color:#787886;
            text-align:center;
            border-top:1px solid #E6E6E6;
            padding:30px 0;
            background-color:#efefef;
          }
          .school__online_time a {
            color:#787886;
          }
          .school__online_address {
            width:300px;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}
