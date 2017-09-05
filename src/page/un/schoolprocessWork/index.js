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
                {title:"在联合利华工作是一番怎样的体验？",link:"https://www.zhihu.com/question/24429824"},
                {title:"和联合利华管理培训生玩耍是怎样一种体验",link:"https://zhuanlan.zhihu.com/p/21587600"}
            ]
        };
    }

    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/un.png" trade="消费品/零售/贸易" tag="2017世界500强"
                               isOnlineApply={true} companyName="联合利华"/>
                <SchoolNav fromType="work" processLink="/school/un/schoolprocess/index.html" workLink="/school/un/schoolWork/index.html" expLink="/school/un/schoolExp/index.html" />
                <List list={this.state.list}/>
            </div>
        );
    }
}