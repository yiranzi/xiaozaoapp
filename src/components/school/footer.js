import React from 'react';
import classNames from 'classnames';

export default class Footer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDialog: false
    };
  }

  hideDialog () {
    this.setState({
      showDialog: false
    });
  }

  render () {
    let {fromType} = this.props;
    return (
      <div className='footer'>
        <div className='footer-nav'>
          <a href='/school/kpmg/schoolprocess' className={classNames('a__bg', {'isActive': fromType === 'kpmg'})}>毕马威</a>
          <a href='/school/anyong/schoolprocess'
            className={classNames('a__bg', {'isActive': fromType === 'anyong'})}>安永</a>
          <a href='/school/pwccn/schoolprocess'
            className={classNames('a__bg', {'isActive': fromType === 'pwccn'})}>普华永道</a>
          <a href='/school/de/schoolprocess' className={classNames('a__bg', {'isActive': fromType === 'de'})}>德勤</a>
          <a href='/school/navigation' className='a__bg'>更多企业</a>
        </div>
        <style jsx>{`
          .footer-nav {
            background-color:#F6F6F6;
            position:fixed;
            bottom:0;
            display:flex;
            width:100vw;
          }
          .a__bg {
            flex:1;
            text-align:center;
            color:black;
            padding:15px 5px;
            font-size:0.8rem;
          }
          .isActive {
            background-color:#EEEEEE;
          }
        `}</style>
      </div>
    );
  }
}
