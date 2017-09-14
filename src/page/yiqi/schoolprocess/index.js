import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/schoolFooter';
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/yiqi.png' trade='汽车/车联网/智能交通' tag='2017世界500强'
          isOnlineApply companyName='一汽大众' />
        <SchoolNav fromType='school' processLink='/school/yiqi/schoolprocess' workLink='/school/yiqi/schoolWork' expLink='/school/yiqi/schoolExp' />
        <SchoolOnlinApplyTime time='已于8月30日开启网申' address='http://hr.faw-vw.com/Campus/NoticeDetail.aspx?nKey=91' isTime='false' />
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
