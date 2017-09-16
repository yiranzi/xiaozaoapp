import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '2016玛氏箭牌销售培训生求职经验分享', link: 'http://bbs.yingjiesheng.com/thread-2020901-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '从网申到终面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2026329&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '【签约】开心的箭牌之旅', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2035240&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['求职', '笔试', '面试', '综合']},
        {title: '经验分享】玛氏箭牌面经', link: 'https://mp.weixin.qq.com/s?src=3&timestamp=1504599575&ver=1&signature=Fzad8q7aUsCtvQxqVLXkRS2HzY4X*WQOzGgT76KTN*gfLTRYBf5HmeiS2slWur-m1Tbj6gq0n7s5FPmaCqNTFDTRrMFTHe0zRP21ZMfesHEgiN93q93fDOjDFX7Q3-eE9eSJbYbchcN-pKePxHZfNA==', tag: ['', '', '面试', '']}
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
        <CompanyDetail headerimage='/static/school/mars.png' trade='消费品/零售/贸易' tag='世界级知名公司'
          isOnlineApply companyName='玛氏' />
        <SchoolNav fromType='exp' processLink='/school/mars/schoolprocess' workLink='/school/mars/schoolWork' expLink='/school/mars/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
