import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/schoolFooter';
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/tianzhi.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='中国会计师事务所排名 (前20强)'
          isOnlineApply companyName='天职' />
        <SchoolNav fromType='school' processLink='/school/tianzhi/schoolprocess' workLink='/school/tianzhi/schoolWork' expLink='/school/tianzhi/schoolExp' />
        <SchoolOnlinApplyTime time='9月中下旬开启网申' address='http://www.tzcpa.com/web/c_000000030012/' isTime='false' />
        <SchoolFooter />
        <style jsx>{`
          .main-section {
            background-color:#F9F9F9;
          }
        `}</style>
      </div>
    );
  }
}
