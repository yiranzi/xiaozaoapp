import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessExpPage from '../../../src/page/ali/schoolprocessExp/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='ali'>
        <SchoolProcessExpPage />
      </Layout>
    );
  }
}
