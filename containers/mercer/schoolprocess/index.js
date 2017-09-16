import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolFooter from '../../../components/school/schoolFooter'

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/mercer.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='美世咨询' />
        <SchoolNav fromType='school' processLink='/school/mercer/schoolprocess' workLink='/school/mercer/schoolWork' expLink='/school/mercer/schoolExp' />
        <div className='school__online_time'>
          <div>预计10月初开启网申，点击官网链接查看详情</div>
          <div className='school__online_address my-text-rowsingle'><a href='https://www.mercer.us/mercer-careers/campus-recruits.html'>https://www.mercer.us/mercer-careers/campus-recruits.html</a></div>
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
    )
  }
}
