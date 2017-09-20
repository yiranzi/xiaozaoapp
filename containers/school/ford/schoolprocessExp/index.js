import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '福特2017HRTrainee岗位EventDay总结', link: 'http://bbs.yingjiesheng.com/thread-2064774-1-1.html', tag: ['面试', '', '', '']},
        {title: '福特上海超详细FinanceGT求职经验', link: 'http://bbs.yingjiesheng.com/thread-2002074-1-1.html', tag: ['综合', '', '', '']},
        {title: '2016.10.28福特EventDay总结（岗位:HRTrainee）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2064774&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '福特上海FinanceTrainee面试--攒人品，求offer', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2003867&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '福特求职小记（FinanceGT2016上海）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2011846&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '南京FordSummerInternPD面经or随笔', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1970695&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '福特上海暑期实习Marketing,Sales&Service电面加一对一面试', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1969791&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '面试', '', '综合']}
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
        <CompanyDetail headerimage='/static/school/ford.png' trade='汽车/车联网/智能交通' tag='2017世界500强'
          isOnlineApply companyName='福特' />
        <SchoolNav fromType='exp' processLink='/school/ford/schoolprocess' workLink='/school/ford/schoolWork' expLink='/school/ford/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
