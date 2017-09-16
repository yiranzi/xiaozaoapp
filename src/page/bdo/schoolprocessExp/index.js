import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import TabList from '../../../components/school/TabList'

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [
        {title: '如何用系统思维实践“MECE分析法”', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873335&idx=1&sn=bdac2cbadb4342c0ccc6bcd7b42a8178&scene=4', tag: ['综合', '', '', '']},
        {title: '管理咨询顾问最常见的职业下一站', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874482&idx=1&sn=04d3a4a0267232543c9f8506926ed595&scene=4', tag: ['综合', '', '', '']},
        {title: '5分钟学习战略项目的内容、流程与方法', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874730&idx=1&sn=f35666c846f4b4cbad58a97532e2d520&scene=4', tag: ['综合', '', '', '']},
        {title: '帮你分析咨询业申请的三大关卡：简历，case，behavior', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874334&idx=2&sn=762781c191074cd8b2ec929470218e89&scene=4', tag: ['综合', '', '', '']},
        {title: '我为何从工程师转型成为咨询顾问？｜小灶学堂第9期', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873862&idx=1&sn=8d87d0998298eb1917a70400777deea7&scene=4', tag: ['综合', '', '', '']},
        {title: '所有咨询公司面试可能用到的分析结构', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874378&idx=2&sn=64e33ef21995383ed13118e95b94a5f4&scene=4', tag: ['综合', '', '', '']},
        {title: '想去咨询行业求职，需要做哪些准备？', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=405123300&idx=2&sn=4c1b63b593bc5bd3fc012ddc3b6fd52c&scene=4', tag: ['综合', '', '', '']},
        {title: '结构化思考工具 | 麦肯锡顾问的黄金思考方法', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874100&idx=1&sn=b04faf523a4bee9e0d51bc39fdeef661&scene=4', tag: ['综合', '', '', '']},
        {title: '咨询从业人员解决问题的方法论有哪些？', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874210&idx=1&sn=b7c1443ff033c3b4442d774ebe410a3f&scene=4', tag: ['综合', '', '', '']},
        {title: '一个3分钟咨询顾问的中文自我介绍｜小灶学堂第2期', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=403798731&idx=1&sn=0033f57d07ad94ab78a8831d27b26bc4&scene=4', tag: ['综合', '', '', '']},
        {title: '干货贴 | 行业研究不会做？咨询顾问来教你（一）', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654875286&idx=1&sn=325c72b734e95a880b661a135f1e3989&chksm=f3bda47dc4ca2d6b558a8c99cc3e08a370e7d0abc1f27e26ef787023ade42dc8b5ed458f81f0&scene=4', tag: ['综合', '', '', '']},
        {title: '干货贴 | 行业研究不会做？咨询顾问来教你（二）', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654875655&idx=3&sn=92d3a9385942b3a0dfce455c92b71168&chksm=f3bdbaecc4ca33fa7ec3c5e1410447ce545389e54fd1cfeb003552c7cee7c3072c51ab1e7d4c&scene=4', tag: ['综合', '', '', '']},
        {title: '干货贴 | 行业研究不会做？咨询顾问来教你（三）', link: 'https://mp.weixin.qq.com/s/VdcUsjJTNV8k9Q7UQScIhw', tag: ['综合', '', '', '']}
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
        <CompanyDetail headerimage='/static/school/bain.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='2017Vault咨询公司'
          isOnlineApply companyName='贝恩' />
        <SchoolNav fromType='exp' processLink='/school/bain/schoolprocess' workLink='/school/bain/schoolWork' expLink='/school/bain/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    )
  }
}
