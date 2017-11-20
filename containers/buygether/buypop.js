import React from 'react'
import PropTypes from 'prop-types'
import {ChooseBar, ChooseItem} from '../../xz-components/choosebar'

export default class extends React.Component {
  static propTypes = {
    dataInfo: PropTypes.array,
    defaultSelect: PropTypes.number,
    buyButtonCallBack: PropTypes.func,
    joinInfo: PropTypes.object,
    couponInfo: PropTypes.object
  }

  static defaultProps = {
    dataInfo: [], // 购买回调
    defaultSelect: 0, // 初始选中
    buyButtonCallBack: function () {}, // 购买回调
    joinInfo: {},
    couponInfo: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      currentSelect: 0
    }
    this.onChange = this.onChange.bind(this)
    this.buyButtonClick = this.buyButtonClick.bind(this)
  }

  componentDidMount () {
    this.setState({
      currentSelect: this.props.defaultActiveKey
    })
  }

  renderTitle () {
    if (this.props.joinInfo && this.props.joinInfo.headimgurl) {
      let {headimgurl, nickname} = this.props.joinInfo
      return (<div className='title'>
        <div className='content-with-img'>
          <span>正在参加</span>
          <img className='head-img' src={headimgurl} />
          <span>{nickname}的团</span>
        </div>
        <p>
          选择你想参团的能力卡套餐
        </p>
        <style jsx>{`
          .content-with-img {
            height: 30px;
            line-height: 30px;
          }
          .title {
            line-height: 30px;
          }
          .head-img {
            border-radius: 50%;
            width: 30px;
          }
        `}</style>
      </div>)
    } else {
      return (<div>
        <p>流程为</p>
      </div>)
    }
  }

  renderList () {
    let {dataInfo} = this.props
    let chooseBar = {
      border: 'none'
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
      console.log('123123!!!!')
      let priceInfo = this.props.dataInfo[this.state.currentSelect]
      return (
        <div className='bottom-line'>
          <div className='button left-button'>{`1原价${priceInfo.showPrice}`}</div>
          <div onClick={this.buyButtonClick} className='button rigth-button'>{`参团${priceInfo.price}`}</div>
          {!this.props.joinInfo.nickname && <img className='tag' src='/static/img/buygether/group_tag.png' />}
          <style jsx>{`
          .bottom-line{
            position: relative;
            border-top: 1px solid red;
            display: flex;
            height: 30px;
            line-height: 30px;
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
    return (
      <div className='buy-pop'>
        {this.renderTitle()}
        {this.renderList()}
        {this.renderBottom()}
        <style jsx>{`
          .buy-pop {
            font-size: 14px;
          }
        `}</style>
      </div>
    )
  }

  // change
  onChange (index) {
    this.setState({
      currentSelect: index
    })
  }
}
