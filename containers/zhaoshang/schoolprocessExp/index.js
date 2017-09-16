import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '2017招商银行重庆分行校招综合经验分享', link: 'http://bbs.yingjiesheng.com/thread-2087774-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '招商银行总行管培生2017校园招聘offer之旅', link: 'http://bbs.yingjiesheng.com/thread-2084475-1-1.html', tag: ['', '笔试', '面试', '']},
        {title: '回报论坛，招行杭州分行2017校招经验分享', link: 'http://bbs.yingjiesheng.com/thread-2075158-1-1.html', tag: ['', '', '', '']},
        {title: '2017招行校招深分北京站笔面经梳理', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2063228&extra=page%3D1%26filter%3Dauthor%26orderby%3Ddateline', tag: ['', '笔试', '', '']},
        {title: '招行南京分行2016春季海外专场面经分享', link: 'http://bbs.yingjiesheng.com/thread-2036645-1-1.html', tag: ['', '', '面试', '']},
        {title: '【招行深分】2017校招面试经验贴', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2092586&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: '招商银行武汉分行2015校园招聘总结【申精】', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1987097&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '', '综合']},
        {title: '招商银行总行管培生2017校园招聘offer，供2018届应届生参考', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2084475&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '面试', '综合']},
        {title: '招商银行信用卡中心2016暑期实习笔试+群面+单面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2038559&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '面试', '']},
        {title: '招行北分一面+笔试+二面经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2014511&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '面试', '']},
        {title: '招行南分2016春季海外专场面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2036645&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: '招商青岛分行一面笔试二面终面+北分一面二面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2012996&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: '2015招行上分营销岗初面+笔试+终面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2010210&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '', '']},
        {title: '【武汉站】安利一下笔试+深分一面+深分二面经历贴', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2006302&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: '[笔试]11.7/8交通招商上海浦发四家银行笔试经验，希望对以后的童鞋有所帮助吧', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2004576&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '', '']},
        {title: '[笔试]2015.10.17招商证券2016校招笔试', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1989291&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '', '']}
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
        <CompanyDetail headerimage='/static/school/zhaoshang.jpg' trade='银行/证券/基金/保险/投资公司' tag='2017世界500强'
          isOnlineApply companyName='招商银行' />
        <SchoolNav fromType='exp' processLink='/school/zhaoshang/schoolprocess' workLink='/school/zhaoshang/schoolWork' expLink='/school/zhaoshang/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
