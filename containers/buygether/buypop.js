import React from 'react'
import PropTypes from 'prop-types'
import {ChooseBar, ChooseItem} from '../../xz-components/choosebar'
import Triangle from '../../containers/buygether/poptag'

export default class extends React.Component {
  static propTypes = {
    dataInfo: PropTypes.array,
    defaultSelect: PropTypes.number,
    buyButtonCallBack: PropTypes.func,
    joinInfo: PropTypes.object,
    couponInfo: PropTypes.object,
    cancelCallBack: PropTypes.func
  }

  static defaultProps = {
    dataInfo: [], // 购买回调
    defaultSelect: 0, // 初始选中
    buyButtonCallBack: function () {}, // 购买回调
    cancelCallBack: function () {}, // 取消购买回调
    joinInfo: {},
    couponInfo: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      currentSelect: 0,
      render: false
    }
    this.onChange = this.onChange.bind(this)
    this.buyButtonClick = this.buyButtonClick.bind(this)
  }

  componentDidMount () {
    console.log('componentDidMount')
    this.setState({
      currentSelect: this.props.defaultActiveKey,
      render: true
    })
  }

  renderTitle () {
    if (this.props.joinInfo && this.props.joinInfo.headimgurl) {
      let {headimgurl, nickname} = this.props.joinInfo
      return (<div className='title'>
        <div className='content title-font'>
          <span>正在参加</span>
          <div><img className='head-img' src={headimgurl} /></div>
          <span>{nickname}的团</span>
        </div>
        <p className='title-font'>
          选择你想参团的能力卡套餐
        </p>
        <style jsx>{`
          .title {
            text-align: center;
            padding: 10px 10px 10px 0px;
          }
          .title-font {
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items; center;
            justify-content: center;
            height: 40px;
            line-height: 40px;
          }
          .head-img {
            margin: 0 10px;
            vertical-align: middle;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='title'>
        <p className='title-font'>拼团流程</p>
        <style jsx>{`
          .title {
            text-align: center;
            padding: 10px 10px 10px 0px;
          }
          .title-font {
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items; center;
            justify-content: center;
            height: 40px;
            line-height: 40px;
          }
          .head-img {
            margin: 0 10px;
            vertical-align: middle;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
        `}</style>
      </div>)
    }
  }

  renderList () {
    let {dataInfo} = this.props
    let chooseBar = {
      border: 'none',
      paddingTop: '0',
      marginTop: '-10px'
    }
    let chooseStyle = {
      color: 'white',
      backgroundColor: 'red',
      borderColor: 'red'
    }
    return (
      <ChooseBar style={chooseBar}
        defaultActiveKey={this.state.currentSelect}
        onChange={this.onChange}
        chooseStyle={chooseStyle}>
        {dataInfo.map((ele, index) => {
          return (<ChooseItem key={index}>
            <div className='line'>
              <img />
              <span>{`能力卡${ele.buyCount}张`}</span>
              <span>{`立省${ele.showPrice - ele.price}`}</span>
            </div>
            <style jsx>{`
              .line {
                display: flex;
              }
            `}</style>
          </ChooseItem>)
        })}
      </ChooseBar>
    )
  }

  renderBottom () {
    if (this.props.dataInfo && this.props.dataInfo.length > 0) {
      console.log('renderBottom')
      console.log(this.state.currentSelect)
      let priceInfo = this.props.dataInfo[this.state.currentSelect]
      return (
        <div className='bottom-line'>
          <div className='button left-button'>{`原价￥${priceInfo.showPrice}`}</div>
          <div onClick={this.buyButtonClick} className='button rigth-button'>{`参团￥${priceInfo.price}`}</div>
          {!this.props.joinInfo.nickname &&
          <Triangle style={{right: '60px', bottom: '40px'}}>团长开团立减10元</Triangle>}
          <style jsx>{`
          .bottom-line{
            position: relative;
            border-top: 1px solid red;
            display: flex;
            height: 50px;
            line-height: 50px;
          }
          .bottom-line > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tag {
            position: absolute;
            right: 100px;
            top: -30px;
            width: 80px;
            height: 40px;
          }
          .button {
            height: 100%;
          }
          .left-button {
            background-color: white;
            color: red;
            flex: 1;
          }
          .rigth-button {
            background-color: red;
            color: white;
            flex: 1;
          }
        `}</style>
        </div>
      )
    }
  }

  buyButtonClick () {
    let typeId = this.props.dataInfo[this.state.currentSelect].id
    let groupId = this.props.joinInfo.groupId
    this.props.buyButtonCallBack(typeId, groupId)
  }

  render () {
    if (this.state.render) {
      return (
        <div className='buy-pop-bg' onClick={() => { this.props.cancelCallBack() }}>
          <div className='buy-pop-div' onClick={(e) => { e.stopPropagation() }}>
            {this.renderTitle()}
            {this.renderList()}
            {this.renderBottom()}
          </div>
          <style jsx>{`
          .buy-pop-bg {
            background-color: rgba(35,24,21,0.5);
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            font-size: 14px;
            z-index: 100;
          }
          .buy-pop-div {
            background-color: white;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            font-size: 14px;
          }
        `}</style>
        </div>
      )
    } else {
      return null
    }
  }

  // change
  onChange (index) {
    console.log('onchange')
    this.setState({
      currentSelect: index
    })
  }
}
