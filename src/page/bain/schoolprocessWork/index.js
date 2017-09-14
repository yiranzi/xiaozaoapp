import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '在立信会计师事务所的实习体验', link: 'http://bbs.yingjiesheng.com/thread-1977297-1-1.html'}
      ]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/bdo.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='立信' />
        <SchoolNav fromType='work' processLink='/school/bdo/schoolprocess' workLink='/school/bdo/schoolWork' expLink='/school/bdo/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
