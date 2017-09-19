import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '渣打PE上海求职经验分享', link: 'http://bbs.yingjiesheng.com/thread-2048856-1-1.html', tag: ['', '笔试', '面试', '']},
        {title: '渣打2016SummerIntern已拿offer回馈论坛', link: 'http://bbs.yingjiesheng.com/thread-2045157-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '渣打2016暑期实习北京CIC&CFoffer', link: 'http://bbs.yingjiesheng.com/thread-2043627-1-1.html', tag: ['', '', '', '综合']},
        {title: '2016SummerIntern-Finance拿到offer,填补下Finance相关信息的空缺~', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2046313&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '', '']},
        {title: '[10月2號]2017HK所IGPOT+VI反馈啦啦啦啦啦', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2056827&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '', '']},
        {title: '9月22号！刚刚做完渣打2017上海管培生VI，来发原题回馈社会啦！', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2055058&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '面试', '']},
        {title: 'summerintern一路到终面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2043957&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '', '', '']},
        {title: '[笔试]差点跪，OT已过，总结一下攒人品~(≧▽≦)/t', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2032214&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '笔试', '', '']}
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
        <CompanyDetail headerimage='/static/school/zhada.png' trade='银行/证券/基金/保险/投资公司' tag='2016世界500强'
          isOnlineApply companyName='渣打银行' />
        <SchoolNav fromType='exp' processLink='/school/zhada/schoolprocess' workLink='/school/zhada/schoolWork' expLink='/school/zhada/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
