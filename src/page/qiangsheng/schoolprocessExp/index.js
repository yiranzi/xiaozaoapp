import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '[面试]2016JJMC销售管培面经~', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2000356&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: '[综合经验]强生医疗一面二面终面之旅，感恩！', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2020952&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: '[综合经验]2015强生医疗销售管培经历（网申+网测+一面+二面+终面，转贴）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1933213&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '西安杨森面经-一个双非一本女生的医药销售之路', link: 'http://www.jianshu.com/p/233bf5f2e63f', tag: ['', '', '面试', '']},
        {title: '从新闻到医疗,拾梦强生', link: 'http://bbs.yingjiesheng.com/thread-2036332-1-1.html', tag: ['', '', '', '综合']}
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
        <CompanyDetail headerimage='/static/school/qiangsheng.jpg' trade='医疗/健康/制药' tag='2017世界500强'
          isOnlineApply companyName='强生' />
        <SchoolNav fromType='exp' processLink='/school/qiangsheng/schoolprocess' workLink='/school/qiangsheng/schoolWork' expLink='/school/qiangsheng/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
