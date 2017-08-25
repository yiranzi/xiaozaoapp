import React from 'react';
import {Button} from 'react-weui';

import Layout from '../../src/components/layout.js';
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