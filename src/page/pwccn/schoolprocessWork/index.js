import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';
import SchoolFooter from '../../../components/school/school-footer';

export default class schoolExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{title:"「四大」到底为何吸引学生？",link:"https://www.zhihu.com/question/20949243/answer/201464792"},
                {title:"四大的Consulting和Advisory部门有什么区别？",link:"https://mp.weixin.qq.com/s?__biz=MzIyNjAwMDc3Mg==&mid=404307133&idx=1&sn=c468936b7311e5862ed80f977ce5f0f2&scene=4"},
                {title:"咨询篇：在普华永道的财务咨询部门工作是什么体验？",link:"https://www.zhihu.com/question/37927666"},
                {title:"咨询篇：在普华永道当咨询师是怎样一番体验?",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-600006?ts=1502767579328&trk=company_review_review_share_wechat"},
                {title:"审计篇：四年PWC，一点感想",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-700009?ts=1502767592387&trk=company_review_review_share_wechat"},
                {title:"咨询篇：PwC，我咨询生涯的完美起点",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-701000?ts=1502767612571&trk=company_review_review_share_wechat"},
                {title:"审计篇：一个期待转机的地方",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-302208?ts=1502767625091&trk=company_review_review_share_wechat"},
                {title:"咨询篇：在普华做「估值」到底做什么？",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-302203?ts=1502767638416&trk=company_review_review_share_wechat"},
                {title:"审计篇：一起刀底稿的日子——记我在PwC审计部的日子",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-301233?ts=1502767654549&trk=company_review_review_share_wechat"},
                {title:"咨询篇：我在普华永道做战略咨询",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-302188?ts=1502767672997&trk=company_review_review_share_wechat"},
                {title:"咨询篇：普华永道做咨询的个人体会",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-302151?ts=1502767732613&trk=company_review_review_share_wechat"},
                {title:"审计篇：两年PwC，我的成长和收获",link:"https://www.linkedin.com/wukong-web/companyReflection/1044-300155?ts=1502767754323&trk=company_review_review_share_wechat"},
                {title:"税务篇：四大会计事务所工作状态究竟如何？——前普华永道员工亲身讲解",link:"http://www.jianshu.com/p/437fe441dc18"}]
        };
    }

    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/pwccn.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="普华永道"/>
                <SchoolNav fromType="work" processLink="/school/pwccn/schoolprocess" workLink="/school/pwccn/schoolWork" expLink="/school/pwccn/schoolExp" />
                <List list={this.state.list}/>
            </div>
        );
    }
}