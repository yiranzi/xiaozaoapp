import React from 'react'// 库
import Button from '../../xz-components/button'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import DateSelector from '../../containers/apollo/DateSelector'// 自定义组件
import Layout from '../../components/layout'// container
import ThemeConfig from '../../config/theme'
import { Confirm } from '../../xz-components/confirm'
import WxShare from '../../xz-components/wxshare'
import AxiosUtil from '../../util/axios'

// 介绍页
export default class extends React.Component {
  groupLength = 4
  changeInterval = 1000
  // currentGroupId = null // 当前选择的组号。用于购买
  // currentSelectType: null, // 当前选择的拼团套餐。用于购买

  constructor (props) {
    super(props)
    this.state = {
      otherGroup: undefined,
      currentViewGroup: null,
      isGrouping: false, // 是否正在开团

      studyCardPackageList: [] // 套餐列表
    }
    this.renderCard = this.renderCard.bind(this)
    this.buyGroup = this.buyGroup.bind(this)
  }

  componentDidMount = async () => {
    // 0 去参数
    // 1 拉取优惠券 （如果有。
    let buyDetail = await AxiosUtil.get('/api/study-card/buyDetail')
    let {myGroup, otherGroup, studyCardPackageList} = buyDetail
    // 4 设置不同的分享
    this.setGroupStatus(myGroup)
    this.setShare()
    this.setState({
      otherGroup: otherGroup
    }, this.setChangeInterval)
  }

  // 根据信息设置开团状态
  setGroupStatus (myGroup) {
    let isGrouping = false
    if (myGroup && myGroup.length > 0) {
      let result = myGroup.map((ele, index) => {
        return (ele.status === 0)
      })
      isGrouping = result ? true : false
    } else {
      isGrouping = false
    }
    this.setState({
      isGrouping: true
    })
  }

  setChangeInterval () {
    // 如果需要刷新
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

  // 立即邀请好友 弹窗 正在开团的line
  // 邀请好友，再得卡 跳转 已成团的line
  renderMyGroup () {
    let {myGroup} = this.state
    let button
    if (myGroup && myGroup.length > 0) {
      myGroup.map((ele, index) => {
        // 要根据这个团的不同情况进行渲染
        if (ele.status === 1) {
          // 历史团
          button = <Button onClick>邀请好友，再得卡</Button>
        } else {
          // 正在团
          button = <Button onClick>立即邀请好友</Button>
        }
      })

      return (<div>
        <p>待定</p>
      </div>)
    }
  }

  // 渲染 小标题
  renderTitle (title) {
    return (
      <h1>{title}</h1>
    )
  }

  renderDiscount () {
    if (true) {
      return (<div>
        {this.renderTitle('我获得的优惠券')}
        <p>报名后你的好友</p>
      </div>)
    }
  }

  renderOtherGroupList () {
    let {otherGroup} = this.state
    if (otherGroup !== undefined) {
      let groupingArr = []
      let perLength = this.groupLength
      if (otherGroup.length > perLength) {
        // 如果人数多于4个，取出4个渲染
        let arr = otherGroup.slice(1, perLength)
        groupingArr = arr.map((ele, index) => {
          return (this.renderCard(ele))
        })
      } else {
        // 如果人数不足4个，先取出所有，再补上缺省
        let count = 0
        let arr = otherGroup.map((ele, index) => {
          count++
          return (this.renderCard(ele))
        })
        while (count < perLength) {
          count++
          arr.push()
        }
      }
      return (<div>
        {groupingArr}
        <style jsx>{`
        .
      `}</style>
      </div>)
    }
  }

  // 解析参数。渲染拼团
  renderCard (groupInfo, button) {
    button = button || <Button onClick={() => { this.buyGroup(groupInfo.groupId) }}>参团</Button>
    let {headimgurl, leftHour, leftMinute, nickname, groupId} = groupInfo
    return (<div>
      <img />
      <div>
        <span>1</span>
        <span>剩余，还差1人</span>
      </div>
      {button}
      <style jsx>{`

      `}</style>
    </div>)
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

  buyGroup (groupId) {
    // 自己开团
    // 参加别人的团（点击 or 邀请）
    // 调用之后，显示。
    if (groupId) {
      this.currentGroupId = groupId
    } else {
      this.currentGroupId = -1
    }
  }

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

  render () {
    return (
      <Layout>
        <div className='buy-card-page'>
          <h1 className='header'>获得能力卡</h1>
          <p className='red-content'>成功购买能力卡后，享专属权利------邀请好友成功购买任意能力卡，马上获得 1 张课程能力卡（原价 ¥199），多邀多得！</p>
          <p className='main-content'>*好友购买时在推荐人一栏填写你的手机号即可。</p>
          <h1 className='header'>购买任一能力卡即可获得邀请权限</h1>
          <div className='main-content'>
            <p>小灶能力卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购买相应的能力卡。</p>
          </div>
          <div className='ad-img'>
            <img src={'/static/img/learncard/buy_card_bg.jpg'} />
          </div>
        </div>
        <style jsx>{`
          .buy-card-page {
            padding: 20px;
            text-align: center;
          }
          .header {
            font-size: 22px;
          }
          .red-content {
            color: red;
            margin-top: 15px;
            font-size: 16px;
            text-align: left;
          }
          .main-content {
            margin-top: 10px;
            font-size: 16px;
            text-align: left;
          }
          .share-button {
            margin: 20px auto 30px auto;
          }
          .button-list {
            display: flex;
            justify-content: space-between;
            margin: 5px auto 10px auto;
            font-size: 16px;
          }
          .ad-img img{
            width: 100%;
          }
          .list {
            margin: 10px auto auto auto;
            padding: 10px;
          }
          .my-card {
            font-size: 14px;
            margin-top: -20px;
          }
        `}</style>
      </Layout>
    )
  }
}
