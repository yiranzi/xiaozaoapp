import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '在一汽-大众工作是一种怎样的体验？', link: 'https://www.zhihu.com/question/36956698', tag: ['工作体验', '', '', '']},
        {title: '情之所至，云淡风轻——一汽大众2017预开发经历', link: 'http://bbs.yingjiesheng.com/thread-2039096-1-1.html', tag: ['综合', '', '', '']},
        {title: '2016一汽大众春招广州站面经分享', link: 'http://bbs.yingjiesheng.com/thread-2038325-1-1.html', tag: ['面试', '', '', '']},
        {title: '一汽大众春招offer之路（天津站）', link: 'http://bbs.yingjiesheng.com/thread-2037723-1-1.html', tag: ['综合', '', '', '']},
        {title: '一汽大众2016校招补招求职经验', link: 'http://bbs.yingjiesheng.com/thread-2029637-1-1.html', tag: ['面试', '', '', '']},
        {title: '一汽大众从网申到拿offer全纪录', link: 'http://bbs.yingjiesheng.com/thread-1999601-1-1.html', tag: ['综合', '', '', '']},
        {title: '签约一汽大众，一路向北', link: 'http://bbs.yingjiesheng.com/thread-1998695-1-1.html', tag: ['面试', '', '', '']},
        {title: '一汽大众2016校园招聘面试历程', link: 'http://bbs.yingjiesheng.com/thread-1983459-1-1.html', tag: ['面试', '', '', '']} ]
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
        <CompanyDetail headerimage='/static/school/yiqi.png' trade='汽车/车联网/智能交通' tag='2017世界500强'
          isOnlineApply companyName='一汽大众' />
        <SchoolNav fromType='exp' processLink='/school/yiqi/schoolprocess' workLink='/school/yiqi/schoolWork' expLink='/school/yiqi/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
