import React from 'react';
import Layout from '../../../src/components/schoolLayout';
import SchoolProcessWorkPage from '../../../src/page/mck/schoolprocessWork/index';

export default class extends React.Component {
    render() {
        return (
            <Layout fromType="mck">
                <SchoolProcessWorkPage />
            </Layout>
        );

    }
}