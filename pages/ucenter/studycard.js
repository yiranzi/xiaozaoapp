import React from 'react'
import AxiosUtil from '../../util/axios'
import UCenterLayout from '../../containers/ucenter/layout'
import Navbar from '../../components/navbar'
import ShareCard from '../../containers/ucenter/sharecard'
import WxShare from '../../xz-components/WxShare'
import { Panel, PanelBody, MediaBox } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      studyCard: null,
      userInfo: null
    }
  }

  componentDidMount = async () => {
    this.loadUserData()
    this.loadStartCardInfo()
  }

  loadUserData = async () => {
    try {
      let userInfo = await AxiosUtil.get('/api/user')
      this.setState({
        userInfo: userInfo
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  loadStartCardInfo = async () => {
    try {
      const studyCard = await AxiosUtil.get('/api/vip/getStudyCard')
      this.setState({
        studyCard: studyCard
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  setShare () {
    let {userInfo} = this.state
    let prop
    prop = {
      desc: '2018课表全新上线！三大类能力，26个专题课，报名后再邀请好友购买，你再免费获得能力卡！',
      link: 'http://wx.xiaozao.org/learncard/redirect',
      imgUrl: 'http://wx.xiaozao.org/static/img/learncard/shareLogo.jpg',
      success: function () {
        AxiosUtil.get('/api/interview/getWXConfig?url=onUcenterStudyCard')
      }
    }
    if (userInfo && userInfo.nickname) {
      prop.title = `${userInfo.nickname}邀请你一起成为能力派！能力卡特惠低至2折，兑换2018能力课！`
    } else {
      prop.title = `小灶邀请你一起成为能力派！能力卡特惠低至3折，兑换2018能力课！`
    }
    return (<WxShare {...prop} />)
  }

  renderContent () {
    const {studyCard} = this.state
    return <PanelBody>
      <MediaBox type='text'>
        <p className='wx-img-full'><img src='/static/img/ucenter/banner1.jpg' /></p>
        <h3 className='card-count'>购买获得
          <span className='wx-pull-right'>x&nbsp;
            {studyCard ? studyCard.buyCount : 0}</span></h3>
        <h3 className='card-count'>通过推荐他人获得
          <span className='wx-pull-right'>x&nbsp;
            {studyCard ? studyCard.inviteCount : 0}</span></h3>
        <br />
        <ShareCard />
        <dl>
          <dt><h3>能力卡使用指南</h3></dt>
          <dd>1、小灶能力卡可以兑换2018年小灶能力学院的课程，小伙伴可以根据兴趣和需求，选择购买相应的能力卡。</dd>
          <dd>2、2018年小灶能力学院课程将会陆续上线，届时即可使用能力卡兑换。</dd>
          <dd>3、对能力卡有任何疑惑，都可以添加小灶能力顾问 Ted（微信：xiaozao025）咨询。</dd>
        </dl>
      </MediaBox>
      <style jsx>{`
      `}</style>
    </PanelBody>
  }

  render () {
    const leftbar = {
      href: '/ucenter/portal',
      name: '返回'
    }
    return <UCenterLayout>
      <Navbar fixed leftbar={leftbar} navtitle='我的能力卡' />
      <br /><br />
      {this.setShare()}
      <Panel>
        {this.renderContent()}
      </Panel>
      <style global jsx>{`
      `}</style>
    </UCenterLayout>
  }
}
