import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [{title: '管理咨询顾问最常见的职业下一站', link: 'https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=2654874482&idx=1&sn=04d3a4a0267232543c9f8506926ed595&scene=4'},
        {title: '如何评价美世咨询（Mercer）以及人力资源咨询行业？', link: 'https://www.zhihu.com/question/25031864'}]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/mercer.png' trade='会计师事务所/咨询/法律' tag='世界级知名公司'
          isOnlineApply companyName='美世咨询' />
        <SchoolNav fromType='work' processLink='/school/mercer/schoolprocess' workLink='/school/mercer/schoolWork' expLink='/school/mercer/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
