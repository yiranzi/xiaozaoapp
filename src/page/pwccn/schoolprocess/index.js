import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
export default class SchoolProcess extends React.Component {
    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/pwccn.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="普华永道校招卡"/>
                <SchoolNav fromType="school" processLink="/school/pwccn/schoolprocess" workLink="/school/pwccn/schoolWork" expLink="/school/pwccn/schoolExp"/>
                <SchoolOnlinApplyTime time="" address="http://www.careers.pwccn.com/home/chi/students_graduates_home_chi.html" />
                <style jsx>{`
                    .main-section {
                        background-color:#F9F9F9;
                    }
                `}</style>
            </div>
        );
    }
}
