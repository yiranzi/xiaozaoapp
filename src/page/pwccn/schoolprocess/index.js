import React from 'react';
import CompanyDetail from '../../../components/school/companyDetail';
import SchoolNav from '../../../components/school/schoolNav';
import SchoolOnlinApplyTime from '../../../components/school/schoolOnlineApplyTime';
import SchoolFooter from '../../../components/school/school-footer';

export default class SchoolProcess extends React.Component {
    render() {
        return (
            <div className="main-section">
                <CompanyDetail headerimage="/static/school/pwccn.png" trade="会计师事务所/咨询/法律" tag="世界级知名公司"
                               isOnlineApply={true} companyName="普华永道"/>
                <SchoolNav fromType="school" processLink="/school/pwccn/schoolprocess/index.html" workLink="/school/pwccn/schoolWork/index.html" expLink="/school/pwccn/schoolExp/index.html"/>
                <div className="school__online_time">
                    <div>已于8月15日开启校招，点击官网链接查看详情</div>
                    <div className="school__online_address my-text-rowsingle"><a href="http://www.careers.pwccn.com/home/chi/students_graduates_home_chi.html">http://www.careers.pwccn.com/home/chi/students_graduates_home_chi.html</a></div>
                </div>
                <SchoolFooter />
                <style jsx>{`
                    .school__online_time {
                        color:#787886;
                        text-align:center;
                        border-top:1px solid #E6E6E6;
                        padding:30px 0;
                        background-color:#efefef;
                    }
                    .school__online_time a {
                        color:#787886;
                    }
                    .school__online_address {
                        width:300px;
                        margin: 0 auto;
                    }
                `}</style>                <style jsx>{`
                    .main-section {
                        background-color:#F9F9F9;
                    }
                `}</style>
            </div>
        );
    }
}
