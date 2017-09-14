import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/schoolFooter';
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/didi.png' trade='互联网' tag='2016中国互联网前100强'
          isOnlineApply companyName='滴滴出行' />
        <SchoolNav fromType='school' processLink='/school/didi/schoolprocess' workLink='/school/didi/schoolWork' expLink='/school/didi/schoolExp' />
        <SchoolOnlinApplyTime time='8月31日开启网申' address='http://campus.didichuxing.com/campus' isTime='false' />
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
