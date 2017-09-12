import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '在辉瑞、罗氏、强生、赛诺菲等药企工作是一种怎样的体验？', link: 'https://www.zhihu.com/question/26088708'}
      ]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/qiangsheng.jpg' trade='医疗/健康/制药' tag='2017世界500强'
          isOnlineApply companyName='强生' />
        <SchoolNav fromType='work' processLink='/school/qiangsheng/schoolprocess' workLink='/school/qiangsheng/schoolWork' expLink='/school/qiangsheng/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
