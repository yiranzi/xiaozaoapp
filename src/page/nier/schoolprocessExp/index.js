import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import TabList from '../../../components/school/TabList';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '迟到的经验 2017 秋季校招 一二三面经', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2094710&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2015 GIP法国留学生 面经（未完待续）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=1969661&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: 'Nielsen 上海 三面全面经（回馈应届生咯）', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2026299&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '2015尼尔森【一面经验】', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2019414&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']},
        {title: '[笔试] 尼尔森ot 附原题附图', link: 'http://bbs.yingjiesheng.com/thread-2012678-1-1.html', tag: ['笔试', '', '', '']},
        {title: '2015-2016秋招面试全经验', link: 'http://bbs.yingjiesheng.com/forum.php?mod=viewthread&tid=2040320&extra=page%3D1%26filter%3Ddigest%26digest%3D1', tag: ['面试', '', '', '']}
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
        <CompanyDetail headerimage='/static/school/nier.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='世界级知名公司'
          isOnlineApply companyName='尼尔森' />
        <SchoolNav fromType='exp' processLink='/school/nier/schoolprocess' workLink='/school/nier/schoolWork' expLink='/school/nier/schoolExp' />
        <TabList onlineApply={onlineApply} exam={exam} interview={interview} all={this.state.list} comphensive={comphensive} />
      </div>
    );
  }
}
