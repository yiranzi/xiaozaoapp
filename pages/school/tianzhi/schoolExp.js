import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessExpPage from '../../../src/page/tianzhi/schoolprocessExp/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='tianzhi'>
        <SchoolProcessExpPage />
      </Layout>
    );
  }
}
