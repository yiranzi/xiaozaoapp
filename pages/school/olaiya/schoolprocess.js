import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='oliya'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/oulaiya.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='欧莱雅' />
          <SchoolNav fromType='school' processLink='/school/olaiya/schoolprocess' workLink='/school/olaiya/schoolWork' expLink='/school/olaiya/schoolExp' />
          <SchoolOnlinApplyTime time='9月1日开启网申，10月26日结束网申' address='https://cn.app.seedlinktech.com/zh/js/position/3846/' isTime='true' />
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
