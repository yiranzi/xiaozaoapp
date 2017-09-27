import React from 'react'
import Layout from '../../../components/school/schoolLayout'
import CompanyDetail from '../../../components/school/companyDetail'
import SchoolNav from '../../../components/school/schoolNav'
import List from '../../../components/school/list'
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[
        {title:"在唯品会做买手的工作体验是怎样的？",link:"https://www.zhihu.com/question/20674092"}
      ]
    }
  }
  render () {
    return (
      <Layout fromType='vip'>
        <div className='main-section'>
          <CompanyDetail headerimage='/static/school/vip.png' trade='互联网' tag='2017全球250强零售商'
                         isOnlineApply companyName='唯品会' />
          <SchoolNav fromType='work' processLink='/school/vip/schoolprocess' workLink='/school/vip/schoolWork' expLink='/school/vip/schoolExp' />
          <List list={this.state.list} />
        </div>
      </Layout>
    )
  }
}
