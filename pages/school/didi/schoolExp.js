import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessExpPage from '../../../src/page/didi/schoolprocessExp/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='didi'>
        <SchoolProcessExpPage />
      </Layout>
    );
  }
}
