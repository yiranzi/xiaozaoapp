import React from 'react';
import Layout from '../../../src/components/school/schoolLayout';
import SchoolProcessWorkPage from '../../../src/page/yiqi/schoolprocessWork/index';

export default class extends React.Component {
  render () {
    return (
      <Layout fromType='yiqi'>
        <SchoolProcessWorkPage />
      </Layout>
    );
  }
}
