import React from 'react'// 库
import Button from '../../xz-components/button'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import DateSelector from '../../containers/apollo/DateSelector'// 自定义组件
import Layout from '../../components/layout'// container
import ThemeConfig from '../../config/theme'
import { Confirm } from '../../xz-components/confirm'
import AxiosUtil from '../../util/axios'
import WxShare from '../../xz-components/wxshare'
import wxPayController from '../../util/wxPayController2'// 工具类

// 介绍页
export default class extends React.Component {
  font={
    small: '14px',
    mid: '14px',
    large: '14px'
  }
  groupLength = 4
  changeInterval = 1000
  // currentGroupId = null // 当前选择的组号。用于购买
  // currentSelectType: null, // 当前选择的拼团套餐。用于购买

  constructor (props) {
    super(props)
    this.state = {
      myGroup: [], // 我的团信息
      otherGroup: undefined, // 其他团信息
      myGroupingId: null, // 是否正在开团
      studyCardPackageList: [], // 套餐列表
      couponInfo: []
    }
    this.renderCard = this.renderCard.bind(this)
    this.renderShare = this.renderShare.bind(this)
    this.buyMyGroup = this.buyMyGroup.bind(this)
    this.buyOtherGroup = this.buyOtherGroup.bind(this)
  }

  componentDidMount = async () => {
    // 0 去参数
    // 1 拉取优惠券 （如果有。
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    let couponInfo = await AxiosUtil.get('/api/study-card/coupon')
    let {myGroup, otherGroup, studyCardPackageList, studyCardCouponInvite} = buyDetail
    console.log(buyDetail)
    // 4 设置不同的分享
    this.setGroupStatus(myGroup)
    this.setState({
      myGroup: myGroup,
      otherGroup: otherGroup,
      studyCardPackageList: studyCardPackageList,
      hasCoupon: studyCardCouponInvite
    }, this.setRenderOtherGroupInterval)
  }

  // 根据信息设置开团状态 如果有团 设置团号 没有滞null
  setGroupStatus (myGroup) {
    let myGroupingId = null
    if (myGroup && myGroup.length > 0) {
      let result = myGroup.find((ele, index) => {
        return (ele.status === 0)
      })
      myGroupingId = result ? result.groupId : null
    } else {
      myGroupingId = null
    }
    this.setState({
      myGroupingId: myGroupingId
    })
  }

  // otherGroup 列表自动刷新
  setRenderOtherGroupInterval () {
    // 如果可供参团大于一次展示的数量
    if (this.state.otherGroup.length > this.groupLength) {
      window.setInterval(this.refreshGroup, this.changeInterval)
    }
  }

  refreshGroup () {
    let {otherGroup} = this.state
    // 将前面的移动到最后
    let popArr = otherGroup.splice(1, this.groupLength)
    otherGroup.concat(popArr)
    this.setState({
      otherGroup: otherGroup
    })
  }

  renderShare () {
    let shareProp = {
      title: '我没有团，你可以来看看',
      desc: '我没有团',
      link: 'http://rcwx.review.xiaozao.org/buygether',
      imgUrl: 'http://wx.xiaozao.org/static/img/apollo/share-icon.jpg',
    }
    if (this.state.myGroupingId) {
      shareProp.title = '我正在团，来和我参团'
      shareProp.desc = '我正在团'
      shareProp.link += `/?groundId=${this.state.myGroupingId}`
    }

    return (<WxShare {...shareProp} />)
  }

  renderGroupType () {
    let {studyCardPackageList} = this.state
    console.log(studyCardPackageList)
    return (<div className='show-card'>
      <div className='line'>
        <span>能力卡可以用于兑换2018课表课程</span>
        <span>已有9999人获得能力卡</span>
      </div>
      <div className='card-line'>
        {studyCardPackageList.map((ele, index) => {
          return (
            <div onClick={() => { this.buyMyGroup(ele.id) }}>
              <img src={`/static/img/buygether/card_${ele.id}.png`} />
            </div>)
        })}
      </div>
      <div className='text-line'>
        <p>123123123</p>
      </div>
      <style jsx>{`
        .show-card {
          position: relative;
          height: 200px;
          background-image: url('/static/img/buygether/buyBg_2.jpeg');
          background-size: 100% 100%;
          padding: 8px;
          font-size: 14px;
          color: white;
        }
        .line {
          display: flex;
          justify-content: space-between;
        }
        .card-line {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }
        .card-line img {
          width: 100%;
          max-width: 120px;
        }
        .text-line {
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
        }
      `}</style>
    </div>)
  }

  // 立即邀请好友 弹窗 正在开团的line
  // 邀请好友，再得卡 跳转 已成团的line
  renderMyGroup () {
    const {myGroup} = this.state
    if (myGroup && myGroup.length > 0) {
      let button
      let arr = myGroup.map((ele, index) => {
        // 要根据这个团的不同情况进行渲染
        if (ele.status === 1) {
          // 历史团
          button = <Button onClick>邀请好友，再得卡</Button>
        } else {
          // 正在团
          button = <Button onClick>立即邀请好友</Button>
        }
        return (this.renderCard(ele, button))
      })
      return (<div>
        {this.renderTitle('我的团')}
        {arr}

      </div>)
    }
  }

  renderCoupon () {
    let {hasCoupon} = this.state
    if (hasCoupon) {
      return (<div>
        {this.renderTitle('我获得的优惠券')}
        <p>报名后你的好友</p>
      </div>)
    }
  }

  renderOtherGroup () {
    let {otherGroup} = this.state
    if (otherGroup !== undefined) {
      const perLength = this.groupLength
      let groupingArr = []
      if (otherGroup.length > perLength) {
        // 如果人数多于4个，取出4个渲染
        groupingArr = otherGroup.slice(1, perLength).map((ele, index) => {
          const button = <Button onClick={() => { this.buyOtherGroup(ele.groupId) }}>参团</Button>
          return (this.renderCard(ele, button))
        })
      } else {
        // 如果人数不足4个，先取出所有，再补上缺省
        let count = 0
        groupingArr = otherGroup.map((ele, index) => {
          count++
          const button = <Button onClick={() => { this.buyOtherGroup(ele.groupId) }}>参团</Button>
          return (this.renderCard(ele, button))
        })
        while (count < perLength) {
          count++
          groupingArr.push(<div>缺省</div>)
        }
      }
      return (<div>
        {this.renderTitle('拼团进行中')}
        {groupingArr}
        <style jsx>{`
        .
        `}</style>
      </div>)
    }
  }

  // 1 判定状态。
  // 已成团 参团

  // 解析参数。渲染拼团
  renderCard (groupInfo, button) {
    console.log(groupInfo)
    let {headimgurl, leftHour, leftMinute, nickname, groupId} = groupInfo
    let content
    if (groupInfo.status === 1) {
      content = '已成团'
    } else {
      content = '剩余结束，还差1人'
    }
    return (<div className='group-card'>
      <div className='head-list'>
        {headimgurl.map((ele, index) => {
          return <img src={ele} />
        })}
      </div>
      <div>
        <span>{groupInfo.nickname}的能力卡拼团</span>
        <span>{content}</span>
      </div>
      {button}
      <style jsx>{`
        .group-card {
          display: flex;
          font-size: 14px;
        }
        .head-list {
          display: flex;
        }
        .head-list img {
          width: 30px;
          height: 30px;
        }
      `}</style>
    </div>)
  }

  // 渲染 小标题
  renderTitle (title) {
    return (
      <div className='title-line'>
        <span className='dot'>.</span>
        <h1>{title}</h1>
        <style jsx>{`
          .title-line {
            font-size: 16px;
            padding: 10px;
            display: flex;
            align-items: center;
          }
          .dot {
            background-color: purple;
            color: purple;
            margin-right: 10px;
            border-radius: 5px;
            height: 30px;
            width: 10px;
          }
        `}</style>
      </div>
    )
  }

  // 按钮可能

  // 参团 其他人的line
  // 我自己去开团 （我没团的时候才有。 点击去开团）

  /**
   * 按照状态来说
   * 这边可能的有
   * 未开团
   * 我自己去开团
   * 普通分享
   *
   * 正在开团中
   * 高级分享设置（购买后需要重新刷新这些状态，进行设置）
   *
   * 点击参团在两个状态下也有不同的反应。
   */


  // 传入团的信息。
  // 传入groupId的信息（如果有）
  // 最后 调用func or 修改visble 并传入参数
  renderBuyPop () {
    /**
     * 优惠券信息
     套餐信息
     自己团？
     */

  }

  // 购买回调
  buyCallBack (groupId) {
    if (groupId) {
      // 设置groupId。调用另外的接口
    } else {
      // 传入套餐。调用开团接口
    }
  }


  renderBuyButton () {
    return (<div>
      <Button onClick={() => { this.buyMyGroup() }}>自己开团</Button>
    </div>)
  }

  buyMyGroup = async (typeId) => {
    console.log(typeId)
    if (typeId) {
      console.log(typeId)
      // 设置好 再弹出 弹框。
    }
    let payInfo = await AxiosUtil.get('/api/study-card/buy/3')
    wxPayController.payInit(payInfo)
  }

  buyOtherGroup = async (groupId) => {
    if (groupId) {
      let payInfo = await AxiosUtil.get(`/api/study-card/buyTogether/${groupId}/3`)
      wxPayController.payInit(payInfo)
    }
  }

  render () {
    return (
      <Layout>
        {this.renderShare()}
        <div className='buy-card-page'>
          <img className='bg-img1' src={'/static/img/buygether/buyBg_1.jpeg'} />

          <div >{this.renderGroupType()}</div>
          <div className='div-with-border'>
            {this.renderMyGroup()}
            {this.renderCoupon()}
            {this.renderOtherGroup()}
          </div>
          {this.renderBuyButton()}
        </div>
        <style jsx>{`
          .buy-card-page {
            width: 100%;
            font-size: 0;
            text-align: center;
          }
          .buy-card-page *{
            margin: 0px;
            padidng: 0;
          }
          .bg-img1 {
            width: 100%;
          }
          .div-with-border > div{
            border-bottom: 1px solid black;
            color: red;
          }

          .header {
            font-size: 22px;
            }
        `}</style>
      </Layout>
    )
  }
}
