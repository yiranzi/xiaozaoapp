import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import TabList from '../../../components/school/TabList';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '致同2016春招笔经+面经', link: 'http://bbs.yingjiesheng.com/thread-2036611-1-1.html', tag: ['笔试', '面试', '', '']},
        {title: '致同2016届校园招聘面经', link: 'http://bbs.yingjiesheng.com/thread-2033561-1-1.html', tag: ['面试', '', '', '']},
        {title: '致同笔试面试综合经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2078884&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '2015.12.22PAR面已收到offerSH所来回馈应届生哈哈哈哈', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2025501&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '致同2016春招笔经+面经！', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2036611&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: 'GZ致同税务笔试+群面+par面', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2017160&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: 'GTsh所par面口头offer', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2034472&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '致同南京所2016校招经验分享', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2030767&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '致同2016届秋招面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2033561&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2016届致同广州税务笔试~无领导~pa面~收到offer经历分享！希望帮到有需要的同学！', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2016582&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['综合', '', '', '']},
        {title: '致同BJ笔试+面试', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2016013&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '[笔试]致同一路', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2014243&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '', '', '']},
        {title: '重庆理工大学笔试-群面-par面-等offer中', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2011826&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']},
        {title: '致同（SZ）笔试+群面+par面~已拿offer', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2007368&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '面试', '', '']}
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
        <CompanyDetail headerimage='/static/school/zhitong.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='致同' />
        <SchoolNav fromType='exp' processLink='/school/zhitong/schoolprocess' workLink='/school/zhitong/schoolWork' expLink='/school/zhitong/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    );
  }
}
