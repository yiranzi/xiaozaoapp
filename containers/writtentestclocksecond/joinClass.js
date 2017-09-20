import React from 'react'
import ThemeConfig from '../../config/theme'
import {LoadMore} from 'react-weui'

export default class Loading extends React.Component {
  render () {
    const {dialogContent, level, ok, cancel} = this.props
    return (
      <div className='modal-page' >
        <LoadMore>
          <div className='bg'>
            <div className='close' onClick={cancel}></div>
            <div className='title'>是否确认选择{dialogContent}？</div>
            <div className='tips'>
              *提示：班级选择完成后将无法修改，{dialogContent}题目为正式笔试测试中的{level}部分。
            </div>
            <div className='action'>
              <div className='cancel' onClick={cancel}>
                <img src='/static/writtentestclocksecond/dialog-neg.png' />
              </div>
              <div className='ok' onClick={ok}>
                <img src='/static/writtentestclocksecond/dialog-pos.png' />
              </div>
            </div>
          </div>
        </LoadMore>
        <style global jsx >{`
          .modal-page {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0, 0.5);
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal-page .weui-loadmore {
            width: 90%;
          }
          .modal-page .weui-loadmore__tips {
            display: block;
          }
          .modal-page .bg {
            background: url(/static/writtentestclocksecond/dialog-form.png) no-repeat;
            background-size: cover;
            padding: 2rem;
          }
          .modal-page .close {
            width: 2.5rem;
            height: 2.5rem;
            float: right;
            background: url(/static/writtentestclocksecond/dialog-close.png) no-repeat;
            background-size: contain;
          }
          .modal-page .tips {
            color: ${ThemeConfig.color.black};
          }
          .modal-page .title {
            color: ${ThemeConfig.color.white};
            font-size: ${ThemeConfig.size.normal};
            font-weight: bold;
            padding: 1rem;
            margin-top: 3rem;
            background: url(/static/writtentestclocksecond/dialog-title.png) no-repeat;
            background-size: 100% 100%;
          }
          .modal-page .action {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
          }
          .modal-page .action img {
            width: 100%;
          }
        `}</style >
      </div >
    )
  }
}
