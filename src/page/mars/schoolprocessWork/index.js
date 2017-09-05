import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import List from '../../../components/school/list';
import SchoolFooter from '../../../components/school/school-footer';

export default class schoolExp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[
                {title:"加入玛氏做招聘-从Applyexpertise到Buildcapability",link:"https://www.linkedin.com/wukong-web/companyReflection/1544-302195?ts=1502779770657&trk=company_review_review_share_wechat"},
                {title:"还没到七年之痒，就想认准了到老？#我在玛氏的六年#",link:"https://www.linkedin.com/wukong-web/companyReflection/1544-200187?ts=1502779791424&trk=company_review_review_share_wechat"},
                {title:"在玛氏工作是一种什么体验？",link:"https://www.zhihu.com/question/34449573/answer/123408170"}
            ]
        };
    }

    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/mars.png" trade="消费品/零售/贸易" tag="世界级知名公司"
                               isOnlineApply={true} companyName="玛氏"/>
                <SchoolNav fromType="work" processLink="/school/mars/schoolprocess/index.html" workLink="/school/mars/schoolWork/index.html" expLink="/school/mars/schoolExp/index.html" />
                <List list={this.state.list}/>
            </div>
        );
    }
}