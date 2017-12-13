import React from 'react'
import Layout from '../../components/layout'
import Footer from './footer'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='learn-page'>
          {this.props.children}
        </div>
        <Footer type={this.props.type} courseId={this.props.courseId} />
        <style jsx>{`
          .learn-page {
            min-height: 100vh;
            background-color: #f0f2f6;
            padding-bottom: 4rem;
            padding-top: 1rem;
            box-sizing: border-box;
          }
        `}</style>
      </Layout>
    )
  }
}
