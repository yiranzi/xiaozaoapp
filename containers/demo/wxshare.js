import React from 'react'
import WxShare from '../../xz-components/wxshare'
import TextArea from '../../xz-components/textarea'
import Button from '../../xz-components/button'

export default class extends React.Component {
  shareContent
  constructor (props) {
    super(props)
    this.state = {
      shareTitle: '欢迎来到组件页'
    }
    this.shareContent = this.state.shareTitle
    this.renderOther = this.renderOther.bind(this)
  }
  render () {
    return (
      <div className='up'>
        <div className='title'>WxShare：</div>
        {this.renderShare()}
      </div>
    )
  }

  renderShare () {
    return (<div>
      <WxShare title={this.state.shareTitle}
        desc={'一起学习'}
        link={'https://rcwx.review.xiaozao.org/demo/prev'}
        imgUrl={'https://wx.xiaozao.org/static/img/apollo/share-icon.jpg'} />
      {this.renderOther()}
    </div>)
  }

  renderOther () {
    return (<div>
      <p>在input中输入。点击按钮后修改props->修改分享标题。</p>
      <TextArea
        placeholder={this.shareContent}
        maxLength={200}
        onChange={(text) => { this.shareContent = text }}
      />
      <div>
        <span>当前分享内容为</span>
        <Button onClick={() => { this.setState({shareTitle: this.shareContent}) }}>{this.state.shareTitle}</Button>
      </div>
    </div>)
  }
}
