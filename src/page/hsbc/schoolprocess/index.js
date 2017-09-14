import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolFooter from '../../../components/school/schoolFooter';

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/hsbc.png' trade='银行/证券/基金/保险/投资公司' tag='2017世界500强'
          isOnlineApply companyName='汇丰银行' />
        <SchoolNav fromType='school' processLink='/school/hsbc/schoolprocess' workLink='/school/hsbc/schoolWork' expLink='/school/hsbc/schoolExp' />
        <div className='school__online_time'>
          <div>已于9月6日开启网申，点击官网链接查看详情</div>
          <div className='school__online_address my-text-rowsingle'><a href='http://campus.51job.com/hsbc/index.htm'>http://campus.51job.com/hsbc/index.htm</a></div>
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
