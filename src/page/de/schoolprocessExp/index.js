import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import TabList from '../../../components/school/TabList';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '全流程解析，教你夺取四大实习和全职offer', link: 'https://m.qlchat.com/topic/230000407013921.htm?isGuide=Y', tag: ['综合']},
        {title: '“每次网申都过不了，德勤网申需要什么条件呢？”德勤补招专场答疑', link: 'https://m.qlchat.com/topic/240000308353679.htm?isGuide=Y', tag: ['网申']},
        {title: '错过秋招怎么办？拿过3家四大5个offer的老司机教你如何霸面！', link: 'https://m.qlchat.com/topic/220000279173866.htm?isGuide=Y', tag: ['面试']},
        {title: '直播 | 四大面试官在面试时，最喜欢问的问题是', link: 'https://m.qlchat.com/topic/230000208042607.htm?isGuide=Y', tag: ['面试']},
        {title: '直播 | 听懂这10道笔试题，不再怕四大笔试！', link: 'https://m.qlchat.com/live/batchCodeIn/280000038008709/290000024067343.htm', tag: ['笔试']},
        {title: '直播间密码699 | 四大HR和经理喜欢的简历长什么样子？', link: 'https://m.qlchat.com/topic/240000101029490.htm?isGuide=Y', tag: ['网申']},
        {title: '审计|德勤审计17春季校招补招经验分享', link: 'http://bbs.yingjiesheng.com/thread-2099985-1-1.html', tag: ['笔试', '面试', '', '']},
        {title: '审计|2017德勤春招审计GA面经分享', link: 'http://bbs.yingjiesheng.com/thread-2093414-1-1.html', tag: ['面试', '', '', '']},
        {title: '咨询|德勤2017上海财务咨询面经分享', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2092836&modthreadkey=5b47df55d10da1601f0efd78622b7c84', tag: ['笔试', '面试', '', '']},
        {title: '审计|2017德勤审计岗校招经验回馈', link: 'http://bbs.yingjiesheng.com/thread-2091692-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '审计|德勤上海AuditPar面面经分享', link: 'http://bbs.yingjiesheng.com/thread-2048978-1-1.html', tag: ['面试', '', '', '']},
        {title: '税务|德勤上海税务求职offer经验', link: 'http://bbs.yingjiesheng.com/thread-1974552-1-1.html', tag: ['笔试', '面试', '', '']},
        {title: '审计|10月24日面经！德勤审计群面「电子通信公司案例分析」', link: 'https://mp.weixin.qq.com/s/TrFOg4Ap1XIJLKLCdMCZHg', tag: ['面试', '', '', '']},
        {title: '10月20日面经！德勤群面「分析快餐公司存在的问题并给出建议」', link: 'https://mp.weixin.qq.com/s/heMoSzVKhjCG5hZpuG079g', tag: ['面试', '', '', '']},
        {title: '10月17日面经！德勤群面「服装零售公司未来3年规划」', link: 'https://mp.weixin.qq.com/s/srZEr6uK3OOBWEU3ERu52Q', tag: ['面试', '', '', '']},
        {title: '审计|日本留学生2016德勤审计求职流程回顾', link: 'http://bbs.yingjiesheng.com/thread-2039579-1-1.html', tag: ['面试', '', '', '']},
        {title: '税务|GZ所日语组税务补招(GA➕M面)', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2106483&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '审计|Deloitte广州Audit', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2107393&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '税务|2017GZ所日语税务补招par面（内含M面／笔试）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2108799&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '审计|GZDTT审计17年补招分享', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2099985&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '审计|2016.02.27广州德勤审计GA面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2093414&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '咨询|从拒信到offer——我的德勤咨询之路', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2032878&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2017.5.23德勤ClubSHGA+M面面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2103166&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '咨询：那些年，我们一起追过的德勤', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2074051&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '风雨四大路——送给努力中的你。', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2089238&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '审计|【感恩12月内含所有我总结的四大资料】', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2083555&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '我与德勤的一带一路（校招全程）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2074726&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '咨询：如果你想找一篇关于德勤咨询的全方位贴——德勤BJ咨询S&O', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2079778&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '从网申到Par面全过程心路历程回馈论坛', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2072925&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '税务|在迷茫与浮躁中前行——致我的校招季(DTTTAX已拿offer)', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2071707&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '咨询|2016济南德勤税务咨询补招OT+GA面+par面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2048296&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']}

      ]
    };
  }

  render () {
    let onlineApply = this.state.list.filter(function (item) {
      return item.tag.indexOf('网申') !== -1;
    });
    let exam = this.state.list.filter(function (item) {
      return item.tag.indexOf('笔试') !== -1;
    });
    let interview = this.state.list.filter(function (item) {
      return item.tag.indexOf('面试') !== -1;
    });
    let comphensive = this.state.list.filter(function (item) {
      return item.tag.indexOf('综合') !== -1;
    });
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/de.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='德勤' />
        <SchoolNav fromType='exp' processLink='/school/de/schoolprocess' workLink='/school/de/schoolWork' expLink='/school/de/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    );
  }
}
