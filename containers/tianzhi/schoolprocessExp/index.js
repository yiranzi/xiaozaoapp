import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '终于还是你—天职，辛酸天曲折求职过程', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2106242&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '天职BJ所已获offer经验回馈论坛', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2074940&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '天职上海所笔试面试一路拿到offer经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072093&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '2017天职校招SH经验分享，回馈论坛（已收到offer）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2070167&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '热乎乎的面经——2017校园招聘天职国际广州分所一面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2068646&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2016致同会计师事务所笔经加面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2009292&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '天职北京总部审计助理秋招季求职经验分享（网申、网测、到一面、二面、三面）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2007718&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '网申', '', '']},
        {title: 'SH天职笔试+一面+二面+三面面经来啦！', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2005775&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '天职SH管理咨询助理笔试+一面+二面+三面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2006366&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '天职浙江所HZ顺利拿offer写下一二三面)', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2005208&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '人生第一次献给了天职HZ一二三面经offer已到', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2005007&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2016天职浙江所一面+二面+三面经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2004709&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']} ]
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
        <CompanyDetail headerimage='/static/school/tianzhi.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='天职' />
        <SchoolNav fromType='exp' processLink='/school/tianzhi/schoolprocess' workLink='/school/tianzhi/schoolWork' expLink='/school/tianzhi/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
