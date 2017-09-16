import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '汇丰银行ChinaStudentPlan笔面经分享', link: 'http://bbs.yingjiesheng.com/thread-2105426-1-1.html', tag: ['笔试', '面试', '', '']},
        {title: '汇丰FTAoffer和RBWMTA经验分享', link: 'http://bbs.yingjiesheng.com/thread-2034276-1-1.html', tag: ['综合', '', '', '']},
        {title: 'HSBCChinaStudentPlan笔试+面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2105426&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '从网申到背景调查的HSBC求职心路历程', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2035639&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '【已拿offer】汇丰2017FTA项目申请全过程', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2098232&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '[签约]2015HSBCGBM-salesgraduateoffer(Shanghai)', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1966982&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '综合']},
        {title: '2015RBWMLondonAC', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1953503&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '综合']},
        {title: '[网申]HSBC2016OQ', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1980289&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '', '', '']},
        {title: '[签约]HSBCGlobalMarkets管培生', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2041158&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '汇丰银行面试失败记--记录我人生中第一次面试', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1980727&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']} ]
    }
  }

  render () {
    let onlineApply = this.state.list.filter(function (item) {
      return item.tag.indexOf('网申') !== -1
    })
    let exam = this.state.list.filter(function (item) {
      return item.tag.indexOf('笔试') !== -1
    })
    let interview = this.state.list.filter(function (item) {
      return item.tag.indexOf('面试') !== -1
    })
    let comphensive = this.state.list.filter(function (item) {
      return item.tag.indexOf('综合') !== -1
    })
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/hsbc.png' trade='银行/证券/基金/保险/投资公司' tag='2017世界500强'
          isOnlineApply companyName='汇丰银行' />
        <SchoolNav fromType='exp' processLink='/school/hsbc/schoolprocess' workLink='/school/hsbc/schoolWork' expLink='/school/hsbc/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
