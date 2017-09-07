import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';

export default class schoolExp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [
        {title: '我在京东做招聘', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-302205?ts=1502767410261&trk=company_review_review_share_wechat'},
        {title: '京东的运营怎么玩？', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-301236?ts=1502767443406&trk=company_review_review_share_wechat'},
        {title: '京东金融是一家怎么样的公司？', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-200197?ts=1502767465626&trk=company_review_review_share_wechat'},
        {title: '在京东，体会创业公司中的“创业项目”', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-301207?ts=1502767490736&trk=company_review_review_share_wechat'},
        {title: '前外企人在京东做码农', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-200162?ts=1502767515723&trk=company_review_review_share_wechat'},
        {title: '从诺基亚到京东——一个创造奇迹的地方', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-302133?ts=1502767537239&trk=company_review_review_share_wechat'},
        {title: '在一个欣欣向荣的公司工作是怎样的体验', link: 'https://www.linkedin.com/wukong-web/companyReflection/3577304-302132?ts=1502767559336&trk=company_review_review_share_wechat'},
        {title: '请问一下在京东工作是什么体验？想进去容易吗？', link: 'https://www.zhihu.com/question/64289973'},
        {title: '在京东金融工作是怎样一种体验？', link: 'https://www.zhihu.com/question/29037034'}
      ]
    };
  }

  render () {
    return (
      <div className='main-section'>
        <CompanyDetail headerimage='/static/school/jd.png' trade='互联网' tag='2017世界500强'
          isOnlineApply companyName='京东' />
        <SchoolNav fromType='work' processLink='/school/jd/schoolprocess' workLink='/school/jd/schoolWork' expLink='/school/jd/schoolExp' />
        <List list={this.state.list} />
      </div>
    );
  }
}
