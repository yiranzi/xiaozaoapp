import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '在麦肯锡工作时养成的那些习惯', link: 'https://www.linkedin.com/wukong-web/companyReflection/1371-302190?ts=1502779341217&trk=company_review_review_share_wechat'},
        {title: '50％的时间服务客户，50%的时间服务自己——我在麦肯锡的Takeaway', link: 'https://www.linkedin.com/wukong-web/companyReflection/1371-300215?ts=1502779383331&trk=company_review_review_share_wechat'},
        {title: '在麦肯锡的沙滩上', link: 'https://www.linkedin.com/wukong-web/companyReflection/1371-300200?ts=1502779396809&trk=company_review_review_share_wechat'},
        {title: '一个3分钟咨询顾问的中文自我介绍｜小灶学堂第2期', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=403798731&idx=1&sn=0033f57d07ad94ab78a8831d27b26bc4&scene=4'},
        {title: '咨询篇：麦府两年，其人其事', link: 'https://www.linkedin.com/wukong-web/companyReflection/1371-200177?ts=1502779452555&trk=company_review_review_share_wechat'},
        {title: '麦肯锡的“小中见大”', link: 'https://www.linkedin.com/wukong-web/companyReflection/1371-300176?ts=1502779497579&trk=company_review_review_share_wechat'},
        {title: '在麦肯锡工作的关键是：你和ta之间互相喜欢', link: 'https://www.linkedin.com/wukong-web/companyReflection/1371-301152?ts=1502779545182&trk=company_review_review_share_wechat'},
        {title: '管理咨询顾问最常见的职业下一站', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874482&idx=1&sn=04d3a4a0267232543c9f8506926ed595&scene=4'}
      ]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/mck.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='麦肯锡' />
        <SchoolNav fromType='work' processLink='/school/mck/schoolprocess' workLink='/school/mck/schoolWork' expLink='/school/mck/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
