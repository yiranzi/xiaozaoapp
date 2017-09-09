import React from 'react';
import Footer from '../components/footer';
export default class extends React.Component {
  renderGlobalCss () {
    return (
      <style global jsx>{`
          .written-test-clock {
              padding: 0!important;
          }
      `}</style>
    );
  }
  render () {
    return (
      <div>
        <img src='/static/writtentestclock/preview-prize-detail.jpeg' className='prize-detail-img'/>
        <Footer />
        <style jsx>{`
          .prize-detail-img {
            width: 100vw;
          }
        `}</style>
        {this.renderGlobalCss()}
      </div>
    );
  }
}
