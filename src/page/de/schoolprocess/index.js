import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/school-footer';

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/de.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='德勤' />
        <SchoolNav fromType='school' processLink='/school/de/schoolprocess' workLink='/school/de/schoolWork' expLink='/school/de/schoolExp' />
        <SchoolOnlinApplyTime time='预计9月1开启网申' address='https://www2.deloitte.com/cn/zh/careers/graduates.html?icid=top_graduates' />
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
