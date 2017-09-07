import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/schoolFooter';

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/kpmg.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='毕马威' />
        <SchoolNav fromType='school' processLink='/school/kpmg/schoolprocess' workLink='/school/kpmg/schoolWork' expLink='/school/kpmg/schoolExp' />
        <SchoolOnlinApplyTime time='预计9月初' address='https://home.kpmg.com/cn/zh/home/careers.html' />
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
