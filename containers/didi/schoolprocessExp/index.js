import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '滴滴面经1-实习，工作找面经', link: 'http://www.jianshu.com/p/e15c595ad89c', tag: ['面试', '', '', '']},
        {title: '菜鸟如何拿下软件岗|滴滴出行面经分享', link: 'http://www.jianshu.com/p/a0c6595e19fc', tag: ['面试', '', '', '']},
        {title: '15年滴滴应聘全流程', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2004890&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']}
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
        <CompanyDetail headerimage='/static/school/didi.png' trade='互联网' tag='2016中国互联网前100强'
          isOnlineApply companyName='滴滴出行' />
        <SchoolNav fromType='exp' processLink='/school/didi/schoolprocess' workLink='/school/didi/schoolWork' expLink='/school/didi/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
