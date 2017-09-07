import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessWorkPage from '../../../src/page/de/schoolprocessWork/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='de'>
        <SchoolProcessWorkPage />
      </Layout>
    );
  }
}
