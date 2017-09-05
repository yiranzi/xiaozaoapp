import React from 'react';
import Layout from '../../../src/components/schoolLayout';
import SchoolProcessExpPage from '../../../src/page/anyong/schoolprocessExp/index';

export default class extends React.Component {
    render() {
        return (
            <Layout fromType="anyong">
                <SchoolProcessExpPage />
            </Layout>
        );

    }
}