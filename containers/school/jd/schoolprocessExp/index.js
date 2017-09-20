import React from 'react'
import CompanyDetail from '../../../../components/school/companyDetail'
import SchoolNav from '../../../../components/school/schoolNav'
import TabList from '../../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '京东Java实习生面经', link: 'http://www.jianshu.com/p/9f15b01ef0a6', tag: [' ', ' ', '面试', ' ']},
        {title: '京东广告算法面经', link: 'http://www.jianshu.com/p/efcad6c98ead', tag: [' ', ' ', '面试', ' ']},
        {title: '文科院校生的京东2017年实习生offer之旅', link: 'http://bbs.yingjiesheng.com/thread-2101266-1-1.html', tag: [' ', ' ', '面试', '综合']},
        {title: '京东2017春招（我与京东的三生三世）', link: 'http://bbs.yingjiesheng.com/thread-2098954-1-1.html', tag: [' ', ' ', '面试', ' ']},
        {title: '京东集团补录综合管培Offer经验回馈', link: 'http://bbs.yingjiesheng.com/thread-2085685-1-1.html', tag: [' ', '', '面试', '综合']},
        {title: '2017京东软件产品经理面经分享', link: 'http://bbs.yingjiesheng.com/thread-2057405-1-1.html', tag: [' ', ' ', '面试', ' ']},
        {title: '小E的京东之旅——综管全程帖', link: 'http://bbs.yingjiesheng.com/thread-2035306-1-1.html', tag: [' ', ' ', '面试', ' ']},
        {title: '2016京东TET春招成都面试回馈帖', link: 'http://bbs.yingjiesheng.com/thread-2034378-1-1.html', tag: [' ', ' ', '面试', ' ']},
        {title: '2016【京东集团管培生】全程面经分享', link: 'http://bbs.yingjiesheng.com/thread-2018509-1-1.html', tag: [' ', ' ', '面试', ' ']},
        {title: '良心贴，京东管培生面试流程全解析', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2094012&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', ' ']},
        {title: '2017京东TET金融管培生综合经验——囧11.21更新拒信', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2063392&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', '', '面试', '综合']},
        {title: '京东物流管培生全程面经（到终面）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2075306&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', '综合']},
        {title: '2017北京物流管培生笔/面经（更新二面）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2061244&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', '', ' ', ' ']},
        {title: '京东集团TET管培笔经面经（金融方向）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072609&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', ' ']},
        {title: '京东哈尔滨管培面经（+群面+1V1）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2061936&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', ' ']},
        {title: '新鲜出炉的9.10京东北京站面试全过程和体会', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2053239&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', ' ']},
        {title: 'making wish 京东集团管培生 从网申到终面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2015319&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', '综合']},
        {title: '[面经]超详细干货 京东区域TST（客服）offer已拿', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2003258&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', ' ']},
        {title: '北京京东税务专员一面+二面经验分享', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2007367&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', '面试', ' ']},
        {title: '京东到家产品经理三面结束求offer！！！校招处女面分享经验攒人品', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1983591&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '', '面试', '综合']},
        {title: '2015春招TET9全程记录及应届生找工作建议', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1965182&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: [' ', ' ', ' ', '综合']},
        {title: '校招首战告捷拿下京东产品offer----求职季的那些笑那些泪', link: 'http://www.jianshu.com/p/acea018dd79c', tag: [' ', ' ', ' ', '综合']},
        {title: '活捉一道京东算法题', link: 'http://www.jianshu.com/p/b490a6d84e04', tag: [' ', '', ' ', ' ']},
        {title: '2016京东非技术类', link: 'http://www.jianshu.com/p/efb29f0e768f', tag: [' ', '', ' ', ' ']}
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
        <CompanyDetail headerimage='/static/school/jd.png' trade='互联网' tag='2017世界500强'
          isOnlineApply companyName='京东' />
        <SchoolNav fromType='exp' processLink='/school/jd/schoolprocess' workLink='/school/jd/schoolWork' expLink='/school/jd/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
