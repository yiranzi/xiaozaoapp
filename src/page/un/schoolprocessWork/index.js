import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '在招商银行工作是一种怎样的体验？', link: 'https://www.zhihu.com/question/26738012'}
      ]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/zhaoshang.jpg' trade='银行/证券/基金/保险/投资公司' tag='2017世界500强'
          isOnlineApply companyName='招商银行' />
        <SchoolNav fromType='work' processLink='/school/zhaoshang/schoolprocess' workLink='/school/zhaoshang/schoolWork' expLink='/school/zhaoshang/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
