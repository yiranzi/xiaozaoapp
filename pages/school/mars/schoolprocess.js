import React from 'react';
import Layout from '../../../src/components/schoolLayout';
import SchoolProcessPage from '../../../src/page/mars/schoolprocess/index';

export default class extends React.Component {
    // static async getInitialProps({req}) {
    //     let error, companyDetail;
    //     let {companyId} = req.params;
    //     companyId = parseInt(companyId);
    //     try {
    //         const setJson = await CompanyAction.getCompany(companyId);
    //         companyDetail = setJson.response;
    //         console.log(companyDetail);
    //     } catch (err) {
    //
    //     }
    //     return {
    //         companyDetail
    //     }
    // }

    render() {
        return (
            <Layout fromType="mars">
                <SchoolProcessPage/>
            </Layout>
        );

    }
}