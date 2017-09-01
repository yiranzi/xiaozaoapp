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
                <CompanyDetail headerimage="/static/school/de.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="德勤校招卡"/>
                <SchoolNav fromType="exp" processLink="/school/de/schoolprocess" workLink="/school/de/schoolWork" expLink="/school/de/schoolExp"/>
            </div>
        );
    }
}