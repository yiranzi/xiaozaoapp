import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolFooter from '../../../components/school/school-footer';

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/jd.png' trade='互联网' tag='2017世界500强'
          isOnlineApply companyName='京东' />
        <SchoolNav fromType='school' processLink='/school/jd/schoolprocess' workLink='/school/jd/schoolWork' expLink='/school/jd/schoolExp' />
        <div className='school__online_time'>
          <div>已于7月22日开启网申，点击官网链接查看详情</div>
          <div className='school__online_address my-text-rowsingle'><a href='http://campus.jd.com/web/job/job_index?t=6'>http://campus.jd.com/web/job/job_index?t=6</a></div>
        </div>
        <SchoolFooter />
        <style jsx>{`
          .school__online_time {
            color:#787886;
            text-align:center;
            border-top:1px solid #E6E6E6;
            padding:30px 0;
            background-color:#efefef;
          }
          .school__online_time a {
            color:#787886;
          }
          .school__online_address {
            width:300px;
            margin: 0 auto;
          }
          .main-section {
            background-color:#F9F9F9;
          }
        `}</style>
      </div>
    );
  }
}
