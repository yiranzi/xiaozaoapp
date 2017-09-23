import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='kekou'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/kekou.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='可口可乐' />
          <SchoolNav fromType='school' processLink='/school/kekou/schoolprocess' workLink='/school/kekou/schoolWork' expLink='/school/kekou/schoolExp' />
          <SchoolOnlinApplyTime time='9月4日开始网申，10月21日结束网申' address='https://www.shixiseng.com/website/coca_cola/' isTime='true' />
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
