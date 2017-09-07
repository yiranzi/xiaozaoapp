import React from 'react';
import Layout from '../../../src/components/schoolLayout';
import SchoolProcessExpPage from '../../../src/page/mercer/schoolprocessExp/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='mercer'>
        <SchoolProcessExpPage />
      </Layout>
    );
  }
}
