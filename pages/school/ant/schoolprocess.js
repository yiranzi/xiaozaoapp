import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime'
import SchoolFooter from '../../../components/school/schoolFooter'
export default class extends React.Component {
  render () {
    return (
      <Layout fromType='ant'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/ant.png' trade='互联网' tag=''
                         isOnlineApply companyName='蚂蚁金服' />
          <SchoolNav fromType='school' processLink='/school/ant/schoolprocess' workLink='/school/ant/schoolWork' expLink='/school/ant/schoolExp' />
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
