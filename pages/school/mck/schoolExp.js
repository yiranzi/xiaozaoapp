import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessExpPage from '../../../src/page/mck/schoolprocessExp/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='mck'>
        <SchoolProcessExpPage />
      </Layout>
    );
  }
}
