import React from 'react';
import Layout from '../../src/components/layout';
import SchoolCenterPage from '../../src/page/school/center';

export default class extends React.Component {
    render() {
        return (
            <Layout>
                <SchoolCenterPage/>
            </Layout>
        );
    }
}