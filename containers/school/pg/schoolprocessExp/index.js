import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '如何回答「宝洁八大问」？', link: 'https://www.zhihu.com/question/19889186', tag: ['', '', '面试', '']},
        {title: '历时两个月的宝洁PS全程分享', link: 'http://bbs.yingjiesheng.com/thread-2102766-1-1.html', tag: ['', '笔试', '面试', '综合']},
        {title: '第一次面经分享献给宝洁R&D实习', link: 'http://bbs.yingjiesheng.com/thread-2093798-1-1.html', tag: ['', '', '面试', '']},
        {title: '回顾2017宝洁PS部门校招offer之路', link: 'http://bbs.yingjiesheng.com/thread-2090217-1-1.html', tag: ['', '', '面试', '']},
        {title: '2017秋招宝洁个人经验总结回顾', link: 'http://bbs.yingjiesheng.com/thread-2071094-1-1.html', tag: ['网申', '', '', '综合']},
        {title: '宝洁PS部门2017校招网申面试总结', link: 'http://bbs.yingjiesheng.com/thread-2061154-1-1.html', tag: ['', '', '面试', '综合']},
        {title: '宝洁Sales的校招求职心得分享', link: 'http://bbs.yingjiesheng.com/thread-2049205-1-1.html', tag: ['', '', '', '综合']},
        {title: '带着情怀走向宝洁', link: 'http://bbs.yingjiesheng.com/thread-2020616-1-1.html', tag: ['', '', '', '综合']},
        {title: '2016宝洁校招sales全过程分享', link: 'http://bbs.yingjiesheng.com/thread-2010275-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '宝洁面经:不忘初心，方得始终', link: 'http://bbs.yingjiesheng.com/thread-2003568-1-1.html', tag: ['', '', '面试', '综合']},
        {title: '宝洁2016天津PS求职经验大酬宾！', link: 'http://bbs.yingjiesheng.com/thread-1997656-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '从我与宝洁的offer之路看过来', link: 'http://bbs.yingjiesheng.com/thread-1979659-1-1.html', tag: ['', '', '', '综合']},
        {title: '吃透宝洁8大问=拿下了90%的公司offer', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=403510866&idx=3&sn=6bda4d5d8b8222d8a8084002a919d240&scene=4', tag: ['', '', '面试', '综合']},
        {title: '原来宝洁面试官在一面和二面会问这些问题！', link: 'https://mp.weixin.qq.com/s/GnMthDUwtF8tRBZZViC7Ig', tag: ['', '', '面试', '']},
        {title: '10月12日面经！宝洁60分钟全英终面都问些啥？', link: 'https://mp.weixin.qq.com/s/AdaW9hv21VtTCrn6vS5YvA', tag: ['', '', '面试', '']},
        {title: '宝洁八大问为什么能成为外企面试问题的标杆？', link: 'https://www.zhihu.com/question/21999546', tag: ['', '', '面试', '']},
        {title: '那一年，我追到的宝洁,附两轮面试笔试面经', link: 'https://mp.weixin.qq.com/s?src=3&timestamp=1504839627&ver=1&signature=lidqRlM31yIB1AS47Ch6aw7zzNTA9vPKMMHjFg5yh0sdnQ4SvDLAGxWYpX2DWyCJdrKhrvlTt1V8iTdbzQdpbAJ44UJUKf2YWYt9Bu-2DuErw6nG2WnmRUYhTh-iozUzsleZUJ8KG40M6z9DaAsDYw==', tag: ['网申', '笔试', '面试', '综合']},
        {title: '职经验分享：实力+努力+运气=满意求职【宝洁Offer】', link: 'http://www.jianshu.com/p/e4411e80e2f6', tag: ['', '', '面试', '综合']}
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
        <CompanyDetail headerimage='/static/school/pg.png' trade='消费品/零售/贸易' tag='2017世界500强'
          isOnlineApply companyName='宝洁' />
        <SchoolNav fromType='exp' processLink='/school/pg/schoolprocess' workLink='/school/pg/schoolWork' expLink='/school/pg/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
