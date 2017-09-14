import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/zhitong.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='致同' />
        <SchoolNav fromType='work' processLink='/school/zhitong/schoolprocess' workLink='/school/zhitong/schoolWork' expLink='/school/zhitong/schoolExp' />
        {/* <List list={this.state.list} /> */}
      </div>
    );
  }
}
