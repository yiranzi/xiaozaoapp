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
        {title: '错过秋招怎么办？拿过3家四大5个offer的老司机教你如何霸面！', link: 'https://m.qlchat.com/topic/220000279173866.htm?isGuide=Y', tag: ['面试']},
        {title: '直播 | 四大面试官在面试时，最喜欢问的问题是', link: 'https://m.qlchat.com/topic/230000208042607.htm?isGuide=Y', tag: ['面试']},
        {title: '直播 | 听懂这10道笔试题，不再怕四大笔试！', link: 'https://m.qlchat.com/live/batchCodeIn/280000038008709/290000024067343.htm', tag: ['笔试']},
        {title: '直播间密码699 | 四大HR和经理喜欢的简历长什么样子？', link: 'https://m.qlchat.com/topic/240000101029490.htm?isGuide=Y', tag: ['网申']},
        {title: '2017毕马威春季精英计划网申与笔试之旅', link: 'http://bbs.yingjiesheng.com/thread-2099161-1-1.html', tag: ['网申', '笔试', '', '']},
        {title: '我的2017秋招之路-毕马威、普华永道和安永', link: 'http://bbs.yingjiesheng.com/thread-2069233-1-1.html', tag: ['面试', '', '', '']},
        {title: '毕马威香港——從M面到簽約的13天经历', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2051387&extra=page%3D1%26filter%3Dauthor%26orderby%3Ddateline', tag: ['面试', '', '', '']},
        {title: '毕马威（KPMG）2017校招笔试回忆', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2050655&extra=page%3D1%26filter%3Dauthor%26orderby%3Ddateline', tag: ['笔试', '', '', '']},
        {title: '税务|毕马威tax补招之笔试面试全过程', link: 'http://bbs.yingjiesheng.com/thread-2050198-1-1.html', tag: ['面试', '', '', '']},
        {title: 'KPMG英国Telephoneinterview经验', link: 'http://bbs.yingjiesheng.com/thread-2044661-1-1.html', tag: ['面试', '', '', '']},
        {title: '审计|毕马威2016秋招审计面经全程分享', link: 'http://bbs.yingjiesheng.com/thread-2037176-1-1.html', tag: ['网申', '笔试', '面试', '综合']},
        {title: '审计|毕马威香港2016校招应聘经历', link: 'http://bbs.yingjiesheng.com/thread-2031786-1-1.html', tag: ['面试', '', '', '']},
        {title: '审计|毕马威北京所Audit2016校招提前批面经', link: 'http://bbs.yingjiesheng.com/thread-1978174-1-1.html', tag: ['面试', '', '', '']},
        {title: '咨询|KPMGFRMadvisory求职经验', link: 'http://bbs.yingjiesheng.com/thread-1977664-1-1.html', tag: ['面试', '', '', '']},
        {title: '审计|那些年，我和毕马威的故事', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=404756147&idx=1&sn=113851c70aac9d6b4d24b2a3913089c4&scene=4', tag: ['网申', '面试', '', '']},
        {title: '10月17日面经！毕马威经理面「如何以加盟店的形式拆分中国市场」', link: 'https://mp.weixin.qq.com/s/yjqF0fkph0Doe8FhnbJ6DQ', tag: ['面试', '', '', '']},
        {title: '高能分享|毕马威通关：笔试+M面+Par面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2046464&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '审计|2016KPMG英国auditOT＋电面＋AC＋par面walkthrough', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2046762&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '2017SH所精英计划网申+笔试+面试经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2100834&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '[笔试]2017.04.24精英计划BJ所网申+笔经＋资料分享', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2100238&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '', '']},
        {title: '咨询|KPMGITAOFFER【OT+面试全经验】回馈+干货', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2073743&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['网申', '笔试', '面试', '综合']},
        {title: '[笔试]2017KPMG校招笔试回忆', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2050655&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '', '', '']},
        {title: '27/06/2016-KPMG英国UK-TELEPHONEINTERVIEW-TECHNOLOGYDELIVERY', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2046685&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '税务|GZTax补招（从笔试到par面）希望给后来人有帮助', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2031919&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '毕马威一生推——美国面经', link: 'https://www.linkedin.com/wukong-web/companyReflection/1079-300149?ts=1502763652941&trk=company_review_review_share_wechat', tag: ['面试', '', '', '']}]
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
        <CompanyDetail headerimage='/static/school/kpmg.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='毕马威' />
        <SchoolNav fromType='exp' processLink='/school/kpmg/schoolprocess' workLink='/school/kpmg/schoolWork' expLink='/school/kpmg/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    );
  }
}
