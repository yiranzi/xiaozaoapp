import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='kafu'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/kafu.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='卡夫亨氏' />
          <SchoolNav fromType='school' processLink='/school/kafu/schoolprocess' workLink='/school/kafu/schoolWork' expLink='/school/kafu/schoolExp' />
          <SchoolOnlinApplyTime time='9月11日开始网申，10月20日结束网申' address='https://m.creatby.com/v2/manage/book/5x1ost/' isTime='true' />
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
