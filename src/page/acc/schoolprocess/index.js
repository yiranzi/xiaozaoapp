import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/schoolFooter';
export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/ann.png' trade='会计师事务所/咨询/法律/其他专业服务' tag='2017世界500强'
          isOnlineApply companyName='埃森哲' />
        <SchoolNav fromType='school' processLink='/school/acc/schoolprocess' workLink='/school/acc/schoolWork' expLink='/school/acc/schoolExp' />
        <SchoolOnlinApplyTime time='电脑端登录小灶官网，开启埃森哲网申提醒' address='https://www.xiaozao.org/school/detail/4' isTime='false' />
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
