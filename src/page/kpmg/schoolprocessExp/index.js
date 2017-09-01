import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';

export default class schoolExp extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/kpmg.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="毕马威校招卡"/>
                <SchoolNav fromType="exp" processLink="/schoolassistantkpmg/schoolprocess" workLink="/schoolassistantkpmg/schoolWork" expLink="/schoolassistantkpmg/schoolExp"/>
            </div>
        );
    }
}