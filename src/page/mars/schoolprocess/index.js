import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolFooter from '../../../components/school/schoolFooter';

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/mars.png' trade='消费品/零售/贸易' tag='世界级知名公司'
          isOnlineApply companyName='玛氏' />
        <SchoolNav fromType='school' processLink='/school/mars/schoolprocess' workLink='/school/mars/schoolWork' expLink='/school/mars/schoolExp' />
        <div className='school__online_time'>
          <div>已于9月4日开启网申，点击官网链接查看详情</div>
          <div className='school__online_address my-text-rowsingle'><a href='http://www.marscampus.com.cn/index.aspx'>http://www.marscampus.com.cn/index.aspx</a></div>
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
