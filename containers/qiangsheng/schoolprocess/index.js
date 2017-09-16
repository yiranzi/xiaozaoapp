import React from 'react'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolFooter from '../../../components/school/schoolFooter'

export default class SchoolProcess extends React.Component {
  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/qiangsheng.jpg' trade='医疗/健康/制药' tag='2017世界500强'
          isOnlineApply companyName='强生' />
        <SchoolNav fromType='school' processLink='/school/qiangsheng/schoolprocess' workLink='/school/qiangsheng/schoolWork' expLink='/school/qiangsheng/schoolExp' />
        <div className='school__online_time'>
          <div>已于09月11日启网申，点击官网链接查看详情</div>
          <div className='school__online_address my-text-rowsingle'><a href='http://www.dajie.com/corp/1002009/custom/campus/innerLink/27717181?O1IEJRqIByTAegz6ra99lgmuWYIis4cO=1'>http://www.dajie.com/corp/1002009/custom/campus/innerLink/27717181?O1IEJRqIByTAegz6ra99lgmuWYIis4cO=1</a></div>
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
