import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='quechao'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/quechao.png' trade='消费品/零售/贸易' tag='2017世界500强'
                         isOnlineApply companyName='雀巢' />
          <SchoolNav fromType='school' processLink='/school/quechao/schoolprocess' workLink='/school/quechao/schoolWork' expLink='/school/quechao/schoolExp' />
          <SchoolOnlinApplyTime time='于2017年9月开启网申，12月结束' address='http://special.zhaopin.com/h5/campus/2017/bf/qczg090699/' isTime='true' />
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
