import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import TabList from '../../../components/school/TabList';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '2017前端实习面经之腾讯、阿里、360、IBM、美团、Daocloud', link: 'http://www.jianshu.com/p/6969879eed33', tag: ['笔试', '面试', '', '']},
        {title: '腾讯&阿里产品实习生面经', link: 'http://www.jianshu.com/p/a76fd00cc3e7', tag: ['', '面试', '', '']},
        {title: '阿里巴巴面经：从网申到阿里总部见淘宝总裁', link: 'http://www.jianshu.com/p/b67357630727', tag: ['', '面试', '', '']},
        {title: '一年Android工作经验，阿里百度网易美团小米快手面经', link: 'http://www.jianshu.com/p/8a3df8442d32', tag: ['', '面试', '', '']},
        {title: '阿里内推电话面试面经', link: 'http://www.jianshu.com/p/d0246934645e', tag: ['', '面试', '', '']},
        {title: '拿到阿里巴巴offer的面经', link: 'http://www.jianshu.com/p/5d2a113cffc4', tag: ['', '面试', '', '']},
        {title: '阿里2015秋招面试面经', link: 'http://www.jianshu.com/p/f8086fbea3f9', tag: ['', '面试', '', '']},
        {title: '阿里2015秋招电话面试面经', link: 'http://www.jianshu.com/p/777d4fc24d49', tag: ['', '面试', '', '']},
        {title: '【面经】记阿里巴巴校招一轮电话面试', link: 'http://www.jianshu.com/p/932e469a6895', tag: ['', '面试', '', '']},
        {title: '分享阿里巴巴面试心得（成功拿到实习offer）', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654873310&idx=2&sn=43006cd645c8175b801e1f25cf2ce79b&scene=4', tag: ['笔试', '面试', '', '']},
        {title: '2018阿里巴巴秋招游戏岗笔试', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2112079&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '', '', '']},
        {title: '2016阿里运营专员笔试题来啦~~', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1977263&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '', '', '']},
        {title: '运营专员新鲜的笔试经验。', link: 'http://bbs.yingjiesheng.com/thread-2052708-1-1.html', tag: ['笔试', '', '', '']},
        {title: '新鲜出炉的2016校招阿里巴巴业务型产品经理（商业领域）笔试题目', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1977249&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '', '', '']},
        {title: '刚刚做完，对阿里2016国际市场培训生笔试的回顾和对阿里的建议', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1976931&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['笔试', '', '', '']},
        {title: '阿里五面拿到PMoffer（lz遭遇最难面试）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1965752&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['', '面试', '', '']}
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
        <CompanyDetail headerimage='/static/school/ali.jpg' trade='互联网' tag='2017世界500强'
          isOnlineApply companyName='阿里巴巴' />
        <SchoolNav fromType='exp' processLink='/school/ali/schoolprocess' workLink='/school/ali/schoolWork' expLink='/school/ali/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    );
  }
}
