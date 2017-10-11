import React from 'react'
import {LoadMore} from 'react-weui'

export default class Loading extends React.Component {
  render () {
    return (
      <div className='loading-page' >
        <LoadMore loading />
        <style global jsx >{`
          .loading-page {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0, 0.5);
            opacity: 0.5;
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading-page .weui-loadmore .weui-loading {
            width: 3rem;
            height: 3rem;
          }
        `}</style >
      </div >
    )
  }
}
