import React from 'react';
import {LoadMore} from 'react-weui';

export default class Loading extends React.Component {
  render () {
    return (
      <div className='loading-page' >
        <LoadMore loading={this.props.loading} />
        <style global jsx >{`
          .loading-page .weui-loadmore {
            width: auto;
            margin: auto;
            position: fixed;
            width: 100%;
            left: 0;
            top: 50%;
            transform: translateY(-3rem);
          }
          .loading-page .weui-loadmore .weui-loading {
            width: 3rem;
            height: 3rem;
          }
        `}</style >
      </div >
    );
  }
}
