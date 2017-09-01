import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
export default class SchoolProcess extends React.Component {
    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/de.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="德勤校招卡"/>
                <SchoolNav fromType="school" processLink="/schoolassistantde/schoolprocess" workLink="/schoolassistantde/schoolWork" expLink="/schoolassistantde/schoolExp"/>
                <SchoolOnlinApplyTime time="预计9月1开启网申" address="https://www2.deloitte.com/cn/zh/careers/graduates.html?icid=top_graduates" />
                <style jsx>{`
                    .main-section {
                        background-color:#F9F9F9;
                    }
                `}</style>
            </div>
        );
    }
}
