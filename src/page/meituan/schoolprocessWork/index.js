import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '美团企业文化之我见', link: 'https://www.linkedin.com/wukong-web/companyReflection/1166424-301204?ts=1502778831478&trk=company_review_review_share_wechat'},
        {title: '在美团工作是怎样的一种体验？', link: 'https://www.linkedin.com/wukong-web/companyReflection/1166424-300198?ts=1502778853268&trk=company_review_review_share_wechat'},
        {title: '前进的美团和O2O行业之我见', link: 'https://www.linkedin.com/wukong-web/companyReflection/1166424-200192?ts=1502778882115&trk=company_review_review_share_wechat'},
        {title: '新美大广告平台工作的四点感受', link: 'https://www.linkedin.com/wukong-web/companyReflection/1166424-302182?ts=1502778914712&trk=company_review_review_share_wechat'},
        {title: '在美团做BD的十点体会', link: 'https://www.linkedin.com/wukong-web/companyReflection/1166424-200202?ts=1502778745566&trk=company_review_review_share_wechat'}
      ]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/meituan.png' trade='互联网' tag='2016中国互联网前100强'
          isOnlineApply companyName='美团点评' />
        <SchoolNav fromType='work' processLink='/school/meituan/schoolprocess' workLink='/school/meituan/schoolWork' expLink='/school/meituan/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
