import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '感恩论坛，埃森哲Consulting面试回顾', link: 'http://bbs.yingjiesheng.com/thread-2030784-1-1.html', tag: ['面试', '', '', '']},
        {title: '2016埃森哲深圳Consulting全过程梳理', link: 'http://bbs.yingjiesheng.com/thread-2030563-1-1.html', tag: ['面试', '', '', '']},
        {title: '埃森哲offer已收，2017校招面经回馈论坛', link: 'http://bbs.yingjiesheng.com/thread-2092426-1-1.html', tag: ['面试', '', '', '']},
        {title: '埃森哲2016校招Behaviour Interview面经', link: 'http://bbs.yingjiesheng.com/thread-2028236-1-1.html', tag: ['面试', '', '', '']},
        {title: '感触颇深的埃森哲2016校招群面面经', link: 'http://bbs.yingjiesheng.com/thread-2026330-1-1.html', tag: ['面试', ' ', '', '']},
        {title: '已拿offer！2017埃森哲strategy全程回顾', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2093832&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', '', '综合', '']},
        {title: 'offer已收，2017校招面经回馈论坛', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2092426&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: 'ACN MC 校招全程回顾', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2093335&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', '', '综合', '']},
        {title: 'strategy校招全过程', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2093228&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: 'SZ MC 2016校招 全程经历分享', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2029893&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '既已结束，那就结束吧，陆续写的经历和相关经验，回馈论坛，亦算纪念。', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2034746&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '感恩论坛，Consulting全程面试经历（SH）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2030784&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2016校招_深圳SZ Consulting_面试全过程梳理', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2030563&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '笔试', '', '']},
        {title: '<2016校招终面面经>个人Close Interview面经，真的是面了才感触颇深', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2031138&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '', '', '']},
        {title: '上海MC，网申+面试全过程', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2030822&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '面试', '', '']},
        {title: '<2016校招群面面经>面经，真的是面了才感触颇深', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2026330&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', ' ', '']},
        {title: 'accenture 面试之路（offer）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1950262&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', ' ', '  ', '']}
      ]
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
        <CompanyDetail headerimage='/static/school/acc.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='2017世界500强'
          isOnlineApply companyName='埃森哲' />
        <SchoolNav fromType='exp' processLink='/school/acc/schoolprocess' workLink='/school/acc/schoolWork' expLink='/school/acc/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
