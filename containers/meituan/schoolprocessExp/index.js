import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '美团面经-Android开发实习生', link: 'http://www.jianshu.com/p/6f6fd84730e3', tag: ['面试', '', '', '']},
        {title: '2017 新美大（美团点评）产品运营 面经（已拿offer）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2058546&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '一年Android工作经验，阿里 百度 网易 美团 小米 快手面经', link: 'http://www.jianshu.com/p/8a3df8442d32', tag: ['面试', '', '', '']},
        {title: '在迷茫与浮躁中前行——致我的校招季(美团点评产品运营）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2070664&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '大众点评面试经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1984793&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']}
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
        <CompanyDetail headerimage='/static/school/meituan.png' trade='互联网' tag='2016中国互联网前100强'
          isOnlineApply companyName='美团点评' />
        <SchoolNav fromType='exp' processLink='/school/meituan/schoolprocess' workLink='/school/meituan/schoolWork' expLink='/school/meituan/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
