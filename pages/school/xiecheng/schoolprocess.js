import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='xiecheng'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/xiecheng.png' trade='互联网' tag='2017最具价值中国品牌100强'
                         isOnlineApply companyName='携程' />
          <SchoolNav fromType='school' processLink='/school/xiecheng/schoolprocess' workLink='/school/xiecheng/schoolWork' expLink='/school/xiecheng/schoolExp' />
          <SchoolOnlinApplyTime time='2017年08月22日开启网申' address='https://mp.weixin.qq.com/s/WK5mtCXGTqWxOGFTsbwO5w' isTime='true' />
          <SchoolFooter />
        </div>
        <style jsx>{`
          .main-section {
            background-color:#F9F9F9;
          }
        `}</style>
      </Layout>
    )
  }
}
